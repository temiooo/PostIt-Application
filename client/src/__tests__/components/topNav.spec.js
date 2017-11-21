import React from 'react';
import { shallow } from 'enzyme';
import TopNav from '../../components/messages/TopNav';

const props = {
  logout: jest.fn(),
};

describe('Top Nav Component', () => {
  it('renders a div', () => {
    const wrapper = shallow(<TopNav />)
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('renders a logout link if it receives a logout prop', () => {
    const wrapper = shallow(<TopNav {...props} />)
    const logoutLink = wrapper.find('a').map(node => node.text());
    expect(logoutLink).toContain('Logout');
  });

  it('calls logout function when logout link is clicked', () => {
    const wrapper = shallow(<TopNav {...props} />)
    const logoutLink = wrapper.find('a').last();
    logoutLink.simulate('click')
    expect(props.logout).toHaveBeenCalled();
  });
});
