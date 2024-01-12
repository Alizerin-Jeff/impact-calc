'use server'

import { ethers } from 'ethers';
import axios from 'axios';
import UNI_V2_PAIR_ABI from './univ2abi.json'

const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const eagLP = '0x7f00995f977a8a64abd4b888e5cf09d86f91ca66'

const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);

const uniswapV2PairABI = UNI_V2_PAIR_ABI; // Uniswap V2 Pair ABI

export async function getLPStatus(poolAddress) {
  let decimals;
  if(poolAddress === eagLP) {
    decimals = 18
    console.log("Eag for the win!\n");
  }
  else {
    decimals = 9
  }

  const poolContract = new ethers.Contract(poolAddress, uniswapV2PairABI, provider);
  try {
    let reserveToken, reserveETH
    const [reserve0, reserve1] = await poolContract.getReserves();
    const token0_addy = await poolContract.token0();
    if(token0_addy === WETH_ADDRESS) {
        reserveToken = parseFloat(ethers.formatUnits(reserve1, decimals));
        reserveETH = parseFloat(ethers.formatUnits(reserve0, 'ether'));
    }
    else {
        reserveToken = parseFloat(ethers.formatUnits(reserve0, decimals));
        reserveETH = parseFloat(ethers.formatUnits(reserve1, 'ether'));
    }
    const priceETH = await getEthPrice();
    const price = priceETH * reserveETH / reserveToken
    console.log(reserveToken)
    // Additional logic to process and return these reserves
    return {
        price,
        reserve_token: reserveToken,
        reserve_ETH: reserveETH,
      };
  } catch (error) {
    console.error("Error fetching pool reserves:", error);
    throw error;
  }
}

export const getEthPrice = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'X-CMC_PRO_API_KEY': 'c618dfd9-ccab-4817-8d80-090c1e48f377' },
      redirect: 'follow'
    };
  
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH', requestOptions);
      const price = response.data.data.ETH[0].quote.USD.price
      return price;
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      throw error;
    }

  };