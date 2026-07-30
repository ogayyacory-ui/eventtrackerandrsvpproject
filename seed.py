from app import create_app
from extensions import db
from models.user import User
from models.organizer_profile import OrganizerProfile
from models.event import Event
from models.rsvp import RSVP
from models.tag import Tag
from datetime import datetime, timedelta

app = create_app('development')

with app.app_context():
    print("Clearing tables...")
    RSVP.query.delete()
    Event.query.delete()
    db.session.execute(Tag.query.delete())
    OrganizerProfile.query.delete()
    User.query.delete()

    print("Creating Users...")
    admin = User(username="admin_kweli", email="kweli@campus.edu", role="admin")
    admin.set_password("admin123")

    s1 = User(username="mali_c", email="mali@campus.edu", role="student")
    s1.set_password("password123")
    
    s2 = User(username="kipchoge_m", email="kipchoge@campus.edu", role="student")
    s2.set_password("password123")

    db.session.add_all([admin, s1, s2])
    db.session.commit()

    print("Creating Profile & Tags...")
    profile = OrganizerProfile(
        user_id=admin.id,
        organization_name="Campus Activity Board",
        department="Student Life"
    )
    
    t1 = Tag(name="free-food")
    t2 = Tag(name="workshop")
    t3 = Tag(name="sports")
    
    db.session.add_all([profile, t1, t2, t3])
    db.session.commit()

    print("Creating Events...")
    now = datetime.now()
    e1 = Event(
        title="Annual Tech Symposium",
        description="Keynote talks on AI and web development.",
        category="academic",
        location="Hall A",
        capacity=100,
        event_date=now + timedelta(days=5),
        organizer_id=profile.id
    )
    e1.tags.extend([t1, t2])

    e2 = Event(
        title="Campus Basketball Tournament",
        description="3v3 tournament with prizes.",
        category="sports",
        location="Gym 2",
        capacity=50,
        event_date=now + timedelta(days=10),
        organizer_id=profile.id
    )
    e2.tags.append(t3)

    db.session.add_all([e1, e2])
    db.session.commit()

    print("Creating RSVPs...")
    r1 = RSVP(user_id=s1.id, event_id=e1.id, ticket_type="General", status="attending")
    r2 = RSVP(user_id=s2.id, event_id=e2.id, ticket_type="Student", status="attending")

    db.session.add_all([r1, r2])
    db.session.commit()

    print("Database seeded successfully!")