'use client'

import React, { useState } from 'react';
import TradeResult from './trade_result';
import { simulateTrade } from './SimulateTrade'

const TradeSimulation = () => {
  const [isLoading, setIsLoading] = useState(false);  
  const [hasSimulated, setHasSimulated] = useState(false);
  const [selectedLP, setSelectedLP] = useState('EAG');
  const [tradeAction, setTradeAction] = useState('buy');
  const [amount, setAmount] = useState('');
  const [tradeData, setTradeData] = useState({
    newPrice: 0,
    fillPrice: 0,
    priceImpact: 0,
    fillPriceImpact: 0,
    newMarketCap: 0,
    changeMarketCap: 0,
    newTokenReserve: 0,
    newEthReserve: 0,
    selectedLP: 'EAG'
  });

  const handleLPChange = (event) => {
    setSelectedLP(event.target.value);
  };

  const handleTradeActionChange = (event) => {
    setTradeAction(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const simulationResults = await simulateTrade(tradeAction, amount, selectedLP);
      setTradeData(simulationResults);
      setHasSimulated(true);
      console.log(`Simulated ${tradeAction} of ${amount} in ${selectedLP} pool`);
    } catch (error) {
      console.error('Error during trade simulation:', error);
    } finally{
        setIsLoading(false)
    }
  };

  const handleReset = () => {
    setSelectedLP('EAG');
    setTradeAction('buy');
    setAmount('');
    setTradeData({
      newPrice: 0,
      fillPrice: 0,
      priceImpact: 0,
      fillPriceImpact: 0,
      newMarketCap: 0,
      changeMarketCap: 0,
      newTokenReserve: 0,
      newEthReserve: 0,
      selectedLP: 'EAG'
    });
    setHasSimulated(false);
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col border rounded-lg w-2/3'>
    <div className=''>
        <form onSubmit={handleSubmit} className='flex max-md:flex-col rounded-lg justify-around p-4 bg-base-100'>
        <label className='p-2'>
            Choose LP:
            <select className='mx-1 border rounded-md bg-base-200' value={selectedLP} onChange={handleLPChange}>
            <option value="EAG">EAG</option>
            <option value="BARC">BARC</option>
            </select>
        </label>

        <label className='p-2'>
            Action:
            <select className='mx-1 border rounded-md bg-base-200' value={tradeAction} onChange={handleTradeActionChange}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            </select>
        </label>

        <label className='p-2'>
            Amount: 
            <input className='mx-1 px-1 border rounded-md bg-base-200' type="number" value={amount} onChange={handleAmountChange} />
        </label>

        <button className="border p-2 rounded-md bg-base-300 hover:bg-sky-300" type="submit">Simulate Trade</button>
        </form>
    </div>

    <div className="h-45 m-3">
    {isLoading ? (
      <div className='text-center '>Calculating...</div>
    ) : hasSimulated ? (
      <TradeResult data={tradeData}/>
    ) : (
      <div className='h-25 text-center'>
        <p className='m-2'>Select an LP, then choose Buy/Sell.</p>
        <p>Buy amounts are in ETH, sell amounts in the respective LP token.</p>
      </div>
      
    )}
  </div>

    <div className='flex justify-around m-3'>
  <button onClick={handleReset} className="border p-2 rounded-md bg-base-300 hover:bg-sky-300">
    Reset
  </button>
    </div>

    </div>
     
  );
};

export default TradeSimulation;
