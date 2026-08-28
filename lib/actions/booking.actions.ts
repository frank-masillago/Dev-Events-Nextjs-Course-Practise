'use server'
import connectToDatabase from "@/lib/mongodb";
import {Booking} from "@/database/booking.model";
import {Types} from "mongoose";

export const createBooking=  async ({eventId, email}: {eventId: string; email: string;}) => {
    try {
    await connectToDatabase();
    await Booking.create({ eventId, email});

    return { success: true};

    }
    catch (e) {
        console.error("creat booking error:", e)
        return { success: false}
    }
};