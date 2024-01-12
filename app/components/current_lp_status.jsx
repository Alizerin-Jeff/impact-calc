'use client'

import React, { useState, useEffect } from 'react';
// Assume you have a function to fetch LP data
import { getLPStatus } from '../lib/ethereum';
import LPCard from './LpCard';

const eagLP = '0x7f00995f977a8a64abd4b888e5cf09d86f91ca66'
const barcPic = "https://assets-global.website-files.com/65957a2d1611b7bf8ddff2cc/65957ffcbd736535aa69375c_barc%202.png"
const eagPic = "https://app.eag.network/static/media/icon.bf665b95e3f24d9ddf12.png"
const eagLink = "https://www.eag.network/"
const barcLink = "https://www.bluarctic.xyz/"
const eag = "EAG "
const barc = "BARC"
const eagColor = 'text-amber-300'
const barcColor = 'text-blue-800'

const CurrentLPStatus = ({ lpAddress }) => {
    let totalSupply, picLink, link, name, color
    if(lpAddress === eagLP){
        totalSupply = 12075000;
        picLink = eagPic;
        link = eagLink
        name = eag
        color = eagColor
    }
    else {
        totalSupply = 109000000;
        picLink = barcPic;
        link = barcLink
        name = barc
        color = barcColor
    }
  const [lpData, setLpData] = useState({
    price: null,
    reserve_token: null,
    reserve_ETH: null,
    // Add other relevant data points
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLPStatus(lpAddress);
      setLpData(data);
    };

    fetchData();
  }, [lpAddress]);

  return (
    <div>
      <LPCard 
        price={Number(lpData.price).toFixed(5)} 
        link={link}
        picLink={picLink} 
        totalSupply={totalSupply}
        color={color}
        reserveToken={lpData.reserve_token}
        reserveETH={lpData.reserve_ETH}
        name={name} />
    </div>
  );
};

export default CurrentLPStatus;
