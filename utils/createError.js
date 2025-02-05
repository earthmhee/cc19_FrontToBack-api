exports.CreateError = (statusCode, message) => {
    console.log("step 1 createError---");
    
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error; 
};
