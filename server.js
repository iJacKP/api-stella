const app = require('./app');
const connectDB = require('./config/db');

connectDB().then(() => {
    app.listen(8080, () => {
        console.log("Servidor rodando na porta 8080 🚀");
    });
});