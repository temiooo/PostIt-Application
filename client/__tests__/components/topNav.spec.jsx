import React from 'react';
import { shallow } from 'enzyme';
import TopNav from '../../src/components/messages/TopNav';

const props = {
  logout: jest.fn(),
};

describe('Top Nav Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should display a logout text if it receives a logout prop', () => {
    const wrapper = shallow(<TopNav {...props} />);
    const topNavLinks = wrapper.find('a').map(node => node.text());
    expect(topNavLinks).toContain('Logout');
  });

  it('should call the logout function when logout link is clicked', () => {
    const wrapper = shallow(<TopNav {...props} />);
    const logoutLink = wrapper.find('a').last();
    logoutLink.simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });
});
