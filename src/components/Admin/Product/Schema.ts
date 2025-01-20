import * as yup from "yup";
export const productSchema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').positive('Price must be a positive number'),
    categoryId: yup.number().required('Category is required'),
    subCategoryId: yup.number().optional(),
    status: yup.string().required('Status is required'),
});