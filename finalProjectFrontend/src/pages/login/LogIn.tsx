import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LogInType } from "../../@types";
import userService from "../../services/user.service";
import { Formik, ErrorMessage, Field } from "formik";
import { logInValidationSchema } from "../../validations/logInValidation";
import userStore from "../../stores/userStore";
import css from "./LogIn.module.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const user = userStore((state) => state);
  const loginInStore = user.login;

  //variables for modal
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogIn = async (logInValues: LogInType) => {
    console.log("tomer");

    setIsLoading(true);
    const { email, password } = logInValues;
    userService
      .login(email, password)
      .then((res) => {
        console.log("res", res);
        const { token, email, firstName, roles } = res;
        loginInStore(firstName, email, token, roles[0]);
        console.log("connected");
      })
      .catch((e) => {
        console.log("e", e);

        const errorMessage = JSON.stringify(e.response?.data.message) || "";
        setErrorMessage(errorMessage.replace(/\"/g, ""));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Button variant="outline-yellow" onClick={openModal}>
        Log In
      </Button>
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#6a3c2c", fontWeight: "bold" }}>
            Log In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleLogIn}
            validationSchema={logInValidationSchema}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                  <Button
                    disabled={isLoading}
                    className="mb-3"
                    variant="orange"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
                {errorMessage && (
                  <div className={css.errorMessageDiv}>
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

export default Login;
