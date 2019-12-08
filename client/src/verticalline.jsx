import React from 'react';

const VerticalLine = ({ offsetX, offsetY, activeDateTime }) => {
  const verticalLineContainer = (
    <div id="chart-chart-vertical-line-container" style={{ left: offsetX }}>
      <div id="chart-datetime-container">
        {activeDateTime ? activeDateTime.toDateString() : null}
      </div>
      <div id="chart-vertical-line"></div>
    </div>
  );

  return (
    <>
      {offsetX !== null && offsetY !== null ? verticalLineContainer : null}
    </>
  );
};

export default VerticalLine;