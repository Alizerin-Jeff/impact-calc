import React from 'react';
import PropTypes from 'prop-types';

const LPCard = ({ data, color, name, link, picLink, totalSupply, price, reserveToken, reserveETH }) => {
    const formatter = new Intl.NumberFormat('en-US');
    const marketCap = Number(Number(totalSupply * price).toFixed(0)).toLocaleString();
  return (
    <div className="card py-2 w-92 max-md:max-w-80 bg-base-100 shadow-xl">
     <figure><img src={picLink} className='h-32' /></figure>
      <div className="items-center card-body py-1">
       <div className=" rounded-md w-3/8 px-1">
       <p className=''>Market Cap : ${marketCap}</p>
       <p className='whitespace-pre'>Price      : ${price}</p>
       </div>
       <div className='border rounded-md p-2 m-3'>
       <h2 className="card-title justify-center">
         <div className={`${color} text-xl px-4`}>{name} LP Status</div>
       </h2>
       <div className="p-1">
       <p className='whitespace-pre'>{name} Reserves : {Number(reserveToken).toFixed(2)}</p>
       <p className='whitespace-pre'>ETH  Reserves : {Number(reserveETH).toFixed(2)}</p>
       </div>
       </div>
       <div className="card-actions justify-end">
         <div className="badge badge-outline hover:bg-sky-400">
         <a
          href={link}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >Website</a>
         </div> 
        </div>
     </div>
    </div>
  );
};

LPCard.propTypes = {
  price: PropTypes.number.isRequired,
  reserveToken: PropTypes.number.isRequired,
  reserveETH: PropTypes.number.isRequired,
};

export default LPCard;
