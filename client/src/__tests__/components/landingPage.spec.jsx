import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from
  '../../components/common/LandingPage.jsx';

describe('Landing Page Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  });

  it('should render four icons', () => {
    const wrapper = shallow(<LandingPage />)
    const icons = wrapper.find('i');
    expect(icons.length).toBe(4)
  })
});
