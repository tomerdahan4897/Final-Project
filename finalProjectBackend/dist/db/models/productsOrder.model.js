import { model } from "mongoose";
import { productsOrderSchema } from "../schemas/productsOrder.js";
const ProductsOrder = model("ProductsOrder", productsOrderSchema);
export { ProductsOrder };
