import { model, models, Schema, Types, type Model } from "mongoose";

import { Event } from "./event.model";

export interface Booking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<Booking>(
  {
    // The ref enables population while ObjectId keeps the stored relationship compact.
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailPattern, "Email must be valid."],
    },
  },
  { timestamps: true },
);

// Prevent bookings from referencing an event that no longer exists.
bookingSchema.pre("save", async function () {
  if (!this.isModified("eventId")) return;

  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) throw new Error("The referenced event does not exist.");
});

bookingSchema.index({ eventId: 1 });

export const Booking: Model<Booking> =
  (models.Booking as Model<Booking> | undefined) ??
  model<Booking>("Booking", bookingSchema);
