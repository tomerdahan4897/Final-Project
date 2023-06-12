import {
  contactUsInitialValues,
  contactUsValidationSchema,
} from "../../validations/contactUsValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ContactUsType } from "../../@types";
import { useState } from "react";
import css from "./ContactUs.module.scss";
import pic from "../../assets/contactUsPics/contactUsPic.png";
import contactUsService from "../../services/contactUs.service";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const nav = useNavigate();

  const handleContactUs = (contactUsValues: ContactUsType) => {
    setIsLoading(true);
    const { fullName, mail, tel, messageContext } = contactUsValues;

    //send the content to the DB:
    contactUsService
      .newContactUsMessage(fullName, mail, tel, messageContext)
      .then((res) => {
        console.log(res.data);
        //swal
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
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center text-brown mt-3">Contact Us</h1>

      <div className={css.splitBox}>
        <Formik
          className={css.formBox}
          initialValues={contactUsInitialValues}
          onSubmit={handleContactUs}
          validationSchema={contactUsValidationSchema}
        >
          <Form
            className={`${css.secondFormBox} mx-auto d-flex flex-column gap-3`}
          >
            <div>
              <label htmlFor="fullName" className="form-label">
                Name:
              </label>
              <Field
                name="fullName"
                type="text"
                className="form-control"
                id="fullName"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div>
              <label htmlFor="mail" className="form-label">
                Email:
              </label>
              <Field
                name="mail"
                type="mail"
                className="form-control"
                id="mail"
              />
              <ErrorMessage
                name="mail"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div>
              <label htmlFor="tel" className="form-label">
                Phone:
              </label>
              <Field name="tel" type="tel" className="form-control" id="tel" />
              <ErrorMessage
                name="tel"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div>
              <label htmlFor="messageContext" className="form-label">
                Message:
              </label>
              <Field
                name="messageContext"
                component="textarea"
                type="text"
                rows="5"
                className="form-control"
                id="messageContext"
              />
              <ErrorMessage
                name="messageContext"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="mt-2 mx-auto">
              <button
                disabled={isLoading}
                className="btn btn-orange"
                type="submit"
              >
                Send
              </button>
            </div>
          </Form>
        </Formik>
        <div className={css.picBox}>
          <img src={pic} alt="contact, phone, mail" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
