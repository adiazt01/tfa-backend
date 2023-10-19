import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/* 
El controlador de "register" maneja el registro de usuarios,
este espera el email, username y password, los dos primeros 
valores deben de ser unicos
*/
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  // Manejador de errores
  const handleError = (res) => {
    return res
      .status(408)
      .json({ error: ["Error inesperado, intentelo de nuevo"] });
  };

  try {
    // Verificando que el email es unico
    const foundUserEmail = await User.findOne({ email });
    if (foundUserEmail)
      return res.status(409).json({ error: ["Email has already using"] });

    // Verificando que el usuario es unico
    const foundUserUsername = await User.findOne({ username });
    if (foundUserUsername)
      return res.status(409).json({ error: ["Username has already using"] });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });

    await newUser.save();

    res.json({
      email: newUser.email,
      username: newUser.username,
      project: newUser.project,
      token,
    });
  } catch (error) {
    handleError(res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Manejador de errores
  const handleError = (res) => {
    return res
      .status(408)
      .json({ error: ["Error inesperado, intentelo de nuevo"] });
  };

  try {
    // Se busca el usuario
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(409).json({ error: ["Email or password incorrect"] });

    // Se compara las contraseñas
    const isMatch = await bcryptjs.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(409).json({ error: ["Email or password incorrect"] });

    // Se crea el token de autorizacion
    const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Se envia al cliente
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });

    res.json({
      email: foundUser.email,
      username: foundUser.username,
      project: foundUser.project,
      token,
    });
  } catch (error) {
    handleError(res);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    sameSite: "none",
    secure: true,
    httpOnly: false,
  });

  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: ["Unauthorized"] });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ error: ["Unauthorized"] });
    const foundUser = await User.findById(user._id);
    if (!foundUser) return res.status(401).json({ error: ["Unauthorized"] });

    return res.json({
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    });
  });
};
