import { Schema } from "mongoose";
const contactMessageSchema = new Schema({
    fullName: {
        type: String,
        requred: true,
    },
    mail: {
        unique: true,
        type: String,
        requred: true,
    },
    tel: {
        type: String,
        requred: false,
    },
    messageContext: {
        type: String,
        requred: true,
    },
});
export { contactMessageSchema };
