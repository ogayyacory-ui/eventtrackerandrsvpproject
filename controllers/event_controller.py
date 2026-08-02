# controllers/event_controller.py
from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from extensions import db
from models.event import Event
from models.user import User
from models.tag import Tag
from schemas.event_schema import event_schema, events_schema
from controllers.auth_controller import admin_required

class EventListResource(Resource):
    def get(self):
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

        return {
            'total': paginated.total,
            'page': paginated.page,
            'per_page': paginated.per_page,
            'total_pages': paginated.pages,
            'items': events_schema.dump(paginated.items)
        }, 200

    @organizer_or_admin_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        data = request.get_json(silent=True) or {}

        # ensure organizer profile exists; create one from provided data if missing
        if not user.organizer_profile:
            profile = OrganizerProfile(
                user_id=user.id,
                organization_name=data.get('organization_name', 'Organization'),
                department=data.get('department', 'General')
            )
            db.session.add(profile)
            db.session.commit()
        event = Event(
            title=data['title'],
            description=data['description'],
            category=data['category'],
            location=data['location'],
            capacity=data['capacity'],
            event_date=datetime.fromisoformat(data['event_date']),
            organizer_id=user.organizer_profile.id
        )

        # Attach existing tags if provided
        if 'tag_ids' in data:
            tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()
            event.tags.extend(tags)

        db.session.add(event)
        db.session.commit()
        return event_schema.dump(event), 201

class EventDetailResource(Resource):
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        return event_schema.dump(event), 200

    @admin_required()
    def patch(self, event_id):
        event = Event.query.get_or_404(event_id)
        data = request.get_json() or {}

        for key, val in data.items():
            if key == 'event_date':
                setattr(event, key, datetime.fromisoformat(val))
            elif hasattr(event, key) and key != 'tag_ids':
                setattr(event, key, val)

        if 'tag_ids' in data:
            event.tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()

        db.session.commit()
        return event_schema.dump(event), 200

    @admin_required()
    def delete(self, event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return {'message': 'Event successfully deleted'}, 200