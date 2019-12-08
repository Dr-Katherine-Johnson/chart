import React from 'react';
import { shallow } from 'enzyme';

import Chart from '../client/src/chart.jsx';

describe('Chart', () => {
  const wrapper = shallow(<Chart offsetX={100} offsetY={50}/>);
  it('Contains an <svg>', () => {
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('Displays a vertical line when offsetX and offsetY are NOT null', ()=> {
    console.log(wrapper.props());
    // console.log(wrapper.props().offsetX);
    // console.log(wrapper.props().children);
  });
});