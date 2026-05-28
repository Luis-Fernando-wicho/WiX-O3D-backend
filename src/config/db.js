const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Proceso de conexión usando la variable de entorno
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`=== MongoDB Conectado: ${conn.connection.host} ===`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    // Detiene la aplicación si no se puede conectar a la base de datos
    process.exit(1);
  }
};

module.exports = connectDB;
