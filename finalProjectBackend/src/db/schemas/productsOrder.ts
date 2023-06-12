import { Schema } from "mongoose";

const productsOrderSchema = new Schema({
  userId: {
    unique: true,
    type: String,
    requred: true,
  },
  productId: {
    unique: true,
    type: String,
    requred: true,
  },
  quantity: {
    type: Number,
    requred: true,
  },
});

export { productsOrderSchema };
