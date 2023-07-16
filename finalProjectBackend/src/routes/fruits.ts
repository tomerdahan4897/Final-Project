import { Router } from "express";
import { Fruit } from "../db/models/fruits.model.js";
import _ from "underscore";
const router = Router();

// add fruit
router.post("/addFruit", async (req, res) => {
  const body = _.pick(
    req.body,
    "title",
    "category",
    "imgCode",
    "description",
    "price"
  );
  const newProduct = new Fruit(body);
  try {
    newProduct.save();
    return res.json({ message: "new fruit saved", newProduct });
  } catch (e) {
    res.status(500).json({ message: "server fruits db error: " + e });
  }
});

//update fruit
router.put("/updateFruit", async (req, res) => {
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
    const fruitForUpdate = await Fruit.findById(body.id);
    fruitForUpdate.title = body.title;
    fruitForUpdate.category = body.category;
    fruitForUpdate.imgCode = body.imgCode;
    fruitForUpdate.description = body.description;
    fruitForUpdate.price = body.price;
    fruitForUpdate.save();
    res.json({ message: "fruit updated", id: fruitForUpdate._id });
  } catch (e) {
    res.status(500).json({ message: "server fruits db error: " + e });
  }
});

//remove fruit
router.delete("/removeFruit", async (req, res) => {
  const id = req.body.id;
  try {
    await Fruit.findByIdAndDelete(id);
    res.json({ message: "fruit deleted", id });
  } catch (e) {
    res.status(500).json({ message: "server fruits db error: " + e });
  }
});

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
