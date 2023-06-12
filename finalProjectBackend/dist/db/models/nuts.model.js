import { model } from "mongoose";
import { nutsSchema } from "../schemas/nuts.js";
const Nut = model("Nuts", nutsSchema);
export { Nut };
