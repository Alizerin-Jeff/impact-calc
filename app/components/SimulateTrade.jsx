'use server'

import { getLPStatus } from "../lib/ethereum";
import { getEthPrice } from "../lib/ethereum";

export const simulateTrade = async (tradeAction, amount, selectedLP) => {
    // First, get the current LP status
    console.log("Simulating...")
    let lpAddress, totalSupply
    if(selectedLP === 'EAG') {
        lpAddress = '0x7f00995f977a8a64abd4b888e5cf09d86f91ca66'
        totalSupply = 12075000
        amount = amount * 0.97
    }
    else {
        lpAddress = '0x216387eEDa0586730697e769F1fabcca77b123e1'
        totalSupply = 109000000
    }
    const lpStatus = await getLPStatus(lpAddress);

    let calculatedNewEthReserve,
        calculatedNewPrice,
        calculatedFillPrice,
        calculatedFillPriceImpact,
        calculatedPriceImpact,
        calculatedNewMarketCap,
        calculatedChangeMarketCap,
        calculatedNewTokenReserve,
        constantProduct,
        currentPrice,
        currentMarketCap
    console.log(lpStatus)
    const ethPrice = await getEthPrice()
    constantProduct = lpStatus.reserve_token * lpStatus.reserve_ETH
    currentPrice = ethPrice * lpStatus.reserve_ETH / lpStatus.reserve_token
    currentMarketCap = currentPrice * totalSupply

    if(tradeAction === 'buy') {
        // Calculate new reserves
        calculatedNewEthReserve = lpStatus.reserve_ETH + amount * 0.997;
        calculatedNewTokenReserve = constantProduct / calculatedNewEthReserve
        // Caclulate the fill price in USD
        calculatedFillPrice = amount * 0.997 * ethPrice / (lpStatus.reserve_token - calculatedNewTokenReserve)
    }
    else {
        // Calculate new reserves
        calculatedNewTokenReserve = lpStatus.reserve_token + amount * 0.997;
        calculatedNewEthReserve = constantProduct / calculatedNewTokenReserve
        // Caclulate the fill price in USD
        calculatedFillPrice = (lpStatus.reserve_ETH - calculatedNewEthReserve) * ethPrice / (amount * 0.997)
    }

    // Calculate new usd value
    calculatedNewPrice = ethPrice * calculatedNewEthReserve / calculatedNewTokenReserve
    // price impact in percent
    calculatedPriceImpact = (calculatedNewPrice - currentPrice) / currentPrice * 100
    calculatedFillPriceImpact = (calculatedFillPrice - currentPrice) / currentPrice * 100
    //New market cap and change in market cap
    calculatedNewMarketCap = calculatedNewPrice * totalSupply
    calculatedChangeMarketCap = (calculatedNewMarketCap - currentMarketCap) / currentMarketCap * 100
  
    console.log("Done simulating...")
    return {
      newPrice: calculatedNewPrice,
      fillPrice: calculatedFillPrice,
      priceImpact: calculatedPriceImpact,
      fillPriceImpact: calculatedFillPriceImpact,
      newMarketCap: calculatedNewMarketCap,
      changeMarketCap: calculatedChangeMarketCap,
      newTokenReserve: calculatedNewTokenReserve,
      newEthReserve: calculatedNewEthReserve,
      selectedLP: selectedLP
    };
};
  