import { getLPStatus } from "../lib/ethereum";
import React, { useState, useEffect } from 'react';

const withCurrentLPStatus = (WrappedComponent, lpAddress) => {
    return props => {
      const [lpData, setLpData] = useState({
        price: null,
        reserve_token: null,
        reserve_ETH: null,
      });
  
      useEffect(() => {
        const fetchData = async () => {
          const data = await getLPStatus(lpAddress);
          setLpData(data);
        };
        fetchData();
      }, [lpAddress]);
  
      return <WrappedComponent lpData={lpData} {...props} />;
    };
  };
  