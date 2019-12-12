import React from 'react';
import VerticalLine from './verticalline.jsx';

const Chart = ({ path, mouseMove, mouseLeave, offsetX, offsetY, activeDateTime, chartOffsetY }) => {
  const circleIsHidden = offsetX === null && chartOffsetY === null;

  return (
    <div className="chart-svg-container" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="transparent" stroke="black"></path>
        <circle className={circleIsHidden ? 'hidden' : ''} cx={offsetX} cy={chartOffsetY} r="6" stroke="red" fill="red"></circle>
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