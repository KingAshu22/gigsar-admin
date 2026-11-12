import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Everything in the admin panel requires a signed-in user except the sign-in
// page itself. Previously only "/" was protected, so every other page
// (e.g. /artist/<name>/basic-details, /edit-artist/<name>) and every /api
// route was reachable by anyone with the link.
const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

// Optional but recommended: comma-separated Clerk user IDs allowed into the
// admin panel (e.g. "user_2abc...,user_2def..."). When unset, any signed-in
// Clerk user is allowed, so also disable sign-ups in the Clerk dashboard.
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = auth().protect();

  if (ADMIN_USER_IDS.length && !ADMIN_USER_IDS.includes(userId)) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return new NextResponse("You do not have access to the Gigsar admin panel.", {
      status: 403,
    });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
