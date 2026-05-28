const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },

  // Datos del cliente que vienen de AddressForm
  calleNumero: { type: String, default: "" },
  numeroInterior: { type: String, default: "" },
  codigoPostal: { type: String, default: "" },
  colonia: { type: String, default: "" },
  ciudad: { type: String, default: "" },
  estado: { type: String, default: "" },
  referencia: { type: String, default: "" },
  nombreCompleto: { type: String, default: "" },
  telefono: { type: String, default: "" },
  correo: { type: String, default: "" },

  // Control de envío que usas en el AdminDashboard
  enviado: { type: Boolean, default: false },

  // Fecha de creación automática
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Code", codeSchema);
