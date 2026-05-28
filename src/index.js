require("dotenv").config(); // Carga las variables del archivo .env
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const codeRoutes = require("./routes/codeRoutes.js");

const app = express();

// 1. Conectar a la Base de Datos
connectDB();

// 2. Middlewares
app.use(cors()); // Permite que tu React en Vite haga peticiones aquí
app.use(express.json()); // Permite que el servidor entienda datos en formato JSON

// 3. Definición de Rutas de la API
app.use("/api/codes", codeRoutes);

// Ruta de prueba inicial para saber que el backend responde en el navegador
app.get("/", (req, res) => {
  res.send("Servidor de WiX-O Backend funcionando correctamente.");
});

// 4. Encender el Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=== Servidor corriendo en el puerto ${PORT} ===`);
});
