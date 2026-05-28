const Code = require("../models/Code");

// 1. Cargar el Admin Dashboard
// Cuando entres al dashboard, el frontend pedirá todos los códigos existentes.
exports.getAllCodes = async (req, res) => {
  try {
    const codes = await Code.find().sort({ createdAt: -1 }); // Los más recientes primero
    res.status(200).json(codes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los pedidos de la base de datos" });
  }
};

// 2. Generar Código (Botón de WiXLOGO en AdminDashboard)
exports.generateCode = async (req, res) => {
  try {
    const { id } = req.body; // Tu función generarCodigo() crea este 'id'
    const newRecord = new Code({ code: id });
    await newRecord.save();
    res
      .status(201)
      .json({ message: "Pedido vacío creado exitosamente", data: newRecord });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el código generado" });
  }
};

// 3. Validar Código (CodeVerification.jsx)
exports.verifyCode = async (req, res) => {
  try {
    const { code } = req.params;
    const existingCode = await Code.findOne({ code: code });

    if (!existingCode) {
      return res
        .status(404)
        .json({ valid: false, message: "El código ingresado no existe" });
    }
    res.status(200).json({ valid: true, data: existingCode });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al verificar" });
  }
};

// 4. Llenar Formulario (AddressForm.jsx)
exports.updateAddress = async (req, res) => {
  try {
    const { code } = req.params;
    const clientData = req.body;
    // clientData contendrá { calleNumero, colonia, ciudad, etc. }

    const updatedCode = await Code.findOneAndUpdate(
      { code: code },
      { $set: clientData }, // $set actualiza solo los campos enviados sin borrar el resto
      { new: true },
    );

    if (!updatedCode) {
      return res
        .status(404)
        .json({ error: "No se encontró el código para guardar la dirección" });
    }
    res
      .status(200)
      .json({ message: "Datos guardados correctamente", data: updatedCode });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el formulario" });
  }
};

// 5. Marcar como Enviado (Checkbox en AdminDashboard)
exports.toggleEnviado = async (req, res) => {
  try {
    const { code } = req.params;
    const { enviado } = req.body;

    const updatedCode = await Code.findOneAndUpdate(
      { code: code },
      { enviado: enviado },
      { new: true },
    );
    res.status(200).json({ message: "Estado actualizado", data: updatedCode });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado de envío" });
  }
};

// 6. Borrar Pedido (Botón Borrar en AdminDashboard)
exports.deleteCode = async (req, res) => {
  try {
    const { code } = req.params;
    await Code.findOneAndDelete({ code: code });
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};
