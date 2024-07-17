import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function Home() {
    const [selectedCoin, setSelectedCoin] = useState('BTC'); // Default or user-selected coin
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async (coin) => {
            try {
                const response = await axios.get(`/api/fetchData?code=${coin}`);
                console.log("API response:", response.data);
                setPrices(Array.isArray(response.data) ? response.data.reverse() : []);
            } catch (error) {
                console.error('Failed to fetch prices:', error);
                setPrices([]);  // Reset prices on error
            }
        };

        const interval = setInterval(() => {
            fetchPrices(selectedCoin);
        }, 10000); // Updates every 10 seconds

        // Fetch prices immediately on component mount
        fetchPrices(selectedCoin);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [selectedCoin]); // Rerun the effect if the selectedCoin changes

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cryptocurrency Prices</h1>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => setSelectedCoin('BTC')}>Select BTC</button>
                <button className={styles.button} onClick={() => setSelectedCoin('ETH')}>Select ETH</button>
                <button className={styles.button} onClick={() => setSelectedCoin('USDT')}>Select USDT</button>
                <button className={styles.button} onClick={() => setSelectedCoin('SOL')}>Select SOL</button>
                <button className={styles.button} onClick={() => setSelectedCoin('BNB')}>Select BNB</button>
            </div>
            <div className={styles.tableContainer}>
                <h2 className={styles.subtitle}>Price History for {selectedCoin}</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {prices.length > 0 ? (
                        prices.map((price, idx) => (
                            <tr key={idx}>
                                <td>{new Date(price.fetchedAt).toLocaleString()}</td>
                                <td>${price.rate.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
