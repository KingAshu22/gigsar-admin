"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailList = emails.split(",").map((email) => email.trim());

    try {
      const response = await axios.post("/api/sendEmail", {
        emails: emailList,
        subject,
        htmlContent,
      });
      setStatus("Bulk emails sent successfully!");
    } catch (error) {
      setStatus("Failed to send bulk emails.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Bulk Marketing Emails</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Recipient Emails (comma-separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="w-full p-2 border rounded h-20"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Paste your HTML content here"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-full p-2 border rounded h-40"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Bulk Emails
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}
