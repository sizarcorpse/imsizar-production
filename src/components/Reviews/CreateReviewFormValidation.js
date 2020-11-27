import * as Yup from "yup";
export const validationSchema = Yup.object({
  reviewTitle: Yup.string()
    .min(4, "Title is Too Short")
    .max(50, "Title is Too Long"),
  reviewBody: Yup.string()
    .min(10, "Review is too shot")
    .max(500, "Review is too long. (max 500 words)")
    .required("Review body can not be empty"),
});
