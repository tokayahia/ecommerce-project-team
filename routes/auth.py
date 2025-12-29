
from flask import Blueprint, request, jsonify
from models import User
from extensions import db
import hashlib, jwt, datetime

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = "secret123"

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "User exists"}), 400
    hashed_pw = hashlib.sha256(data['password'].encode()).hexdigest()
    user = User(username=data['username'], password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    hashed_pw = hashlib.sha256(data['password'].encode()).hexdigest()
    if hashed_pw != user.password:
        return jsonify({"message": "Wrong password"}), 401
    token = jwt.encode({"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)}, SECRET_KEY, algorithm="HS256")
    return jsonify({"token": token})
