# models/rsvp.py
from extensions import db
from datetime import datetime

class RSVP(db.Model):
    __tablename__ = 'rsvps'
    __table_args__ = (
        db.UniqueConstraint('user_id', 'event_id', name='uq_rsvp_user_event'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    
    # Extra Association Attributes
    ticket_type = db.Column(db.String(30), default='General')
    status = db.Column(db.String(20), default='attending')
    checked_in = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='rsvps')
    event = db.relationship('Event', back_populates='rsvps')
