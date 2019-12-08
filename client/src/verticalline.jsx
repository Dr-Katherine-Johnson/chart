import React from 'react';

const VerticalLine = ({ offsetX, offsetY, activeDateTime }) => {
  const verticalLineContainer = (
    <div id="vertical-line-container" style={{ left: offsetX }}>
      <div id="datetime-container">
        {activeDateTime ? activeDateTime.toDateString() : null}
      </div>
      <div id="vertical-line"></div>
    </div>
  );

  return (
    <>
      {offsetX !== null && offsetY !== null ? verticalLineContainer : null}
    </>
  );
};

export default VerticalLine;