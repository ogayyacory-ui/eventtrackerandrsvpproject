from flask_restful import Resource
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from extensions import db
from models.event import Event
from models.rsvp import RSVP
from models.organizer_profile import OrganizerProfile
from models.user import User
from controllers.auth_controller import admin_required

class AnalyticsResource(Resource):
    @admin_required()
    def get(self):
        # 1. Aggregation + Group By + Having
        dept_stats = db.session.query(
            OrganizerProfile.department,
            func.count(RSVP.id).label('total_rsvps'),
            func.count(func.distinct(Event.id)).label('total_events')
        ).join(Event, OrganizerProfile.id == Event.organizer_id)\
         .join(RSVP, Event.id == RSVP.event_id)\
         .group_by(OrganizerProfile.department)\
         .having(func.count(RSVP.id) > 0)\
         .all()

        # 2. Relationship filter with .any()
        active_events = Event.query.join(OrganizerProfile)\
            .filter(OrganizerProfile.is_verified == True)\
            .filter(Event.rsvps.any(RSVP.status == 'attending'))\
            .all()

        # 3. Eager Loading (selectinload) to prevent N+1 queries
        engaged_users = User.query.options(selectinload(User.rsvps))\
            .join(RSVP)\
            .group_by(User.id)\
            .having(func.count(RSVP.id) >= 1)\
            .all()

        return {
            'department_engagement': [
                {'department': d, 'total_rsvps': r, 'total_events': e} 
                for d, r, e in dept_stats
            ],
            'active_verified_events': len(active_events),
            'engaged_users_count': len(engaged_users)
        }, 200