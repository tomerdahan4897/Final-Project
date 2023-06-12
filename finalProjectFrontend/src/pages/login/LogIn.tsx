import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { LogInType } from "../../@types";
import userService from "../../services/user.service";
import { Formik, ErrorMessage, Field } from "formik";
import { logInValidationSchema } from "../../validations/logInValidation";
import userStore from "../../stores/userStore";

function Login() {
  const nav = useNavigate();
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
        const token = res.accessToken;
        const email = res.email;
        const firstName = res.firstName;
        loginInStore(firstName, email, token);
        console.log("connected");
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(JSON.stringify(e.response.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
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
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
