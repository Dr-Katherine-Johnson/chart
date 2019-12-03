import React from 'react';

const Chart = ({ path, mouseMove, mouseLeave, leftOffset }) => {
  return (
    <div className="chart" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="transparent" stroke="black"></path>
      </svg>
      {leftOffset ? <div id="left-offset" style={{ left: leftOffset }}></div> : null}
    </div>
  );
}

export default Chart;