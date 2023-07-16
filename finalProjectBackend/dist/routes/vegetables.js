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
import { Vegetable } from "../db/models/vegetables.model.js";
import _ from "underscore";
const router = Router();
// add vegetable
router.post("/addVegetable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "title", "category", "imgCode", "description", "price");
    const newProduct = new Vegetable(body);
    try {
        newProduct.save();
        return res.json({ message: "new vegetable saved", newProduct });
    }
    catch (e) {
        res.status(500).json({ message: "server vegetables db error: " + e });
    }
}));
//update vegetable
router.put("/updateVegetable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const body = _.pick(req.body, "id", "title", "category", "imgCode", "description", "price");
    console.log(body);
    try {
        const vegetableForUpdate = yield Vegetable.findById(body.id);
        vegetableForUpdate.title = body.title;
        vegetableForUpdate.category = body.category;
        vegetableForUpdate.imgCode = body.imgCode;
        vegetableForUpdate.description = body.description;
        vegetableForUpdate.price = body.price;
        vegetableForUpdate.save();
        res.json({ message: "vegetable updated", id: vegetableForUpdate._id });
    }
    catch (e) {
        res.status(500).json({ message: "server vegetable db error: " + e });
    }
}));
//remove vegetable
router.delete("/removeVegetable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        yield Vegetable.findByIdAndDelete(id);
        res.json({ message: "vegetable deleted", id });
    }
    catch (e) {
        res.status(500).json({ message: "server vegetables db error: " + e });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vegetables = yield Vegetable.find();
        res.json(vegetables);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: "failed to import vegetables DB with error: " + e });
    }
}));
export { router as vegetableRouter };
