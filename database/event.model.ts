import { model, models, Schema, type Model } from "mongoose";

export interface Event {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const requiredText = { type: String, required: true, trim: true, minlength: 1 } as const;
const nonEmptyStringArray = {
  type: [String],
  required: true,
  validate: {
    validator: (values: string[]): boolean =>
      values.length > 0 && values.every((value) => value.trim().length > 0),
    message: "At least one non-empty value is required.",
  },
} as const;

const eventSchema = new Schema<Event>(
  {
    title: requiredText,
    slug: { type: String, trim: true },
    description: requiredText,
    overview: requiredText,
    image: requiredText,
    venue: requiredText,
    location: requiredText,
    date: requiredText,
    time: requiredText,
    mode: requiredText,
    audience: requiredText,
    agenda: nonEmptyStringArray,
    organizer: requiredText,
    tags: nonEmptyStringArray,
  },
  { timestamps: true },
);

// Generate stable URL slugs only when the source title changes.
eventSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = this.title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!this.slug) throw new Error("Title must produce a valid slug.");
  }

  // Store dates as ISO-8601 and times in a consistent 24-hour HH:mm format.
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (Number.isNaN(parsedDate.getTime())) throw new Error("Date must be valid.");
    this.date = parsedDate.toISOString();
  }

  if (this.isModified("time")) {
    const value = this.time.trim();
    const twelveHour = value.match(/^(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM)$/i);
    const twentyFourHour = value.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    if (!twelveHour && !twentyFourHour) {
      throw new Error("Time must use HH:mm or h:mm AM/PM format.");
    }

    const match = twelveHour ?? twentyFourHour;
    if (!match) throw new Error("Time must be valid.");
    let hours = Number(match[1]);
    if (twelveHour) {
      hours = (hours % 12) + (twelveHour[3].toUpperCase() === "PM" ? 12 : 0);
    }
    this.time = `${hours.toString().padStart(2, "0")}:${match[2]}`;
  }
});

eventSchema.index({ slug: 1 }, { unique: true });

export const Event: Model<Event> =
  (models.Event as Model<Event> | undefined) ?? model<Event>("Event", eventSchema);
