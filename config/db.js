const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8m7u8v0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Conectado ao MongoDB 📊");
    } catch (err) {
        console.error("Erro ao conectar com o banco:", err);
    }
}

module.exports = connectDB;