"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BadgePlus, MicVocal, TriangleAlert, UserRound } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [registeredArtistCount, setRegisteredArtistCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetchArtistCount();
  }, []);

  const fetchArtistCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/artist-count`
      );
      const count = response.data.count;
      setRegisteredArtistCount(count);
      animateCount(count);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const animateCount = (count) => {
    let start = 0;
    const end = count;
    const duration = 10000; // in milliseconds
    const increment = Math.ceil(end / (duration / 100)); // Calculate increment based on duration

    const interval = setInterval(() => {
      if (start < end) {
        setDisplayCount(start);
        start += increment;
      } else {
        clearInterval(interval);
        setDisplayCount(end);
      }
    }, 10);
  };

  return (
    <div>
      <h1 className="text-2xl m-10 font-bold">
        Welcome Back, <span className="text-primary">Yogi 👋</span>
      </h1>
      <Separator className="bg-gray-400 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-5">
        <Link href="/artist">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Registered Artists</CardTitle>
              <MicVocal className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-primary text-9xl">{displayCount}</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Pending Artists</CardTitle>
            <TriangleAlert className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">30</p>
          </CardContent>
        </Card>

        <Link href="/chat">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Clients Enquiry</CardTitle>
              <UserRound className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="text-body-bold">40</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/registration">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Artist Registration Form</CardTitle>
              <BadgePlus className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="text-body-bold">108</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
