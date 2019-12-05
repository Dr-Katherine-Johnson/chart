import React from 'react';
import ReactDOM from 'react-dom';
import Sample from '../../sampledata/price.js'
import $ from 'jquery';
import ChartHat from './charthat.jsx';
import Chart from './chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: Sample.ticker,
      name: Sample.name,
      prices: Sample.prices,
      high: 0,
      low: 0,
      priceRange: 0,
      ratingPercent: `81%`,
      peopleOwn: 2500,
      path: '',
      offsetX: null,
      offsetY: null,
      timeFrame: '1Y',
      dataPointCount: 1680,
      activeDateTime: null,
      activePrice: null,
      prevActivePrice: null
    }

    this.updateTimeFrame = this.updateTimeFrame.bind(this);
    this.calculatey = this.calculateY.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  // TODO: add tests
  // TODO: why does the vertical line flicker and / or disappear sometimes?? too many setState calls to fast??
  mouseMove(e) {
    // offsetX & offsetY are the distance of the cursor from the edge of the chart
    let offsetX = e.nativeEvent.offsetX;
    let offsetY = e.nativeEvent.offsetY;

    // if either value is outside the svg chart, set null
    if (offsetX < 0 || offsetX > 676) {
      offsetX = null;
    }

    if (offsetY < 0 || offsetY > 196) {
      offsetY = null;
    }

    const timeFrameIndex = this.calculateHoveredTimeFrame(this.state.dataPointCount, offsetX);
    const activeDateTime = this.state.prices[timeFrameIndex].dateTime;

    this.setState((state, props) => {
      let newActivePrice = state.prices[timeFrameIndex].open;
      let prevActivePrice = state.activePrice;
      return { offsetX, offsetY, timeFrameIndex, activeDateTime, activePrice: newActivePrice, prevActivePrice }
    });
  }

  // get the direction transition working for a single digit
    //
  // apply that direction transformation to each digit in the current price

  mouseLeave(e) {
    // when the mouse leaves the chart area, hide the vertical bar (null's for those values accomplish this on re-render)
    this.setState({ offsetX: null, offsetY: null });
  }

  // TODO: add tests
  calculateHoveredTimeFrame(dataPointCount, offsetX) {
    const timeFrameWidth = 676 / dataPointCount;
    const timeFrameIndex = Math.floor(offsetX / timeFrameWidth);
    return timeFrameIndex;
  }

  // TODO: need to add tests for these functions ...
  updateTimeFrame(e, dataPointCount = 1680) {
    const timeFrame = e.target.textContent;
    switch (timeFrame) {
      case '1D':
        dataPointCount = 7;
        break;
      case '1W':
        dataPointCount = 35;
        break;
      case '1M':
        dataPointCount = 140;
        break;
      case '3M':
        dataPointCount = 420;
        break;
      case '1Y':
        dataPointCount = 1680;
        break;
    }

    let path = 'M0 196';
    let price = null;

    for (let i = 0; i < dataPointCount; i++) {
      price = this.state.prices[i];
      path += ` L${this.calculateX(dataPointCount, i)} ${this.calculateY(price.open)}`; // TODO: displaying the open price for each timeframe ... should this be an average of some sort??
    }

    this.setState({ path, timeFrame, dataPointCount });
  }

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

  calculateX(dataPointCount, i) {
    // width of svg divided by how many data points for this timeframe
    const portion = 676 / dataPointCount;

    // calculates a fixed position for how far along this particular data point is in terms of the total number of data points
    return (portion * i) + portion;
  }

  calculateY(price) {
    // set verticalPercentFromTheBottom as (price - low) / priceRange
    const verticalPercentFromTheBottom = (price - this.state.low) / this.state.priceRange;

    // set verticalPercentFromTheTop as 1 - verticalPercentFromTheBottom
    const verticalPercentFromTheTop = 1 - verticalPercentFromTheBottom;

    return 196 * verticalPercentFromTheTop; // TODO: height will need to change if the height of the <svg> changes
  }

  componentDidMount() {
    // ajax request to the server for price data
    $.ajax({
      // TODO: fixed stock ticker for now
      url: `http://localhost:3000/price/${'ABCD'}`,
      dataType: 'json',
      success: (ticker) => {
        ticker.prices.forEach(price => {
          // converts the ISO8601 string into a Date object in the local timezone
          price.dateTime = new Date(new Date(price.dateTime).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
        });

        const highLow = this.calculateHighAndLow(ticker.prices);

        this.setState({
          ticker: ticker.ticker,
          name: ticker.name,
          prices: ticker.prices,
          high: highLow[0],
          low: highLow[1],
          priceRange: highLow[0] - highLow[1]
        });

        this.updateTimeFrame({ target: { textContent: '1Y' }}); // defaults to displaying 1Y timeframe
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="price-chart">
        <ChartHat
          ticker={this.state.ticker}
          activePrice={this.state.activePrice}
          prevActivePrice={this.state.prevActivePrice}
        >
        </ChartHat>
        <div className="top-right">
          <span className="rating-percent">{this.state.ratingPercent} Hold</span>
          <span className="people-own">{this.state.peopleOwn}</span>
        </div>
        <Chart
          path={this.state.path}
          mouseMove={this.mouseMove}
          mouseLeave={this.mouseLeave}
          offsetX={this.state.offsetX}
          offsetY={this.state.offsetY}
          activeDateTime={this.state.activeDateTime}
        >
        </Chart>
        <div className="chart-footer">
          <div onClick={this.updateTimeFrame} className="chart-timeframes">
            <span>1D</span>
            <span>1W</span>
            <span>1M</span>
            <span>3M</span>
            <span>1Y</span>
          </div>
          <div>Expand</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));
