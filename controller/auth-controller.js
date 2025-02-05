const { Role } = require("@prisma/client");
const prisma = require("../configs/prisma");
const { CreateError } = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    //step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    console.log(email, firstname, lastname, password, confirmPassword);

    //step 2 validate
    //step 3 check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    console.log(checkEmail);
    if (checkEmail) {
      return CreateError(400, "Email is already exist ------------");
    }
    //step 4 encrypt bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // console.log(hashedPassword);

    //step 5 Insert to DB
    const profile = await prisma.profile.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      },
    });
    //step 6 Response

    res.json({ message: "Register success!" });
  } catch (error) {
    console.log("step 2 catch error---");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    //step1 req.body
    const { email, password } = req.body;
    console.log(email, password);

    //step2 check email and password
    const profile = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (!profile) {
      return CreateError(400, "Email/password is incorrect");
    }
    const isMatch = bcrypt.compareSync(password, profile.password);
    console.log(isMatch);

    if (!isMatch) {
      return CreateError(400, "Email/password is incorrect");
    }
    //step3 generate token
    const payload = {
      id: profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      Role: profile.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token); 
    //step4 response
    res.json({ message: "Login success!" ,
        payload: payload,
        token: token
    });
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req,res,next)=>{
    try {
        res.json({message: "Hello, current user"})
    } catch (error) {
        next(error)
    }
}
