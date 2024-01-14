import React, { useState, useEffect } from 'react';

const TradeResult = ({ data }) => {
    
    return (
      <div className="flex max-md:flex-col max-md:gap-4 min-h-25 justify-around">
        <div>
            <p>New Market Cap: {`${Number(Number(data.newMarketCap).toFixed(0)).toLocaleString()} (${Number(data.changeMarketCap).toFixed(2)}%)`}</p>
            <p>New Price: {`$${Number(data.newPrice).toFixed(5)}`}</p>
            <p>Price Impact: {Number(data.priceImpact).toFixed(2)}%</p>
        </div>

        <div>
            <p>Fill Price: {`$${Number(data.fillPrice).toFixed(5)} (${data.fillPriceImpact.toFixed(2)}%)`}</p>
            <p>{`${data.selectedLP}`} Reserves: {Number(data.newTokenReserve).toFixed(2)}</p>
            <p>ETH Reserves  : {Number(data.newEthReserve).toFixed(2)}</p>
        </div>
        
      </div>
    );
  };
  
  export default TradeResult;
  
  // newPrice, fillPrice, priceImpact, newMarketCap, changeMarketCap, newTokenReserve, newEthReserve