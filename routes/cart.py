
from flask import Blueprint, request, jsonify
from models import CartItem, Product
from extensions import db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/', methods=['GET'])
def view_cart():
    user_id = request.args.get('user_id')
    items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in items])

@cart_bp.route('/', methods=['POST'])
def add_to_cart():
    data = request.json
    item = CartItem(user_id=data['user_id'], product_id=data['product_id'], quantity=data.get('quantity',1))
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201
