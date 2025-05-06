require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', courseRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

module.exports = app;