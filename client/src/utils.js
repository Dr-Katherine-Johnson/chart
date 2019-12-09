module.exports = {
  /**
   *
   * Calculates a fixed position for how far along (ie, from the left edge) this particular data point is in terms of the total number of data points
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
   * Calculates a fixed position for how high this data point (this price) should be from the bottom of the svg
   * @param {Number} price The price for this data point
   * @param {Number} height The height in pixels of the svg
   * @param {Number} lowest The lowest price in this collection
   * @param {Number} priceRange The difference between the highest and lowest prices for this collection
   * @returns {Number} This price's offset from the bottom of the svg, in pixels
   */
  calculateY(price, height, lowest, priceRange) {
    const validPrice = Number.isFinite(price) && price >= 0;
    const validHeight = Number.isFinite(height) && height >= 0;
    const validLowest = Number.isFinite(lowest) && lowest >= 0;
    const validPriceRange = Number.isFinite(priceRange) && priceRange >= 0;

    if (validPrice && validHeight && validLowest && validPriceRange) {
      if (lowest !== 0 && priceRange !== 0) {
        if (price < lowest) {
          throw new Error('The current price must be greater than or equal to the lowest price.');
        } else if (price >= (lowest + priceRange)) {
          throw new Error('The current price must be less than lowest + priceRange');
        }
      }
      const percentFromTheBottom = (price - lowest) / priceRange;
      const percentFromTheTop = 1 - percentFromTheBottom;
      return height * percentFromTheTop;
    } else {
      throw new Error();
    }
  },

  /**
   *
   *
   * @param {Number} dataPointCount How many data points are in this time frame (ie, a week would have 7)
   * @param {Number} offsetX the offset in pixels from the left edge of the svg
   * @param {Number} width The width in pixels of the displayed svg
   * @returns {Number} The index in the prices collection of the data point (ie, the price) being hovered over
   */
  calculateHoveredTimeFrame(dataPointCount, offsetX, width) {
    const validDataPointCount = Number.isInteger(dataPointCount) && dataPointCount >= 0;
    const validOffsetX = Number.isFinite(offsetX) && offsetX > 0;
    const validWidth = Number.isFinite(width) && width > 0;

    if (validDataPointCount && validOffsetX && validWidth) {
      const timeFrameWidth = width / dataPointCount;
      return Math.floor(offsetX / timeFrameWidth);
    } else {
      throw new Error();
    }
  },

  /**
   *
   * Determines what the highest high and lowest low is for this particular collection of prices
   * @param {Array} prices An array of price objects, each of which must have a high and low property
   * @returns {Array} The highest and lowest values in prices
   */
  calculateHighAndLow(prices) {
    try {
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

      return [high, low];
    } catch(e) {
      throw e;
    }
  }
};