/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleEditData } from "@/redux/Reducer/MainSlice";
import { schema } from "./Schema";
import Input from "@/components/shared/Input";
import FormSubmitButton from "@/components/shared/FormSubmitButton";

interface EditCategoryProps {
  modalClose: (open: boolean) => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ modalClose }) => {
  const dispatch = useDispatch();
  const { editData } = useSelector((state: RootState) => state.main);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editData.name,
      title: editData.title,
    },
  });

  interface FormData {
    name: string;
    title: string;
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/category", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editData,
          ...data,
          createdAt: editData.createdAt
            ? new Date(editData.createdAt).toISOString()
            : null, // Serialize createdAt
          updatedAt: editData.updatedAt
            ? new Date(editData.updatedAt).toISOString()
            : null, // Serialize updatedAt
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Category updated:", result);

        const serializedResult = {
          ...result,
          createdAt: result.createdAt
            ? new Date(result.createdAt).toISOString()
            : null, // Serialize createdAt
          updatedAt: result.updatedAt
            ? new Date(result.updatedAt).toISOString()
            : null, // Serialize updatedAt
        };

        dispatch(handleEditData(serializedResult));
        modalClose(false);
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto px-3 mt-5 space-y-4"
      >
        <h2 className="text-xl font-semibold text-primary">Edit Category</h2>
        <div className="grid grid-cols-1 gap-5">
          <Input
            label="Category Name"
            name="name"
            type="text"
            placeholder="Enter category name"
            register={register}
            error={errors.name}
            required
          />
          <Input
            label="Title"
            name="title"
            type="text"
            placeholder="Enter category title"
            register={register}
            error={errors.title}
          />
        </div>
        <FormSubmitButton
          status="idle"
          buttonName="Update Category"
          context="Updating"
        />
      </form>
    </div>
  );
};

export default EditCategory;
