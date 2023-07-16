import { RequestHandler } from "express";
import _ from "underscore";
import { userSignInSchema } from "../../validators/usersValidators.js";

const validateSignIn: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "email", "password");
  const { error } = userSignInSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: "Please Enter Valid Password",
      errors: error.details.map((ed) => ed.message),
    });
  }
  next();
};

export { validateSignIn };
