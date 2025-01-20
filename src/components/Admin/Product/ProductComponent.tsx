"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiEdit, BiTrash } from "react-icons/bi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDispatch } from "react-redux";
import { handleEditData } from "@/redux/Reducer/MainSlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  data: ProductData[];
}

const ProductComponent = ({ data }: Props) => {
  console.log(data);

  const dispatch = useDispatch();

  const columns: ColumnDef<ProductData>[] = [
    {
      header: "Sl No",
      accessorFn: (_row, index) => index + 1,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-start items-center">
            <div
              className={`px-4 py-2 rounded-md ${
                data.status
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {data.status ? "Active" : "Inactive"}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            <button
              className="hover:text-brandColor rounded-md text-black"
              onClick={() => {
                setEditModalOpen(true);
                const serializableData = {
                  ...data,
                  createdAt: data.createdAt
                    ? new Date(data.createdAt).toISOString()
                    : null,
                  updatedAt: data.updatedAt
                    ? new Date(data.updatedAt).toISOString()
                    : null,
                };
                dispatch(handleEditData(serializableData));
              }}
            >
              <BiEdit size={21} />
            </button>
            <button
              className="hover:text-red-500 px-4 py-2 rounded-md text-black ml-2"
              onClick={() => {
                setDeleteModalOpen(true);
                setDataToDelete(data);
              }}
            >
              <BiTrash size={21} />
            </button>
          </>
        );
      },
    },
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  const [dataToDelete, setDataToDelete] = useState<ProductData | null>(null); 

  const handleDelete = async () => {
    if (dataToDelete) {
      try {
        const payload = {
          id: dataToDelete.id,
          isSubCategory: true, // Adjust this flag based on your data
        };

        // Make DELETE request
        const response = await fetch("http://localhost:3000/api/product", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Deleted successfully");
          // Optionally: Dispatch action to remove from Redux state or refetch the data
          // dispatch(handleDeleteData(dataToDelete.id));
        } else {
          console.error("Failed to delete:", await response.text());
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }

      setDeleteModalOpen(false); // Close the modal after deleting
    }
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        searchFieldName={"name"}
        tableName="All Products"
        setAddModalOpen={setAddModalOpen}
      />
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-white w-[50vw]">
          <DialogTitle>
            <VisuallyHidden>Add Category</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <AddProduct modalClose={setAddModalOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white w-[50vw]">
          <DialogTitle>
            <VisuallyHidden>Edit Category</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <EditProduct modalClose={setEditModalOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-white w-[50vw] ">
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
          <DialogHeader>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductComponent;
