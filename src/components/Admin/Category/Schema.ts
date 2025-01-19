import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
});
