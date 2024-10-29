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
import { Input } from "@/components/ui/input";

const toggleShowGigsar = async (_id, setShowGigsar) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/change-status`,
      { _id },
      { withCredentials: true }
    );
    setShowGigsar(response.data.artist.showGigsar);
  } catch (error) {
    console.error("Error changing status:", error);
  }
};

const updateContact = async (_id, mobile) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/change-contact`,
      { _id, mobile: mobile },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error changing status:", error);
  }
};

const ShowGigsarCell = ({ initialShowGigsar, name, _id }) => {
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
                ? `Are you sure you want to hide ${name}?`
                : `Are you sure you want to make ${name}'s profile live?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showGigsar
                ? `This action will hide ${name} from the Gigsar website. No one can view ${name}'s profile on the Gigsar website.`
                : `This action will make ${name}'s profile live on the Gigsar website. Everyone can view ${name}'s profile on the Gigsar website.`}
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
};

const ShowContactModal = ({ _id, contact }) => {
  const initialContact = contact;
  const [mobile, setMobile] = useState(contact);

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>{mobile}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Artist Contact</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter contact number"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMobile(initialContact)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => updateContact(_id, mobile)}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const columns = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "profilePic",
    header: "Profile",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-lg overflow-hidden border-2 border-black">
          <img
            src={row.original.profilePic}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const { _id, contact } = row.original;
      return <ShowContactModal _id={_id} contact={contact} />;
    },
  },
  {
    accessorKey: "artistType",
    header: "Type",
  },
  {
    accessorKey: "collegeBudget",
    header: "College Budget",
  },
  {
    accessorKey: "corporateBudget",
    header: "Corporate Budget",
  },
  {
    accessorKey: "price",
    header: "Wedding Budget",
  },
  {
    accessorKey: "ticketingConcertBudget",
    header: "Ticketing Concert Budget",
  },
  {
    accessorKey: "singerCumGuitaristBudget",
    header: "House Budget",
  },
  {
    accessorKey: "showGigsar",
    header: "Status",
    cell: ({ row }) => {
      const { showGigsar, name, _id } = row.original;
      return (
        <ShowGigsarCell initialShowGigsar={showGigsar} name={name} _id={_id} />
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
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              aria-label="Open menu"
            >
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
            <DropdownMenuItem
              onClick={() => window.open(`/${artist.linkid}/calendar`)}
            >
              Calendar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
