import { Router } from "express";
import { Nut } from "../db/models/nuts.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const nuts = await Nut.find();
    res.json(nuts);
  } catch (e) {
    res
      .status(500)
      .json({ message: "failed to import nuts DB with error: " + e });
  }
});

export { router as nutsRouter };
