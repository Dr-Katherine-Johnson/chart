import React from 'react';
import ReactDOM from 'react-dom';

import Sample from '../../sampledata/price.js'

import ChartHat from './charthat.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: Sample.ticker,
      name: Sample.name,
      prices: Sample.prices
    }
  }

  render() {
    return (
      <div className="priceChart">
        <ChartHat
          ticker={this.state.ticker}
        >
        </ChartHat>
        <div className="rating-percent"></div>
        <div className="people-own"></div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));
