"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { HashLoader } from "react-spinners";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch initial enquiries
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/get-enquiries`
      );
      const enquiries = response.data;

      // Map through enquiries to fetch additional contact details
      const enrichedEnquiries = await Promise.all(
        enquiries.map(async (enquiry) => {
          try {
            const contactResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API}/client/contact/${enquiry.contact}`
            );
            const { name, email, type } = contactResponse.data;

            // Add contact details to the enquiry object
            return {
              ...enquiry,
              contactName: name,
              contactEmail: email,
              contactType: type,
            };
          } catch (contactError) {
            console.error(
              `Error fetching contact details for ${enquiry.contact}:`,
              contactError
            );
            return {
              ...enquiry,
              contactName: null,
              contactEmail: null,
              contactType: null,
            };
          }
        })
      );

      // Set enriched enquiries
      setEnquiries(enrichedEnquiries);
    } catch (error) {
      console.error("Error fetching Enquiries:", error);
      setError("Failed to fetch Enquiries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center p-10">
          <HashLoader color="#dc2626" size={80} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={enquiries} />
    </div>
  );
}
