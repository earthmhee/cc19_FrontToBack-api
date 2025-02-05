
const prisma = require("../configs/prisma");
const { CreateError } = require("../utils/createError");
const bcrypt = require("bcryptjs")
exports.register = async (req, res, next) => {
  try {
    //step 1 req.body
    const {email, firstname, lastname, password,confirmPassword}= req.body;
    console.log(email, firstname, lastname, password, confirmPassword);
    
    //step 2 validate
    //step 3 check already
    const checkEmail = await prisma.profile.findFirst({
        where:{
            email: email,
        }
    })
    console.log(checkEmail);
    if (checkEmail){
        return CreateError(400, "Email is already exist ------------")
    }
    //step 4 encrypt bcrypt
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    // console.log(hashedPassword);
    
    //step 5 Insert to DB
    const profile = await prisma.profile.create({
        data:{
            email : email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
        }
    })
    //step 6 Response


    
    res.json({ message: "Register success!" });
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
