var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.post("/signup", validateSignUp, isUserExist, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "firstName", "lastName", "email", "password", "phone", "street", "city");
    body.password = yield bycrypt.hash(body.password, 10);
    const user = new User(body);
    try {
        //insert the Role id to the user.role
        user.roles = [yield (yield Role.findOne({ name: "user" }))._id];
        user.save();
        return res.json({ message: "user saved", id: user._id });
    }
    catch (e) {
        res.status(500).json({ message: "server db error: " + e });
    }
}));
//login
router.post("/login", validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (yield User.findOne({ email: req.body.email })).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        //check if the password match the email
        const isPasswordValid = yield bycrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "inncorrect password" });
        }
        /* token */
        const token = jwt.sign({ id: user._id }, userConfig.secret, {
            expiresIn: "1d",
        });
        //check the roles of the user
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
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
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error", e });
    }
}));
//Get all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (e) {
        res.status(500).json({ message: "error: " + e });
    }
}));
export { router as userRouter };
