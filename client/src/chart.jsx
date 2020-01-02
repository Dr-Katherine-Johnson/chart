import React from 'react';
import VerticalLine from './verticalline.jsx';

const Chart = ({ path, mouseMove, mouseLeave, offsetX, offsetY, displayDateTime, chartOffsetY, strokeDashArrayGap, timeFrame, timeFrameIndex, theme }) => {
  const circleIsHidden = offsetX === null && chartOffsetY === null;

  // TODO: do the timeframes need to have shorter intervals??
  // TODO: add tests
  // only display <line> if timeFrame is one day
  const line = timeFrame === '1D' ? <line x1="0" y1="50" x2="676" y2="50" stroke="black" strokeDasharray={`1 ${strokeDashArrayGap}`} strokeDashoffset="1"></line> : null

  let strokeColor = theme === `dark` ? `#21ce99` : `#f45531`;
  let opacity;

  // Highlights the hovered over <g> in the 1W timeframe, timeFrameIndex 0-34
  // TODO: this seems rather brittle, only works for 1W timeframes ...
  // TODO: add tests
  const groups = path.map((str, i) => {

    // timeFrameIndex will be null when the chart is NOT being hovered over
    if (timeFrameIndex === null) {
      opacity = 1;
    } else {
      // 1W timeframe
      if (timeFrame === '1W') {
        opacity = 0.3;
        const MAX = ((i + 1) * 7) - 1
        const MIN = i * 7
        if (timeFrameIndex <= MAX && timeFrameIndex >= MIN) {
          opacity = 1;
        }
      } else {
        opacity = 1;
      }
    }

    return <g key={i}>
      <path d={str} fill="transparent" stroke={strokeColor} style={{ opacity }}></path>
    </g>;
  })

  let circleFill = theme === `dark` ? `#21ce99` : `#f45531`;
  let circleStroke = theme === `dark` ? `#1b1b1b` : `white`;

  return (
    <div className="chart-svg-container" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {groups}
        <circle className={circleIsHidden ? 'hidden' : ''} cx={offsetX} cy={chartOffsetY} r="6" stroke={circleStroke} strokeWidth="2" fill={circleFill}></circle>
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