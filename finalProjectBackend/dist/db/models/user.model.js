import { model } from "mongoose";
import { usersSchema } from "../schemas/users.js";
const User = model("Users", usersSchema);
export { User };
