"use client";
import React, { useEffect, useState } from "react";
import "react-cropper-custom/dist/index.css";
import "@/app/_components/modal.css"; // Import CSS
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import { HashLoader } from "react-spinners";
import SearchList from "@/app/_components/SearchList";
import instrumentOptions from "@/app/(route)/registration/constants/instruments";
import topInstruments from "@/app/(route)/registration/constants/topInstruments";
import { Button } from "@/components/ui/button";

const EditArtist = ({ params }) => {
  const [id, setId] = useState();

  const getArtist = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/artist/artistName/` + params.artist
      );
      const artistData = response.data;

      setId(artistData._id);
      setArtistName(artistData.name);

      const instrumentsArray = artistData.instruments
        .split(",")
        .map((type) => type.trim());

      setInstruments(instrumentsArray);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      // Reset loading state
      setFetchData(false);
    }
  };

  const [artistName, setArtistName] = useState();
  const [instruments, setInstruments] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getArtist();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    setError(null);
    setSuccess(false);
  };

  const handleConfirmSubmit = async () => {
    try {
      setShowConfirmationModal(false);
      setIsLoading(true);
      // Handle the submission of form data
      const formData = {
        instruments,
      };

      const response = axios.post(
        `${process.env.NEXT_PUBLIC_API}/edit-instruments/${id}`,
        formData,
        { withCredentials: true }
      );
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred during submission.");
    } finally {
      // Reset loading state
      setIsLoading(false);
      setSuccess(true);
    }
  };

  return (
    <>
      {fetchData ? (
        <div className="container mx-auto py-10">
          <div className="flex justify-center items-center p-10">
            <HashLoader color="#dc2626" size={80} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-5">
          <Button
            className="mb-2"
            onClick={() => {
              router.push(`/artist/${params.artist}`);
            }}
          >
            Back to Dashboard
          </Button>
          <hr className="mb-10" />
          <h1 className="text-xl font-bold mb-4">
            Which instruments do you play?
          </h1>
          <form onSubmit={handleSubmit}>
            <SearchList
              type="Instruments"
              list={instrumentOptions}
              topList={topInstruments}
              selectedItems={instruments}
              setSelectedItems={setInstruments}
            />

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </form>
          {/* Confirmation modal */}
          <Modal
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            title="Are you sure you want to update?"
            description={`This will update Instruments Data for ${artistName}`}
          >
            <div className="flex justify-between">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                type="button"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                onClick={handleConfirmSubmit}
              >
                Update
              </button>
            </div>
          </Modal>

          <Modal isOpen={isLoading} title="Updating Instruments Data...">
            <div className="flex justify-center items-center">
              <HashLoader color="#dc2626" size={80} />
            </div>
          </Modal>

          {error && <p className="error">{error}</p>}
          <Modal
            isOpen={success}
            onClose={() => setSuccess(false)}
            title="Artist Data Updated"
            description={`${artistName}'s Instruments Data has been submitted.`}
          >
            <div className="flex justify-center">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                onClick={() => router.push(`/artist/${params.artist}`)}
              >
                Dashboard
              </button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default EditArtist;
