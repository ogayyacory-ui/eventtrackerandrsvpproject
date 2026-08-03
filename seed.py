from datetime import datetime, timedelta

from app import create_app
from extensions import db
from models.user import User
from models.organizer_profile import OrganizerProfile
from models.event import Event
from models.rsvp import RSVP
from models.tag import Tag

app = create_app()

with app.app_context():
    if User.query.first():
        print("Database already contains data; skipping seed.")
        raise SystemExit(0)

    # =====================================================
    # USERS
    # =====================================================
    print("Creating users...")

    admin = User(
        username="admin_kweli",
        email="kweli@campus.edu",
        role="admin"
    )
    admin.set_password("admin123")

    organizer = User(
        username="campus_events",
        email="organizer@campus.edu",
        role="organizer"
    )
    organizer.set_password("password123")

    student1 = User(
        username="mali_c",
        email="mali@campus.edu",
        role="student"
    )
    student1.set_password("password123")

    student2 = User(
        username="kipchoge_m",
        email="kipchoge@campus.edu",
        role="student"
    )
    student2.set_password("password123")

    db.session.add_all([admin, organizer, student1, student2])
    db.session.commit()

    # =====================================================
    # ORGANIZER PROFILES
    # =====================================================
    print("Creating organizer profiles...")

    admin_profile = OrganizerProfile(
        user_id=admin.id,
        organization_name="Campus Activity Board",
        department="Student Life"
    )

    organizer_profile = OrganizerProfile(
        user_id=organizer.id,
        organization_name="Innovation Hub",
        department="Technology"
    )

    db.session.add_all([admin_profile, organizer_profile])
    db.session.commit()

    # =====================================================
    # TAGS
    # =====================================================
    print("Creating tags...")

    tag_hackathon = Tag(name="hackathon")
    tag_workshop = Tag(name="workshop")
    tag_sports = Tag(name="sports")
    tag_hiking = Tag(name="outdoors")
    tag_free_food = Tag(name="free-food")

    db.session.add_all([
        tag_hackathon,
        tag_workshop,
        tag_sports,
        tag_hiking,
        tag_free_food
    ])
    db.session.commit()

    # =====================================================
    # EVENTS
    # =====================================================
    print("Creating events...")

    now = datetime.now()

    hackathon = Event(
        title="Annual Campus Hackathon",
        description="Build innovative solutions with fellow students in a 24-hour coding competition. Prizes, mentorship, networking and free meals included.",
        category="academic",
        location="Innovation Hub",
        capacity=150,
        image="https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
        event_date=now + timedelta(days=7),
        organizer_id=organizer_profile.id
    )

    hackathon.tags.extend([
        tag_hackathon,
        tag_workshop,
        tag_free_food
    ])

    basketball = Event(
        title="Campus Basketball Tournament",
        description="Join our exciting 3v3 basketball tournament. Teams compete for trophies and exciting prizes.",
        category="sports",
        location="University Sports Complex",
        capacity=80,
        image="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=890&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        event_date=now + timedelta(days=12),
        organizer_id=admin_profile.id
    )

    basketball.tags.append(tag_sports)

    hiking = Event(
        title="Weekend Hiking Adventure",
        description="Explore scenic trails, enjoy nature and meet fellow students during our weekend hiking adventure.",
        category="outdoor",
        location="Ngong Hills",
        capacity=40,
        image="https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        event_date=now + timedelta(days=18),
        organizer_id=admin_profile.id
    )

    hiking.tags.append(tag_hiking)

    db.session.add_all([
        hackathon,
        basketball,
        hiking
    ])
    db.session.commit()

    # =====================================================
    # RSVPS
    # =====================================================
    print("Creating RSVPs...")

    rsvp1 = RSVP(
        user_id=student1.id,
        event_id=hackathon.id,
        ticket_type="General",
        status="attending"
    )

    rsvp2 = RSVP(
        user_id=student2.id,
        event_id=basketball.id,
        ticket_type="Student",
        status="attending"
    )

    rsvp3 = RSVP(
        user_id=student1.id,
        event_id=hiking.id,
        ticket_type="General",
        status="attending"
    )

    db.session.add_all([
        rsvp1,
        rsvp2,
        rsvp3
    ])

    db.session.commit()

    print("Database seeded successfully!")
