import React from 'react';
import { shallow } from 'enzyme';

import Chart from '../client/src/chart.jsx';

const wrapper = shallow(<Chart />);
console.log('wrapper: ', wrapper);