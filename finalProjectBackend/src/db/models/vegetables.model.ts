import { model } from "mongoose";
import { vegetablesSchema } from "../schemas/vegetables.js";

const Vegetable = model("Vegetables", vegetablesSchema);

export { Vegetable };
