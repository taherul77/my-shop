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
import Image from "next/image";
import { BiEdit, BiTrash } from "react-icons/bi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDispatch } from "react-redux";
import { handleEditData } from "@/redux/Reducer/MainSlice";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";

interface BrandData {
  id: number;
  name: string;
  status: string;
  imagePath?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

interface Props {
  data: BrandData[];
}

const BrandComponent = ({ data }: Props) => {
  const dispatch = useDispatch();

  const columns: ColumnDef<BrandData>[] = [
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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.getValue("image");
        return (
          <div className="flex items-center">
            {image ? (
              <Image
                src={image as string}
                alt="Product"
                width={64}
                height={64}
                className="object-cover rounded-md"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-start items-center ">
            <div
              className={`px-4 py-2 rounded-md ${
                data.status === "ACTIVE"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {data.status === "ACTIVE" ? "Active" : "Inactive"}
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
          <div className="flex justify-start items-center">
            <button
              className="hover:text-brandColor rounded-md text-black dark:text-white dark:hover:text-brandColor"
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
              className="hover:text-red-500 px-4 py-2 rounded-md text-black dark:text-white dark:hover:text-red-500 ml-2"
              onClick={() => {
                setDeleteModalOpen(true);
                setDataToDelete(data);
              }}
            >
              <BiTrash size={21} />
            </button>
          </div>
        );
      },
    },
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [dataToDelete, setDataToDelete] = useState<BrandData | null>(null);

  const handleDelete = async () => {
    if (dataToDelete) {
      try {
        const payload = {
          id: dataToDelete.id,
          isSubCategory: true,
        };

        const response = await fetch("http://localhost:3000/api/brand", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Optionally: Dispatch action to remove from Redux state or refetch the data
          // dispatch(handleDeleteData(dataToDelete.id));
        } else {
          console.error("Failed to delete:", await response.text());
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }

      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="">
      <DataTable
        data={data}
        columns={columns}
        searchFieldName={"name"}
        tableName="All Brands"
        setAddModalOpen={setAddModalOpen}
      />
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-white w-[50vw] mix-h-[80vh]">
          <DialogTitle>
            <VisuallyHidden>Add Brand</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <AddBrand modalClose={setAddModalOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white w-[50vw] mix-h-[80vh] overflow-auto">
          <DialogTitle>
            <VisuallyHidden>Edit Brand</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <EditBrand modalClose={setEditModalOpen} />
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

export default BrandComponent;