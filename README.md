 # Cryptocurrency Price Tracker

This project is a cryptocurrency price tracker built with Next.js. It fetches and displays the latest prices of selected cryptocurrencies, updating every 10 seconds.

## Features

- Displays latest cryptocurrency prices
- Updates prices every 10 seconds
- Allows user to select different cryptocurrencies
- Shows price history for the selected cryptocurrency
- Minimalist and aesthetic design

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
   git clone (https://github.com/bankotij/assignment-for-fomo-factory)
   
   cd your-repo-name

3. Install dependencies:
   npm install
   or
   yarn install


(IMPORTANT STEP)
4. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following:

   MONGODB_URI=your_mongodb_uri

   LIVECOINWATCH_API_KEY=your_livecoinwatch_api_key

   FETCH_INTERVAL=10000 (This is the interval in milliseconds)

### Running the Application

1. Start the development server:
   npm run dev
   or
   yarn dev

2. Open your browser and navigate to:
   http://localhost:3000

### Deployment

To deploy the application, follow the deployment guides for your hosting platform (e.g., Vercel, Netlify).

### Project Structure

- `pages/index.tsx`: Main component displaying the cryptocurrency prices.
- `pages/api/fetchData.ts`: API route for fetching price data from MongoDB.
- `pages/api/initPriceFetch.ts`: API route for initializing and managing the price fetch intervals.
- `pages/index.module.css`: CSS module for styling the components.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.
