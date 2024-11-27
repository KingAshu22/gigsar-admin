"use client";
import React, { useEffect, useState } from "react";
import "react-cropper-custom/dist/index.css";
import "./modal.css"; // Import CSS for modal styles
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import { HashLoader } from "react-spinners";
import SingleSearch from "@/app/_components/SingleSearch";

const ClientRegistration = ({ isModal = false, enquiryId }) => {
  const [expiryTime, setExpiryTime] = useState();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [clientId, setClientId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Function to generate client ID
  const generateClientId = (name) => {
    if (!name) return "";
    const firstName = name.split(" ")[0]; // Get the first word of the name
    const formattedName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000); // 4-digit random code
    return `${formattedName}@${randomCode}`;
  };

  // Generate ID when the name changes
  useEffect(() => {
    if (name) {
      setClientId(generateClientId(name));
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isModal) {
      setShowConfirmationModal(true);
      setError(null);
      setSuccess(false);
    } else {
      handleConfirmSubmit();
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      setShowConfirmationModal(false);
      setIsLoading(true);
      // Handle the submission of form data
      const formData = {
        expiryTime: "",
        name,
        contact,
        email,
        type,
        clientId,
        enquiryId,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/client-registration`,
        formData,
        { withCredentials: true }
      );
      setSuccess(true); // Set success state after successful submission
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred during submission.");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      {!isModal && (
        <h1 className="text-xl font-bold mb-4">User Registration</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="artistName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="artistName"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
            <br />
            (Please Save contact number with +91
            <br />
            otherwise message will not be saved)
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            required
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <SingleSearch
          type="Role"
          list={["Client", "Wedding Planner/Event Manager"]}
          topList={["Client", "Wedding Planner/Event Manager"]}
          selectedItem={type}
          setSelectedItem={setType}
          showSearch={false}
        />
        <div className="flex justify-end">
          {/* Conditionally render the Submit button */}
          {name && email && type && (
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Confirmation modal */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Are you sure you want to submit the form?"
        description={`This will create a profile for ${name}`}
      >
        <div className="flex justify-between">
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            type="button"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </button>
          {name && email && type && (
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={handleConfirmSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </Modal>

      {!isModal && (
        <Modal isOpen={isLoading} title="Submitting Form...">
          <div className="flex justify-center items-center">
            <HashLoader color="#dc2626" size={80} />
          </div>
        </Modal>
      )}

      <Modal
        isOpen={success}
        onClose={() => setSuccess(false)}
        title="Enquiry Details Changed"
      >
        <p>Enquiry Details has been saved and updated successfully.</p>
        <br />
        <p>Now refresh & send enquiry to artist</p>
        {/* <button
          className="bg-primary p-2 rounded-lg text-white m-1"
          onClick={() => {
            router.refresh();
          }}
        >
          Enquiries Dashboard
        </button> */}
      </Modal>

      {error && <p className="error">{error}</p>}
      {!isModal && (
        <Modal
          isOpen={success}
          onClose={() => setSuccess(false)}
          title={`${type} Registered`}
          description={`${name}'s Profile is created successfully`}
        >
          <div className="flex justify-center">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => router.push("/user-dashboard")}
            >
              Dashboard
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ClientRegistration;
