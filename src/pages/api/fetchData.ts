import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Connect to the MongoDB database
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve the cryptocurrency code from the query parameters
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    res.status(400).json({ message: "Invalid or missing cryptocurrency code." });
    return;
  }

  // Log the received code to help with debugging
  console.log(`Received code: ${code}`);

  const client = await connectToDatabase();
  const db = client.db('cryptoData');
  const collection = db.collection('cryptoPrices');

  try {
    // Retrieve the document that matches the given cryptocurrency code
    const document = await collection.findOne({ code });

    // Log the found document to help with debugging
    console.log(document);

    if (!document || !document.prices || document.prices.length === 0) {
      res.status(404).json({ message: "No data found for this cryptocurrency." });
      return;
    }

    // Respond with the last 20 prices or fewer if less than 20 are available
    const prices = document.prices.slice(-20);
    res.status(200).json(prices);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ message: 'Failed to retrieve data' });
  } finally {
    client.close();
  }
}
