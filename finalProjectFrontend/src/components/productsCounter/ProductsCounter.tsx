import css from "./ProductsCounter.module.scss";
import useCartStore from "../../stores/cartStore";

const ProductsCounter = () => {
  const productsArrLength = useCartStore((state) => state.products).length;
  return <div className={css.numOfProducts}>{productsArrLength}</div>;
};

export default ProductsCounter;
