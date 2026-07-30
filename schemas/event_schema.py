from extensions import ma
from models.event import Event
from schemas.tag_schema import TagSchema

class EventSchema(ma.SQLAlchemyAutoSchema):
    tags = ma.Nested(TagSchema, many=True)

    class Meta:
        model = Event
        include_fk = True

event_schema = EventSchema()
events_schema = EventSchema(many=True)