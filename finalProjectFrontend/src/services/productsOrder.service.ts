import axios from "axios";

const baseURL = "http://localhost:5001/api/orders";

const newProductForOrder = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  return axios.post(baseURL + "/addProductForOrder", {
    userId,
    productId,
    quantity,
  });
};
export { newProductForOrder };
const productForOrderService = { newProductForOrder };
export default productForOrderService;
