import { signUpInitialValues, signUpValidationSchema } from "../../validations/signUpValidation"
import { ErrorMessage, Field, Form, Formik } from 'formik'; 
import { SignUpType } from "../../@types";
import { useState } from "react";
import css from './SignUp.module.scss';
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState<string|undefined> (undefined);

const handleSignUp = (signUpValues: SignUpType) => {
  setIsLoading(true);
  const {firstName, lastName, email,  password, phone, street, city} = signUpValues;
  
  //insert the values to the DB;
  userService.signup(firstName, lastName, email, password, phone, street, city).then(res=> {
    console.log(res.data);
    //swal

    nav("/");
  }).catch((e)=> {
    console.log(e);
    setErrorMessage(JSON.stringify(e.response.data));
  }).finally(()=> {
    setIsLoading(false);
  })
}

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
    <h1 className='text-center text-brown mt-3'>Sign Up</h1>
    <div className={css.mainBox}>
    <Formik
    initialValues={signUpInitialValues}
    onSubmit={handleSignUp}
    validationSchema={signUpValidationSchema}>
        <Form className='w-50 mx-auto d-flex flex-column gap-3'>

          <div>
            <label htmlFor="firstName" className="form-label">*First Name:</label>
            <Field name="firstName" type="text" className="form-control" id="firstName" />
            <ErrorMessage name="firstName" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="lastName" className="form-label">*Last Name:</label>
            <Field name="lastName" type="text" className="form-control" id="lastName" />
            <ErrorMessage name="lastName" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="email" className="form-label">*Email:</label>
            <Field name="email" type="email" className="form-control" id="email" />
            <ErrorMessage name="email" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="password" className="form-label">*Password:</label>
            <Field name="password" type="password" className="form-control" id="password" />
            <ErrorMessage name="password" component="div" className="alert alert-danger"/>
          </div>
          <div>
            <label htmlFor="validatePassword" className="form-label">*Validate Password:</label>
            <Field name="validatePassword" type="password" className="form-control" id="validatePassword" />
            <ErrorMessage name="validatePassword" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="phone" className="form-label">*Phone:</label>
            <Field name="phone" type="text" className="form-control" id="phone" />
            <ErrorMessage name="phone" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="street" className="form-label">Address:</label>
            <Field name="street" type="text" className="form-control" id="street" />
            <ErrorMessage name="street" component="div" className="alert alert-danger"/>
          </div>

          <div>
            <label htmlFor="city" className="form-label">City:</label>
            <Field name="city" type="text" className="form-control" id="city" />
            <ErrorMessage name="city" component="div" className="alert alert-danger"/>
          </div>

          <div className={css.reqField}>* Required Field</div>

          <div className="mt-1 mx-auto font-weight-bold">
            <button disabled={isLoading} className="btn btn-orange" type="submit">Sign Up
            </button>
          </div>
        </Form>
    </Formik>
    </div>
    </div>

  )
}

export default SignUp;