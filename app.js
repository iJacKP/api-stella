require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

const allowedOrigins = [
  'https://app-stella.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/subject', subjectRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

module.exports = app;