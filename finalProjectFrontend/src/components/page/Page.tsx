import { Route, Routes } from "react-router-dom";
import About from "../../pages/about/About";
import ContactUs from "../../pages/contactUs/ContactUs";
import Home from "../../pages/home/Home";
import NotFound from "../../pages/notFound/NotFound";
import Shop from "../../pages/shop/Shop";
import SignUp from "../../pages/signup/SignUp";
import css from "./Page.module.scss";
import Fruits from "../../services/Fruits";
import Vegetables from "../../services/Vegetables";
import Nuts from "../../services/Nuts";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import ProductDetails from "../../pages/productDetails/ProductDetails";

const Page = () => {
  return (
    <div className={css.mainPage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/vegetables" element={<Vegetables />} />
        <Route path="/shop/fruits" element={<Fruits />} />
        <Route path="/shop/nuts" element={<Nuts />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/productdetails/:title" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Page;
