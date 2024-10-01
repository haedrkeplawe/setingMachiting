require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const db =
  "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/productStng2024?retryWrites=true&w=majority";
const port = process.env.PORT || 4000;
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://sitingmarti.netlify.app"],
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose
  .connect(db)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
