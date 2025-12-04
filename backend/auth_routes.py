
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# قاعدة بيانات مؤقتة لتجربة Postman
users = []

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    for user in users:
        if user['username'] == username:
            return jsonify({"message": "User already exists"}), 400

    users.append({"username": username, "password": password})
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({"access_token": "dummy-jwt-token"}), 200

    return jsonify({"message": "Invalid credentials"}), 401
