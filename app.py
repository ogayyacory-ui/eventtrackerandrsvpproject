import os
from datetime import datetime
from flask import Flask, request, jsonify
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


def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

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
    db_path = os.path.join(app.instance_path, 'app.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    # Initialize Extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    # =========================================================================
    # 1. AUTHENTICATION ROUTES
    # =========================================================================

    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.get_json() or {}

        if User.query.filter((User.email == data.get('email')) | (User.username == data.get('username'))).first():
            return jsonify({'error': 'User with this email or username already exists'}), 400

        user = User(
            username=data['username'],
            email=data['email'],
            role=data.get('role', 'student')
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        # If admin, auto-create an organizer profile
        if user.role == 'admin':
            profile = OrganizerProfile(
                user_id=user.id,
                organization_name=data.get('organization_name', 'Student Union'),
                department=data.get('department', 'General')
            )
            db.session.add(profile)
            db.session.commit()

        return jsonify(user_schema.dump(user)), 201

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        user = User.query.filter_by(email=data.get('email')).first()

        if user and user.check_password(data.get('password', '')):
            token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': token,
                'user': {'id': user.id, 'username': user.username, 'role': user.role}
            }), 200

        return jsonify({'error': 'Invalid email or password'}), 401

    @app.route('/api/auth/me', methods=['GET'])
    @jwt_required()
    def me():
        current_user_id = get_jwt_identity()
        user = User.query.get_or_404(current_user_id)
        return jsonify(user_schema.dump(user)), 200

    # =========================================================================
    # 2. EVENT ROUTES
    # =========================================================================

    @app.route('/api/events', methods=['GET'])
    def get_events():
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 6, type=int)
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
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or user.role != 'admin' or not user.organizer_profile:
            return jsonify({'error': 'Forbidden: Organizer privileges required'}), 403

        data = request.get_json() or {}
        event_date_value = None
        if data.get('event_date'):
            event_date_value = datetime.fromisoformat(data['event_date'])
        elif data.get('date') and data.get('time'):
            event_date_value = datetime.fromisoformat(f"{data['date']}T{data['time']}")

        new_event = Event(
            title=data['title'],
            description=data['description'],
            category=data['category'],
            location=data['location'],
            capacity=data['capacity'],
            image=data.get('image'),
            event_date=event_date_value,
            organizer_id=user.organizer_profile.id
        )

        if 'tag_ids' in data:
            tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()
            new_event.tags.extend(tags)

        db.session.add(new_event)
        db.session.commit()
        return jsonify(event_schema.dump(new_event)), 201

    @app.route('/api/events/<int:event_id>', methods=['GET'])
    def get_event(event_id):
        event = Event.query.get_or_404(event_id)
        return jsonify(event_schema.dump(event)), 200

    @app.route('/api/events/<int:event_id>', methods=['PATCH'])
    @jwt_required()
    def update_event(event_id):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or user.role != 'admin':
            return jsonify({'error': 'Forbidden: Admin privilege required'}), 403

        event = Event.query.get_or_404(event_id)
        data = request.get_json() or {}

        for key, val in data.items():
            if key == 'event_date':
                setattr(event, key, datetime.fromisoformat(val))
            elif key == 'date' and data.get('time'):
                setattr(event, 'event_date', datetime.fromisoformat(f"{val}T{data['time']}"))
            elif hasattr(event, key) and key not in ('tag_ids', 'date', 'time'):
                setattr(event, key, val)

        if 'tag_ids' in data:
            event.tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()

        db.session.commit()
        return jsonify(event_schema.dump(event)), 200

    @app.route('/api/events/<int:event_id>', methods=['DELETE'])
    @jwt_required()
    def delete_event(event_id):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or user.role != 'admin':
            return jsonify({'error': 'Forbidden: Admin privilege required'}), 403

        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'}), 200

    # =========================================================================
    # 3. RSVP ROUTES
    # =========================================================================

    @app.route('/api/events/<int:event_id>/rsvp', methods=['POST'])
    @jwt_required()
    def create_rsvp(event_id):
        current_user_id = get_jwt_identity()
        Event.query.get_or_404(event_id)

        if RSVP.query.filter_by(user_id=current_user_id, event_id=event_id).first():
            return jsonify({'error': 'RSVP already submitted for this event'}), 400

        data = request.get_json() or {}
        new_rsvp = RSVP(
            user_id=current_user_id,
            event_id=event_id,
            ticket_type=data.get('ticket_type', 'General'),
            status='attending'
        )
        db.session.add(new_rsvp)
        db.session.commit()
        return jsonify(rsvp_schema.dump(new_rsvp)), 201

    @app.route('/api/users/me/rsvps', methods=['GET'])
    @jwt_required()
    def get_user_rsvps():
        current_user_id = get_jwt_identity()
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

    return app


app = create_app()

if __name__ == '__main__':
    app.run(port=5555, debug=True)
