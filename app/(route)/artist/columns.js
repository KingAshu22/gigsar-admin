import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Toggle showGigsar status
const toggleShowGigsar = async (_id, setShowGigsar) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/change-status`,
      { _id },
      { withCredentials: true }
    );
    const updatedArtist = response.data.artist;
    setShowGigsar(updatedArtist.showGigsar);
  } catch (error) {
    console.error("Error changing status:", error);
  }
};

export const columns = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "profilePic",
    header: "Profile",
    cell: ({ row }) => {
      const { profilePic } = row.original;
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg overflow-hidden border-2 border-black">
            <img
              src={profilePic}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "artistType",
    header: "Type",
  },
  {
    accessorKey: "showGigsar",
    header: "Status",
    cell: ({ row }) => {
      const { showGigsar: initialShowGigsar, name, _id } = row.original;
      const [showGigsar, setShowGigsar] = useState(initialShowGigsar);

      useEffect(() => {
        setShowGigsar(initialShowGigsar);
      }, [initialShowGigsar]);

      return (
        <span>
          <AlertDialog>
            <AlertDialogTrigger>
              {showGigsar ? (
                <Badge variant="secondary">Live</Badge>
              ) : (
                <Badge variant="destructive">Hidden</Badge>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {showGigsar
                    ? `Are you sure to hide ${name}?`
                    : `Are you sure to make ${name}'s Profile Live?`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {showGigsar
                    ? `This action will hide ${name} from Gigsar Website. No one can
                  view ${name}'s profile on Gigsar Website.`
                    : `This action will make ${name}'s profile Live on Gigsar Website. Everyone can
                  view ${name}'s profile on Gigsar Website.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => toggleShowGigsar(_id, setShowGigsar)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const artist = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  `https://gigsar.com/artist/${artist.linkid}`,
                  "_blank"
                )
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => window.open(`/edit-artist/${artist.linkid}`)}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
