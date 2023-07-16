import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage, Field } from "formik";
import { UpdatedProductType } from "../../@types";
import { useProductsStore } from "../../stores/productsStore";
import productsService from "../../services/products.service";
import { useNavigate } from "react-router-dom";
import { productValidationSchema } from "../../validations/productValidation";

const EditProduct = ({
  product,
  isClicked,
  setSelectedId,
}: {
  product: any;
  isClicked: boolean;
  setSelectedId: (id: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const nav = useNavigate();
  const initialValues: UpdatedProductType = {
    _id: product._id,
    title: product.title,
    category: product.category,
    imgCode: product.imgCode,
    description: product.description,
    price: product.price,
  };

  const editProduct = useProductsStore((state) => state.editProduct);

  const handleUpdateProduct = async (updatedProduct: UpdatedProductType) => {
    setIsLoading(true);
    const { _id, title, category, imgCode, description, price } =
      updatedProduct;

    productsService
      .updateProduct({ id: _id, title, category, imgCode, description, price })
      .then((res) => {
        console.log("res", res);
        console.log("added");
        editProduct(updatedProduct);
      })
      .catch((e) => {
        const errorMessage = JSON.stringify(e.response.data.message);
        setErrorMessage(errorMessage.replace(/\"/g, ""));
      })
      .finally(() => {
        setIsLoading(false);
      });

    nav("/shop");
  };

  return (
    <>
      <Modal show={isClicked} onHide={() => setSelectedId("")} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#6a3c2c", fontWeight: "bold" }}>
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdateProduct}
            validationSchema={productValidationSchema}
          >
            {(props) => {
              return (
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

                  <div>
                    <label htmlFor="imgCode" className="form-label">
                      imgCode
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
                      onClick={() => {
                        setSelectedId("");
                      }}
                    >
                      Update
                    </Button>
                  </div>
                  {errorMessage && (
                    <div>
                      {errorMessage} <br />
                      <span className="text-brown">Try Again!</span>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProduct;
