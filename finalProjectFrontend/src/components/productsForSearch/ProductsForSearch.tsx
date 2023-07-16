import { Link } from "react-router-dom";
import { Category, Product } from "../../@types";
import css from "./ProductsForSearch.module.scss";
import { useProductsStore } from "../../stores/productsStore";

export const ProductsForSearch = ({
  inputValue,
  isOpen,
}: {
  inputValue: string;
  isOpen: boolean;
}) => {
  const products: Product[] = useProductsStore((state) => state.products);

  const getImage = (category: Category, imgCode: string) => {
    const image = new URL(
      `/src/assets/storePics/${category}/${imgCode}.jpg`,
      import.meta.url
    ).href;

    return image;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ul className={css.mainUl}>
      {products
        ?.filter((p) => p.title.toLowerCase().startsWith(inputValue))
        .map((p) => {
          return (
            <li key={p._id} className={css.productLi}>
              <Link
                to={`/productdetails/${p.title}`}
                className="d-flex flex-row justify-content-center align-items-center text-decoration-none gap-3"
              >
                <span className={css.titleSpan}>{p.title}</span>
                <img
                  src={getImage(p.category, p.imgCode)}
                  alt={p.title}
                  width={"30px"}
                  height={"30px"}
                  style={{ borderRadius: "50%" }}
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
