import css from "./VegeShop.module.scss";
import { StoreProps } from "../../@types";
import Counter from "../Counter/Counter";
import AddToCartButton from "../addToCart/AddToCartButton";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../../stores/cartStore";
import userStore from "../../stores/userStore";
import { useProductsStore } from "../../stores/productsStore";
import { Button } from "react-bootstrap";
import { removeSwal } from "../../services/swals";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import EditProduct from "../editProduct/EditProduct";
import AddProduct from "../addProduct/AddProduct";

const VegeShop = () => {
  const getImage = (imgCode: string) => {
    const image = new URL(
      `../../assets/storePics/vegetables/${imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  const userRole = userStore((state) => state.role);
  const isAdmin = userRole === "ADMIN";
  const [selectedId, setSelectedId] = useState<string>("");
  const productsFromStore = useProductsStore((state) => state.products);
  const products = productsFromStore.filter((p) => p.category === "vegetables");
  const removeProduct = useProductsStore((state) => state.removeProduct);

  //variables for adding to cart
  const [quantity, setQuantity] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 mb-2">
        <h2 className="text-center">Vegetavles Shop</h2>
        {isAdmin && <AddProduct categoryName={"Vegetable"} />}
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
        {products?.map((p) => {
          let image = getImage(p.imgCode);
          return (
            <div
              key={p._id}
              className={`${css.vegeCard} d-flex flex-column justify-content-center align-items-center`}
            >
              <h3 className="text-center m-2">{p.title}</h3>
              <img
                className={css.vegePic}
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
                <AiFillInfoCircle className="m-2" size={35} color="#e05c16" />
              </Link>
              {isAdmin && (
                <div className="d-flex flex-row justify-content-center align-items-center mb-3">
                  <Button
                    className="m-2"
                    variant="outline-orange"
                    onClick={() => setSelectedId(p._id)}
                  >
                    <GrEdit />
                  </Button>
                  <Button
                    className="m-2"
                    variant="outline-orange"
                    onClick={() => {
                      removeSwal(p._id, p.category, () => removeProduct(p._id));
                    }}
                  >
                    <MdDelete color="black" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <EditProduct
        product={products.filter((p) => p._id === selectedId)[0] || {}}
        isClicked={!!selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
};

export default VegeShop;
