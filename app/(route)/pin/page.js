"use client";
import { useState, useEffect } from "react";

export default function UpdatePin() {
  const [pin, setPin] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the existing PIN on component mount
  useEffect(() => {
    const fetchPin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get-pin`);
        if (response.ok) {
          const data = await response.json();
          setPin(data.pin || ""); // Set pin to the fetched pin
        }
      } catch (error) {
        console.error("Failed to fetch pin:", error);
      }
    };

    fetchPin();
  }, []);

  // Generate a random, easy-to-remember 4-digit PIN
  const generatePin = () => {
    const pinPatterns = [
      () => {
        const digit1 = Math.floor(Math.random() * 10);
        const digit2 = Math.floor(Math.random() * 10);
        return `${digit1}${digit2}${digit1}${digit2}`; // Pattern: ABAB
      },
      () => {
        const digit = Math.floor(Math.random() * 10);
        return `${digit}${digit}${digit}${digit}`; // Pattern: AAAA
      },
      () => {
        const digit1 = Math.floor(Math.random() * 10);
        const digit2 = (digit1 + 1) % 10;
        const digit3 = (digit1 + 2) % 10;
        const digit4 = (digit1 + 3) % 10;
        return `${digit1}${digit2}${digit3}${digit4}`; // Pattern: Sequential, like 1234
      },
      () => {
        const digits = new Set();
        while (digits.size < 4) {
          digits.add(Math.floor(Math.random() * 10));
        }
        return Array.from(digits).join(""); // Pattern: ABCD, unique digits
      },
    ];

    // Select a random pattern and generate the pin
    const randomPattern =
      pinPatterns[Math.floor(Math.random() * pinPatterns.length)];
    setPin(randomPattern());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/set-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (response.ok) {
        alert("PIN updated successfully!");
      } else {
        alert("Failed to update PIN.");
      }
    } catch (error) {
      console.error("Error updating pin:", error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Update Your PIN
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Current PIN</span>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={4}
              placeholder="Enter your 4-digit PIN"
            />
          </label>

          <button
            type="button"
            onClick={generatePin}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Generate PIN
          </button>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
