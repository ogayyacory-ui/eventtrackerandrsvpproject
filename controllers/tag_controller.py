# controllers/tag_controller.py
from flask import request
from flask_restful import Resource
from extensions import db
from models.tag import Tag
from schemas.tag_schema import tags_schema, tag_schema

class TagListResource(Resource):
    def get(self):
        tags = Tag.query.order_by(Tag.name.asc()).all()
        return tags_schema.dump(tags), 200

    def post(self):
        data = request.get_json() or {}
        name = data.get('name', '').strip().lower()

        if not name:
            return {'error': 'Tag name is required'}, 400
        if Tag.query.filter_by(name=name).first():
            return {'error': 'Tag already exists'}, 400

        tag = Tag(name=name)
        db.session.add(tag)
        db.session.commit()
        return tag_schema.dump(tag), 201