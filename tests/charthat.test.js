import React from 'react';
import { shallow } from 'enzyme'

import ChartHat from '../client/src/charthat.jsx';

describe('CharHat', () => {
  let wrapper = shallow(<ChartHat />)
  it('Should display the ticker in an <h1>', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('Should have one <div id="chart-active-price">', () => {
    expect(wrapper.find('#chart-active-price')).toHaveLength(1);
  });

  xit('???', () => {
    // TODO: add tests for absolute and % change ...
  });
});