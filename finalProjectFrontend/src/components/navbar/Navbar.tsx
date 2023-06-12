import { Link, NavLink } from "react-router-dom";
import css from "./Navbar.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdOutlineEmojiNature } from "react-icons/md";
import Login from "../../pages/login/LogIn";
import LogOut from "../logOutButton/LogOut";
import { GrCart } from "react-icons/gr";
import ProductsCounter from "../productsCounter/ProductsCounter";
import useCartStore from "../../stores/cartStore";
import userStore from "../../stores/userStore";
import SearchAutoComplete from "../searchAutoComplete/SearchAutoComplete";

function NavScrollExample() {
  const user = userStore((state) => state);
  const isLoggedIn = user.isLoggedIn;
  const firstName = user.firstName;
  const productsArrLength = useCartStore((state) => state.products).length;

  return (
    <Navbar bg="light" expand="lg" className={`bg-green2 ${css.navbarInner}`}>
      <Container fluid style={{ width: "1000px" }}>
        <NavLink to="/" className="navbar-brand m-1 text-yellow">
          <MdOutlineEmojiNature size={30} color="#fcd423" /> Go Nature!{" "}
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link text-grey">
              Home
            </Link>
            <Link to="/about" className="nav-link text-grey">
              About
            </Link>
            <NavDropdown
              className={`${css.shopNow} bg-yellow border-3 border-green1 border rounded`}
              title="Shop Now"
              id="navbarScrollingDropdown"
            >
              <Link
                to="/shop"
                className={`dropdown-item text-grey ${css.allLink}`}
              >
                All
              </Link>
              <Link
                to="/shop/vegetables"
                className={`dropdown-item text-grey ${css.vegeLink}`}
              >
                Vegetables
              </Link>
              <Link
                to="/shop/fruits"
                className={`dropdown-item text-grey ${css.fruitLink}`}
              >
                Fruits
              </Link>
              <Link
                to="/shop/nuts"
                className={`dropdown-item text-grey ${css.nutsLink}`}
              >
                Nuts
              </Link>
            </NavDropdown>
            {!isLoggedIn && (
              <Link to="/signup" className="nav-link text-grey">
                Sign Up
              </Link>
            )}
            <Link to="/contactus" className="nav-link text-grey">
              Contact
            </Link>
          </Nav>

          <SearchAutoComplete />

          {isLoggedIn && (
            <span className={`${css.userName} text-center`}>
              Hello, {firstName}
            </span>
          )}
          {isLoggedIn && <LogOut />}
          {!isLoggedIn && <Login />}
          <Link
            to="/shoppingcart"
            className={`btn btn-orange ms-4 ${css.shoppingCartDiv}`}
          >
            {productsArrLength > 0 && <ProductsCounter />}
            <GrCart size={25} />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
