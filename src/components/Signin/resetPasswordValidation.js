import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter A Valid Email")
    .min(8, "Please Enter A Valid Email")
    .max(30, "Eamil is Too Large")
    .lowercase()
    .required("Email Can Not Be Empty"),
});
