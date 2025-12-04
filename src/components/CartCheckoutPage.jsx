// src/components/CartCheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CartCheckoutPage = ({ onNavigate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await api.getCart(); // Fetches real cart from backend
        setCartItems(data); // data is array of {id, name, price, imageUrl, quantity}
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load cart. Please log in.');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.placeOrder(); // Calls backend to place order
      alert('Order placed successfully!');
      setCartItems([]); // Clear frontend cart
      onNavigate('home');
    } catch (err) {
      alert('Failed to place order: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-12">Loading cart...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (cartItems.length === 0) return <div className="text-center py-12">Your cart is empty</div>;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-6">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="ml-6 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-accent text-white py-3 rounded font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutPage;