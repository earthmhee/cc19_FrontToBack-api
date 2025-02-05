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
