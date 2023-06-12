import { model } from "mongoose";
import { fruitsSchema } from "../schemas/fruits.js";
const Fruit = model("Fruits", fruitsSchema);
export { Fruit };
