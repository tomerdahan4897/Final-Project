import _ from "underscore";
import { userSignUpSchema } from "../../validators/usersValidators.js";
const validateSignUp = (req, res, next) => {
    const body = _.pick(req.body, "firstName", "lastName", "email", "password", "phone", "street", "city");
    const { error } = userSignUpSchema.validate(body);
    if (error) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: error.details.map((ed) => ed.message),
        });
    }
    next();
};
export { validateSignUp };
