"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";

function Header() {
  const { user } = useUser();
  const Menu = [
    {
      id: 1,
      name: "Admin Panel",
      path: "/",
    },
    {
      id: 2,
      name: "Artist List",
      path: "/artist",
    },
    {
      id: 3,
      name: "Home",
      path: "/artist",
    },
  ];
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="font-bold text-4xl text-primary">Gigsar</h1>
        </Link>
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <ul className="md:flex"></ul>
      <ul className="md:flex gap-8 hidden">
        {user ? (
          <>
            <ModeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </>
        ) : (
          <Link href="/sign-in">
            <>
              <ModeToggle />
              <CircleUserRound />
            </>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Header;
