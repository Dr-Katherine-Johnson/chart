module.exports = {
  calculateX(dataPointCount, i, width) {
    // width of svg divided by how many data points for this timeframe
    const portion = width / dataPointCount;

    // calculates a fixed position for how far along this particular data point is in terms of the total number of data points
    return (portion * i) + portion;
  },

  calculateY(price, height, low, priceRange) {
    const verticalPercentFromTheBottom = (price - low) / priceRange;
    const verticalPercentFromTheTop = 1 - verticalPercentFromTheBottom;
    return height * verticalPercentFromTheTop; // TODO: height will need to change if the height of the <svg> changes
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