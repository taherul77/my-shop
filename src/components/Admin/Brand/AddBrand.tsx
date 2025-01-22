import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import { brandSchema } from "./brandSchema";

interface AddBrandProps {
  modalClose: (open: boolean) => void;
}

const AddBrand: React.FC<AddBrandProps> = ({ modalClose }) => {
  const [loading, setLoading] = useState(false);

  interface BrandFormData {
    name: string;
    title?: string;
    status: string;
    image: FileList;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: yupResolver(brandSchema),
  });

  const onSubmit: SubmitHandler<BrandFormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    if (data.title) formData.append("title", data.title);
    formData.append("status", data.status);

    const imageFile = data.image[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/brand", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
      
        modalClose(false);
        reset();
      } else {
        console.error("Failed to add brand. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <h2 className="text-xl font-semibold text-primary">Add New Brand</h2>
      <div className="grid grid-cols-1 gap-5">
        <Input
          label="Brand Name"
          name="name"
          type="text"
          placeholder="Enter brand name"
          register={register}
          error={errors.name}
          required
        />
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="Enter brand title (optional)"
          register={register}
          error={errors.title}
        />
        <Select
          label="Status"
          name="status"
          register={register}
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
        />
        <input type="file" accept="image/*" {...register("image")} />
      </div>
      <FormSubmitButton
        status={loading ? "loading" : "idle"}
        buttonName="Add Brand"
        context="addBrand"
      />
    </form>
  );
};

export default AddBrand;
