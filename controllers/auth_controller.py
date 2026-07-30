from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps
from extensions import db
from models.user import User
from models.organizer_profile import OrganizerProfile

# Role-Based Authorization Guard
def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            if not user or user.role != 'admin':
                return {'error': 'Forbidden: Admin privilege required'}, 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

class RegisterResource(Resource):
    def post(self):
        data = request.get_json() or {}
        if User.query.filter((User.email == data.get('email')) | (User.username == data.get('username'))).first():
            return {'error': 'User with this email or username already exists'}, 400

        user = User(
            username=data['username'],
            email=data['email'],
            role=data.get('role', 'student')
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        if user.role == 'admin':
            profile = OrganizerProfile(
                user_id=user.id,
                organization_name=data.get('organization_name', 'Student Union'),
                department=data.get('department', 'General')
            )
            db.session.add(profile)
            db.session.commit()

        return {'message': 'User created successfully'}, 201

class LoginResource(Resource):
    def post(self):
        data = request.get_json() or {}
        user = User.query.filter_by(email=data.get('email')).first()

        if user and user.check_password(data.get('password', '')):
            token = create_access_token(identity=user.id)
            return {
                'access_token': token,
                'user': {'id': user.id, 'username': user.username, 'role': user.role}
            }, 200

        return {'error': 'Invalid credentials'}, 401