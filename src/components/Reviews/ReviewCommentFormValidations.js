import * as Yup from "yup";
export const validationSchema = Yup.object({
  reviewCommentBody: Yup.string()
    .max(500, "Review is too long. (max 500 words)")
    .required("Review body can not be empty"),
});
