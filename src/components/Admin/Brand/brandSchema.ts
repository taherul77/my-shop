
import * as yup from "yup";



export const brandSchema = yup.object().shape({

  name: yup.string().required("Brand name is required"),

  title: yup.string().nullable().notRequired(),

  status: yup.mixed<"ACTIVE" | "INACTIVE">().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),

  image: yup.mixed<FileList>().notRequired(),

});
