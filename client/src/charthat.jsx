import React from 'react';

const ChartHat = ({ ticker, children }) => {
  return (
    <>
      <h1>{ticker}</h1>
      <div>This is the price that is currently being hovered over</div>
      {/* TODO: what are these percent changes computed from?? */}
      <div>Absolute and % change</div>
      <div id="hover-active-datetime"></div>
    </>
  );
};

export default ChartHat;