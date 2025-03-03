import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  LayoutDashboard,
  MoreHorizontal,
  Trash,
  Pencil,
} from "lucide-react";
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
import { formatToIndianNumber } from "@/lib/utils";
import Modal from "@/app/_components/Modal";
import { Button } from "@/components/ui/button";
import { Refresh } from "@/app/_components/Refresh";
import toast from "react-hot-toast";

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

const updateBudget = async (_id, budget, budgetName) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/change-budget`,
      {
        _id,
        budget,
        budgetName,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error changing budget:", error);
  }
};

const ShowGigsarCell = ({ initialShowGigsar, name, _id }) => {
  const [showGigsar, setShowGigsar] = useState(initialShowGigsar);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShowGigsar(initialShowGigsar);
  }, [initialShowGigsar]);

  const toggleShowGigsar = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/change-status`,
        { _id },
        { withCredentials: true }
      );
      setShowGigsar(response.data.artist.showGigsar); // Update with new status from the response
    } catch (error) {
      setError(true);
      setErrorMessage(
        error.response?.data?.error || "An unexpected error occurred"
      );
    }
  };

  // Determine the badge label based on the showGigsar status
  const getBadgeLabel = (status) => {
    if (status === "live") return "Live";
    if (status === "unlisted") return "Unlisted";
    if (status === "hidden") return "Hidden";
    return "Hidden"; // Default to "Hidden" if status is undefined or unexpected
  };

  return (
    <span>
      {/* Error Modal */}
      {error && (
        <Modal
          isOpen={error}
          onClose={() => setError(false)}
          title="Error"
          description={errorMessage}
        />
      )}

      {/* Badge and Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Badge
            variant={
              showGigsar === "live"
                ? "secondary"
                : showGigsar === "unlisted"
                ? "warning"
                : "destructive"
            }
          >
            {getBadgeLabel(showGigsar)}
          </Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showGigsar === "live"
                ? `Are you sure you want to hide ${name}?`
                : `Are you sure you want to make ${name}'s profile live?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showGigsar === "live"
                ? `This action will hide ${name} from the Gigsar website. No one can view ${name}'s profile on the Gigsar website.`
                : `This action will make ${name}'s profile live on the Gigsar website. Everyone can view ${name}'s profile on the Gigsar website.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={toggleShowGigsar}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

const deleteArtist = async ({ _id, artistName }) => {
  try {
    console.log("Delete Artist ID:", _id);
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/delete-artist/${_id}`,
      {}, // Empty request body
      {
        withCredentials: true, // Correct placement of the configuration option
      }
    );
    // Redirect to artist list page
    toast.success(`${artistName} Deleted Successfully! Please Refresh`);
  } catch (error) {
    console.error("Error deleting artist:", error);
  }
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
            <AlertDialogAction
              onClick={() => {
                if (
                  mobile.length == 13 &&
                  !mobile.includes(" ") &&
                  mobile.startsWith("+91")
                ) {
                  updateContact(_id, mobile);
                } else {
                  setMobile(initialContact);
                  alert(
                    "Invalid contact number. Please enter a valid 13 digit number starting with +91."
                  );
                }
              }}
            >
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

const ShowBudget = ({ _id, type, budgetName, eventsType, price }) => {
  const initialBudget = price;
  const [budget, setBudget] = useState(price);

  useEffect(() => {
    if (!eventsType?.includes(type)) {
      setBudget("0");
    }
  }, [eventsType, type]);

  return (
    <span>
      <AlertDialog>
        <AlertDialogTrigger>{formatToIndianNumber(budget)}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Artist {type} Budget</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Events Type: {eventsType}</p>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={`Enter ${type} Budget`}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBudget(initialBudget)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => updateBudget(_id, budget, budgetName)}
            >
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
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
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
    cell: ({ row }) => {
      const { location } = row.original;
      return <span>{location?.split(",")[0]}</span>;
    },
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
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Gender
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "eventsType",
    header: "Events",
    cell: ({ row }) => {
      const { eventsType } = row.original;
      return <span>{eventsType?.slice(0, 15)}</span>;
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => {
      const { genre } = row.original;
      return <span>{genre?.slice(0, 15)}</span>;
    },
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
    accessorKey: "managerName",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Mr. Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "managerContact",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Mr. Contact
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "artistType",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Type
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "collegeBudget",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        College
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { _id, eventsType, collegeBudget } = row.original;
      return (
        <ShowBudget
          _id={_id}
          type="College"
          budgetName="collegeBudget"
          eventsType={eventsType}
          price={collegeBudget}
        />
      );
    },
  },
  {
    accessorKey: "corporateBudget",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Corporate
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { _id, eventsType, corporateBudget } = row.original;
      return (
        <ShowBudget
          _id={_id}
          type="Corporate"
          budgetName="corporateBudget"
          eventsType={eventsType}
          price={corporateBudget}
        />
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Wedding
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { _id, eventsType, price } = row.original;
      return (
        <ShowBudget
          _id={_id}
          type="Wedding"
          budgetName="price"
          eventsType={eventsType}
          price={price}
        />
      );
    },
  },
  {
    accessorKey: "ticketingConcertBudget",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Concert
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { _id, eventsType, ticketingConcertBudget } = row.original;
      return (
        <ShowBudget
          _id={_id}
          type="Ticketing Concert"
          budgetName="ticketingConcertBudget"
          eventsType={eventsType}
          price={ticketingConcertBudget}
        />
      );
    },
  },
  {
    accessorKey: "singerCumGuitaristBudget",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        House
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { _id, eventsType, singerCumGuitaristBudget } = row.original;
      return (
        <ShowBudget
          _id={_id}
          type="House Party"
          budgetName="singerCumGuitaristBudget"
          eventsType={eventsType}
          price={singerCumGuitaristBudget}
        />
      );
    },
    // Sorting logic for this column
    sortType: (rowA, rowB, columnId) => {
      const budgetA = parseBudget(rowA.values[columnId]);
      const budgetB = parseBudget(rowB.values[columnId]);
      return budgetA - budgetB;
    },
  },
  {
    accessorKey: "showGigsar",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Status
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { showGigsar, name, _id } = row.original;
      return (
        <ShowGigsarCell initialShowGigsar={showGigsar} name={name} _id={_id} />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const artist = row.original;
      return (
        <div className="flex flex-rows gap-2">
          <Button
            className="px-2 py-1 bg-green-800"
            onClick={() =>
              window.open(
                `https://gigsar.com/artist/${artist.linkid}`,
                "_blank"
              )
            }
          >
            <Eye className="w-[20px] h-[20px]" />
          </Button>
          <Button
            className="px-2 py-1 bg-blue-800"
            onClick={() =>
              window.open(`/edit-artist/${artist.linkid}`, "_blank")
            }
          >
            <Pencil className="w-[20px] h-[20px]" />
          </Button>
          <Button
            className="px-2 py-1 bg-gray-600"
            onClick={() => window.open(`/artist/${artist.linkid}`)}
          >
            <LayoutDashboard className="w-[20px] h-[20px]" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className="bg-primary rounded-lg px-2 py-1 text-white">
              <Trash className="w-[20px] h-[20px]" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {artist.name} account and remove data completely from the
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteArtist({ _id: artist._id, artistName: artist.name });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
