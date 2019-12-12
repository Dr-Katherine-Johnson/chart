import React from 'react';
import VerticalLine from './verticalline.jsx';

const Chart = ({ path, mouseMove, mouseLeave, offsetX, offsetY, displayDateTime, chartOffsetY, strokeDashArrayGap, timeFrame }) => {
  const circleIsHidden = offsetX === null && chartOffsetY === null;

  // TODO: do the timeframes need to have shorter intervals??
  // only display <line> if timeFrame is one day
  const line = timeFrame === '1D' ? <line x1="0" y1="50" x2="676" y2="50" stroke="black" strokeDasharray={`1 ${strokeDashArrayGap}`} strokeDashoffset="1"></line> : null

  const groups = path.map((str, i) => {
    return <g key={i}>
      <path d={str} fill="transparent" stroke="black"></path>
    </g>;
  })

  return (
    <div className="chart-svg-container" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {groups}
        <circle className={circleIsHidden ? 'hidden' : ''} cx={offsetX} cy={chartOffsetY} r="6" stroke="red" fill="red"></circle>
        {line}
      </svg>
    <VerticalLine
      offsetX={offsetX}
      offsetY={offsetY}
      displayDateTime={displayDateTime}
    />
    </div>
  );
}

export default Chart;