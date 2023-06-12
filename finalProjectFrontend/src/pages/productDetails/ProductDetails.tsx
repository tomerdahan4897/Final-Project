import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import css from "./ProductDetails.module.scss";
import Counter from "../../components/Counter/Counter";
import AddToCartButton from "../../components/addToCart/AddToCartButton";
import { useState } from "react";
import useCartStore from "../../stores/cartStore";
import { useProductsStore } from "../../stores/productsStore";
import { Product } from "../../@types";

const ProductDetails = () => {
  const { title } = useParams();

  const nav = useNavigate();
  const products: Product[] = useProductsStore((state) => state.products);
  const product = products.find((p) => p.title === title)!;

  const [quantity, setQuantity] = useState(0);

  const getImage = () => {
    const image = new URL(
      `../../assets/storePics/${product.category}/${product.imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  const img = getImage();
  const addProduct = useCartStore((state) => state.addProduct);
  if (!product) {
    return null;
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
      <h1 className="text-brown m-3">{product.title}</h1>
      <img className={css.productPic} src={img} alt={product.title} />
      <div className="w-75 mt-5 text-center">
        <h4 className={css.desTitle}>Description:</h4>
        <p className={css.descriptionP}>{product.description}</p>
      </div>
      <div className="text-brown d-flex flex-column justify-content-center align-items-center m-5">
        <p className={css.priceP}>Price:</p>
        <span className={css.priceSpan}>{product.price} NIS / 1KG</span>
      </div>
      <div className="w-50 d-flex flex-column justify-content-center align-items-center border rounded p-3">
        <p className={css.buyNowP}>Buy Now!</p>
        <Counter onChange={(count: number) => setQuantity(count)} />
        <AddToCartButton onClick={() => addProduct({ product, quantity })} />
      </div>
      <div className="btn m-5" onClick={() => nav("/shop")}>
        <TbArrowBackUp size={70} color="#8c9674" />
      </div>
    </div>
  );
};

export default ProductDetails;
