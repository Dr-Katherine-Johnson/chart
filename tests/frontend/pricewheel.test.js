import React from 'react';
import { shallow } from 'enzyme';

import PriceWheel from '../../client/src/pricewheel.jsx';

describe('PriceWheel', () => {
  let wrapper = shallow(<PriceWheel activePrice={null} />)
  it('Should have 0 nodes when activePrice is null', () => {
    expect(wrapper.find('.chart-price-wheel')).toHaveLength(0);
  });

  it('Should have the correct number of nodes to account for every digit in the price, as well as the $ (and optionally the dot), when activePrice is a decimal.', () => {
    const prices = [0, 45, 12.43, 876.43, 6.7]
    prices.forEach(price => {
      wrapper = shallow(<PriceWheel activePrice={price} />)
      const digitCount = String(price).length + 1;
      expect(wrapper.find('.chart-price-wheel')).toHaveLength(digitCount);
    });
  });
});