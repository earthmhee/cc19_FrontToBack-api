// 1. list all user
// 2. Update role
// 3. delete user

const prisma = require("../configs/prisma");

exports.listUsers = async (req, res, next) => {
  try {
    const lists = prisma.profile.findMany({
      data: {},
    });
    res.json({ message: "Lists of users" });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    res.json({ message: "Update the role of user" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    res.json({ message: "Delete user!" });
  } catch (error) {
    next(error);
  }
};
