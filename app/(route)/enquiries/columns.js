import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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

  useEffect(() => {
    setShowStatus(initialStatus);
  }, [initialStatus]);

  return (
    <span>
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
            <AlertDialogTitle>
              Are you sure you want to send message
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will send Enquiry Message to the Artist
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
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
      return reply === "Yes" ? <span>Yes</span> : <span>-</span>;
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
];
