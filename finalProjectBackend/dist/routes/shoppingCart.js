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
import _ from "underscore";
import { ProductsOrder } from "../db/models/productsOrder.model.js";
const router = Router();
const calcTotalPrice = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
        totalPrice += product.price * product.quantity;
    });
    return totalPrice;
};
router.post("/addProductForOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "userId", "cart");
    const totalPrice = calcTotalPrice(body.cart);
    const productsOrder = new ProductsOrder(Object.assign(Object.assign({}, body), { totalPrice }));
    try {
        productsOrder.save();
        return res.json({
            message: "order of product saved",
            id: productsOrder._id,
        });
    }
    catch (e) {
        res.status(500).json({ message: "server db error: " + e });
    }
}));
export { router as ProductsOrderRouter };
