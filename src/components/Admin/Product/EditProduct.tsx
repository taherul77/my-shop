/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import { productSchema } from "./Schema";

// Define or import the Category type
interface Category {
  id: number;
  name: string;
}

// Define or import the SubCategory type
interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { handleEditData } from "@/redux/Reducer/MainSlice";

interface EditProductProps {
  modalClose: (open: boolean) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ modalClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedProduct = useSelector(
    (state: RootState) => state.main.editData
  );


  interface ProductFormData {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    subCategoryId?: number | null;
    status: string;
    image: FileList;
  }

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: selectedProduct?.name || "",
      description: selectedProduct?.description || "",
      price: selectedProduct?.price || 0,
      categoryId: selectedProduct?.categoryId || undefined,
      subCategoryId: selectedProduct?.subCategoryId || undefined,
      status: selectedProduct?.status || "ACTIVE",
    },
  });

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category");
        const data = await response.json();
        setCategories(data);
     
        if (selectedProduct?.categoryId) {
          setValue("categoryId", selectedProduct.categoryId);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [selectedProduct, setValue]);

  useEffect(() => {
    if (!selectedCategoryId) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `/api/category/${selectedCategoryId}/subcategories`
        );
        const data = await response.json();
        setSubCategories(data);
       

    
        if (selectedProduct?.subCategoryId) {
          setValue("subCategoryId", selectedProduct.subCategoryId);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId, selectedProduct, setValue]);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", selectedProduct.id); 
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId.toString());
    if (data.subCategoryId)
      formData.append("subCategoryId", data.subCategoryId.toString());
    formData.append("status", data.status);

    const imageFile = data.image[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`/api/product/${selectedProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        modalClose(false);
        reset();
        dispatch(handleEditData(null)); // Clear the edit data in Redux store
      } else {
        console.error("Failed to update product. Status:", response.status);
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
      <h2 className="text-xl font-semibold text-primary">Edit Product</h2>
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
            value: category.id,
            label: category.name,
          }))}
        />
        <Select
          label="Sub-Category"
          name="subCategoryId"
          register={register}
          options={subCategories.map((subCategory) => ({
            value: subCategory.id,
            label: subCategory.name,
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
        <input type="file" accept="image/*" {...register("image")} />
      </div>
      <FormSubmitButton
        status={loading ? "loading" : "idle"}
        buttonName="Update Product"
        context="editProduct"
      />
    </form>
  );
};

export default EditProduct;