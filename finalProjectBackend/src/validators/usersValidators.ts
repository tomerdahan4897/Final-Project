import _ from "underscore";
import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

const userSignUpSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordRegex).required(),
  phone: Joi.string().min(8).max(20).required(),
  street: Joi.string().max(50),
  city: Joi.string().max(25),
});

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordRegex).required(),
});

export { userSignUpSchema, userSignInSchema };
