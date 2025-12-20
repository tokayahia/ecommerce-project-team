
import requests
from app import app
from extensions import db
from models import Product

FAKESTORE_API = "https://fakestoreapi.com/products"


FALLBACK_PRODUCTS = [
    {
        "title": "Fjallraven - Foldsack No. 1 Backpack",
        "price": 109.95,
        "description": "Your perfect pack for everyday use.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
    },
    {
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"
    },
    {
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "Great outerwear jackets for Spring/Autumn/Winter.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"
    },
    {
        "title": "John Hardy Women's Legends Naga Bracelet",
        "price": 695,
        "description": "Inspired by the mythical water dragon.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png"
    },
    {
        "title": "WD 2TB Elements Portable External Hard Drive",
        "price": 64,
        "description": "USB 3.0 and USB 2.0 Compatibility.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png"
    }
]

def seed_products():
    with app.app_context():

   
        if Product.query.first():
            print("Products already exist. Skipping seeding.")
            return

        try:
            print("Fetching products from FakeStore API...")
            response = requests.get(FAKESTORE_API, timeout=10)
            response.raise_for_status()
            products = response.json()
        except Exception as e:
            print("API failed, using fallback data")
            products = FALLBACK_PRODUCTS

        for p in products:
            product = Product(
                title=p["title"],
                price=p["price"],
                description=p["description"],
                category=p["category"],
                image=p["image"]
            )
            db.session.add(product)

        db.session.commit()
        print("Products seeded successfully!")

if __name__ == "__main__":
    seed_products()
