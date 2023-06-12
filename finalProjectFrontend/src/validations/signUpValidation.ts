import * as Yup from "yup";

//initial values for sign up formik
export const signUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  street: "",
  city: "",
};

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string().min(2, "First Name Is Too Short").required(),
  lastName: Yup.string().min(2, "First Name Is Too Short").required(),
  email: Yup.string().email("Please Enter A Valid Email").required(),
  password: Yup.string().min(8, "Password Is Too Short!").required(),
  phone: Yup.string().min(8).max(20).required(),
  street: Yup.string().max(50),
  city: Yup.string().max(25),
});
