import React from 'react';
import VerticalLine from './verticalline.jsx';

const Chart = ({ path, mouseMove, mouseLeave, offsetX, offsetY, activeDateTime }) => {
  return (
    <div className="chart" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="transparent" stroke="black"></path>
      </svg>
    <VerticalLine
      offsetX={offsetX}
      offsetY={offsetY}
      activeDateTime={activeDateTime}
    />
    </div>
  );
}

export default Chart;