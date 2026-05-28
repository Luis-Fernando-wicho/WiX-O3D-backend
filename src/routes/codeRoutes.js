const express = require("express");
const router = express.Router();
const codeController = require("../controllers/codeController");

// Ruta para el AdminDashboard: Obtener todos los pedidos
router.get("/", codeController.getAllCodes);

// Ruta para el AdminDashboard: Crear un código vacío
router.post("/generate", codeController.generateCode);

// Ruta para CodeVerification: Validar si un código existe
router.get("/verify/:code", codeController.verifyCode);

// Ruta para AddressForm: Actualizar los datos de dirección de un código
router.put("/address/:code", codeController.updateAddress);

// Ruta para el AdminDashboard: Actualizar estado de envío (Checkbox)
router.patch("/enviado/:code", codeController.toggleEnviado);

// Ruta para el AdminDashboard: Borrar un pedido
delete router.delete("/:code", codeController.deleteCode);

module.exports = router;
