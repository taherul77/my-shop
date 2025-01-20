import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import { productSchema } from "./Schema";

interface AddProductProps {
  modalClose: (open: boolean) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ modalClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  interface ProductFormData {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    subCategoryId?: number;
    status: string;
    image: FileList;
  }
  
  const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
  });

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/category/${selectedCategoryId}/subcategories`
        );
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId]);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId.toString());
    if (data.subCategoryId) formData.append("subCategoryId", data.subCategoryId.toString());
    formData.append("status", data.status);
    
    // Append image if selected
    const imageFile = data.image[0]; // Assuming a file input with name 'image'
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Debugging logs
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);
        modalClose(false);
        reset();
      } else {
        const errorText = await response.text();
        console.error(`Failed to add product. Status: ${response.status}, Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-3 mt-5 space-y-4">
      <h2 className="text-xl font-semibold text-primary">Add New Product</h2>
      <div className="grid grid-cols-1 gap-5">
        <Input label="Product Name" name="name" type="text" placeholder="Enter product name" register={register} error={errors.name} required />
        <Input label="Description" name="description" type="text" placeholder="Enter product description" register={register} error={errors.description} />
        <Input label="Price" name="price" type="number" placeholder="Enter product price" register={register} error={errors.price} required />
        <Select
          label="Category"
          name="categoryId"
          register={register}
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
        <Select
          label="Sub-Category"
          name="subCategoryId"
          register={register}
          options={subCategories.map((subCategory) => ({ value: subCategory.id, label: subCategory.name }))}
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
      <FormSubmitButton status={loading ? "loading" : "idle"} buttonName="Add Product" context="addProduct" />
    </form>
  );
};

export default AddProduct;