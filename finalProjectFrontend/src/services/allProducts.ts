import axios from "axios";
import { Product } from "../@types";

const baseURL = "http://localhost:5001/api";

export const getAllProducts = async () => {
  const fruitsData = await getFruitsData();
  const VegetablesData = await getVegesData();
  const nutsData = await getNutsData();
  return [...fruitsData, ...VegetablesData, ...nutsData];
};

const getFruitsData = async (): Promise<Product[]> => {
  return axios.get<Product[]>(baseURL + "/fruits").then((res) => {
    return res.data;
  });
};

const getVegesData = async (): Promise<Product[]> => {
  return axios.get<Product[]>(baseURL + "/vegetables").then((res) => {
    return res.data;
  });
};

const getNutsData = async (): Promise<Product[]> => {
  return axios.get<Product[]>(baseURL + "/nuts").then((res) => {
    return res.data;
  });
};
