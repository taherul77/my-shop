import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Product description is required"),
  price: yup.number().required("Product price is required"),
  categoryId: yup.number().required("Category is required"),
  subCategoryId: yup.number().nullable(),
  status: yup.string().required("Status is required"),
  image: yup
    .mixed()
    .test("fileSize", "File is too large", (value) => {
      if (!value || !(value instanceof FileList || Array.isArray(value))) {
        return false;
      }
      return value.length > 0 && value[0].size <= 2000000;
    })
    .required("Product image is required"),
  brandId: yup.number().required("Brand is required"),
  colorIds: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
      })
    )
    .required("At least one color is required"),
});