import React from 'react';
import { shallow } from 'enzyme';

import VerticalLine from '../../client/src/verticalline.jsx'

describe('Vertical Line', () => {
  let wrapper = shallow(<VerticalLine offsetX={250} offsetX={45} />);
  it('Displays a line only when offsetX & offsetY are both NOT null', () => {
    expect(wrapper.find('#chart-vertical-line-container')).toHaveLength(1);
    wrapper = shallow(<VerticalLine offsetX={null} offsetY={null} />);
    expect(wrapper.find('#chart-vertical-line-container').hasClass('hidden')).toBe(true);
  });
});