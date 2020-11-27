import * as Yup from "yup";
export const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-z0-9_.\- ]+$/, "Enter a Valid Username")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long")
    .required("Please enter name")
    .lowercase(),
  lastName: Yup.string()
    .matches(/^[a-z0-9_.\- ]+$/, "Enter a Valid Username")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long")
    .required("Please enter name")
    .lowercase(),
  email: Yup.string()
    .email("Please Enter A Valid Email")
    .min(8, "Please Enter A Valid Email")
    .max(30, "Eamil is Too Large")
    .lowercase()
    .required("Email Can Not Be Empty"),
  companyName: Yup.string()
    .matches(/^[a-z0-9_.\- ]+$/, "Enter a Valid Username")
    .min(3, "Username is Too Short")
    .max(50, "Username is Too Long")
    .required("Please enter name")
    .lowercase(),
  companyWebsite: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  organization: Yup.string()
    .nullable()
    .matches(
      /(Profile|Freelance|Agency|Startup|Enterprise|University|Other)/,
      "Do what it says"
    )
    .required("You Must Have Sector"),
  contactMessage: Yup.string()
    .min(10, "Please Enter A Valid Email")
    .max(65, "Eamil is Too Large")
    .lowercase(),
});
