import { Router } from "express";
import { Fruit } from "../db/models/fruits.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (e) {
    res
      .status(500)
      .json({ message: "failed to import fruits DB with error: " + e });
  }
});

export { router as fruitsRouter };
