"use client";
import React, { useEffect, useState } from "react";
import "react-cropper-custom/dist/index.css";
import "./modal.css"; // Import CSS for modal styles
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import axios from "axios";

import eventTypesOptions from "./constants/eventTypes";
import genreOptions from "./constants/genres";
import instrumentOptions from "./constants/instruments";
import languageOptions from "./constants/languages";
import { Button } from "@/components/ui/button";
import PhotoUploader from "@/app/_components/PhotoUploader";

const ArtistRegistration = () => {
  const [artistName, setArtistName] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [galleryLink, setGalleryLink] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([""]);
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [artistType, setArtistType] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [corporateBudget, setCorporateBudget] = useState("");
  const [collegeBudget, setCollegeBudget] = useState("");
  const [weddingBudget, setWeddingBudget] = useState("");
  const [singerCumGuitaristBudget, setSingerCumGuitaristBudget] = useState("");
  const [singerPlusGuitaristBudget, setSingerPlusGuitaristBudget] =
    useState("");
  const [ticketingConcertBudget, setTicketingConcertBudget] = useState("");
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [originalSongName, setOriginalSongName] = useState("");
  const [performanceTime, setPerformanceTime] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [awards, setAwards] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [musicTraining, setMusicTraining] = useState("");
  const [aboutArtist, setAboutArtist] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCroppingComplete, setIsCroppingComplete] = useState(false);

  // useEffect(() => {
  //   if (
  //     user &&
  //     user.fullName &&
  //     user.phoneNumbers[0].phoneNumber &&
  //     user.emailAddresses[0].emailAddress
  //   ) {
  //     setArtistName(user.fullName);
  //     setContactNumber(user.phoneNumbers[0].phoneNumber);
  //     setEmail(user.emailAddresses[0].emailAddress);
  //   }
  // }, [user]);

  const handleEventTypeChange = (event) => {
    const selectedEventType = event.target.value;
    if (event.target.checked) {
      setEventTypes([...eventTypes, selectedEventType]);
    } else {
      setEventTypes(eventTypes.filter((type) => type !== selectedEventType));
    }
  };
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    if (event.target.checked) {
      setGenres([...genres, selectedGenre]);
    } else {
      setGenres(genres.filter((type) => type !== selectedGenre));
    }
  };
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    if (event.target.checked) {
      setLanguages([...languages, selectedLanguage]);
    } else {
      setLanguages(languages.filter((type) => type !== selectedLanguage));
    }
  };
  const handleInstrumentChange = (event) => {
    const selectedInstrument = event.target.value;
    if (event.target.checked) {
      setInstruments([...instruments, selectedInstrument]);
    } else {
      setInstruments(instruments.filter((type) => type !== selectedInstrument));
    }
  };

  const handleGalleryUpload = (link) => {
    setGalleryLink((prevLinks) => [...prevLinks, link]);
  };

  // Function to add more input fields
  const addMoreLink = () => {
    setYoutubeLinks((prevLinks) => [...prevLinks, ""]);
  };

  // Function to extract video ID from YouTube link
  const extractVideoId = (link) => {
    // Regular expression to match YouTube video ID
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  // Function to handle input change
  const handleLinkChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...youtubeLinks];
      updatedLinks[index] = videoId;
      setYoutubeLinks(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...youtubeLinks];
      updatedLinks[index] = "";
      setYoutubeLinks(updatedLinks);
    }
  };

  const handleSave = async () => {
    // Handle saving the cropped image
    // For demonstration, let's log the cropped image data
    setShowModal(false); // Close the modal after saving
    setShowCroppedImage(true); // Show the cropped image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // Handle the submission of form data
      const formData = {
        artistName,
        profilePic,
        galleryLink,
        youtubeLinks,
        gender,
        contactNumber,
        email,
        location,
        artistType,
        eventTypes,
        corporateBudget,
        collegeBudget,
        weddingBudget,
        singerCumGuitaristBudget,
        singerPlusGuitaristBudget,
        ticketingConcertBudget,
        genres,
        languages,
        originalSongName,
        performanceTime,
        instruments,
        awards,
        instagramLink,
        facebookLink,
        youtubeLink,
        spotifyLink,
        musicTraining,
        aboutArtist,
      };

      console.log(formData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/artist-registration`,
        formData
      );

      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Redirect to home page or perform any other action
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Artist Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="artistName"
            className="block text-sm font-medium text-gray-700"
          >
            Artist Name
          </label>
          <input
            type="text"
            id="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Profile Pic
        </label>
        <PhotoUploader artistName={artistName} setProfilePic={setProfilePic} />

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
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
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="artistType"
            className="block text-sm font-medium text-gray-700"
          >
            Artist Type
          </label>
          <select
            id="artistType"
            value={artistType}
            onChange={(e) => setArtistType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Artist Type</option>
            <option value="singer-band">Singer/Live Bamd</option>
            <option value="Musician">Musician</option>
            <option value="DJ">DJ</option>
          </select>
        </div>

        {/* Gallery Image Uploaders */}
        <div className="mb-4">
          <h3>Upload Gallery Images</h3>
          <div className="gallery-uploader-container grid grid-cols-3 gap-4 justify-center">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <label
                  htmlFor={`galleryImage${index + 1}`}
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Upload Gallery Image {index + 1}
                </label>
                <PhotoUploader
                  id={`galleryImage${index + 1}`}
                  artistName={artistName}
                  setProfilePic={handleGalleryUpload}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label
              htmlFor="youtubeLink"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube Link:
            </label>
            {youtubeLinks.map((link, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`youtubeLink-${index}`}
                  value={link}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button type="button" className="" onClick={addMoreLink}>
            Add More Link
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Event Types
          </label>
          <div className="grid grid-cols-3 gap-4">
            {eventTypesOptions.map((option) => (
              <div className="" key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  onChange={handleEventTypeChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {eventTypes.includes("Corporate") && (
          <div className="mb-4">
            <label
              htmlFor="corporateBudget"
              className="block text-sm font-medium text-gray-700"
            >
              Corporate Budget
            </label>
            <input
              type="number"
              id="corporateBudget"
              value={corporateBudget}
              onChange={(e) => setCorporateBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {eventTypes.includes("College") && (
          <div className="mb-4">
            <label
              htmlFor="collegeBudget"
              className="block text-sm font-medium text-gray-700"
            >
              College Budget
            </label>
            <input
              type="number"
              id="collegeBudget"
              value={collegeBudget}
              onChange={(e) => setCollegeBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {eventTypes.includes("Wedding") && (
          <div className="mb-4">
            <label
              htmlFor="weddingBudget"
              className="block text-sm font-medium text-gray-700"
            >
              Wedding Budget
            </label>
            <input
              type="number"
              id="weddingBudget"
              value={weddingBudget}
              onChange={(e) => setWeddingBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {eventTypes.includes("House Party") && (
          <>
            <div className="mb-4">
              <label
                htmlFor="singerCumGuitaristBudget"
                className="block text-sm font-medium text-gray-700"
              >
                Singer cum Guitarist Budget
              </label>
              <input
                type="number"
                id="singerCumGuitaristBudget"
                value={singerCumGuitaristBudget}
                onChange={(e) => setSingerCumGuitaristBudget(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="singerPlusGuitaristBudget"
                className="block text-sm font-medium text-gray-700"
              >
                Singer + Guitarist Budget
              </label>
              <input
                type="number"
                id="singerPlusGuitaristBudget"
                value={singerPlusGuitaristBudget}
                onChange={(e) => setSingerPlusGuitaristBudget(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </>
        )}

        {eventTypes.includes("Ticketing Concert") && (
          <div className="mb-4">
            <label
              htmlFor="ticketingConcertBudget"
              className="block text-sm font-medium text-gray-700"
            >
              Ticketing Concert Budget
            </label>
            <input
              type="number"
              id="ticketingConcertBudget"
              value={ticketingConcertBudget}
              onChange={(e) => setTicketingConcertBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {genreOptions.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  onChange={handleGenreChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Language Speaks
          </label>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {languageOptions.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  onChange={handleLanguageChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="originalSong"
            className="block text-sm font-medium text-gray-700"
          >
            Original Songs Name
          </label>
          <input
            type="text"
            id="originalSongs"
            value={originalSongName}
            onChange={(e) => setOriginalSongName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="performanceTime"
            className="block text-sm font-medium text-gray-700"
          >
            Performance Time in Mins
          </label>
          <input
            type="number"
            id="performanceTime"
            value={performanceTime}
            onChange={(e) => setPerformanceTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Which Instruments do you play
          </label>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {instrumentOptions.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  onChange={handleInstrumentChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="performanceTime"
            className="block text-sm font-medium text-gray-700"
          >
            Any Awards/Achievements/Fame
          </label>
          <input
            type="text"
            id="awards"
            value={awards}
            onChange={(e) => setAwards(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="instagramLink"
            className="block text-sm font-medium text-gray-700"
          >
            Instagram Profile Link
          </label>
          <input
            type="text"
            id="instagramLink"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="facebookLink"
            className="block text-sm font-medium text-gray-700"
          >
            Facebook Profile Link
          </label>
          <input
            type="text"
            id="facebookLink"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="youtubeLink"
            className="block text-sm font-medium text-gray-700"
          >
            Youtube Channel Link
          </label>
          <input
            type="text"
            id="youtubeLink"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="spotifyLink"
            className="block text-sm font-medium text-gray-700"
          >
            Spotify Profile Link
          </label>
          <input
            type="text"
            id="spotifyLink"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="musicTraining"
            className="block text-sm font-medium text-gray-700"
          >
            Music Training From
          </label>
          <input
            type="text"
            id="musicTraining"
            value={musicTraining}
            onChange={(e) => setMusicTraining(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="aboutArtist"
            className="block text-sm font-medium text-gray-700"
          >
            Tell Me About Yourself
          </label>
          <Textarea
            id="aboutArtist"
            value={aboutArtist}
            onChange={(e) => setAboutArtist(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {/* Confirmation modal */}
      {showConfirmationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to submit the form?</p>
            <button onClick={handleConfirmSubmit}>Yes</button>
            <button onClick={() => setShowConfirmationModal(false)}>No</button>
          </div>
        </div>
      )}

      {/* Success modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Success! Your form has been submitted.</p>
            <button onClick={handleModalClose}>Back to home page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistRegistration;
