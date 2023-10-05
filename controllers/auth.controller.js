import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res.status(409).json({ error: ["Email has already using"] });

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

  await newUser.save();

  res.cookie("token", token, {
    sameSite: "none",
    secure: true,
    httpOnly: false,
  });

  res.json({
    email: newUser.email,
    username: newUser.username,
    project: newUser.project,
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  /* Falta try catch */
  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return res.status(409).json({ error: ["Email or password incorrect"] });

  const isMatch = await bcryptjs.compare(password, foundUser.password);

  if (!isMatch)
    return res.status(409).json({ error: ["Email or password incorrect"] });

  const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

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
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401).json({ error: ["Unauthorized"] });

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
