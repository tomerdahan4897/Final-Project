import { Schema } from "mongoose";
const vegetablesSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    imgCode: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: false,
    },
    price: {
        type: String,
        require: true,
    },
});
export { vegetablesSchema };
