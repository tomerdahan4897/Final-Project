var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { Fruit } from "../db/models/fruits.model.js";
import _ from "underscore";
const router = Router();
// add fruit
router.post("/addFruit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "title", "category", "imgCode", "description", "price");
    const newProduct = new Fruit(body);
    try {
        newProduct.save();
        return res.json({ message: "new fruit saved", newProduct });
    }
    catch (e) {
        res.status(500).json({ message: "server fruits db error: " + e });
    }
}));
//update fruit
router.put("/updateFruit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const body = _.pick(req.body, "id", "title", "category", "imgCode", "description", "price");
    console.log(body);
    try {
        const fruitForUpdate = yield Fruit.findById(body.id);
        fruitForUpdate.title = body.title;
        fruitForUpdate.category = body.category;
        fruitForUpdate.imgCode = body.imgCode;
        fruitForUpdate.description = body.description;
        fruitForUpdate.price = body.price;
        fruitForUpdate.save();
        res.json({ message: "fruit updated", id: fruitForUpdate._id });
    }
    catch (e) {
        res.status(500).json({ message: "server fruits db error: " + e });
    }
}));
//remove fruit
router.delete("/removeFruit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        yield Fruit.findByIdAndDelete(id);
        res.json({ message: "fruit deleted", id });
    }
    catch (e) {
        res.status(500).json({ message: "server fruits db error: " + e });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fruits = yield Fruit.find();
        res.json(fruits);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: "failed to import fruits DB with error: " + e });
    }
}));
export { router as fruitsRouter };
