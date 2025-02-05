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
