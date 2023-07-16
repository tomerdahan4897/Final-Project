import axios from "axios";
const baseURL = "http://localhost:5001/api/";

const addProduct = async (
  title: string,
  category: string,
  imgCode: string,
  description: string | undefined,
  price: number
) => {
  const categoryWithCapitalLetter =
    category[0].toUpperCase() + category.slice(1, -1);
  console.log(categoryWithCapitalLetter);

  return axios.post(baseURL + `${category}/add${categoryWithCapitalLetter}`, {
    title,
    category,
    imgCode,
    description,
    price,
  });
};

const updateProduct = async ({
  id,
  title,
  category,
  imgCode,
  description,
  price,
}: {
  id: string;
  title: string;
  category: string;
  imgCode: string;
  description: string;
  price: number;
}) => {
  const categoryWithCapitalLetter =
    category[0].toUpperCase() + category.slice(1, -1);
  return axios
    .put(baseURL + `${category}/update${categoryWithCapitalLetter}`, {
      id,
      title,
      category,
      imgCode,
      description,
      price,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

const removeProduct = async (id: string, category: string) => {
  const categoryWithCapitalLetter =
    category[0].toUpperCase() + category.slice(1, -1);
  return axios
    .delete(baseURL + `${category}/remove${categoryWithCapitalLetter}`, {
      data: { id },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export { addProduct, updateProduct, removeProduct };
const productsService = { addProduct, updateProduct, removeProduct };
export default productsService;
