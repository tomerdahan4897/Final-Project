import express from "express";
import { DBConnect } from "./db/connect.js";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./routes/users.js";
import { notFound } from "./middlewares/notFound.js";
import { vegetableRouter } from "./routes/vegetables.js";
import { fruitsRouter } from "./routes/fruits.js";
import { nutsRouter } from "./routes/nuts.js";
import { ContactMessageRouter } from "./routes/contactUs.js";
import { ProductsOrderRouter } from "./routes/shoppingCart.js";
const app = express();

//connect to the users db in mongo
DBConnect().catch((e) => console.log(e));

//middlewares:
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

//routes:
app.use("/api/vegetables", vegetableRouter);
app.use("/api/fruits", fruitsRouter);
app.use("/api/nuts", nutsRouter);
app.use("/api/users", userRouter);
app.use("/api/contactus", ContactMessageRouter);
app.use("/api/orders", ProductsOrderRouter);
//404
app.use(notFound);

const PORT = 5001;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
