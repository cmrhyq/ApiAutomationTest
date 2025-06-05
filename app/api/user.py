from flask import Blueprint, jsonify, request
from models.entity.user import User
from core.db import db

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/users')

@user_bp.route('/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email, 'created_at': user.created_at} for user in users])

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201