import React from 'react';

const Chart = ({ path, mouseMove, mouseLeave, offsetX, offsetY, activeDateTime }) => {
  const verticalLineContainer = (
    <div id="vertical-line-container" style={{ left: offsetX }}>
      <div id="datetime-container">
        {activeDateTime ? activeDateTime.toDateString() : null}
      </div>
      <div id="vertical-line"></div>
    </div>
  );

  return (
    <div className="chart" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="transparent" stroke="black"></path>
      </svg>
      {offsetX && offsetY ? verticalLineContainer : null}
    </div>
  );
}

export default Chart;