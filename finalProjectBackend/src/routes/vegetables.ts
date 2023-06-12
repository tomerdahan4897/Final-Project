import { Router } from "express";
import { Vegetable } from "../db/models/vegetables.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (e) {
    res
      .status(500)
      .json({ message: "failed to import vegetables DB with error: " + e });
  }
});

export { router as vegetableRouter };
