# SERVER

## Step 1 create package
```bash
npm init -y
```
## Step 2 install package...
```bash
npm i express cors morgan bcryptjs jsonwebtoken zod prisma nodemon
```
## Step 3 Git
```bash
git init
git add .
git commit -m "message-here"
```

copy code from repo (only first time)
```bash
git remote add origin https://github.com/earthmhee/cc19_FrontToBack-api.git
git branch -M main
git push -u origin main
```
## Step 4 Prisma (its include .gitignore)
```bash
npx prisma init
```

## Step 5 connect github repo
```bash
git remote add origin https://github.com/earthmhee/cc19_FrontToBack-api.git
git branch -M main
git push -u origin main
```
--- when want to update code
```bash
git add .
git commit -m "message"
git push
```

## Step 6 Update package.json
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon index.js"
  }
```
and code index.js

```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//Middlewares
app.use(cors()); // allow cross domain
app.use(morgan("dev")); //show log terminal
app.use(express.json())

//Start Server
const PORT = 8001;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

```

## Step 7 Create route
Create folder route
-> create auth-route.js
```js
const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth-controller")

// @ENDPOINT http://localhost:8001/api/register
authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)


module.exports = authRouter;
```
## Step 8 Create controller
create folder controller
-> create auth-controller.js
```js
exports.register = (req, res, next) => {
  try {
    res.json({ message: "Register!" });
  } catch (error) {
    console.log(error);
    res.statusCode(500).json({ message: "Server Error!!" });
  }
};

exports.login = (req, res, next) => {
  try {
    res.json({ message: "login!" });
  } catch (error) {
    console.log(error);
    res.statusCode(500).json({ message: "Server Error!!" });
  }
};

```

## Step 9 Create error middleware handler
create error.js
```js
exports.errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server error" });
};
```
*replace* -> error response from other sources (route,controller) with
```js
next(error) // in trycatch error
``` 
add errorMiddleware into index.js at the bottom but before server starter


## Step 9 Validate with ZOD
```js
const zod = require("zod");

//TEST validator
exports.registerSchema = zod
  .object({
    email: zod.string().email("Email not in correct format"),
    firstname: zod.string().min(3, "Firstname must be more than 3 chars"),
    lastname: zod.string().min(3, "Lastname must be more than 3 chars"),
    password: zod.string().min(6, "Password must be more than 6 chars"),
    confirmPassword: zod
      .string()
      .min(6, "Confirm Password must be more than 6 chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password is not match with password",
    path: ["confirmPassword"],
  });
exports.loginSchema = zod.object({
  email: zod.string().email("Email not in correct format"),
  password: zod.string().min(6, "Password must be more than 6 chars"),
});

exports.validateWithZod = (schema) => (req, res, next) => {
  try {
    console.log("Validating with ZOD........");
    console.log("Logging schema out........");
    schema.parse(req.body);
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item.message);
    const errTxt = errMsg.join(", ");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};
```

then update code

/routes/auth-route.js
```js
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
```

## Step 10 Config Prisma
/configs/prisma.js
```js
const {PrismaClient} = require("@prisma/client")
const  prisma = new PrismaClient();
module.exports = prisma;
```

then update auth-controller.js
```js
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
```


