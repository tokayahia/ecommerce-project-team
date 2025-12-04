
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Cart, Product
from . import db

cart_bp = Blueprint("cart", __name__)

# Get cart items
@cart_bp.route("/", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    result = [{"product_id": c.product_id, "quantity": c.quantity} for c in cart_items]
    return jsonify(result)

# Add to cart
@cart_bp.route("/", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    cart_item = Cart(user_id=user_id, product_id=data["product_id"], quantity=data["quantity"])
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Item added to cart"})
