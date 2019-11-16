import React from 'react';
import ReactDOM from 'react-dom';

import Sample from '../../sampledata/price.js'

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
