import { model } from "mongoose";
import { contactMessageSchema } from "../schemas/contactMessage.js";

const ContactMessage = model("ContactMessage", contactMessageSchema);

export { ContactMessage };
