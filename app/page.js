"use client";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import ArtistList from "./_components/ArtistList";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { MicVocal, TriangleAlert, UserRound } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
              <p className="text-body-bold">108</p>
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

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Clients Enquiry</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">40</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
