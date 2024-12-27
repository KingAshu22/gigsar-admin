import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatToIndianNumber } from "@/lib/utils";
import Modal from "@/app/_components/Modal";
import ClientRegistration from "@/app/_components/ClientRegistration";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const deleteBlog = async (_id) => {
  try {
    await axios.delete(`/api/blogs/${_id}`, { withCredentials: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

const ShowDelete = ({ _id }) => {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-600 p-1 rounded-lg text-white">
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are You Sure, You Want to Delete this Blog. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={async () => {
              await deleteBlog(_id);
              toast.success("Blog Deleted Successfully, Please Refresh 🔄...");
              router.refresh();
            }}
          >
            Delete Blog
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns = [
  {
    accessorKey: "pageTitle",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Page Title
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "keywords",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Keywords
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "_id",
    header: "Delete",
    cell: ({ row }) => {
      const { _id } = row.original;
      return <ShowDelete _id={_id} />;
    },
  },
];
