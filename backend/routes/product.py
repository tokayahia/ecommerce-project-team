
from flask import Blueprint, jsonify, request
from models import Product
from extensions import db
import requests

bp = Blueprint("product", __name__)
EXTERNAL_API = "https://fakestoreapi.com/products"

@bp.route("/", methods=["GET"])
def get_products():
    try:
        res = requests.get(EXTERNAL_API, timeout=30)
        res.raise_for_status()
        return jsonify(res.json())
    except:
        products = Product.query.all()
        return jsonify([
            {"id": p.id, "name": p.name, "price": p.price, "image": p.image}
            for p in products
        ])

@bp.route("/", methods=["POST"])
def add_product():
    data = request.get_json()
    product = Product(
        name=data["name"],
        price=data["price"],
        image=data["image"]
    )
    db.session.add(product)
    db.session.commit()
    return {"message": "Product added"}, 201
