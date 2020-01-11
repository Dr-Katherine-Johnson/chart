import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ChartHat from './charthat.jsx';
import Chart from './chart.jsx';
import utils from './utils.js';
import config from '../../env.config.js';

import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);

    // default values initially in state
    this.state = {
      ticker: 'ABCD',
      name: 'ABCD Company',
      theme: 'light',
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
      path: [''],
      offsetX: null,
      offsetY: null,
      timeFrame: '1Y',
      dataPointCount: 1680,
      timeFrameIndex: null,
      activeDateTime: null,
      displayDateTime: null,
      activePrice: null,
      fittedSVGCoords: null,
      chartOffsetY: null,
      strokeDashArrayGap: null
    }

    this.updateTimeFrame = this.updateTimeFrame.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseMove(e) {
      const chartSvgContainer = document.querySelector('.chart-svg-container');
      const clientWidth = chartSvgContainer.clientWidth
      const leftMargin = chartSvgContainer.getBoundingClientRect().left;

      let offsetX = utils.calcLeftOffset(e.pageX, leftMargin)
      let offsetY = e.nativeEvent.offsetY;

      // if either value is outside the svg chart
      if (offsetX < 0 || offsetX > 676 || offsetX === -0 || offsetY < 0 || offsetY > 196 || offsetY === -0) {
        return;
      }

      let timeFrameIndex = utils.calcHoveredTimeFrame(this.state.dataPointCount, offsetX, this.state.width);
      const chartOffsetY = this.state.fittedSVGCoords[timeFrameIndex][1];

      let activeDateTime = this.state.prices[timeFrameIndex].dateTime;
      const timeFrame = this.state.timeFrame;
      let format;
      // TODO: WET with function below ... refactor??
      switch (timeFrame) {
        case '1D':
          format = 'H:m A Z';
          break;
        case '1W':
          format = 'H:m A, MMM D Z';
          break;
        case '1M':
        case '3M':
          format = 'H:00 A, MMM D Z';
          break;
        case '1Y':
          format = 'MMM D, YYYY';
          break;
      }

      const displayDateTime = moment(activeDateTime).format(format);

      this.setState((state, props) => {
        let newActivePrice = state.prices[timeFrameIndex].open;
        return { offsetX, offsetY, timeFrameIndex, activeDateTime, displayDateTime, activePrice: newActivePrice, chartOffsetY }
      });
  }

  // TODO: are more tests necessary here??
  mouseLeave(e) {
    // when the mouse leaves the chart area, on re-render
    this.setState((state, props) => {
      return {
        // hides the vertical bar
        offsetX: null,
        offsetY: null,
        chartOffsetY: null,
        timeFrameIndex: null, // removes any color from a certain section of the price chart
        activePrice: state.prices[state.prices.length - 1].open // display the last price
      }
    });
  }

  // TODO: add tests
  // TODO: I think this default value for dataPointCount is unnecessary ...
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

    let path = ['M0 196'];
    let price = null;
    let fittedSVGCoords = [[0, 196]];
    let x;
    let y;
    const strokeDashArrayGap = 676 / dataPointCount;
    let group = 0;
    let lastPosition = '';

    for (let i = 0; i < dataPointCount; i++) {
      price = this.state.prices[i];
      x = utils.calcX(dataPointCount, i, this.state.width);
      y = utils.calcY(price.open, this.state.height, this.state.low, this.state.priceRange);
      fittedSVGCoords.push([x, y]); // this is for displaying the y position of the ball

      if (dataPointCount === 35 && i !== 0 && i % 7 === 0) {
        // increment the index in the array where the paths are getting collected
        ++group;
        // put the last path's positions as the starting position in the new group's path
        path.push(`M${lastPosition}`);
      }

      lastPosition = `${x} ${y}`;
      path[group] += ` L${x} ${y}`; // TODO: displaying the open price for each timeframe ... should this be an average of some sort??
    }

    this.setState({ path, timeFrame, dataPointCount, fittedSVGCoords, strokeDashArrayGap });
  }

  // TODO: need additional tests for this ??
  componentDidMount() {
    // TODO: this should come from the other microservice when it's ready ...
    const random = Math.random();
    let rating;
    if (random <= 0.3) {
      rating = 'Buy';
    } else if (random <= 0.6) {
      rating = 'Hold';
    } else {
      rating = 'Sell';
    }
    // random number between 50 and 100
    const ratingPercent = parseInt(((Math.random() * 50) + 50).toFixed());

    // random integer in the thousands
    const peopleOwn = parseInt(Math.random() * 100000);

    const ticker = this.state.ticker;

    console.log('config: ', config);

    $.ajax({
      url: `${config.SERVICE_CHART_URL}:${config.SERVICE_CHART_PORT}/price/${ticker}`,
      dataType: 'json',
      success: (ticker) => {
        ticker.prices.forEach(price => {
          // converts the ISO8601 string into a Date object in the local timezone
          // TODO: is this necessary to do now that I'm using moment.js??
          price.dateTime = new Date(new Date(price.dateTime).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
        });

        const highLow = utils.calcHighAndLow(ticker.prices);

        this.setState({
          ticker: ticker.ticker,
          name: ticker.name,
          prices: ticker.prices,
          high: highLow[0],
          low: highLow[1],
          priceRange: highLow[0] - highLow[1],
          activePrice: ticker.prices[0].open, // defaults to displaying the first price
          rating,
          ratingPercent,
          peopleOwn,
          peopleOwnFormatted: Number(peopleOwn).toLocaleString()
        });

        this.updateTimeFrame({ target: { textContent: '1Y' }}); // defaults to displaying 1Y timeframe
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ratingMouseEnterOrLeave(e) {
    e.target.querySelector('.chart-rating-tooltip-container').classList.toggle('chart-active');
  }

  render() {
    return (
      <>
       <div id="tags">
          <ul className="tag-list">
            <li data-theme={this.state.theme} className="chart-tag-list-item">Computer Hardware</li>
            <li data-theme={this.state.theme} className="chart-tag-list-item">100 Most Popular</li>
            <li data-theme={this.state.theme} className="chart-tag-list-item">Computer Software</li>
          </ul>
        </div>
        <div className="chart">
          <ChartHat
            name={this.state.name}
            activePrice={this.state.activePrice}
            firstPrice={this.state.prices[0].open}
          >
          </ChartHat>
          <div className="chart-top-right">
            <span
              className="chart-rating-details"
              data-theme={this.state.theme}
              onMouseEnter={this.ratingMouseEnterOrLeave}
              onMouseLeave={this.ratingMouseEnterOrLeave}
            >
              <div className="chart-rating-column">
                <svg className="chart-rating-icon" width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <g fillRule="evenodd" transform="translate(-4 -4)">
                    <path id="tag-a" d="M20.99975,8 C20.44775,8 19.99975,7.552 19.99975,7 C19.99975,6.448 20.44775,6 20.99975,6 C21.55175,6 21.99975,6.448 21.99975,7 C21.99975,7.552 21.55175,8 20.99975,8 M21.99975,4 L14.82775,4 C14.29775,4 13.78875,4.21 13.41375,4.585 L4.58575,13.414 C3.80475,14.195 3.80475,15.461 4.58575,16.242 L11.75675,23.414 C12.53775,24.195 13.80475,24.195 14.58575,23.414 L23.41375,14.586 C23.78875,14.211 23.99975,13.702 23.99975,13.172 L23.99975,6 C23.99975,4.896 23.10375,4 21.99975,4"></path>
                  </g>
                </svg>
                <span>{this.state.ratingPercent}% {this.state.rating}</span>
              </div>
              <div className="chart-rating-tooltip-container">
                <span className="chart-rating-tooltip-summary" data-theme={this.state.theme}>
                  {this.state.ratingPercent}% of analysts rate <span className="chart-rating-tooltip-summary-name">{this.state.name}</span> as a {this.state.rating}.
                </span>
              </div>
            </span>
            <span
              className="chart-rating-details"
              data-theme={this.state.theme}
              onMouseEnter={this.ratingMouseEnterOrLeave}
              onMouseLeave={this.ratingMouseEnterOrLeave}
            >
              <div className="chart-rating-column">
                <svg className="chart-rating-icon" width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <g fillRule="evenodd">
                    <ellipse cx="6" cy="3.5" rx="3.333" ry="3.5"></ellipse>
                    <path d="M4.224,8.4 L7.776,8.4 L7.776,8.4 C10.1088508,8.4 12,10.2911492 12,12.624 L12,14 L0,14 L0,12.624 L8.8817842e-16,12.624 C6.02486595e-16,10.2911492 1.89114922,8.4 4.224,8.4 Z">
                    </path>
                  </g>
                </svg>
                <span>{this.state.peopleOwnFormatted}</span>
              </div>
              <div className="chart-rating-tooltip-container">
                <span className="chart-rating-tooltip-summary" data-theme={this.state.theme}>
                  {this.state.peopleOwnFormatted} people own <span className="chart-rating-tooltip-summary-name">{this.state.name}</span> on Robinhood.
                </span>
              </div>
            </span>
          </div>
          <Chart
            path={this.state.path}
            mouseMove={this.mouseMove}
            mouseLeave={this.mouseLeave}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            displayDateTime={this.state.displayDateTime}
            chartOffsetY={this.state.chartOffsetY}
            strokeDashArrayGap={this.state.strokeDashArrayGap}
            timeFrame={this.state.timeFrame}
            timeFrameIndex={this.state.timeFrameIndex}
            theme={this.state.theme}
          >
          </Chart>
          <div className="chart-footer">
            <div onClick={this.updateTimeFrame} className="chart-timeframes">
              <span className="chart-1D">1D</span>
              <span className="chart-1W">1W</span>
              <span className="chart-1M">1M</span>
              <span className="chart-3M">3M</span>
              <span className="chart-1Y">1Y</span>
            </div>
            <div className="chart-expand-button">Expand</div>
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#chart'));