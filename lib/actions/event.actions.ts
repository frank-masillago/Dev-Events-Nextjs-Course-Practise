'use server'

import connectToDatabase from "@/lib/mongodb";
import {IEvent} from "@/database";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const event = await IEvent.findOne({ slug });
        if(!event) return [];
        return await IEvent.find({ _id: { $ne: event._id}, tags: { $in: event.tags} }).lean();

    }
    catch (e) {
        return [];
    }
}
