import { StoreProps } from "../../@types";
import css from "./FruitShop.module.scss";
import Counter from "../Counter/Counter";
import AddToCartButton from "../addToCart/AddToCartButton";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import { useState } from "react";
import userStore from "../../stores/userStore";
import EditProduct from "../editProduct/EditProduct";
import { GrEdit } from "react-icons/gr";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { removeSwal } from "../../services/swals";
import { useProductsStore } from "../../stores/productsStore";
import AddProduct from "../addProduct/AddProduct";

const FruitShop = () => {
  const getImage = (imgCode: string) => {
    const image = new URL(
      `../../assets/storePics/fruits/${imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  //variables for admin actions
  const userRole = userStore((state) => state.role);
  const isAdmin = userRole === "ADMIN";
  const [selectedId, setSelectedId] = useState<string>("");
  const productsFromStore = useProductsStore((state) => state.products);
  const products = productsFromStore.filter((p) => p.category === "fruits")!;
  const removeProduct = useProductsStore((state) => state.removeProduct);

  //variables for adding to cart
  const [quantity, setQuantity] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 mb-2">
        <h2 className="text-center">Fruits Shop</h2>
        {isAdmin && <AddProduct categoryName={"Fruit"} />}
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
        {products?.map((p) => {
          let image = getImage(p.imgCode);
          return (
            <div
              key={p._id}
              className={`${css.fruitCard} d-flex flex-column justify-content-center align-items-center`}
            >
              <h3 className="text-center m-2">{p.title}</h3>
              <img
                className={css.fruitPic}
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

export default FruitShop;
