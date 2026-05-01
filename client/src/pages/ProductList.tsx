import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    useEffect(() => { axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data)); }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {products.map(p => (
                <div key={p.id} className="border p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold">{p.name}</h2>
                    <p className="text-gray-600">₦{p.price}</p>
                    <button onClick={() => addToCart(p)} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
