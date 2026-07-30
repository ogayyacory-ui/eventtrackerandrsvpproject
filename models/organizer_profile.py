# models/organizer_profile.py
from extensions import db

class OrganizerProfile(db.Model):
    __tablename__ = 'organizer_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    organization_name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    is_verified = db.Column(db.Boolean, default=True)

    user = db.relationship('User', back_populates='organizer_profile')
    events = db.relationship('Event', back_populates='organizer', cascade='all, delete-orphan')