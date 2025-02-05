const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth-route");
const { errorMiddleware } = require("./middleware/error");
const userRouter = require("./routes/user-route");
const app = express();

//Middlewares
app.use(cors()); // allow cross domain
app.use(morgan("dev")); //show log terminal
app.use(express.json())

//Routing
app.use("/api", authRouter)
app.use("/api", userRouter)

//Handle error
app.use(errorMiddleware)
//Start Server
const PORT = 8001;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
