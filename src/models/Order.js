const mongoose = require("mongoose");

// Sub-esquema para los productos dentro de una orden
const productSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  isFabricated: { type: Boolean, default: false },
  adelanto: { type: Number, default: 0 },
  isEnviado: { type: Boolean, default: false },
  isRecibido: { type: Boolean, default: false },
});

// Esquema principal de la orden
const orderSchema = new mongoose.Schema(
  {
    client: { type: String, default: "" },
    deuda: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
    productos: [productSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
