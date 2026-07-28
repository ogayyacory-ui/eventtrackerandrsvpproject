from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


# Instantiate the extensions without passing 'app'
db = SQLAlchemy()
migrate = Migrate()