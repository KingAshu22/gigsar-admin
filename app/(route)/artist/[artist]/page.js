"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BadgePlus,
  BookUser,
  CalendarDays,
  Clapperboard,
  Drum,
  Images,
  Music,
  TicketCheck,
  User,
  MessageCircle, // Added for the chat card icon
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

function ArtistDashboard({ params }) {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [sortedLinks, setSortedLinks] = useState({
    pending: [],
    completed: [],
  });

  useEffect(() => {
    getArtist();
  }, []);

  useEffect(() => {
    if (!loading) {
      const progressBar = document.getElementById("progress-bar");
      if (progressBar) {
        progressBar.style.width = `${profileCompletion}%`;
      }
    }
  }, [loading, profileCompletion]);

  const getArtist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/artist/artistName/` + params.artist
      );

      if (response.data) {
        setArtist(response.data);
        calculateProfileCompletion(response.data);
        sortLinks(response.data);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      router.push("/registration");
    } finally {
      setLoading(false);
    }
  };

  const calculateProfileCompletion = (artist) => {
    const fields = [
      "gallery",
      "events",
      "eventsType",
      "genre",
      "instruments",
      "time",
      "instagram",
      "facebook",
      "training",
      "blog",
    ];

    const requiredFields = [
      "gallery",
      "events",
      "eventsType",
      "genre",
      "instruments",
    ];

    const optionalFields = ["time", "instagram"];

    const filledRequiredFields = requiredFields.filter(
      (field) => artist[field] && artist[field].length > 0
    ).length;

    const filledOptionalFields = optionalFields.every(
      (field) => artist[field] && artist[field].length > 0
    )
      ? 1
      : 0;

    const totalFields = requiredFields.length + 1;
    const filledFields = filledRequiredFields + filledOptionalFields;

    const completionPercentage = Math.round((filledFields / totalFields) * 100);
    setProfileCompletion(completionPercentage);
  };

  const sortLinks = (artist) => {
    const links = [
      {
        field: "basicDetails",
        href: `/artist/${artist?.linkid}/basic-details`,
        icon: <User className="size-10" />,
        title: "Basic Details",
        description: "Edit Your Basic Details",
        completed: !!(
          artist?.profilePic ||
          artist?.location ||
          artist?.artistType ||
          artist?.email
        ),
      },
      {
        field: "gallery",
        href: `/artist/${artist?.linkid}/gallery`,
        icon: <Images className="size-10" />,
        title: artist?.gallery?.length === 0 ? "Gallery" : "Edit Gallery",
        description:
          artist?.gallery?.length === 0
            ? "Upload Your Gallery Images"
            : "Edit Your Gallery Images",
        completed: artist?.gallery?.length > 0,
      },
      {
        field: "events",
        href: `/artist/${artist?.linkid}/event-videos`,
        icon: <Clapperboard className="size-10" />,
        title:
          artist?.events?.length === 0 ? "Event Videos" : "Edit Event Videos",
        description:
          artist?.events?.length === 0
            ? "Add Your Event Videos Link"
            : "Edit Your Event Videos Link",
        completed: artist?.events?.length > 0,
      },
      {
        field: "eventsType",
        href: `/artist/${artist?.linkid}/event-type`,
        icon: <TicketCheck className="size-10" />,
        title: artist?.eventsType
          ? "Edit Event Type & Budget"
          : "Event Type & Budget",
        description: artist?.eventsType
          ? "Edit your Event Types & Budget"
          : "Add your Event Types & Budget",
        completed: !!artist?.eventsType,
      },
      {
        field: "genre",
        href: `/artist/${artist?.linkid}/genre`,
        icon: <Music className="size-10" />,
        title: artist?.genre ? "Edit Genre" : "Genre",
        description: artist?.genre ? "Edit your Genre" : "Select your Genre",
        completed: !!artist?.genre,
      },
      {
        field: "instruments",
        href: `/artist/${artist?.linkid}/instruments`,
        icon: <Drum className="size-10" />,
        title: artist?.instruments ? "Edit Instruments" : "Add Instruments",
        description: artist?.instruments
          ? "Edit your Instruments"
          : "Select your Instruments",
        completed: !!artist?.instruments,
      },
      {
        field: "otherDetails",
        href: `/artist/${artist?.linkid}/other-details`,
        icon: <BookUser className="size-10" />,
        title: "Other Details",
        description: "Add/Edit Your Other Details",
        completed: !!(
          artist?.time ||
          artist?.instagram ||
          artist?.facebook ||
          artist?.training ||
          artist?.blog
        ),
      },
    ];

    const pendingLinks = links.filter((link) => !link.completed);
    const completedLinks = links.filter((link) => link.completed);

    setSortedLinks({ pending: pendingLinks, completed: completedLinks });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#dc2626" size={80} />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-5">
        Managing{" "}
        <span className="text-primary">{artist?.name}&apos;s Profile</span>
      </h1>
      <Separator className="bg-gray-400 my-5" />

      {profileCompletion < 100 ? (
        <>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <p className="text-lg md:text-xl">Profile Completion</p>
              <p className="text-lg md:text-xl">{profileCompletion}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                id="progress-bar"
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `0%` }}
              ></div>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Pending Tasks
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedLinks.pending.map((link) => (
                <Link key={link.field} href={link.href}>
                  <Card className="bg-primary text-white">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                      {link.icon}
                      <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                        <CardTitle>{link.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-2 sm:mt-4">
                      <p>{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-xl text-green-600 font-bold">
              Profile Completed!
            </p>
            <p className="text-lg md:text-xl font-bold">
              Status: {artist.isPending ? "Pending" : "Live"}
            </p>
          </div>
          {artist.isPending && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row items-center">
              <div className="w-full flex flex-col items-center md:items-start mt-4 md:mt-0">
                <p className="text-lg text-justify md:text-left">
                  Your data is currently being processed and verified. We
                  appreciate your patience as we ensure everything is in order.
                  Your status will be updated shortly.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    router.push(`/${artist.linkid}`);
                  }}
                >
                  View Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Added Calendar and Chat cards at the top */}
      <div className="desktop mb-5">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Calendar Card */}
          <Link href={`/${artist?.linkid}/calendar`}>
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                <CalendarDays className="hidden sm:block" />
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  <CardTitle>Calendar</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="mt-2 sm:mt-4">
                <p>Manage Your Calendar</p>
              </CardContent>
            </Card>
          </Link>

          {/* Chat Card */}
          <Link href="/chat">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                <MessageCircle className="hidden sm:block" />
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  <CardTitle>Chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="mt-2 sm:mt-4">
                <p>Communicate with your audience</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          {profileCompletion === 100 ? "Edit Data" : "Completed Tasks"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedLinks.completed.map((link) => (
            <Link key={link.field} href={link.href}>
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                  {link.icon}
                  <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                    <CardTitle>{link.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 sm:mt-4">
                  <p>{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;
