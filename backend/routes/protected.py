
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

bp = Blueprint('protected', __name__)

@bp.route('/', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"msg": "You have access to protected route"})
