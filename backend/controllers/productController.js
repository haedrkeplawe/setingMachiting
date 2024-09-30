const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

const createProduct = async (req, res) => {
  const { id, title, price, discount, total, count, category } = req.body;

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "haedr", {}, async (err, userData) => {
      if (err) throw err;
      const productDuc = await Product.create({
        ouner: id,
        title,
        price,
        discount,
        total,
        count,
        category,
      });
      res.status(201).json(productDuc);
    });
  }
};

const getAllProduct = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "haedr", {}, async (err, userData) => {
      if (err) throw err;
      const productDuc = await Product.find({ ouner: userData.userID }).sort({
        createdAt: -1,
      });
      res.status(200).json(productDuc);
    });
  }
};

const updateOneProduct = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "haedr", {}, async (err, userData) => {
      if (err) throw err;
      await Product.findByIdAndUpdate(id, { ...req.body });
      const productDuc = await Product.find({ ouner: userData.userID }).sort({
        createdAt: -1,
      });
      res.status(200).json(productDuc);
    });
  }
};

const deleteAllProduct = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "haedr", {}, async (err, userData) => {
      if (err) throw err;
      const { userID } = userData;
      await Product.deleteMany({ ouner: userID });
      res.status(200).json("delete");
    });
  }
};

const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json("id");
};

module.exports = {
  createProduct,
  getAllProduct,
  deleteAllProduct,
  deleteOneProduct,
  updateOneProduct,
};
