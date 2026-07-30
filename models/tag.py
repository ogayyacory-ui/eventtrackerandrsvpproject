# models/tag.py
from extensions import db

# Association Table for M:N (Event <-> Tag)
event_tags = db.Table(
    'event_tags',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    events = db.relationship('Event', secondary=event_tags, back_populates='tags')