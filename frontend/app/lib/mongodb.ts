import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri && process.env.NODE_ENV !== 'production') {
  console.warn('MONGODB_URI not defined. MongoDB functionality will be disabled.');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  // Return a rejected promise if no URI is provided
  clientPromise = Promise.reject(new Error('MONGODB_URI not configured'));
} else if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the value is preserved across module reloads
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