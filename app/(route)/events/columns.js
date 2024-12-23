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

const deleteEnquiry = async (_id) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/delete-enquiry`,
      {
        _id: _id,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error changing status:", error);
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
            Are You Sure, You Want to Delete this Enquiry. This cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={async () => {
              await deleteEnquiry(_id);
              toast.success(
                "Enquiry Deleted Successfully, Please Refresh 🔄..."
              );
              router.refresh();
            }}
          >
            Delete Enquiry
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Event Name
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Date
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Location
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
