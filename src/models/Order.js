const mongoose = require("mongoose");

// Sub-esquema para los productos dentro de una orden
const productSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  isFabricated: { type: Boolean, default: false },
});

// Esquema principal de la orden
const orderSchema = new mongoose.Schema(
  {
    client: { type: String, default: "" },
    adelanto: { type: Number, default: 0 },
    isEnviado: { type: Boolean, default: false },
    isRecibido: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }, // Para la lógica de borrar a los 30 días
    productos: [productSchema], // Array de productos
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
  },
);

module.exports = mongoose.model("Order", orderSchema);
