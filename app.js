require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const semesterRoutes = require('./routes/semesterRoutes');

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/semester', semesterRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

module.exports = app;