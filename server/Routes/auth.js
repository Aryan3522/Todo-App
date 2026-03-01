const express = require("express");
const { SignUp, SignIn } = require("../controllers/authControllers");
const authRouter = express.Router();

// Signup
authRouter.post("/SignUp", SignUp);

// Login
authRouter.post("/SignIn", SignIn);

module.exports = authRouter;
