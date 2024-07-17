import axios from 'axios';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Trigger the price fetching process when the app loads
    axios.get('/api/initPriceFetch')
        .then(response => console.log(response.data.message))
        .catch(error => console.error('Failed to initiate price fetching:', error));
  }, []);

  return <Component {...pageProps} />
}

export default MyApp;
