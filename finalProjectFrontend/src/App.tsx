import { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Page from "./components/page/Page";
import "./style.scss";
import userStore from "./stores/userStore";
import { useProductsStore } from "./stores/productsStore";
import { getAllProducts } from "./services/allProducts";

function App() {
  const setProducts = useProductsStore((state: any) => state.setProducts);
  const importData = async () => {
    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  const userStorage = JSON.parse(localStorage.getItem("user")!);
  const login = userStore((state) => state.login);

  //auto login if the user was connected before
  useEffect(() => {
    importData();
    if (userStorage) {
      login(
        userStorage.firstName,
        userStorage.email,
        userStorage.token,
        userStorage.role
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <Page />
      <Footer />
    </>
  );
}

export default App;
