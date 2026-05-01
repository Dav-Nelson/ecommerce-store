import React, { useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [product, setProduct] = useState({ name: '', description: '', price: '', image_url: '', category_id: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', product, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Product added!');
        } catch (e) { alert('Failed to add product'); }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <input placeholder="Name" onChange={e => setProduct({...product, name: e.target.value})} className="border p-2 w-full mb-2" />
            <input placeholder="Price" onChange={e => setProduct({...product, price: e.target.value})} className="border p-2 w-full mb-2" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2">Add Product</button>
        </form>
    );
}
