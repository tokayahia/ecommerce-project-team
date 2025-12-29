
from flask import Blueprint, jsonify
from models import Product
from extensions import db
import requests

product_bp = Blueprint('product', __name__)

API_URL = "https://fakestoreapi.com/products"

@product_bp.route('/', methods=['GET'])
def get_products():
    try:
        response = requests.get(API_URL, timeout=3)
        response.raise_for_status()
        products = response.json()
        return jsonify(products)
    except:
        # fallback to local db
        products = Product.query.all()
        return jsonify([p.to_dict() for p in products])
