const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Aquí 'user' recibe el texto "wixo3d" desde el frontend
  const { user, password } = req.body;

  try {
    const usuarioEncontrado = await User.findOne({ username: user?.trim() });

    if (!usuarioEncontrado) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(
      password?.trim(),
      usuarioEncontrado.password,
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

    const unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;
    const expiryTime = new Date().getTime() + unaSemanaEnMilisegundos;

    const tokenDinamico = jwt.sign(
      { id: usuarioEncontrado._id, username: usuarioEncontrado.username },
      process.env.JWT_SECRET, // Una clave ultra secreta que solo tu backend conoce
      { expiresIn: "7d" }, // Define que expira en 7 días de forma nativa
    );

    return res.json({
      success: true,
      token: tokenDinamico, // <-- El token ahora sería una cadena gigante y única de caracteres encriptados
      expiry: expiryTime,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  login,
};
