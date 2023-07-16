import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import css from "./ProductDetails.module.scss";
import Counter from "../../components/Counter/Counter";
import AddToCartButton from "../../components/addToCart/AddToCartButton";
import { useEffect, useState } from "react";
import useCartStore from "../../stores/cartStore";
import { useProductsStore } from "../../stores/productsStore";
import { Product } from "../../@types";
import userStore from "../../stores/userStore";
import { Button } from "react-bootstrap";
import { removeSwal } from "../../services/swals";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import EditProduct from "../../components/editProduct/EditProduct";

const ProductDetails = () => {
  const { title } = useParams();

  const nav = useNavigate();

  const products: Product[] = useProductsStore((state) => state.products);
  console.log(title);

  const product = products.find((p) => p.title === title) || ({} as Product);
  console.log("products", products);
  console.log("product", product);
  const [quantity, setQuantity] = useState(0);

  //variables for admin actions
  const userRole = userStore((state) => state.role);
  const isAdmin = userRole === "ADMIN";
  const [selectedId, setSelectedId] = useState<string>("");
  const removeProduct = useProductsStore((state) => state.removeProduct);

  const getImage = () => {
    const image = new URL(
      `../../assets/storePics/${product.category}/${product.imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  const img = getImage();
  const addProduct = useCartStore((state) => state.addProduct);
  if (!product || {}) {
    nav("/shop");
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
      {isAdmin && (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 border border-green2 rounded p-4">
          <span className="font-weight-bold">Admin, manage The Product:</span>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <Button
              className="m-2"
              variant="outline-orange"
              onClick={() => setSelectedId(product._id)}
            >
              <GrEdit />
            </Button>
            <Button
              className="m-2"
              variant="outline-orange"
              onClick={() => {
                removeSwal(product._id, product.category, () =>
                  removeProduct(product._id)
                );
              }}
            >
              <MdDelete color="black" />
            </Button>
          </div>
        </div>
      )}
      <div className="btn m-5" onClick={() => nav("/shop")}>
        <TbArrowBackUp size={70} color="#8c9674" />
      </div>
      <EditProduct
        product={product}
        isClicked={!!selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default ProductDetails;
