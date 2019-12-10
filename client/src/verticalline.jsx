import React from 'react';

const VerticalLine = ({ offsetX, offsetY, activeDateTime }) => {
  // when offsetX OR offsetY is null, hide the whole VerticalLineContainer with CSS
  let style = {
    visibility: 'hidden'
  }
  if (offsetX !== null && offsetY !== null) {
    style = Object.assign({}, { style: 'visible', left: offsetX });
  }

  const verticalLineContainer = (
    <div id="chart-vertical-line-container" style={style}>
      <div id="chart-datetime-container">
        {activeDateTime ? activeDateTime.toDateString() : null}
      </div>
      <div id="chart-vertical-line"></div>
    </div>
  );

  return (
    <>
      {verticalLineContainer}
    </>
  );
};

export default VerticalLine;