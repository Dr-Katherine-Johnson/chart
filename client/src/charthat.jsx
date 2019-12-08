import React from 'react';
import PriceWheel from './pricewheel.jsx';

const ChartHat = ({ ticker, activePrice }) => {
  return (
    <>
      <h1>{ticker}</h1>
      <div id="active-price">
        <PriceWheel
          activePrice={activePrice}
        />
      </div>
      <div>Absolute and % change</div>
      <div id="hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;