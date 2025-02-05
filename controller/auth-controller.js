exports.register = (req, res, next) => {
  try {
    res.json({ message: "Register!" });
  } catch (error) {
    next(error)
  }
};

exports.login = (req, res, next) => {
  try {
    res.json({ message: "login!" });
  } catch (error) {
    next(error)
  }
};
