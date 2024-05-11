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
import { Badge } from "@/components/ui/badge";

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
      const { showGigsar } = row.original;
      return (
        <span>
          {showGigsar ? (
            <Badge variant="secondary">Live</Badge>
          ) : (
            <Badge variant="destructive">Hidden</Badge>
          )}
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
            <DropdownMenuItem>Change Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
