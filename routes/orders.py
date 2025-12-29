
from flask import Blueprint, request, jsonify
from models import Order, CartItem
from extensions import db
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])

@orders_bp.route('/', methods=['POST'])
def create_order():
    user_id = request.json['user_id']
    cart_items = CartItem.query.filter_by(user_id=user_id, order_id=None).all()
    if not cart_items:
        return jsonify({"message": "Cart empty"}), 400
    order = Order(user_id=user_id, date=datetime.utcnow())
    db.session.add(order)
    db.session.commit()
    for item in cart_items:
        item.order_id = order.id
    db.session.commit()
    return jsonify(order.to_dict()), 201
