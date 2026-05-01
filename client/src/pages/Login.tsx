import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Logged in!');
        } catch (e) { alert('Login failed'); }
    };

    return (
        <form onSubmit={handleLogin} className="p-6">
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 block mb-2" />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 block mb-2" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
        </form>
    );
}
