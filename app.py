from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


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


@app.route('/')
def home():
    return {"message": "Backend is running successfully!"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  
    print("✅ Backend server is running on http://127.0.0.1:5000")
    app.run(debug=True)
