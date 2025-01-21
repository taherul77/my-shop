
import * as yup from "yup";



export const productSchema = yup.object().shape({

  name: yup.string().required("Product name is required"),

  description: yup.string().required("Product description is required"),

  price: yup.number().required("Product price is required").positive(),

  categoryId: yup.number().required("Category is required"),

  subCategoryId: yup.number().nullable(),

  status: yup.string().required("Status is required"),

  image: yup.mixed().required("Product image is required"),

  brandId: yup.number().required("Brand is required"),

});
