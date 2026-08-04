import os
from datetime import datetime
from flask import Flask, request, jsonify
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask_cors import CORS
from extensions import db, jwt, migrate, cors, ma

# Models
from models.user import User
from models.organizer_profile import OrganizerProfile
from models.event import Event
from models.rsvp import RSVP
from models.tag import Tag

# Schemas
from schemas.user_schema import user_schema
from schemas.event_schema import event_schema, events_schema
from schemas.rsvp_schema import rsvp_schema, rsvps_schema
from schemas.tag_schema import tag_schema, tags_schema

load_dotenv()


def create_app(config=None):

    app = Flask(__name__, instance_relative_config=True)
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        supports_credentials=True
    )
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        db_path = os.path.join(app.instance_path, 'app.db')
        app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'development-only-change-me')
    if config:
        app.config.update(config)

    # Initialize Extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(400)
    def bad_request(_error):
        return jsonify({'error': 'Invalid request'}), 400

    def current_user():
        return db.session.get(User, int(get_jwt_identity()))

    def require_roles(*roles):
        user = current_user()
        if not user or user.role not in roles:
            return None, (jsonify({'error': 'Forbidden'}), 403)
        return user, None

    def event_payload(data, partial=False):
        required = ('title', 'description', 'category', 'location', 'capacity')
        if not partial:
            missing = [field for field in required if not data.get(field)]
            if not data.get('event_date') and not (data.get('date') and data.get('time')):
                missing.append('event_date')
            if missing:
                return None, {'error': f"Missing required fields: {', '.join(missing)}"}
        values = {key: data[key] for key in ('title', 'description', 'category', 'location', 'image') if key in data}
        if 'capacity' in data:
            try:
                values['capacity'] = int(data['capacity'])
                if values['capacity'] < 1:
                    raise ValueError
            except (TypeError, ValueError):
                return None, {'error': 'capacity must be a positive integer'}
        if data.get('event_date') or (data.get('date') and data.get('time')):
            try:
                values['event_date'] = datetime.fromisoformat(data.get('event_date') or f"{data['date']}T{data['time']}")
            except (TypeError, ValueError):
                return None, {'error': 'event_date must be a valid ISO-8601 datetime'}
        return values, None

    # =========================================================================
    # 1. AUTHENTICATION ROUTES
    # =========================================================================

    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.get_json() or {}

        required = ('username', 'email', 'password')
        if any(not data.get(field) for field in required):
            return jsonify({'error': 'username, email, and password are required'}), 400
        if len(data['password']) < 8:
            return jsonify({'error': 'password must be at least 8 characters'}), 400

        if User.query.filter((User.email == data.get('email')) | (User.username == data.get('username'))).first():
            return jsonify({'error': 'User with this email or username already exists'}), 400

        user = User(
            username=data['username'],
            email=data['email'],
            # Public registration cannot grant privileged roles.
            role='student'
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        return jsonify(user_schema.dump(user)), 201

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        user = User.query.filter_by(email=data.get('email')).first()

        if user and user.check_password(data.get('password', '')):
            token = create_access_token(identity=str(user.id))
            return jsonify({
                'access_token': token,
                'user': {'id': user.id, 'username': user.username, 'role': user.role}
            }), 200

        return jsonify({'error': 'Invalid email or password'}), 401

    @app.route('/api/auth/me', methods=['GET'])
    @jwt_required()
    def me():
        user = current_user()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user_schema.dump(user)), 200

    # =========================================================================
    # 2. EVENT ROUTES
    # =========================================================================

    @app.route('/api/events', methods=['GET'])
    def get_events():
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 6, type=int)
        if page < 1 or not 1 <= per_page <= 100:
            return jsonify({'error': 'page must be >= 1 and per_page must be between 1 and 100'}), 400
        category = request.args.get('category')
        tag_name = request.args.get('tag')
        search = request.args.get('search')

        query = Event.query

        if category:
            query = query.filter(Event.category == category)
        if tag_name:
            query = query.join(Event.tags).filter(Tag.name == tag_name.lower())
        if search:
            query = query.filter(Event.title.ilike(f'%{search}%'))

        paginated = query.order_by(Event.event_date.asc()).paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'total': paginated.total,
            'page': paginated.page,
            'per_page': paginated.per_page,
            'total_pages': paginated.pages,
            'items': events_schema.dump(paginated.items)
        }), 200

    @app.route('/api/events', methods=['POST'])
    @jwt_required()
    def create_event():
        user, error = require_roles('organizer', 'admin')
        if error:
            return error

        data = request.get_json(silent=True) or {}
        values, validation_error = event_payload(data)
        if validation_error:
            return jsonify(validation_error), 400

        # Ensure organizer profile exists; create one from provided data if missing
        if not user.organizer_profile:
            profile = OrganizerProfile(
                user_id=user.id,
                organization_name=data.get('organization_name', 'Organization'),
                department=data.get('department', 'General')
            )
            db.session.add(profile)
            db.session.commit()

        new_event = Event(
            **values,
            organizer_id=user.organizer_profile.id
        )

        if 'tag_ids' in data:
            tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()
            new_event.tags.extend(tags)

        db.session.add(new_event)
        db.session.commit()
        return jsonify(event_schema.dump(new_event)), 201

    @app.route('/api/events/<int:event_id>', methods=['GET'])
    @jwt_required(optional=True)
    def get_event(event_id):
        event = Event.query.get_or_404(event_id)
        payload = event_schema.dump(event)
        user_id = get_jwt_identity()
        payload['is_registered'] = bool(
            user_id and RSVP.query.filter_by(user_id=int(user_id), event_id=event.id).first()
        )
        return jsonify(payload), 200

    @app.route('/api/events/<int:event_id>', methods=['PATCH'])
    @jwt_required()
    def update_event(event_id):
        event = Event.query.get_or_404(event_id)
        user, error = require_roles('organizer', 'admin')
        if error:
            return error
        if user.role != 'admin' and event.organizer.user_id != user.id:
            return jsonify({'error': 'Forbidden: You can only edit your own events'}), 403
        data = request.get_json() or {}
        values, validation_error = event_payload(data, partial=True)
        if validation_error:
            return jsonify(validation_error), 400

        for key, val in values.items():
            setattr(event, key, val)

        if 'tag_ids' in data:
            event.tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()

        db.session.commit()
        return jsonify(event_schema.dump(event)), 200

    @app.route('/api/events/<int:event_id>', methods=['DELETE'])
    @jwt_required()
    def delete_event(event_id):
        event = Event.query.get_or_404(event_id)
        user, error = require_roles('organizer', 'admin')
        if error:
            return error
        if user.role != 'admin' and event.organizer.user_id != user.id:
            return jsonify({'error': 'Forbidden: You can only delete your own events'}), 403
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'}), 200

    # =========================================================================
    # 3. RSVP ROUTES
    # =========================================================================

    @app.route('/api/events/<int:event_id>/rsvp', methods=['POST'])
    @jwt_required()
    def create_rsvp(event_id):
        current_user_id = int(get_jwt_identity())
        Event.query.get_or_404(event_id)

        if RSVP.query.filter_by(user_id=current_user_id, event_id=event_id).first():
            return jsonify({'error': 'RSVP already submitted for this event'}), 400

        data = request.get_json(silent=True) or {}
        new_rsvp = RSVP(
            user_id=current_user_id,
            event_id=event_id,
            ticket_type=data.get('ticket_type', 'General'),
            status='attending'
        )
        db.session.add(new_rsvp)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'RSVP already submitted for this event'}), 409
        return jsonify(rsvp_schema.dump(new_rsvp)), 201

    @app.route('/api/events/<int:event_id>/rsvp', methods=['DELETE'])
    @jwt_required()
    def cancel_rsvp(event_id):
        current_user_id = int(get_jwt_identity())
        rsvp = RSVP.query.filter_by(user_id=current_user_id, event_id=event_id).first()

        if not rsvp:
            return jsonify({'error': 'RSVP not found'}), 404

        db.session.delete(rsvp)
        db.session.commit()
        return jsonify({'message': 'RSVP cancelled successfully'}), 200

    @app.route('/api/users/me/rsvps', methods=['GET'])
    @jwt_required()
    def get_user_rsvps():
        current_user_id = int(get_jwt_identity())
        rsvps = RSVP.query.filter_by(user_id=current_user_id).all()
        return jsonify(rsvps_schema.dump(rsvps)), 200

    # =========================================================================
    # 4. TAG ROUTES
    # =========================================================================

    @app.route('/api/tags', methods=['GET'])
    def get_tags():
        tags = Tag.query.order_by(Tag.name.asc()).all()
        return jsonify(tags_schema.dump(tags)), 200

    @app.route('/api/tags', methods=['POST'])
    @jwt_required()
    def create_tag():
        _user, error = require_roles('organizer', 'admin')
        if error:
            return error
        data = request.get_json() or {}
        name = data.get('name', '').strip().lower()

        if not name:
            return jsonify({'error': 'Tag name is required'}), 400
        if Tag.query.filter_by(name=name).first():
            return jsonify({'error': 'Tag already exists'}), 400

        new_tag = Tag(name=name)
        db.session.add(new_tag)
        db.session.commit()
        return jsonify(tag_schema.dump(new_tag)), 201

    @app.route('/api/analytics', methods=['GET'])
    @jwt_required()
    def analytics():
        _user, error = require_roles('organizer', 'admin')
        if error:
            return error
        total_events = db.session.scalar(db.select(func.count(Event.id)))
        total_rsvps = db.session.scalar(db.select(func.count(RSVP.id)))
        now = datetime.utcnow()
        upcoming_events = db.session.scalar(db.select(func.count(Event.id)).where(Event.event_date >= now))
        completed_events = db.session.scalar(db.select(func.count(Event.id)).where(Event.event_date < now))
        recent = db.session.execute(
            db.select(Event, func.count(RSVP.id).label('attendees'))
            .outerjoin(RSVP)
            .group_by(Event.id)
            .order_by(Event.event_date.desc())
            .limit(5)
        ).all()
        return jsonify({
            'totalEvents': total_events,
            'totalRSVPs': total_rsvps,
            'upcomingEvents': upcoming_events,
            'completedEvents': completed_events,
            'recentEvents': [{
                'id': event.id, 'title': event.title, 'event_date': event.event_date.isoformat(),
                'location': event.location, 'attendees': attendees
            } for event, attendees in recent]
        }), 200

    return app


app = create_app()

if __name__ == '__main__':
    app.run(port=5555, debug=True)
