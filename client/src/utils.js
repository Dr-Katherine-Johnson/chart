



module.exports = {
  /**
  * This calculates a fixed position for how far along (ie, from the left side) this particular data point is in terms of the total number of data points
  * @param {Number} dataPointCount How many data points are in this time frame (ie, a week would have 7)
  * @param {Number} i The index in the array of the particular data point we're interested in
  * @param {Number} width The width in pixels of the displayed svg
  * @returns {Number} The offset in pixels from the left side of the svg (ie, the x coordinate)
  */
  calculateX(dataPointCount, i, width) {
    validDataPointCount = Number.isInteger(dataPointCount) && dataPointCount >= 0;
    validI = Number.isInteger(i) && i >= 0;
    validWidth = Number.isInteger(width) && width > 0;
    if (validDataPointCount && validI && validWidth) {
      const portion = width / dataPointCount;
      return (portion * i) + portion;
    } else {
      throw new Error();
    }

  },

  /**
  *
  * @param {*} price
  * @param {*} height
  * @param {*} low
  * @param {*} priceRange
  * @returns
  */
  function calculateY(price, height, low, priceRange) {
    const verticalPercentFromTheBottom = (price - low) / priceRange;
    const verticalPercentFromTheTop = 1 - verticalPercentFromTheBottom;
    return height * verticalPercentFromTheTop;
  },

  calculateHoveredTimeFrame(dataPointCount, offsetX, width) {
    const timeFrameWidth = width / dataPointCount;
    const timeFrameIndex = Math.floor(offsetX / timeFrameWidth);
    return timeFrameIndex;
  },

  calculateHighAndLow(prices) {
    // determine what the highest high and lowest low is for this particular stock
    let high = prices[0].high;
    let low = prices[0].low;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i].high > high) {
        high = prices[i].high;
      }
      if (prices[i].low < low) {
        low = prices[i].low;
      }
    }

    // use those numbers to determine the range for what the y-axis should be
    return [high, low];
  }
};