import { Schema } from "mongoose";
const Product = new Schema({
    productId: {
        type: String,
        require: true,
        unique: true,
    },
    quantity: { type: Number, require: true },
    price: { type: Number, require: true },
});
const productsOrderSchema = new Schema({
    userId: {
        unique: true,
        type: String,
        requred: true,
    },
    products: [Product],
    totalPrice: { type: Number, require: true },
});
export { productsOrderSchema };
