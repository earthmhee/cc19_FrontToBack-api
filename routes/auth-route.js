const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth-controller");
const { registerSchema, loginSchema, validateWithZod } = require("../middleware/validator");

// @ENDPOINT http://localhost:8001/api/register
authRouter.post(
  "/register",
  validateWithZod(registerSchema),
  authController.register
);
authRouter.post("/login", validateWithZod(loginSchema), authController.login);

module.exports = authRouter;
