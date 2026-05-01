require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// --- Controllers ---
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(401).json({ error: 'User not found' });
    
    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
    res.json({ token });
};

const getProducts = async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
};

// --- Routes ---
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch { res.status(403).json({ error: 'Invalid token' }); }
};

// Products API
app.get('/api/products', getProducts);
app.get('/api/products/:id', async (req, res) => {
    const p = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    res.json(p.rows[0]);
});

// Admin API
app.post('/api/products', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const { name, description, price, image_url, category_id } = req.body;
    await pool.query('INSERT INTO products (name, description, price, image_url, category_id) VALUES ($1, $2, $3, $4, $5)', [name, description, price, image_url, category_id]);
    res.status(201).json({ message: 'Product created' });
});

// Orders API
app.post('/api/orders', auth, async (req, res) => {
    const { total_price, items } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const o = await client.query('INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id', [req.user.id, total_price]);
        for (const item of items) {
            await client.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [o.rows[0].id, item.id, item.quantity, item.price]);
        }
        await client.query('COMMIT');
        res.status(201).json({ orderId: o.rows[0].id });
    } catch (e) { await client.query('ROLLBACK'); res.status(500).json({ error: e.message }); }
    finally { client.release(); }
});
