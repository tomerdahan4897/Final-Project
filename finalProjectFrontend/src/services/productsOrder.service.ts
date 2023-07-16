import axios from "axios";

const baseURL = "http://localhost:5001/api/orders";

const newProductForOrder = async (
  userId: string,
  cart: { id: string; quantity: number; price: number }[]
) => {
  return axios.post(baseURL + "/addProductForOrder", {
    userId,
    cart,
  });
};
export { newProductForOrder };
const productForOrderService = { newProductForOrder };
export default productForOrderService;
