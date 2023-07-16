import { Router } from "express";
import _ from "underscore";
import bycrypt from "bcryptjs";
import { User } from "../db/models/user.model.js";
import { Role } from "../db/models/role.model.js";
import jwt from "jsonwebtoken";
import userConfig from "../config/user.config.js";
import { validateSignUp } from "../middlewares/userMiddleWares/validateSignUp.js";
import { isUserExist } from "../middlewares/userMiddleWares/isUserExist.js";
import { validateSignIn } from "../middlewares/userMiddleWares/validateSignIn.js";

const router = Router();

// add user
router.post("/signup", validateSignUp, isUserExist, async (req, res) => {
  const body = _.pick(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
    "street",
    "city"
  );

  body.password = await bycrypt.hash(body.password, 10);
  const user = new User(body);

  try {
    //insert the Role id to the user.role
    user.roles = [await (await Role.findOne({ name: "user" }))._id];
    user.save();
    return res.json({ message: "user saved", id: user._id });
  } catch (e) {
    res.status(500).json({ message: "server db error: " + e });
  }
});

//login
router.post("/login", validateSignIn, async (req, res) => {
  try {
    const user = await (
      await User.findOne({ email: req.body.email })
    ).populate<{ roles: Array<typeof Role> }>("roles");
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    //check if the password match the email
    const isPasswordValid = await bycrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Inncorrect Password" });
    }

    /* token */
    const token = jwt.sign({ id: user._id }, userConfig.secret, {
      expiresIn: "1d",
    });

    //check the roles of the user
    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(user.roles[i].name.toUpperCase());
    }

    return res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      street: user.street,
      city: user.city,
      roles: authorities,
      accessToken: token,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error", e });
  }
});

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "error: " + e });
  }
});

export { router as userRouter };
