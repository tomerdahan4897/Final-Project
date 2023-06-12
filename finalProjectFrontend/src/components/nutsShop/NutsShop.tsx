import { useState } from "react";
import { StoreProps } from "../../@types";
import Counter from "../Counter/Counter";
import AddToCartButton from "../addToCart/AddToCartButton";
import css from "./NutsShop.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";

const NutsShop = ({ products }: StoreProps) => {
  const getImage = (imgCode: string) => {
    const image = new URL(
      `../../assets/storePics/nuts/${imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  const [quantity, setQuantity] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <>
      <h2 className="text-center">Nuts Shop</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
        {products?.map((p) => {
          let image = getImage(p.imgCode);
          return (
            <div
              key={p._id}
              className={`${css.nutsCard} d-flex flex-column justify-content-center align-items-center`}
            >
              <h3 className="text-center m-2">{p.title}</h3>
              <img
                className={css.nutPic}
                src={image}
                alt=""
                width={200}
                height={150}
              />
              <p className="text-center mt-3">{`${p.price} NIS / 1kg`}</p>
              <Counter onChange={(count) => setQuantity(count)} />
              <AddToCartButton
                onClick={() => addProduct({ product: p, quantity })}
              />

              <Link to={`/productdetails/${p.title}`}>
                <AiFillInfoCircle className="mb-2" size={35} color="#e05c16" />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NutsShop;
