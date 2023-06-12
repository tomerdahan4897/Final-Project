import axios from "axios";
import { Product } from "../@types";
import { useEffect, useState } from "react";
import FruitShop from "../components/fruitShop/FruitShop";

const baseURL = "http://localhost:5001/api/fruits";
const Fruits = () => {
  const [fruitsData, setFruitsData] = useState<Product[]>([]);
  useEffect(() => {
    getFruitsData();
  }, []);
  const getFruitsData = async () => {
    axios
      .get<Product[]>(baseURL + "/")
      .then((res) => {
        setFruitsData(res.data);
        return fruitsData;
      })
      .catch((e) => {
        console.log("failed with fruits data " + e);
      });
  };

  return <FruitShop products={fruitsData} />;
};

export default Fruits;
