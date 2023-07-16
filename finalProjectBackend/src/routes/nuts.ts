import { Router } from "express";
import { Nut } from "../db/models/nuts.model.js";
import _ from "underscore";
const router = Router();

// add nuts
router.post("/addNut", async (req, res) => {
  const body = _.pick(
    req.body,
    "title",
    "category",
    "imgCode",
    "description",
    "price"
  );
  const newProduct = new Nut(body);
  try {
    newProduct.save();
    return res.json({ message: "new nut saved", newProduct });
  } catch (e) {
    res.status(500).json({ message: "server nuts db error: " + e });
  }
});

//update nut
router.put("/updateNut", async (req, res) => {
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
    const nutForUpdate = await Nut.findById(body.id);
    nutForUpdate.title = body.title;
    nutForUpdate.category = body.category;
    nutForUpdate.imgCode = body.imgCode;
    nutForUpdate.description = body.description;
    nutForUpdate.price = body.price;
    nutForUpdate.save();
    res.json({ message: "nut updated", id: nutForUpdate._id });
  } catch (e) {
    res.status(500).json({ message: "server nut db error: " + e });
  }
});

//remove nut
router.delete("/removeNut", async (req, res) => {
  const id = req.body.id;
  try {
    await Nut.findByIdAndDelete(id);
    res.json({ message: "nut deleted", id });
  } catch (e) {
    res.status(500).json({ message: "server nuts db error: " + e });
  }
});

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
