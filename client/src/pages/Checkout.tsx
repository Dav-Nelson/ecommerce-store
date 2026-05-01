import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';

export default function Checkout() {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
        try {
            await axios.post('http://localhost:5000/api/orders', {
                total_price: total,
                items: cart.map(i => ({ id: i.id, quantity: i.quantity, price: i.price }))
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            alert('Order placed successfully!');
        } catch (e) { alert('Checkout failed'); }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <button onClick={handleCheckout} disabled={loading} className="bg-green-600 text-white px-6 py-3 rounded">
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </div>
    );
}
