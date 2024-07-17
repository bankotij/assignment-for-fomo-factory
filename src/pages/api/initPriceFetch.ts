import { MongoClient } from 'mongodb';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    return client;
}

async function fetchAndStoreCryptoData(code) {
    const client = await connectToDatabase();
    const db = client.db('cryptoData');
    const collection = db.collection('cryptoPrices');

    const startTime = Date.now();

    try {
        const response = await axios.post('https://api.livecoinwatch.com/coins/single', {
            currency: "USD",
            code,
            meta: true
        }, {
            headers: {
                'content-type': 'application/json',
                'x-api-key': process.env.LIVECOINWATCH_API_KEY
            }
        });

        const cryptoData = {
            name: response.data.name,
            rate: response.data.rate,
            fetchedAt: new Date()
        };

        await collection.updateOne(
            { code },
            { $push: { prices: { $each: [cryptoData], $slice: -20 } } },
            { upsert: true }
        );

        const endTime = Date.now();
        console.log(`Successfully fetched ${code} price. Fetching took ${endTime - startTime} ms.`);
    } catch (error) {
        console.error('API call error:', error);
    } finally {
        client.close();
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const coins = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB'];

    if (!global.cryptoInterval) {
        global.cryptoInterval = setInterval(() => {
            coins.forEach(coin => {
                fetchAndStoreCryptoData(coin);
            });
        }, parseInt(process.env.FETCH_INTERVAL || '10000'));

        res.json({ message: 'Started fetching crypto prices' });
    } else {
        res.json({ message: 'Fetching already initiated' });
    }
}
