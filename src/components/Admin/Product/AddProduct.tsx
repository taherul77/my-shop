import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import FormSubmitButton from "@/components/shared/FormSubmitButton";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";

import { Category, SubCategory, Brand, Color } from "@prisma/client";
import ReactSelect from "react-select";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  subCategoryId?: number | null | undefined;
  status: string;
  image: FileList;
  brandId: number;
  colorIds: { value: string }[];
}

interface AddProductProps {
  modalClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ modalClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const selectedCategoryId = watch("categoryId");

  // Fetching brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brand");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetching subcategories based on selected category
  useEffect(() => {
    if (!selectedCategoryId) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const response = await fetch(`/api/category/${selectedCategoryId}/subcategories`);
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId]);

  // Fetching colors
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch("/api/color");
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setColors(data.result);
        } else {
          console.error("Fetched data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId.toString());
    if (data.subCategoryId)
      formData.append("subCategoryId", data.subCategoryId.toString());
    formData.append("status", data.status);
    formData.append("image", data.image[0]);
    formData.append("brandId", data.brandId.toString());

    data.colorIds.forEach((color) => {
      formData.append("colorIds[]", color.value);
    });

    const imageFile = data.image[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();
        modalClose();
        reset();
      } else {
        console.error("Failed to add product. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-3 mt-5 space-y-4 max-h[20vh] overflow-y-auto">
      <h2 className="text-xl font-semibold text-primary dark:text-secondary">Add New Product</h2>
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
          required
        />
        <Select
          label="Category"
          name="categoryId"
          register={register}
          options={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
        />
        <Select
          label="Sub-Category"
          name="subCategoryId"
          register={register}
          options={subCategories.map((subCategory) => ({
            value: subCategory.id.toString(),
            label: subCategory.name,
          }))}
        />
        <Select
          label="Brand"
          name="brandId"
          register={register}
          options={brands.map((brand) => ({
            value: brand.id.toString(),
            label: brand.name,
          }))}
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

        <div>
          <label className="block font-semibold text-gray-700">Select Colors</label>
          <Controller
            name="colorIds"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                isMulti
                options={colors.map((color) => ({
                  value: color.id.toString(),
                  label: color.name,
                }))}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            )}
          />
        </div>

        <input type="file" accept="image/*" {...register("image")} />
      </div>
      <FormSubmitButton status={loading ? "loading" : "idle"} buttonName="Add Product" context="addProduct" />
    </form>
  );
};

export default AddProduct;