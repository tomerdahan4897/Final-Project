import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AddProductType, Category } from "../../@types";
import { Formik, ErrorMessage, Field } from "formik";
import { useProductsStore } from "../../stores/productsStore";
import productsService from "../../services/products.service";
import {
  addedProductSeccess,
  productAlreadyExists,
} from "../../services/swals";
import { productValidationSchema } from "../../validations/productValidation";

function AddProduct({ categoryName }: { categoryName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const allProducts = useProductsStore((state) => state.products);

  //variables for modal
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const categoryValue: string = categoryName.toLowerCase() + "s";
  const addProductToState = useProductsStore((state) => state.addProduct);
  const initialValues: AddProductType = {
    title: "",
    category: categoryValue,
    imgCode: "",
    description: "",
    price: 0,
  };

  const handleAddProduct = async (newProduct: AddProductType) => {
    setIsLoading(true);
    const { title, category, imgCode, description, price } = newProduct;
    console.log("newProduct", newProduct);
    if (
      !allProducts.find((p) => p.title.toLowerCase() === title.toLowerCase())
    ) {
      productsService
        .addProduct(title, category, imgCode, description, price)
        .then((res) => {
          addedProductSeccess();
          addProductToState(res.data.newProduct);
        })
        .catch((e) => {
          const errorMessage = JSON.stringify(e.response.data.message);
          setErrorMessage(errorMessage.replace(/\"/g, ""));
        })
        .finally(() => {
          setIsLoading(false);
          closeModal();
        });
    } else {
      productAlreadyExists();
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline-orange" onClick={openModal}>
        Add {categoryName}
      </Button>
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#6a3c2c", fontWeight: "bold" }}>
            Add {categoryName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleAddProduct}
            validationSchema={productValidationSchema}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                {categoryName === "Product" && (
                  <div>
                    <label htmlFor="category" className="form-label">
                      Category:
                    </label>
                    <br />

                    <Field
                      as="select"
                      className="w-100"
                      name="category"
                      id="category"
                    >
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="nuts">Nuts</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="imgCode" className="form-label">
                    imgCode:
                  </label>
                  <Field
                    name="imgCode"
                    type="text"
                    className="form-control"
                    id="imgCode"
                  />
                  <ErrorMessage
                    name="imgCode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <Field
                    name="description"
                    type="text"
                    className="form-control"
                    id="description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <Field
                    name="price"
                    type="text"
                    className="form-control"
                    id="price"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                  <Button
                    disabled={isLoading}
                    className="mb-3"
                    variant="green1"
                    type="submit"
                  >
                    Add
                  </Button>
                </div>
                {errorMessage && (
                  <div>
                    {errorMessage} <br />
                    <span className="text-brown">Try Again!</span>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProduct;
