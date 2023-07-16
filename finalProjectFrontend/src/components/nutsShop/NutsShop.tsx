import { useState } from "react";
import { StoreProps } from "../../@types";
import Counter from "../Counter/Counter";
import AddToCartButton from "../addToCart/AddToCartButton";
import css from "./NutsShop.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import userStore from "../../stores/userStore";
import { useProductsStore } from "../../stores/productsStore";
import EditProduct from "../editProduct/EditProduct";
import { Button } from "react-bootstrap";
import { removeSwal } from "../../services/swals";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import AddProduct from "../addProduct/AddProduct";

const NutsShop = () => {
  const getImage = (imgCode: string) => {
    const image = new URL(
      `../../assets/storePics/nuts/${imgCode}.jpg`,
      import.meta.url
    ).href;
    return image;
  };

  //variables for admin actions
  const userRole = userStore((state) => state.role);
  const isAdmin = userRole === "ADMIN";
  const [selectedId, setSelectedId] = useState<string>("");
  const productsFromStore = useProductsStore((state) => state.products);
  const products = productsFromStore.filter((p) => p.category === "nuts");
  const removeNut = useProductsStore((state) => state.removeProduct);

  //variables for adding to cart
  const [quantity, setQuantity] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 mb-2">
        <h2 className="text-center">Nuts Shop</h2>
        {isAdmin && <AddProduct categoryName={"Nut"} />}
      </div>
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
                      removeSwal(p._id, p.category, () => removeNut(p._id));
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

export default NutsShop;
