import * as Yup from "yup";
export const validationSchema = Yup.object({
  skillName: Yup.string()
    .matches(/^[a-zA-Z0-9_.\- ]+$/, "Enter a Valid Username")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long")
    .required("Please enter name"),
  skillDescription: Yup.string().max(90, "Eamil is Too Large").lowercase(),
  skillWebsite: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  skillExperiance: Yup.string()
    .nullable()
    .matches(
      /(Hands On|Beginner|Intermediate|Professional|Expert|Specialist)/,
      "Do what it says"
    )
    .required("You Must Have Sector"),
  skillPlatform: Yup.string()
    .matches(
      /(Web Development|Web Application|Web Framework|Programming Language|Graphic Design|Web Design|Database|Cloud|Tools|Query Language)/,
      "Do what it says"
    )
    .required("You Must Have Platform"),
});
