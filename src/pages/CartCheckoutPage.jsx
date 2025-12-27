import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import { ROUTES } from '../constants/routes';

const CartCheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, refreshCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleQuantityChange = async (id, productId, delta) => {
        try {
            await api.addToCart({ product_id: productId, quantity: delta });
            await refreshCart();
        } catch (err) {
            alert('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await removeFromCart(id);
        } catch (err) {
            alert('Failed to remove item');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.placeOrder();
            alert('Order Placed Successfully!');
            navigate(ROUTES.HOME);
        } catch (err) {
            alert(err.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.95;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                    <Link
                        to={ROUTES.SHOP}
                        className="text-accent font-semibold hover:underline"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Cart Items */}
                    <div className="w-full lg:w-[60%] space-y-8">
                        <div className="bg-white rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                Your Items ({cart.length})
                            </h2>

                            <div className="space-y-8">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 py-4 border-b border-gray-50 last:border-0">
                                        {/* Image */}
                                        <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-base font-semibold text-gray-900">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.size && `Size: ${item.size} | `}
                                                    {item.color && `Color: ${item.color}`}
                                                </p>
                                                <p className="text-sm text-gray-500">${(item.price || 0).toFixed(2)} each</p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.product_id, -1)}
                                                        disabled={item.quantity <= 1}
                                                        className="p-1 px-3 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2 text-sm font-medium text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.product_id, 1)}
                                                        className="p-1 px-3 text-gray-600 hover:text-gray-900 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Forms & Summary */}
                    <div className="w-full lg:w-[40%]">
                        <div className="bg-gray-50 rounded-lg p-6 lg:p-8 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Checkout</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Shipping Form */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Shipping Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="col-span-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="col-span-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="col-span-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            name="zip"
                                            placeholder="ZIP Code"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            required
                                            className="col-span-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Payment Form */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Payment</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Card Number"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="expiry"
                                                placeholder="MM/YY"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                            />
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="CVV"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Totals */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Estimated Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200 mt-4">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-accent hover:bg-opacity-90 text-white py-4 rounded-md font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'PROCESSING...' : 'PAY & PLACE ORDER'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartCheckoutPage;
