const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user-controller");

// @ENDPOINT http://localhost:8001/api/users
userRouter.get("/users", userController.listUsers);
userRouter.patch("/user/update-role", userController.updateRole);
userRouter.delete("/user/:id", userController.deleteUser);

module.exports = userRouter;
