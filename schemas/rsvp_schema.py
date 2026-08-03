from extensions import ma
from models.rsvp import RSVP
from schemas.event_schema import EventSchema

class RSVPSchema(ma.SQLAlchemyAutoSchema):
    event = ma.Nested(EventSchema)

    class Meta:
        model = RSVP
        include_fk = True
        load_instance = True

rsvp_schema = RSVPSchema()
rsvps_schema = RSVPSchema(many=True)