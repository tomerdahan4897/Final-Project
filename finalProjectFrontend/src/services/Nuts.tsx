import { useEffect, useState } from "react";
import { Product } from "../@types";
import axios from "axios";
import NutsShop from "../components/nutsShop/NutsShop";

const baseURL = "http://localhost:5001/api/nuts";

const Nuts = () => {
    const [nutsData, setNutssData] = useState<Product[]>([]);
    useEffect(() => {
    getNutsData();
    }, []);

    const getNutsData = async () => {
            axios.get<Product[]>(baseURL + "/")
            .then((res) => {
                setNutssData(res.data);
                return nutsData;
            }).catch((e)=>{
                console.log("failed with nuts data " + e);
            });
    }

  return (
    <NutsShop products={nutsData}/>
  )
}

export default Nuts;