import React from 'react';

const ChartHat = ({ ticker, children, activePrice, prevActivePrice }) => {
  // TODO: only doing the one digit of activePrice for now
    activePrice = Number(new String(activePrice).split('')[0]);
    prevActivePrice = Number(new String(prevActivePrice).split('')[0]);

    // TODO: make into separate component??
    let priceWheel = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    priceWheel = priceWheel.map((num, i) => <div key={i}>{num}</div>);

    // TODO: why is each div's height 40px??
    let bottomOffset = activePrice * -40;
  return (
    <>
      <h1>{ticker}</h1>
      <div id="active-price">
        <div
          className="price-wheel"
          style={{ bottom: bottomOffset }}
        >
          {priceWheel}
          {/* {activePrice} */}
        </div>
      </div>
      {/* TODO: what are these percent changes computed from?? */}
      <div>Absolute and % change</div>
      <div id="hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;