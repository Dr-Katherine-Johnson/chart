import React from 'react';

const ChartHat = ({ ticker, children, activePrice }) => {
  return (
    <>
      <h1>{ticker}</h1>
      <div>{activePrice}</div>
      {/* TODO: what are these percent changes computed from?? */}
      <div>Absolute and % change</div>
      <div id="hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;