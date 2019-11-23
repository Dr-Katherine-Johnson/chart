import React from 'react';

const Chart = ({ path }) => {
  return (
    <div className="chart">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="transparent" stroke="black"></path>
      </svg>
    </div>
  );
}

export default Chart;