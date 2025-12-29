<<<<<<< HEAD

from flask import Flask
from flask_cors import CORS
from extensions import db

app = Flask(__name__)
# Configure CORS to allow requests from the frontend
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


from routes.auth import auth_bp
from routes.product import product_bp
from routes.cart import cart_bp
from routes.orders import orders_bp
from routes.protected import protected_bp


app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(product_bp, url_prefix='/products')
app.register_blueprint(cart_bp, url_prefix='/cart')
app.register_blueprint(orders_bp, url_prefix='/orders')
app.register_blueprint(protected_bp, url_prefix='/protected')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
=======

from flask import Flask
from extensions import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


from routes.auth import auth_bp
from routes.product import product_bp
from routes.cart import cart_bp
from routes.orders import orders_bp
from routes.protected import protected_bp


app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(product_bp, url_prefix='/products')
app.register_blueprint(cart_bp, url_prefix='/cart')
app.register_blueprint(orders_bp, url_prefix='/orders')
app.register_blueprint(protected_bp, url_prefix='/protected')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
>>>>>>> 2f15eb44db26618c5e17efd5f2e473413567ea12
