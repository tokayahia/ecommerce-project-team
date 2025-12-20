
from extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    cart_items = db.relationship('CartItem', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)

    def to_dict(self):
        return {"id": self.id, "username": self.username}

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=True)
    image = db.Column(db.String(300), nullable=True)
    cart_items = db.relationship('CartItem', backref='product', lazy=True)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "price": self.price,
                "category": self.category, "image": self.image}

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=True)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "product_id": self.product_id, "quantity": self.quantity}

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    items = db.relationship('CartItem', backref='order', lazy=True)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "date": self.date.isoformat(),
                "items": [item.to_dict() for item in self.items]}
