import React from 'react';

const PriceWheel = ({ activePrice }) => {
     let oneDigitPriceWheel = ['$', '.', 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num, i) => <div key={i}>{num}</div>);

     // TODO: alternate approach
     // change this so that priceWheel always ends up as an array with a specific length,
     // and what's different for every price is which divs in the array have display: none or not,
     // and there are transitions between those states
     let priceWheel = null;
     if (activePrice !== null) {
       priceWheel = new String(activePrice).split('');
       priceWheel.unshift('$');
       priceWheel = priceWheel.map((digit, i) => {
         if (digit === '.') {
           digit = 10;
         } else if (digit === '$') {
           digit = 11;
         }
         return (
           <div
             key={i}
             className="chart-price-wheel"
             style={{ bottom: -(digit * 40), left: i * 20 }}
           >
             {oneDigitPriceWheel}
           </div>
           );
         });
     }

  return (
    <>
      {priceWheel}
    </>
  );
};

export default PriceWheel;