import { Router } from "express";
import { Vegetable } from "../db/models/vegetables.model.js";
import _ from "underscore";
const router = Router();

// add vegetable
router.post("/addVegetable", async (req, res) => {
  const body = _.pick(
    req.body,
    "title",
    "category",
    "imgCode",
    "description",
    "price"
  );
  const newProduct = new Vegetable(body);
  try {
    newProduct.save();
    return res.json({ message: "new vegetable saved", newProduct });
  } catch (e) {
    res.status(500).json({ message: "server vegetables db error: " + e });
  }
});

//update vegetable
router.put("/updateVegetable", async (req, res) => {
  console.log(req.body);

  const body = _.pick(
    req.body,
    "id",
    "title",
    "category",
    "imgCode",
    "description",
    "price"
  );
  console.log(body);

  try {
    const vegetableForUpdate = await Vegetable.findById(body.id);
    vegetableForUpdate.title = body.title;
    vegetableForUpdate.category = body.category;
    vegetableForUpdate.imgCode = body.imgCode;
    vegetableForUpdate.description = body.description;
    vegetableForUpdate.price = body.price;
    vegetableForUpdate.save();
    res.json({ message: "vegetable updated", id: vegetableForUpdate._id });
  } catch (e) {
    res.status(500).json({ message: "server vegetable db error: " + e });
  }
});

//remove vegetable
router.delete("/removeVegetable", async (req, res) => {
  const id = req.body.id;
  try {
    await Vegetable.findByIdAndDelete(id);
    res.json({ message: "vegetable deleted", id });
  } catch (e) {
    res.status(500).json({ message: "server vegetables db error: " + e });
  }
});

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
