import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  title: Yup.string().min(2, "please enter at least 2 letters").required(),
  imgCode: Yup.string().required(),
  description: Yup.string().min(8).max(200),
  price: Yup.number().min(1).max(100).required(),
});
