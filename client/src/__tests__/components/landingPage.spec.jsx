import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from
  '../../components/common/LandingPage.jsx';

describe('Landing Page Component', () => {
  it('renders a div', () => {
    const wrapper = shallow(<LandingPage />)
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0)
  });
});
