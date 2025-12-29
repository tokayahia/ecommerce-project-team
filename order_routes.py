
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Cart, Order
from . import db

order_bp = Blueprint("orders", __name__)

# Get all orders
@order_bp.route("/", methods=["GET"])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    result = [{"product_id": o.product_id, "quantity": o.quantity} for o in orders]
    return jsonify(result)

# Place order
@order_bp.route("/", methods=["POST"])
@jwt_required()
def place_order():
    user_id = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    for item in cart_items:
        order = Order(user_id=user_id, product_id=item.product_id, quantity=item.quantity)
        db.session.add(order)
        db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Order placed successfully"})
