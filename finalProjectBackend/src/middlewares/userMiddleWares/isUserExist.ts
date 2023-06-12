import { RequestHandler } from "express";
import { User } from "../../db/models/user.model.js";

const isUserExist: RequestHandler = async (req, res, next) => {
  try {
    let found = await User.findOne({ email: req.body.email });
    if (found) {
      return res.status(400).json({ message: "user already exists" });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
export { isUserExist };
