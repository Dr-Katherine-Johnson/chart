import React from 'react';

const VerticalLine = ({ offsetX, offsetY, activeDateTime }) => {
  // when offsetX OR offsetY is null, changed from completely removing the verticalLine div from the DOM, to hiding it with CSS
  let style;
  if (offsetX === null || offsetY === null) {
    style = {
      visibility: 'hidden'
    }
  } else {
    style = {
      visibility: 'visible',
      left: offsetX
    }
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