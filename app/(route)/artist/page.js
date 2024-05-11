"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Page() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/artist`);
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={artists} />
    </div>
  );
}
