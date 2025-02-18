"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { HashLoader } from "react-spinners";
import SingleSearch from "@/app/_components/SingleSearch";

export default function Page() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [artistType, setArtistType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    if (artistType === "All") {
      fetchArtists();
      setFilteredArtists(artists);
    } else {
      fetchArtists();
      setFilteredArtists(
        artists.filter((artist) => artist.artistType === artistType)
      );
    }
  }, [artistType]);

  const fetchArtists = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/artist`);
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Failed to fetch artists. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
      <SingleSearch
        type={"Artist Type"}
        topList={["All", "singer-band", "dj", "instrumentalist", "comedian"]}
        selectedItem={artistType}
        setSelectedItem={setArtistType}
        showSearch={false}
      />
      <DataTable columns={columns} data={filteredArtists} />
    </div>
  );
}
