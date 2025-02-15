"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the WYSIWYG editor to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "video", "formula"],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

// SEO analysis function
const analyzeSEO = (formData) => {
  const { metaTitle, metaDescription, keywords, content, pageTitle } = formData;

  const seoChecks = {
    metaTitleCheck: metaTitle.length >= 10 && metaTitle.length <= 60,
    metaDescriptionCheck:
      metaDescription.length >= 50 && metaDescription.length <= 160,
    keywordsCheck:
      keywords.split(",").map((k) => k.trim()).length >= 1 &&
      keywords.split(",").map((k) => k.trim()).length <= 5,
    contentCheck:
      content.split(" ").length >= 300 && content.split(" ").length <= 15000,
    headingCheck: (content.match(/<h[1-6][^>]*>/g) || []).length >= 1,
    multimediaCheck: content.includes("<img") || content.includes("video"),
    keywordDensityCheck: false,
    keywordStuffingCheck: false,
    headingKeywordCheck: false,
    internalLinksCheck: 0,
    externalLinksCheck: 0,
  };

  const keywordList = keywords.split(",").map((k) => k.trim());
  const keywordDensity = (
    content.match(new RegExp(keywordList.join("|"), "gi")) || []
  ).length;
  const keywordCount = content.split(" ").length;
  const keywordDensityPercentage = (keywordDensity / keywordCount) * 100;

  // Keyword density check (2% to 5% is ideal, over 5% could be keyword stuffing)
  if (keywordDensityPercentage >= 2 && keywordDensityPercentage <= 5) {
    seoChecks.keywordDensityCheck = true;
  }

  // Keyword stuffing check (if density is above 5%, mark as keyword stuffing)
  if (keywordDensityPercentage > 5) {
    seoChecks.keywordStuffingCheck = true;
  }

  // Check if keyword is in the page title (H1)
  if (
    pageTitle &&
    keywordList.some((keyword) =>
      pageTitle.toLowerCase().includes(keyword.toLowerCase())
    )
  ) {
    seoChecks.headingKeywordCheck = true;
  }

  // Count internal and external links
  const internalLinks = (content.match(/href="\/([^"]+)"/g) || []).length; // Internal link pattern (relative URLs)
  const externalLinks = (content.match(/href="http([^"]+)"/g) || []).length; // External link pattern (absolute URLs)

  seoChecks.internalLinksCheck = internalLinks;
  seoChecks.externalLinksCheck = externalLinks;

  let score = 0;
  const maxScore = 100;

  // Calculate score
  if (seoChecks.metaTitleCheck) score += 20;
  if (seoChecks.metaDescriptionCheck) score += 20;
  if (seoChecks.keywordsCheck) score += 20;
  if (seoChecks.contentCheck) score += 20;
  if (seoChecks.headingCheck) score += 10;
  if (seoChecks.multimediaCheck) score += 10;

  return {
    score: Math.min(score, maxScore),
    checks: seoChecks,
    keywordDensityPercentage,
  };
};

export default function BlogForm({ params }) {
  const { slug } = params;
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    pageTitle: "",
    link: "",
    videos: [""],
    keywords: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch blog data");
      }
    };

    fetchBlog();
  }, [slug]);

  const [seoScore, setSeoScore] = useState(0);
  const [seoChecks, setSeoChecks] = useState({
    metaTitleCheck: false,
    metaDescriptionCheck: false,
    keywordsCheck: false,
    contentCheck: false,
    headingCheck: false,
    multimediaCheck: false,
    keywordDensityCheck: false,
    keywordStuffingCheck: false,
    headingKeywordCheck: false,
    internalLinksCheck: 0,
    externalLinksCheck: 0,
  });

  const [keywordDensity, setKeywordDensity] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      const { score, checks, keywordDensityPercentage } =
        analyzeSEO(updatedFormData);
      setSeoScore(score);
      setSeoChecks(checks);
      setKeywordDensity(keywordDensityPercentage);
      return updatedFormData;
    });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
    const { score, checks, keywordDensityPercentage } = analyzeSEO({
      ...formData,
      content,
    });
    setSeoScore(score);
    setSeoChecks(checks);
    setKeywordDensity(keywordDensityPercentage);
  };

  const handleLinkChange = (index, value) => {
    const videoId = extractVideoId(value);
    setFormData((prevState) => {
      const updatedVideos = [...prevState.videos];
      updatedVideos[index] = videoId;
      return { ...prevState, videos: updatedVideos };
    });
  };

  const addMoreLinks = () => {
    setFormData((prevState) => ({
      ...prevState,
      videos: [...prevState.videos, ""],
    }));
  };

  const extractVideoId = (link) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${slug}`, formData);
      alert("Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Create a Blog Post</title>
      </Head>
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create a Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="metaTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Meta Title (10-60 characters)
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Meta Description (50-160 characters)
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Keywords (Separate by commas)
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pageTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Page Title (H1 Tag)
            </label>
            <input
              type="text"
              id="pageTitle"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-bold text-gray-700">
              Videos
            </label>
            {formData.videos.map((link, index) => (
              <div key={index} className="mb-4">
                {link && link.length > 0 && (
                  <>
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${link}`}
                      width="480px"
                      height="270px"
                      className="desktop"
                    />

                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${link}`}
                      width="312px"
                      height="175.5px"
                      className="mobile"
                    />
                  </>
                )}
                <input
                  type="text"
                  value={link}
                  autoComplete="off"
                  className="mt-0 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button type="button" onClick={addMoreLinks}>
            Add Link
          </Button>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Content (300-1500 words)
            </label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              theme="snow"
              modules={modules}
              className="h-full border border-gray-300 rounded-md mb-16"
            />
          </div>

          {/* Display SEO suggestions */}
          <div className="mt-4">
            {seoChecks.metaTitleCheck ? (
              <p className="text-green-500">✔ Meta title is valid.</p>
            ) : (
              <p className="text-red-500">
                ❌ Meta title should be between 10-60 characters.
              </p>
            )}
            {seoChecks.metaDescriptionCheck ? (
              <p className="text-green-500">✔ Meta description is valid.</p>
            ) : (
              <p className="text-red-500">
                ❌ Meta description should be between 50-160 characters.
              </p>
            )}
            {seoChecks.keywordsCheck ? (
              <p className="text-green-500">✔ Keywords count is valid.</p>
            ) : (
              <p className="text-red-500">❌ Keywords should be between 1-5.</p>
            )}
            {seoChecks.contentCheck ? (
              <p className="text-green-500">
                ✔ Content length is valid (300-1500 words).
              </p>
            ) : (
              <p className="text-red-500">
                ❌ Content should be between 300-1500 words.
              </p>
            )}
            {seoChecks.headingCheck ? (
              <p className="text-green-500">
                ✔ Heading tags (H1, H2, etc.) are present.
              </p>
            ) : (
              <p className="text-red-500">
                ❌ Add heading tags (H1, H2, etc.) to structure your content.
              </p>
            )}
            {seoChecks.multimediaCheck ? (
              <p className="text-green-500">
                ✔ Multimedia (images/videos) are present.
              </p>
            ) : (
              <p className="text-red-500">
                ❌ Add images or videos to enhance the content.
              </p>
            )}

            {/* Internal and External Links */}
            <p className="text-xs text-gray-500">
              {seoChecks.internalLinksCheck > 0
                ? `Internal links: ${seoChecks.internalLinksCheck}`
                : "No internal links found."}
            </p>
            <p className="text-xs text-gray-500">
              {seoChecks.externalLinksCheck > 0
                ? `External links: ${seoChecks.externalLinksCheck}`
                : "No external links found."}
            </p>

            {/* Keyword density check */}
            {seoChecks.keywordDensityCheck && (
              <p className="text-green-500">
                ✔ Keyword density is within the optimal range.
              </p>
            )}
            {seoChecks.keywordStuffingCheck && (
              <p className="text-red-500">
                ❌ Keyword stuffing detected! Reduce the frequency of your
                keyword.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
