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
  DialogTrigger
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useDispatch } from "react-redux";
import { handleEditData } from "@/redux/Reducer/MainSlice";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
const CategoryComponent = () => {
  const dispatch = useDispatch();

  const data = [
    {
      name: "Computers",
      title: "All computers",
      parentId: 10,
    },
  ];
  const columns: ColumnDef<any>[] = [
    {
      header: "Sl No",
      accessorFn: (_row, index) => index + 1, 
      cell: ({ row }) => (
        <div>{row.index + 1}</div> 
      ),
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
      accessorKey: "activeStatus",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-start items-center">
            <div
              className={`px-4 py-2 rounded-md ${
                data.activeStatus
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {data.activeStatus ? "Active" : "Inactive"}
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
          <>
            
            <button
              className="bg-primary hover:bg-brandColor px-4 py-2 rounded-md text-white "
              onClick={() => {
                setEditModalOpen(true);
                dispatch(handleEditData(data));
              }}
            >
              Edit
            </button>
          </>
        );
      },
    },
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <div>
    <DataTable
      data={data}
      columns={columns}
      searchFieldName={"name"}
      tableName="Category"
      setAddModalOpen={setAddModalOpen}
    />
    <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
      <DialogContent className="bg-white w-[50vw]">
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden>Category Dialog</VisuallyHidden>
          </DialogTitle>
          <DialogDescription>
            <AddCategory modalClose={setAddModalOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CategoryComponent;
