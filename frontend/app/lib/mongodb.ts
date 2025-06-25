import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error('Please define the MONGODB_URI environment variable in .env.local');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the value is preserved across module reloads
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalWithMongo = global as unknown as { _mongoClientPromise?: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, it's best to not use a global variable
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise; 