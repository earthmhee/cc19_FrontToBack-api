const { CreateError } = require("../utils/createError");

exports.register = (req, res, next) => {
  try {
    //step 1 req.body
    const {email, firstname, lastname, password,confirmedPassword}= req.body;
    console.log(email, firstname, lastname, password, confirmedPassword);
    
    //step 2 validate
    if(!email){
        return CreateError(400, "Email is require")
    }
    if(!firstname){
        return CreateError(400, "firstname is require")
    }

    //step 3 check already
    //step 4 encrypt bcrypt
    //step 5 Insert to DB
    //step 6 Response

    res.json({ message: "Register!" });
  } catch (error) {
    console.log("step 2 catch error---");
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
