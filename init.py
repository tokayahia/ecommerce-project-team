
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

from .auth_routes import auth_bp
from ..product_routes import product_bp
from .cart_routes import cart_bp
from ..order_routes import order_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # CONFIG
    app.config['SECRET_KEY'] = 'your_secret_key_here'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key_here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    CORS(app)
    JWTManager(app)

    # REGISTER BLUEPRINTS
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(product_bp, url_prefix="/products")
    app.register_blueprint(cart_bp, url_prefix="/cart")
    app.register_blueprint(order_bp, url_prefix="/orders")

    @app.route("/")
    def home():
        return jsonify({"message": "Backend is working!"})
    
    # CREATE DB
    with app.app_context():
        db.create_all()

    return app
