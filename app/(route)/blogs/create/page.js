"use client";

import React, { useState, useEffect } from "react";
import RichTextEditor from "@/app/_components/RichTextEditor";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Utility function to convert title to kebab-case URL
const generateUrl = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");

  // Handle title change and generate URL and Meta Title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setUrl(generateUrl(newTitle));
    setMetaTitle(`${newTitle} from Gigsar`);
  };

  // Handle content change from RichTextEditor
  const handleContentChange = (data) => {
    setContent(data);
  };

  // Handle save button click
  const handleSave = async () => {
    console.log("Inside Handle Save");

    const blogData = {
      title,
      url,
      metaTitle,
      metaDescription,
      keywords,
      content,
    };

    console.log(blogData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/gigsar-create-blog`,
        blogData,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to save blog:", error);
      alert("Failed to save blog.");
    }
  };

  return (
    <div>
      <h1>Create Your Blog</h1>

      <div>
        <label>Blog Title:</label>
        <Input
          type="text"
          className="mb-4"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter blog title"
        />
      </div>

      <div>
        <label>Blog URL:</label>
        <p className="mb-4">{url}</p>
      </div>

      <div>
        <label>Meta Title:</label>
        <Input
          type="text"
          className="mb-4"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Enter meta title"
        />
      </div>

      <div>
        <label>Meta Description:</label>
        <Textarea
          value={metaDescription}
          className="mb-4"
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Enter meta description"
        />
      </div>

      <div>
        <label>Keywords:</label>
        <Input
          type="text"
          className="mb-4"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords separated by commas"
        />
      </div>

      <RichTextEditor onChange={handleContentChange} />

      <Button className="my-8" onClick={handleSave}>
        Create Blog
      </Button>
    </div>
  );
}
