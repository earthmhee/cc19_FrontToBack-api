const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth-controller");

// @ENDPOINT http://localhost:8001/api/register
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

module.exports = authRouter;
