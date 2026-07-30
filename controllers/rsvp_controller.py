from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.rsvp import RSVP
from models.event import Event
from schemas.rsvp_schema import rsvp_schema, rsvps_schema

class RSVPResource(Resource):
    @jwt_required()
    def post(self, event_id):
        user_id = get_jwt_identity()
        Event.query.get_or_404(event_id)

        if RSVP.query.filter_by(user_id=user_id, event_id=event_id).first():
            return {'error': 'RSVP already submitted for this event'}, 400

        data = request.get_json() or {}
        rsvp = RSVP(
            user_id=user_id,
            event_id=event_id,
            ticket_type=data.get('ticket_type', 'General'),
            status='attending'
        )
        db.session.add(rsvp)
        db.session.commit()
        return rsvp_schema.dump(rsvp), 201

class UserRSVPListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        rsvps = RSVP.query.filter_by(user_id=user_id).all()
        return rsvps_schema.dump(rsvps), 200