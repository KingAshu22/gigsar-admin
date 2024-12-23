"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  MicVocal,
  CircleHelp,
  LockKeyhole,
  Rss,
  Eye,
  EyeOff,
  UserMinus,
  BadgePlus,
  Ticket,
  MessagesSquare,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { ArtistPieChart } from "./_components/ArtistPieChart";

export default function Home() {
  const [artistData, setArtistData] = useState({
    total: 0,
    live: 0,
    unlisted: 0,
    hidden: 0,
  });
  const [displayCounts, setDisplayCounts] = useState({
    total: 0,
    live: 0,
    unlisted: 0,
    hidden: 0,
  });

  const [pendingEnquiriesCount, setPendingEnquiriesCount] = useState(0);
  const [pendingDisplayCount, setPendingDisplayCount] = useState(0);

  const [totalEnquiriesCount, setTotalEnquiriesCount] = useState(0);
  const [totalDisplayCount, setTotalDisplayCount] = useState(0);

  const [pin, setPin] = useState("0");

  const artistChartData = [
    { browser: "chrome", visitors: 275, fill: "#f44336" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const totalVisitors = useMemo(() => {
    return artistChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const chartData = [
    { month: "January", enquiries: 186 },
    { month: "February", enquiries: 305 },
    { month: "March", enquiries: 237 },
    { month: "April", enquiries: 73 },
    { month: "May", enquiries: 209 },
    { month: "June", enquiries: 152 },
    { month: "June", enquiries: 554 },
    { month: "June", enquiries: 478 },
    { month: "June", enquiries: 312 },
    { month: "June", enquiries: 158 },
    { month: "June", enquiries: 674 },
    { month: "June", enquiries: 478 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };

  const artistChartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#f44336",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };

  useEffect(() => {
    fetchAndAnimateArtistData();
    fetchAndAnimateEnquiries();
    fetchPin();
  }, []);

  const fetchArtistCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/artist-count`
      );
      return response.data; // Returns { count, liveCount, unlistedCount, hiddenCount }
    } catch (error) {
      console.error("Error fetching artist count:", error);
      return { count: 0, liveCount: 0, unlistedCount: 0, hiddenCount: 0 };
    }
  };

  const fetchAndAnimateArtistData = async () => {
    const { count, liveCount, unlistedCount, hiddenCount } =
      await fetchArtistCount();
    setArtistData({
      total: count,
      live: liveCount,
      unlisted: unlistedCount,
      hidden: hiddenCount,
    });

    animateCount(count, (value) =>
      setDisplayCounts((prev) => ({ ...prev, total: value }))
    );
    animateCount(liveCount, (value) =>
      setDisplayCounts((prev) => ({ ...prev, live: value }))
    );
    animateCount(unlistedCount, (value) =>
      setDisplayCounts((prev) => ({ ...prev, unlisted: value }))
    );
    animateCount(hiddenCount, (value) =>
      setDisplayCounts((prev) => ({ ...prev, hidden: value }))
    );
  };

  const fetchEnquiriesCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/get-enquiries`
      );
      const enquiries = response.data;

      const total = enquiries.length;
      const pending = enquiries.filter(
        (enquiry) => !enquiry.enquirySent
      ).length;

      return { total, pending };
    } catch (error) {
      console.error("Error fetching enquiries count:", error);
      return { total: 0, pending: 0 };
    }
  };

  const fetchAndAnimateEnquiries = async () => {
    const { total, pending } = await fetchEnquiriesCount();
    setTotalEnquiriesCount(total);
    setPendingEnquiriesCount(pending);

    animateCount(total, setTotalDisplayCount);
    animateCount(pending, setPendingDisplayCount);
  };

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

  const animateCount = (end, setDisplayCount) => {
    let start = 0;
    const duration = 1000; // Animation duration in milliseconds
    const increment = Math.ceil(end / (duration / 10)); // Calculate increment for smooth animation

    const interval = setInterval(() => {
      if (start < end) {
        setDisplayCount(start);
        start += increment;
      } else {
        setDisplayCount(end);
        clearInterval(interval);
      }
    }, 10);
  };

  function DashboardCard({ icon: Icon, title, value, link }) {
    return (
      <Link href={link}>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-center text-center">
            <Icon className="h-8 w-8 text-primary mb-2" />
            <CardDescription className="font-semibold text-xl text-nowrap">
              {title}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold">{value}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <Link href="/artist" className="w-[300px]">
          <ArtistPieChart
            totalCount={displayCounts.total}
            liveCount={artistData.live}
            unlistedCount={artistData.unlisted}
            hiddenCount={artistData.hidden}
          />
        </Link>
        <DashboardCard
          icon={CircleHelp}
          title="Enquiries"
          value={`${pendingDisplayCount}/${totalDisplayCount}`}
          link="/enquiries"
        />
        <DashboardCard icon={LockKeyhole} title="Pin" value={pin} link="/pin" />
        <DashboardCard icon={Rss} title="Blogs" value="0" link="/blogs" />
        <DashboardCard icon={MessagesSquare} title="Chat" link="/chat" />
        <DashboardCard
          icon={BadgePlus}
          title="Create Artist"
          value=""
          link="/registration"
        />
        <DashboardCard
          icon={Ticket}
          title="Create Event"
          value=""
          link="/create-event"
        />
      </div>

      <div className="flex flex-row gap-2 mt-2">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="enquiries"
                  type="natural"
                  fill="#f44336"
                  fillOpacity={0.8}
                  stroke="#202124"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-2"></div>
      </div>
    </div>
  );
}
