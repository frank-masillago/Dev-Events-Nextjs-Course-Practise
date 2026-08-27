import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? (() => {
  throw new Error("Please define the MONGODB_URI environment variable.");
})();

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Store the cache on globalThis so Next.js hot reloads do not create new clients.
const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalForMongoose.mongooseCache = cache;

export default async function connectToDatabase(): Promise<Mongoose> {
  if (cache.connection) {
    return cache.connection;
  }

  // Reuse an in-flight connection so concurrent calls open only one client.
  cache.promise ??= mongoose.connect(MONGODB_URI);

  try {
    cache.connection = await cache.promise;
  } catch (error: unknown) {
    // Allow a later request to retry if the initial connection fails.
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
