import React, { useEffect, useState } from 'react'
import { Product } from '../@types';
import axios from 'axios';
import VegeShop from '../components/vegeShop/VegeShop';


const baseURL = "http://localhost:5001/api/vegetables";

const Vegetables = () => {
    const [vegeData, setVegeData] = useState<Product[]>([]);
    useEffect(() => {
    getVegeData();
    }, []);

    const getVegeData = async () => {
            axios.get<Product[]>(baseURL + "/")
            .then((res) => {
                setVegeData(res.data);
                return vegeData;
            }).catch((e)=>{
                console.log("failed with vegetables data " + e);
            });
    }

  return (
    <VegeShop products={vegeData}/>
  )
}

export default Vegetables