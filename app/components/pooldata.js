import React, { useEffect, useState } from 'react';
import { getPoolReserves } from '../lib/ethereum';

const PoolData = ({ poolAddress }) => {
  const [reserves, setReserves] = useState({ reserve0: 0, reserve1: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poolReserves = await getPoolReserves(poolAddress);
        setReserves(poolReserves);
      } catch (error) {
        console.error("Failed to fetch pool data:", error);
      }
    };

    fetchData();
  }, [poolAddress]);

  return (
    <div>
      {/* Display the reserves here */}
      <p>Reserve 0: {reserves.reserve0.toString()}</p>
      <p>Reserve 1: {reserves.reserve1.toString()}</p>
    </div>
  );
};

export default PoolData;
