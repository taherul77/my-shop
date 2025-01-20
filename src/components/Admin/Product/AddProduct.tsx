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
  interface Category {
    id: number;
    name: string;
  }

  interface SubCategory {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const selectedCategoryId = watch("categoryId");

  // Fetch categories on component mount
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

  // Fetch subcategories whenever a category is selected
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

  interface FormData {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    subCategoryId?: number;
    status: string;
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);
        modalClose(false);
        reset();
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto px-3 mt-5 space-y-4"
      >
        <h2 className="text-xl font-semibold text-primary">Add New Product</h2>
        <div className="grid grid-cols-1 gap-5">
          <Input
            label="Product Name"
            name="name"
            type="text"
            placeholder="Enter product name"
            register={register}
            error={errors.name}
            required
          />

          <Input
            label="Description"
            name="description"
            type="text"
            placeholder="Enter product description"
            register={register}
            error={errors.description}
          />

          <Input
            label="Price"
            name="price"
            type="number"
            placeholder="Enter product price"
            register={register}
            error={errors.price}
          />

          <Select
            label="Category"
            name="categoryId"
            register={register}
            error={errors.categoryId}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            placeholder="Select category"
          />

          <Select
            label="Sub-Category"
            name="subCategoryId"
            register={register}
            error={errors.subCategoryId}
            options={subCategories.map((subCategory) => ({
              value: subCategory.id,
              label: subCategory.name,
            }))}
            placeholder="Select sub-category"
            disabled={!selectedCategoryId} // Disable when no category is selected
          />

          <Select
            label="Status"
            name="status"
            register={register}
            error={errors.status}
            options={[
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
            ]}
            placeholder="Select status"
          />
        </div>
        <FormSubmitButton
          status={loading ? "loading" : "idle"}
          buttonName="Add Product"
          context="Adding"
        />
      </form>
    </div>
  );
};

export default AddProduct;
