const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  // Aquí 'user' recibe el texto "wixo3d" desde el frontend
  const { user, password } = req.body;

  try {
    // CAMBIO AQUÍ: Usamos un nombre diferente (usuarioEncontrado) para no hacer cortocircuito
    const usuarioEncontrado = await User.findOne({ username: user?.trim() });

    if (!usuarioEncontrado) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

    // CAMBIO AQUÍ: Comparamos contra la contraseña de 'usuarioEncontrado'
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

    return res.json({
      success: true,
      token: "wixo-secure-admin-session-token",
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
