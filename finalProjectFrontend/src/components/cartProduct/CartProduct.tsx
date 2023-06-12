import { GiCancel } from "react-icons/gi";
import useCartStore from "../../stores/cartStore";
import Counter from "../Counter/Counter";
import css from "./CartProduct.module.scss";
import { ProductForCart } from "../../@types";

const CartProduct = ({
  productItem,
  index,
}: {
  productItem: ProductForCart;
  index: number;
}) => {
  const product = productItem.product;
  const getImage = (category: string, imgCode: string) => {
    const image = new URL(
      `../../assets/storePics/${category}/${imgCode}.jpg`,
      import.meta.url
    ).href;

    return image;
  };

  const updateProduct = useCartStore((state) => state.updateProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productForUpdate = useCartStore((state) => state.products[index]);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
      <div className="btn" onClick={() => removeProduct(product._id)}>
        <GiCancel
          color="red"
          size={35}
          className={`${css.cancelButton} ms-3`}
        />
      </div>
      <img
        src={getImage(product.category, product.imgCode)}
        width={"90px"}
        height={"90px"}
        style={{ borderRadius: "180px" }}
        alt={`${product.title}`}
      />
      <span className={css.titleSpan}>{product.title}</span>
      <Counter
        onChange={(count: number) => {
          updateProduct(product._id, count);
        }}
        quantity={productForUpdate.quantity}
      />
      <div className="text-center font-italic">
        {(parseFloat(product.price) * productForUpdate.quantity).toFixed(2)} NIS
      </div>
    </div>
  );
};
export default CartProduct;
