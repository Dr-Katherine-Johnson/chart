import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ChartHat from './charthat.jsx';
import Chart from './chart.jsx';
import utils from './utils.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    // default values initially in state
    this.state = {
      ticker: 'ABCD',
      name: 'ABCD Company',
      prices: [
        {
          dateTime: new Date("2019-11-16T22:27:19.319Z"),
          open: 264.03,
          high: 264.40,
          low: 264.02,
          close: 264.35,
          volume: 96770
        },
      ],
      width: 676,
      height: 196,
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
      timeFrameIndex: null,
      activeDateTime: null,
      activePrice: null,
      prevActivePrice: null
    }

    this.updateTimeFrame = this.updateTimeFrame.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  // TODO: add tests
  mouseMove(e) {
    // offsetX & offsetY are the distance of the cursor from the edge of the chart
    let offsetX = e.nativeEvent.offsetX;
    let offsetY = e.nativeEvent.offsetY;


    // TODO: this seems to improve - but not solve - the flickering issue ... why is this needed??
    if (offsetX === -1 || offsetY === -0) {
      return;
    }

    // console.log('offsetX: ', offsetX, '\n',
    //             'offsetY: ', offsetY);

    // TODO: where do null and -0 come from??
    // if either value is outside the svg chart, set null
    if (offsetX < 0 || offsetX > 676 || offsetX === -0) {
      return;
    }

    if (offsetY < 0 || offsetY > 196 || offsetY === -0) {
      return;
    }

    let timeFrameIndex = utils.calculateHoveredTimeFrame(this.state.dataPointCount, offsetX, this.state.width);
    const activeDateTime = this.state.prices[timeFrameIndex].dateTime;

    // // TODO: generates different values for offsetX when hover to the right (-0) VS hover to the left (null) why?? ... need to remove returns from around line 70 to see this ...
    // console.log('this.state.timeFrameIndex: ', this.state.timeFrameIndex, '\n',
    //             'timeFrameIndex: ', timeFrameIndex, '\n',
    //             'this.state.offsetX: ', this.state.offsetX, '\n',
    //             'offsetX: ', offsetX, '\n',
    //             'this.state.offsetY: ', this.state.offsetY, '\n',
    //             'offsetY: ', offsetY);


    this.setState((state, props) => {
      let newActivePrice = state.prices[timeFrameIndex].open;
      let prevActivePrice = state.activePrice;
      return { offsetX, offsetY, timeFrameIndex, activeDateTime, activePrice: newActivePrice, prevActivePrice }
    });
  }

  // TODO: add tests
  mouseLeave(e) {
    // when the mouse leaves the chart area, hide the vertical bar (null's for those values accomplish this on re-render)
    this.setState({ offsetX: null, offsetY: null });
  }


  // TODO: add tests
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
      path += ` L${utils.calculateX(dataPointCount, i, this.state.width)} ${utils.calculateY(price.open, this.state.height, this.state.low, this.state.priceRange)}`; // TODO: displaying the open price for each timeframe ... should this be an average of some sort??
    }

    this.setState({ path, timeFrame, dataPointCount });
  }

  componentDidMount() {
    const ticker = this.state.ticker;
    $.ajax({
      // TODO: will the port part of this url become unnecessary to specify when deployed??
      url: `http://localhost:4444/price/${ticker}`,
      dataType: 'json',
      success: (ticker) => {
        ticker.prices.forEach(price => {
          // converts the ISO8601 string into a Date object in the local timezone
          price.dateTime = new Date(new Date(price.dateTime).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
        });

        const highLow = utils.calculateHighAndLow(ticker.prices);

        this.setState({
          ticker: ticker.ticker,
          name: ticker.name,
          prices: ticker.prices,
          high: highLow[0],
          low: highLow[1],
          priceRange: highLow[0] - highLow[1],
          activePrice: ticker.prices[0].open // defaults to displaying the first price
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
