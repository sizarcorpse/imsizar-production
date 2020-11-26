import * as Yup from "yup";

export const validationSchema = Yup.object({
  fristName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Enter a Valid Username")
    .trim()
    .min(2, "Username is Too Short")
    .max(30, "Username is Too Long")
    .required(""),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Enter a Valid Username")
    .trim()
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long")
    .required(""),
  username: Yup.string()
    .matches(/^[a-z0-9_.]+$/, "Enter a Valid Username")
    .trim()
    .min(4, "Username is Too Short")
    .max(30, "Username is Too Long")
    .lowercase()
    .required(""),
  email: Yup.string()
    .email("Please Enter A Valid Email")
    .min(8, "Please Enter A Valid Email")
    .max(30, "Eamil is Too Large")
    .lowercase()
    .required("Email Can Not Be Empty"),
  password: Yup.string().min(8).required("password Can Not Be Empty"),
});
