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
import { Nut } from "../db/models/nuts.model.js";
import _ from "underscore";
const router = Router();
// add nuts
router.post("/addNut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "title", "category", "imgCode", "description", "price");
    const newProduct = new Nut(body);
    try {
        newProduct.save();
        return res.json({ message: "new nut saved", newProduct });
    }
    catch (e) {
        res.status(500).json({ message: "server nuts db error: " + e });
    }
}));
//update nut
router.put("/updateNut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const body = _.pick(req.body, "id", "title", "category", "imgCode", "description", "price");
    console.log(body);
    try {
        const nutForUpdate = yield Nut.findById(body.id);
        nutForUpdate.title = body.title;
        nutForUpdate.category = body.category;
        nutForUpdate.imgCode = body.imgCode;
        nutForUpdate.description = body.description;
        nutForUpdate.price = body.price;
        nutForUpdate.save();
        res.json({ message: "nut updated", id: nutForUpdate._id });
    }
    catch (e) {
        res.status(500).json({ message: "server nut db error: " + e });
    }
}));
//remove nut
router.delete("/removeNut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        yield Nut.findByIdAndDelete(id);
        res.json({ message: "nut deleted", id });
    }
    catch (e) {
        res.status(500).json({ message: "server nuts db error: " + e });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuts = yield Nut.find();
        res.json(nuts);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: "failed to import nuts DB with error: " + e });
    }
}));
export { router as nutsRouter };
