# Impact Calc

A Uniswap V2 price impact calculator built for the EAG and BARC communities. Simulate buy and sell trades to see how they affect pool price, and get your expected fill price before executing on-chain.

[See Live App](https://impact-calc.vercel.app/)

## Features

- **Live LP Status** -- Displays real-time reserves, token prices, and market caps for EAG/WETH and BARC/WETH liquidity pools
- **Trade Simulation** -- Enter a trade size and direction (buy/sell) to calculate the resulting price impact
- **Fill Price Estimation** -- See your actual expected fill price, accounting for Uniswap's 0.3% swap fee and token-specific sell taxes
- **ETH Price Feed** -- Pulls live ETH/USD pricing from CoinMarketCap for USD-denominated values

## Tech Stack

- [Next.js](https://nextjs.org/) 14 (App Router)
- [ethers.js](https://docs.ethers.org/) v6 for on-chain reads
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) for styling
- [Axios](https://axios-http.com/) for API requests

## Prerequisites

- Node.js 18+
- A [CoinMarketCap](https://coinmarketcap.com/api/) API key (free tier works)
- An Ethereum mainnet RPC URL (e.g. [Alchemy](https://www.alchemy.com/), [Infura](https://www.infura.io/))

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/impact-calc.git
   cd impact-calc
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (see `.env.example`):

   ```
   CMC_KEY=your_coinmarketcap_api_key
   ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

MIT
