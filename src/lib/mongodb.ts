import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // This should match your .env.local entry
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let isConnected = false;

export async function connectToDatabase() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;  // Set to true once connected
    }
    const db = client.db();  // No need to specify db name here if included in the URI
    return { db, client };
}
