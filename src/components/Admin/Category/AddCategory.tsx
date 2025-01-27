/* eslint-disable @typescript-eslint/no-unused-vars */
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { schema } from "./Schema";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select"; // Assuming you have a Select component


interface AddCategoryProps {

  modalClose: (open: boolean) => void;

}

const AddCategory: React.FC<AddCategoryProps> = ({ modalClose }) => {
  interface Category {
    id: number;
    name: string;
  }
  
 

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  interface FormData {
    name: string;
    title: string;
    parentId?: number;
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    if (data.parentId) {
      data.parentId = Number(data.parentId);
    }

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
       
        modalClose(false); 
        reset();
      } else {
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const onError = (errors: Record<string, unknown>) => {
    // handle form errors
    console.error(errors);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="container mx-auto px-3 mt-5 space-y-4"
      >
        <h2 className="text-xl font-semibold text-primary dark:text-secondary">Add New Category</h2>
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
          buttonName="Add Category"
          context="Adding"
        />
      </form>
    </div>
  );
};

export default AddCategory;