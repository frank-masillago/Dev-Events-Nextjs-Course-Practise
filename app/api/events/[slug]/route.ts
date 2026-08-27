import { IEvent } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";
import { type NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

interface ErrorResponse {
  message: string;
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maximumSlugLength = 200;

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { slug: routeSlug } = await params;
    const slug = routeSlug?.trim();

    if (!slug) {
      return NextResponse.json<ErrorResponse>(
        { message: "Event slug is required." },
        { status: 400 },
      );
    }

    if (slug.length > maximumSlugLength || !slugPattern.test(slug)) {
      return NextResponse.json<ErrorResponse>(
        { message: "Event slug is invalid." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // A lean query returns a plain object suitable for a JSON response.
    const event = await IEvent.findOne({ slug }).lean().exec();

    if (!event) {
      return NextResponse.json<ErrorResponse>(
        { message: "Event not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully.", event },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json<ErrorResponse>(
        { message: "Event slug is invalid." },
        { status: 400 },
      );
    }

    console.error("Failed to fetch event by slug:", error);
    return NextResponse.json<ErrorResponse>(
      { message: "Unable to fetch the event." },
      { status: 500 },
    );
  }
}
