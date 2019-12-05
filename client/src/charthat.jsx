import React from 'react';

const ChartHat = ({ ticker, activePrice }) => {
    // TODO: make into separate component??
    let priceWheel = ['$', '.', 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    priceWheel = priceWheel.map((num, i) => <div key={i}>{num}</div>);

    let allDigits = null;
    if (activePrice !== null) {
      allDigits = new String(activePrice).split('');
      allDigits.unshift('$');
      allDigits = allDigits.map((digit, i) => {
        if (digit === '.') {
          digit = 10;
        } else if (digit === '$') {
          digit = 11;
        }
        return (
          <div
            key={i}
            className="price-wheel"
            style={{ bottom: -(digit * 40), left: i * 20 }}
          >
            {priceWheel}
          </div>
          );
        });
    }

  return (
    <>
      <h1>{ticker}</h1>
      <div id="active-price">
        {allDigits}
      </div>
      <div>Absolute and % change</div>
      <div id="hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;