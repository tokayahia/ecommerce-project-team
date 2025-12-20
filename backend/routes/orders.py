
from flask import Blueprint, jsonify
from models import Order, CartItem, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

bp = Blueprint('orders', __name__)

@bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.to_dict() for order in orders])

@bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    order = Order(user_id=user_id, date=datetime.utcnow())
    db.session.add(order)
    db.session.commit()
    for item in cart_items:
        item.order_id = order.id
        db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Order created"}), 201
