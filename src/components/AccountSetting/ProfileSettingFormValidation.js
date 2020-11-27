import * as Yup from "yup";
export const validationSchema = Yup.object({
  profileHeadline: Yup.string().max(99, "Eamil is Too Large"),
  profileAboutMe: Yup.string().max(500, "Eamil is Too Large"),
  profileOrganization: Yup.string()
    .matches(/^[a-zA-Z0-9_.\- ]+$/, "Enter a Valid Username")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long"),
  profileOrganizationUrl: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  ),
  facebook: Yup.string().matches(
    /((https?):\/\/)?(www.)?[facebook]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9.#]+)$/,
    "Enter correct facebook url"
  ),
  github: Yup.string().matches(
    /((https?):\/\/)?(www.)?[github]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)$/,
    "Enter correct github url"
  ),
  twitter: Yup.string().matches(
    /((https?):\/\/)?(www.)?[twitter]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)$/,
    "Enter correct twitter url"
  ),
  linkedin: Yup.string().matches(
    /((https?):\/\/)?(www.)?[linkedin]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct linkedin url"
  ),
  profileLocation: Yup.string()
    .matches(/^[a-zA-Z0-9_.\- ]+$/, "Enter a Valid Location")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long"),
  profileCountry: Yup.string()
    .matches(/^[a-zA-Z_.\- ]+$/, "Enter a Valid Country")
    .min(3, "Username is Too Short")
    .max(30, "Username is Too Long"),
  website: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  ),
});
