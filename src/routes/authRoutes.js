const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// La única ruta que existirá públicamente
router.post("/login", authController.login);

module.exports = router;
