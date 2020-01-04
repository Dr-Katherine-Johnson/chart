import React from 'react';
import PriceWheel from './pricewheel.jsx';

const ChartHat = ({ ticker, activePrice, firstPrice }) => {
const absoluteChange = activePrice - firstPrice;
const percentChange = (absoluteChange / firstPrice) * 100

  return (
    <>
      <h1>{ticker}</h1>
      <div id="chart-active-price">
        <PriceWheel
          activePrice={activePrice}
        />
      </div>
      <div>${`${absoluteChange > 0 ? '+' : ''}${absoluteChange.toFixed(2)}`} {`(${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%)`}</div>
      <div id="chart-hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;