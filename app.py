from flask import Flask
from extensions import SQLAlchemy
from extensions import Migrate

app = Flask(__name__)

# --- ADD THIS LINE BEFORE db = SQLAlchemy(app) ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)