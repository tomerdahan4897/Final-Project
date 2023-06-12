import { Router } from "express";
import _ from "underscore";
import { ContactMessage } from "../db/models/contactMessage.js";

const router = Router();

router.post("/addMessage", async (req, res) => {
  const body = _.pick(req.body, "fullName", "mail", "tel", "messageContext");
  const newContactMessage = new ContactMessage(body);

  try {
    newContactMessage.save();
    return res.json({ message: "message saved", id: newContactMessage._id });
  } catch (e) {
    res.status(500).json({ message: "server db error: " + e });
  }
});

export { router as ContactMessageRouter };
