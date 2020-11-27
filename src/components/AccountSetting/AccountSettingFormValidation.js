import * as Yup from "yup";
export const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-z0-9_. ]+$/, "Enter a Valid Username")
    .min(4, "Username is Too Short")
    .max(30, "Username is Too Long")
    .lowercase(),
  email: Yup.string()
    .email("Please Enter A Valid Email")
    .min(8, "Please Enter A Valid Email")
    .max(30, "Eamil is Too Large")
    .lowercase(),
  password: Yup.string().min(8),
});
