import * as yup from "yup";

export const brandSchema = yup.object().shape({
  name: yup.string().required("Brand name is required"),
  title: yup.string().optional(),
  status: yup
    .string()
    .oneOf(["ACTIVE", "INACTIVE"], "Status must be either Active or Inactive")
    .required("Status is required"),
  image: yup
    .mixed()
    .test("fileSize", "Image size is too large", (value) => {
      return !value || value[0]?.size <= 2 * 1024 * 1024; // 2MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        !value ||
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
      );
    }),
});
