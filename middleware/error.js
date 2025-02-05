exports.errorMiddleware = (err, req, res, next) => {
    console.log("step 3 handle error---");
    
//   console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server error" });
};
 