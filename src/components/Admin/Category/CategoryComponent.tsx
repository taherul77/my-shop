/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDispatch } from "react-redux";
import { handleEditData } from "@/redux/Reducer/MainSlice";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

interface CategoryComponentProps {
  data: any;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  const dispatch = useDispatch();

  const columns: ColumnDef<any>[] = [
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
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <button
            className="bg-primary hover:bg-brandColor px-4 py-2 rounded-md text-white"
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
            Edit
          </button>
        );
      },
    },
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        searchFieldName={"name"}
        tableName="All Category"
        setAddModalOpen={setAddModalOpen}
      />
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-white w-[50vw]">
          <DialogTitle>
            <VisuallyHidden>Add Category</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <AddCategory modalClose={setAddModalOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white w-[50vw]">
          <DialogTitle>
            <VisuallyHidden>Edit Category</VisuallyHidden>
          </DialogTitle>
          <DialogHeader>
            <EditCategory modalClose={setEditModalOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryComponent;
