import * as Yup from "yup";

//initial values for sign up formik
export const contactUsInitialValues = {
  fullName: "",
  mail: "",
  tel: "",
  messageContext: "",
};

export const contactUsValidationSchema = Yup.object({
  fullName: Yup.string().min(2, "Name Is Too Short").required(),
  mail: Yup.string().email("Please Enter A Valid Email").required(),
  tel: Yup.string().min(8).max(15),
  messageContext: Yup.string().min(20).max(300).required(),
});
