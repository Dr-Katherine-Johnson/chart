import React from 'react';
import { shallow } from 'enzyme';

import Chart from '../client/src/chart.jsx';

describe('Chart', () => {
  const wrapper = shallow(<Chart />);
  it('Contains an <svg>', () => {
    expect(wrapper.find('svg')).toHaveLength(1);
  });
});