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
import { ContactMessage } from "../db/models/contactMessage.js";
const router = Router();
router.post("/addMessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "fullName", "mail", "tel", "messageContext");
    const newContactMessage = new ContactMessage(body);
    try {
        newContactMessage.save();
        return res.json({ message: "message saved", id: newContactMessage._id });
    }
    catch (e) {
        res.status(500).json({ message: "server db error: " + e });
    }
}));
export { router as ContactMessageRouter };
