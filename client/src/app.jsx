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
      ratingPercent: `81%`,
      peopleOwn: 2500
    }
  }

  componentDidMount() {
    // ajax request to the server for price data
    $.ajax({
      // TODO: fixed stock ticker for now
      url: `http://localhost:3000/price/${'ABCD'}`,
      dataType: 'json',
      success: (ticker) => {
        ticker.prices.forEach(price => {
          // convert the ISO8601 string into a Date object in the local timezone
          price.dateTime = new Date(new Date(price.dateTime).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
        });

        this.setState({
          ticker: ticker.ticker,
          name: ticker.name,
          prices: ticker.prices
        });
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
        >
        </ChartHat>
        <div className="top-right">
          <span className="rating-percent">{this.state.ratingPercent} Hold</span>
          <span className="people-own">{this.state.peopleOwn}</span>
        </div>
        <Chart></Chart>
        <div className="chart-footer">
          <div className="chart-timeframes">
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
