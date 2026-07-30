from flask import Flask
from extensions import SQLAlchemy
from extensions import db, Migrate
from models import User, Event, RSVP, OrganizerProfile 

app = Flask(__name__)

# --- ADD THIS LINE BEFORE db = SQLAlchemy(app) ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app
import models

db = SQLAlchemy(app)
migrate = Migrate(app, db)