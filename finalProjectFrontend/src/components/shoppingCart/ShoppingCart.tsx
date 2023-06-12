import { useEffect, useState } from "react";
import useCartStore from "../../stores/cartStore";
import CartProduct from "../cartProduct/CartProduct";
import EmptyBag from "../emptyBag/EmptyBag";
import css from "./ShoppingCart.module.scss";
import { ProductForCart } from "../../@types";
import productForOrderService from "../../services/productsOrder.service";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/userStore";

const ShoppingCart = () => {
  const nav = useNavigate();
  const products = useCartStore((state) => {
    return state.products;
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalP = products.length
      ? products
          .map((p) => {
            return +p.product.price * p.quantity;
          })
          .reduce((sum, curr) => {
            return sum + curr;
          })
      : 0;
    setTotalPrice(+totalP.toFixed(2));
  }, [products]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const confirmOrederHandler = (products: ProductForCart[]) => {
    const copyOfP = [...products];
    setIsLoading(true);

    const isLoggedIn = userStore((state) => state.isLoggedIn);
    if (isLoggedIn) {
      const userId = JSON.parse(localStorage.getItem("user")!).id;
      for (let p of copyOfP) {
        productForOrderService
          .newProductForOrder(userId, p.product._id, p.quantity)
          .then((res) => {
            //swal
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
            setErrorMessage(JSON.stringify(e.response.data));
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      nav("/login");
    }
  };

  return (
    <>
      <h1 className="text-center text-brown mt-3">Shopping Cart</h1>
      <div className="d-flex flex-column flex-wrap justify-content-center align-items-center gap-5">
        {products.map((p, i) => (
          <CartProduct key={p.product._id} productItem={p} index={i} />
        ))}
      </div>
      {products.length > 0 && (
        <div
          className={`${css.confirmBox} d-flex flex-column flex-wrap justify-content-center align-items-center border rounded mt-5 p-3`}
        >
          <div className=" text-center">
            <p className={css.totalPrice}>Total Price:</p>
            <span className={css.thePrice}>{totalPrice} NIS</span>
          </div>
          <div
            className="btn btn-orange mt-3"
            /*  onClick={confirmOrederHandler(products)} */
          >
            Confirm Order
          </div>
        </div>
      )}

      {products.length == 0 && <EmptyBag />}
    </>
  );
};

export default ShoppingCart;
