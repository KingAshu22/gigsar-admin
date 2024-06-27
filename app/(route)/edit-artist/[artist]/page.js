"use client";
import React, { useEffect, useState } from "react";
import "react-cropper-custom/dist/index.css";
import "./modal.css"; // Import CSS for modal styles
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import eventTypesOptions from "./constants/eventTypes";
import genreOptions from "./constants/genres";
import instrumentOptions from "./constants/instruments";
import languageOptions from "./constants/languages";
import { Button } from "@/components/ui/button";
import PhotoUploader from "@/app/_components/PhotoUploader";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import { HashLoader } from "react-spinners";

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
      setProfilePic(artistData.profilePic);
      setGender(artistData.gender);
      setContactNumber(artistData.contact);
      setEmail(artistData.email);
      setLocation(artistData.location);
      setArtistType(artistData.artistType);
      setCorporateBudget(artistData.corporateBudget);
      setCollegeBudget(artistData.collegeBudget);
      setWeddingBudget(artistData.price);
      setSingerCumGuitaristBudget(artistData.singerCumGuitaristBudget);
      setSingerPlusGuitaristBudget(artistData.singerPlusGuitaristBudget);
      setTicketingConcertBudget(artistData.ticketingConcertBudget);
      setOriginalSongName(artistData.original);
      setPerformanceTime(artistData.time);
      setAwards(artistData.awards);
      setInstagramLink(artistData.instagram);
      setFacebookLink(artistData.facebook);
      setSpotifyLink(artistData.spotify);
      setMusicTraining(artistData.training);
      setAboutArtist(artistData.blog);

      const galleryLinks = artistData.gallery.map((item) => item.link);

      const eventTypesArray = artistData.eventsType
        .split(",")
        .map((type) => type.trim());

      const genresArray = artistData.genre
        .split(",")
        .map((type) => type.trim());

      const instrumentsArray = artistData.instruments
        .split(",")
        .map((type) => type.trim());

      const weddingLink = artistData.events
        .filter((event) => event.name === "Wedding Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const corporateLink = artistData.events
        .filter((event) => event.name === "Corporate Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const collegeLink = artistData.events
        .filter((event) => event.name === "College Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const concertLink = artistData.events
        .filter((event) => event.name === "Ticketing Concert Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const originalLink = artistData.events
        .filter((event) => event.name === "Original Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const bollywoodLink = artistData.events
        .filter((event) => event.name === "Bollywood Playback Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      const coverLink = artistData.events
        .filter((event) => event.name === "Cover Videos") // Filter events with name "Wedding Videos"
        .map((event) => event.links) // Extract the links array from the event
        .flat(); // Flatten the array (in case there are multiple links, though it seems you only have one per event)

      setGalleryLink(galleryLinks);
      setEventTypes(eventTypesArray);
      setGenres(genresArray);
      setInstruments(instrumentsArray);
      setWeddingLink(weddingLink);
      setCorporateLink(corporateLink);
      setCollegeLink(collegeLink);
      setConcertLink(concertLink);
      setOriginalLink(originalLink);
      setBollywoodLink(bollywoodLink);
      setCoverLink(coverLink);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      // Reset loading state
      setTimeout(() => {
        setFetchData(false);
      }, 1000);
    }
  };

  const [artistName, setArtistName] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [galleryLink, setGalleryLink] = useState([]);
  const [weddingLink, setWeddingLink] = useState([""]);
  const [corporateLink, setCorporateLink] = useState([""]);
  const [collegeLink, setCollegeLink] = useState([""]);
  const [concertLink, setConcertLink] = useState([""]);
  const [originalLink, setOriginalLink] = useState([""]);
  const [bollywoodLink, setBollywoodLink] = useState([""]);
  const [coverLink, setCoverLink] = useState([""]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getArtist();
  }, []);

  const formatArtistName = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

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

  const handleGalleryUpload = (link, index) => {
    setGalleryLink((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = link;
      return newLinks;
    });
  };

  // Function to add more input fields
  const addMoreWedding = () => {
    setWeddingLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreCorporate = () => {
    setCorporateLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreCollege = () => {
    setCollegeLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreConcert = () => {
    setConcertLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreOriginal = () => {
    setOriginalLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreBollywood = () => {
    setBollywoodLink((prevLinks) => [...prevLinks, ""]);
  };

  const addMoreCover = () => {
    setCoverLink((prevLinks) => [...prevLinks, ""]);
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
  const handleWeddingChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...weddingLink];
      updatedLinks[index] = videoId;
      setWeddingLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...weddingLink];
      updatedLinks[index] = "";
      setWeddingLink(updatedLinks);
    }
  };

  const handleCorporateChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...corporateLink];
      updatedLinks[index] = videoId;
      setCorporateLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...corporateLink];
      updatedLinks[index] = "";
      setCorporateLink(updatedLinks);
    }
  };

  const handleCollegeChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...collegeLink];
      updatedLinks[index] = videoId;
      setCollegeLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...collegeLink];
      updatedLinks[index] = "";
      setCollegeLink(updatedLinks);
    }
  };

  const handleConcertChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...concertLink];
      updatedLinks[index] = videoId;
      setConcertLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...concertLink];
      updatedLinks[index] = "";
      setConcertLink(updatedLinks);
    }
  };

  const handleOriginalChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...originalLink];
      updatedLinks[index] = videoId;
      setOriginalLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...originalLink];
      updatedLinks[index] = "";
      setOriginalLink(updatedLinks);
    }
  };

  const handleBollywoodChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...bollywoodLink];
      updatedLinks[index] = videoId;
      setBollywoodLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...bollywoodLink];
      updatedLinks[index] = "";
      setBollywoodLink(updatedLinks);
    }
  };

  const handleCoverChange = (index, value) => {
    const videoId = extractVideoId(value);
    if (videoId) {
      const updatedLinks = [...coverLink];
      updatedLinks[index] = videoId;
      setCoverLink(updatedLinks);
    } else {
      // Handle invalid link or show an error message
      // For now, let's set an empty string
      const updatedLinks = [...coverLink];
      updatedLinks[index] = "";
      setCoverLink(updatedLinks);
    }
  };

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
        artistName,
        profilePic,
        galleryLink,
        weddingLink,
        corporateLink,
        collegeLink,
        concertLink,
        originalLink,
        bollywoodLink,
        coverLink,
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

      const response = axios.post(
        `${process.env.NEXT_PUBLIC_API}/edit-artist/${id}`,
        formData,
        { withCredentials: true }
      );
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred during submission.");
    } finally {
      // Reset loading state
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, 3000);
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
                required
                onChange={(e) => setArtistName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Profile Pic
            </label>
            <PhotoUploader
              artistName={artistName}
              setProfilePic={setProfilePic}
              initialImageLink={profilePic}
            />

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
                <option value="singer-band">Singer/Live Band</option>
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
                      setProfilePic={(link) => handleGalleryUpload(link, index)}
                      initialImageLink={galleryLink[index]}
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
                  Wedding/Private Event Videos Youtube Link:
                </label>
                {weddingLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleWeddingChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreWedding}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Corporate Event Videos Youtube Link:
                </label>
                {corporateLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleCorporateChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreCorporate}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  College Event Videos Youtube Link:
                </label>
                {collegeLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleCollegeChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreCollege}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ticketing Concert Videos Youtube Link:
                </label>
                {concertLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleConcertChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreConcert}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original Videos Youtube Link:
                </label>
                {originalLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleOriginalChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreOriginal}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bollywood Playback Videos Youtube Link:
                </label>
                {bollywoodLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        handleBollywoodChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreBollywood}>
                Add More Link
              </Button>
            </div>

            <div className="mb-4">
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Videos Youtube Link:
                </label>
                {coverLink.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`youtubeLink-${index}`}
                      value={link}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => handleCoverChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <Button type="button" className="" onClick={addMoreCover}>
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
                      checked={eventTypes.includes(option)}
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
                  Corporate/Private Event Budget
                </label>
                <input
                  type="number"
                  id="corporateBudget"
                  value={corporateBudget}
                  step={10000}
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
                  College Event Budget
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
                  Wedding Event Budget
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
                    onChange={(e) =>
                      setSingerCumGuitaristBudget(e.target.value)
                    }
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
                    onChange={(e) =>
                      setSingerPlusGuitaristBudget(e.target.value)
                    }
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
                      checked={genres.includes(option)}
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
                      checked={languages.includes(option)}
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
                      checked={instruments.includes(option)}
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
              Update
            </button>
          </form>
          {/* Confirmation modal */}
          <Modal
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            title="Are you sure you want to update?"
            description={`This will update the profile for ${artistName}`}
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

          <Modal isOpen={isLoading} title="Updating Artist Data...">
            <div className="flex justify-center items-center">
              <HashLoader color="#dc2626" size={80} />
            </div>
          </Modal>

          {error && <p className="error">{error}</p>}
          <Modal
            isOpen={success}
            onClose={() => setSuccess(false)}
            title="Artist Data Updated"
            description={`${artistName}'s Form has been successfully updated.`}
          >
            <div className="flex justify-between">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                type="button"
                onClick={() =>
                  window.open(
                    `https://gigsar.com/artist/${formatArtistName(artistName)}`,
                    "_blank"
                  )
                }
              >
                View Page
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                onClick={() => router.push("/")}
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
