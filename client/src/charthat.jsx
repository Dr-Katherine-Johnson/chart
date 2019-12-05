import React from 'react';

const ChartHat = ({ ticker, children, activePrice }) => {
  // TODO: only doing the one digit of activePrice for now
    activePrice = Number(new String(activePrice).split('')[0]);

    // TODO: make into separate component??
    let priceWheel = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    priceWheel = priceWheel.map((num, i) => <span key={i}>{num}</span>);
  return (
    <>
      <h1>{ticker}</h1>
      <div id="active-price">
        <div class="price-wheel">
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