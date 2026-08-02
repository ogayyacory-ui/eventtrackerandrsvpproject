# models/event.py
from extensions import db
from models.tag import event_tags

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    event_date = db.Column(db.DateTime, nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizer_profiles.id'), nullable=False)

    organizer = db.relationship('OrganizerProfile', back_populates='events')
    rsvps = db.relationship('RSVP', back_populates='event', cascade='all, delete-orphan')
    tags = db.relationship('Tag', secondary=event_tags, back_populates='events')