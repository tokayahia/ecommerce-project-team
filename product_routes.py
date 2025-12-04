
from flask import Blueprint, jsonify, request
from .models import Product
from . import db

product_bp = Blueprint("products", __name__)

# Get all products
@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    result = [{"id": p.id, "name": p.name, "price": p.price} for p in products]
    return jsonify(result)

# Add product
@product_bp.route("/", methods=["POST"])
def add_product():
    data = request.get_json()
    product = Product(name=data["name"], price=data["price"])
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"})

# Update product
@product_bp.route("/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    data = request.get_json()
    product.name = data.get("name", product.name)
    product.price = data.get("price", product.price)
    db.session.commit()
    return jsonify({"message": "Product updated successfully"})

# Delete product
@product_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"})
