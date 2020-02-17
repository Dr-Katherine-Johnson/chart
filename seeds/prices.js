const faker = require('faker');

module.exports = {
  generateName() {
    return faker.company.companyName();
  },

  twoDecimalPlaces(num) {
    return Math.trunc(num * 100) / 100;
  },

  createAnchorPrice(num) {
    // get starting price
    return Math.random() * num;
  },

  generatePricesList() {
    const result = [];

    for (let i = 0; i < 390; i++) {
      result.push(this.generateDate(this.generatePrice(result[i - 1]), i, result[i - 1]));
    }
    return result;
  },

  generatePrice(previousPrice) {
    // set open price first
    let open;
    if (previousPrice === undefined) {
      open = this.lessThanTenPercentDifferent(this.createAnchorPrice(1000));
    } else {
      open = this.lessThanTenPercentDifferent(previousPrice.close);
    }

    // calc three prices of lessThanTenPercentDifferent
    let maybeHigh = this.lessThanTenPercentDifferent(open, 1);
    let maybeLow = this.lessThanTenPercentDifferent(open, 0)
    let close = this.lessThanTenPercentDifferent(open)
    let low, high;

      // open has to be open
      // close has to be close
      // if maybeLow is below close, set as low
      if (maybeLow < close) {
        low = maybeLow;
      } else {
        // else, set the lower of open OR close as low
        low = open <= close ? open : close;
      }

      // if maybeHigh is above close, set as high
      if (maybeHigh > close) {
        high = maybeHigh;
      } else {
        // else, set the higher of open OR close as high
        high = open >= close ? open : close;
      }

      [open, high, low, close] = [open, high, low, close].map(this.twoDecimalPlaces);

    return {
      open,
      high,
      low,
      close,
      // TODO: more realistic volume patterns
      volume: Math.round(Math.random() * 1000000)
    };
  },

  // returns a new object with the date added to its input argument
  generateDate(priceObject, index, prev) {
    let dateTime;
    let prevDateTime;
    const msInHour = 3600000;
    // index is 0, generate 9:30 AM on today's date
    if (index === 0) {
      const now = new Date();
      const hoursIn6Months = 4380;
      const sixMonthsOffset = hoursIn6Months * msInHour;
      const start = new Date(now - sixMonthsOffset);
      dateTime = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 9 - (new Date().getTimezoneOffset() / 60), 30);

    } else if (prev) {
      prevDateTime = new Date(prev.dateTime);
      if (prevDateTime.getDay() === 4 && index % 15 === 0) {
        // skip weekends, so that every 5 days, with three points per day, skip to monday
        const timeToNextMonday = (16 + 48) * msInHour;
        dateTime = new Date(prevDateTime.getTime() + timeToNextMonday);
      } else if (index % 3 === 0) {
        // index DOES divide by 7 evenly, add the amount of milliseconds to the next day's 9:30 AM
        // CHANGE: checking how 1 day looks being rendered by 3 points since with too
        // many points per day they don't fit in the EC2 instance
        // from 4:30 pm to 9:30 am, there are 17 hours
        const timeToNextDay = 16 * msInHour;
        dateTime = new Date(prevDateTime.getTime() + timeToNextDay);
      } else {
        // index does NOT divide by 7 evenly, add 1 hour to the previous dateTime
        // CHANGE: every 4 hours 9:30, then 12:30 then 4:30
        const timeToNextPoint = 4 * msInHour;
        dateTime = new Date(prevDateTime.getTime() + timeToNextPoint);
      }
    }
    return Object.assign({}, priceObject, { dateTime: dateTime.toISOString() });
  },

  /**
   * @param num - INT - input number
   * @param useLessThan - INT - should the function return a number less than or greater than the input argument, 0 for yes, 1 for no, omit for random
   * @returns num less than 10% different from its argument
   */
  lessThanTenPercentDifferent(num, useLessThan) {
    if (useLessThan === undefined) {
      useLessThan = Math.round(Math.random());
    }

    let result, random;
    random = Math.random() * (0.10 * num);

    if (useLessThan === 0) {
      result = num - random
    } else if (useLessThan === 1) {
      result = num + random
    }
    return result;
  }
}
