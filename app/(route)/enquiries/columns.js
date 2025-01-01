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

const toggleShowStatus = async (
  _id,
  setShowStatus,
  showStatus,
  contact,
  linkid,
  location,
  eventType,
  date,
  budget
) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/client-message`,
      {
        linkid,
        contact,
        selectedLocation: location,
        selectedEventType: eventType,
        selectedDate: date,
        budget,
        _id: _id,
      },
      { withCredentials: true }
    );

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/change-enquiry-status`,
      { _id, enquirySent: showStatus },
      { withCredentials: true }
    );
    if (!showStatus) setShowStatus(!showStatus);
  } catch (error) {
    console.error("Error changing status:", error);
  }
};

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

const ShowStatus = ({
  _id,
  initialStatus,
  contact,
  linkid,
  location,
  eventType,
  date,
  budget,
}) => {
  const [showStatus, setShowStatus] = useState(initialStatus);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setShowStatus(initialStatus);
  }, [initialStatus]);

  return (
    <span>
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Enquiry Details Changed"
        description="Enquiry Details has been saved and updated successfully. Now click on send enquiry button in dashboard"
      >
        <button
          onClick={() => {
            router.push("/enquiries");
          }}
        >
          Enquiries Dashboard
        </button>
      </Modal>
      <Modal
        isOpen={showCreateClient}
        onClose={() => setShowCreateClient(false)}
        title="Create Client"
      >
        <ClientRegistration isModal={true} enquiryId={_id} />
      </Modal>
      <AlertDialog>
        <AlertDialogTrigger>
          {showStatus ? (
            <Badge variant="secondary">Send Again</Badge>
          ) : (
            <Badge variant="destructive">Message Not Sent</Badge>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enquiry Send Details</AlertDialogTitle>
            <AlertDialogDescription>
              Send Enquiry with same or different details
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-black"
              onClick={() => setShowCreateClient(true)}
            >
              Different Details
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() =>
                toggleShowStatus(
                  _id,
                  setShowStatus,
                  showStatus,
                  contact,
                  linkid,
                  location,
                  eventType,
                  date,
                  budget
                )
              }
            >
              Same Details
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
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
    accessorKey: "contactName",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Contact
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "contactType",
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
    accessorKey: "linkid",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Enquired Artist
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { linkid } = row.original;
      return (
        <Link
          className="capitalize text-primary"
          href={`https://www.gigsar.com/artist/${linkid}`}
        >
          {linkid.replace(/-/g, " ")}
        </Link>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Event Type
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
        Event Location
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
        Event Date
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Budget
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { budget } = row.original;
      return <span>{formatToIndianNumber(budget.replace(/,/g, ""))}</span>;
    },
  },
  {
    accessorKey: "paymentDone",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Enquiry Type
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { paymentDone } = row.original;
      return <p>{paymentDone ? "Premium" : "General"}</p>;
    },
  },
  {
    accessorKey: "enquirySent",
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
      const {
        _id,
        enquirySent,
        contact,
        linkid,
        location,
        eventType,
        date,
        budget,
      } = row.original;
      return (
        <ShowStatus
          _id={_id}
          initialStatus={enquirySent}
          contact={contact}
          linkid={linkid}
          location={location}
          eventType={eventType}
          date={date}
          budget={budget}
        />
      );
    },
  },
  {
    accessorKey: "reply",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Availability
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { reply } = row.original;
      return reply?.length > 0 ? <span>{reply}</span> : <span>-</span>;
    },
  },
  {
    accessorKey: "replySent",
    header: ({ column }) => (
      <span
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Replied
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { replySent } = row.original;
      return replySent === "Yes" ? <span>Yes</span> : <span>-</span>;
    },
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
