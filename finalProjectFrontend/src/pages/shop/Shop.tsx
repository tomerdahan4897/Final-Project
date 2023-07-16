import AddProduct from "../../components/addProduct/AddProduct";
import FruitShop from "../../components/fruitShop/FruitShop";
import NutsShop from "../../components/nutsShop/NutsShop";
import VegeShop from "../../components/vegeShop/VegeShop";
import userStore from "../../stores/userStore";

const Shop = () => {
  return (
    <>
      <h1 className="text-center text-brown mt-3">Shop</h1>
      <hr />
      <VegeShop />
      <hr />
      <FruitShop />
      <hr />
      <NutsShop />
    </>
  );
};

export default Shop;
