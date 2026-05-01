import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
    return (
        <CartProvider>
            <Router>
                <nav className="p-4 bg-gray-100 flex gap-4">
                    <Link to="/" className="font-bold">ShopNaija</Link>
                    <Link to="/checkout">Cart</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/admin">Admin</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}