const express = require("express");
const router = express.Router();
const userContollers = require("../controllers/userControllers");

router.post("/register", userContollers.Register);
router.post("/login", userContollers.Login);
router.get("/profile", userContollers.profile);
router.get("/logout", userContollers.logout);

module.exports = router;
