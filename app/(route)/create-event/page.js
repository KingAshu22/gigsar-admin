"use client";

import { useState } from "react";
import axios from "axios";
import PhotoUploader from "@/app/_components/PhotoUploader";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    flyer: "",
    seats: [],
  });

  const [newSeat, setNewSeat] = useState({ type: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSeatChange = (e) => {
    const { name, value } = e.target;
    setNewSeat((prevSeat) => ({
      ...prevSeat,
      [name]: value,
    }));
  };

  const addSeatType = () => {
    if (!newSeat.type || !newSeat.price) {
      alert("Please provide both seat type and price.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      seats: [...prevData.seats, newSeat],
    }));
    setNewSeat({ type: "", price: "" });
  };

  const removeSeatType = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      seats: prevData.seats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/events", formData);
      alert("Event created successfully!");
      setFormData({ name: "", date: "", location: "", seats: [] });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Event Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="flyer"
            className="block text-sm font-medium text-gray-700"
          >
            Flyer Image
          </label>
          <PhotoUploader
            artistName={formData.name}
            setProfilePic={(link) =>
              setFormData((prevData) => ({ ...prevData, flyer: link }))
            }
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">
            Seat Types and Prices
          </legend>
          <div className="mt-4 space-y-2">
            {formData.seats.map((seat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-700">
                  {seat.type} - ₹{seat.price}
                </span>
                <button
                  type="button"
                  onClick={() => removeSeatType(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex space-x-2 mt-4">
              <input
                type="text"
                name="type"
                value={newSeat.type}
                onChange={handleSeatChange}
                placeholder="Seat Type (e.g., Gold)"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                name="price"
                value={newSeat.price}
                onChange={handleSeatChange}
                placeholder="Price"
                min="0"
                step="0.01"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addSeatType}
                className="py-2 px-4 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
