"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import ContactVisibilityForm from "@/app/_components/ContactVisibilityForm";

const ContactVisibility = ({ params }) => {
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const response = await axios.get(
          `/api/artist-contact-visibility/${params.artist}`
        );
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      } finally {
        setLoading(false);
      }
    };
    getArtist();
  }, [params.artist]);

  const handleSave = async (contactVisibility) => {
    await axios.put(`/api/artist-contact-visibility/${params.artist}`, {
      contactVisibility,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <HashLoader color="#dc2626" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <Button
        className="mb-2"
        onClick={() => router.push(`/artist/${params.artist}`)}
      >
        Back to Dashboard
      </Button>
      <hr className="mb-10" />
      <h1 className="text-xl font-bold mb-4">
        Public Contact Options{artist?.name ? ` for ${artist.name}` : ""}
      </h1>
      {artist ? (
        <ContactVisibilityForm
          contact={artist.contact}
          email={artist.email}
          initialValue={artist.contactVisibility}
          onSave={handleSave}
        />
      ) : (
        <p className="text-gray-500">Artist not found.</p>
      )}
    </div>
  );
};

export default ContactVisibility;
