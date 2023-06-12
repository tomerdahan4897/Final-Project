import * as Yup from "yup";

//initial values for sign up formik
export const logInInitialValues = {
  email: "",
  password: "",
};

export const logInValidationSchema = Yup.object({
  email: Yup.string().email("Please Enter A Valid Email").required(),
  password: Yup.string().min(8, "Password Is Too Short!").required(),
});
