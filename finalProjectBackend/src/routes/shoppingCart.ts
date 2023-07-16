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
router.post("/addProductForOrder", async (req, res) => {
  const body = _.pick(req.body, "userId", "cart");
  const totalPrice = calcTotalPrice(body.cart);
  const productsOrder = new ProductsOrder({ ...body, totalPrice });

  try {
    productsOrder.save();
    return res.json({
      message: "order of product saved",
      id: productsOrder._id,
    });
  } catch (e) {
    res.status(500).json({ message: "server db error: " + e });
  }
});

export { router as ProductsOrderRouter };
