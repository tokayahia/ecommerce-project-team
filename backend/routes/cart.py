
from flask import Blueprint, request, jsonify
from models import CartItem, db
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('cart', __name__)

@bp.route('/', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in items])

@bp.route('/', methods=['POST'])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    user_id = get_jwt_identity()
    item = CartItem(user_id=user_id, product_id=data['product_id'], quantity=data['quantity'])
    db.session.add(item)
    db.session.commit()
    return jsonify({"msg": "Added to cart"}), 201
