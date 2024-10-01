const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(400).json({ error: "user already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({ username, password: hashedPassword });
    return res
      .status(200)
      .json({ message: `user ${userDoc.username} created you can login now` });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(401).json({ error: `user ${username} not found` });
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: `wrong password` });
    }
    jwt.sign({ userID: findUser._id, username }, "haedr", {}, (err, token) => {
      if (err) throw err;

      return res.cookie("token", token,{ sameSite: "none", secure: true }).status(200).json({ id: findUser._id });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const profile = async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, "haedr", {}, (err, userData) => {
      if (err) throw err;
      return res.status(200).json(userData);
    });
  } else {
    return res.status(400).json({ error: "no token" });
  }
};

const logout = async (req, res) => {
  return res.cookie("token", "",{ sameSite: "none", secure: true }).status(200).json("ok");
};

module.exports = { Register, Login, profile, logout };
