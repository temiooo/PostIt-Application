import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../components/messages/SideNav';
let props;

const setup = (groups) => {
  props = {
    groups: groups,
    edit: jest.fn()
  }
  return shallow(<SideNav {...props} />)
}

describe('Side Nav Component', () => {
  it('renders a div', () => {
    const wrapper = setup([]);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('calls edit function when create new group link is clicked', () => {
    const wrapper = setup([]);
    const editLink = wrapper.find('a').first();
    editLink.simulate('click')
    expect(props.edit).toHaveBeenCalled();
  });

  it('renders a list of groups if length of group array is greater than 1',
    () => {
      const wrapper = setup([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);
      const groupList = wrapper.find('Link');
      const groupName = groupList.children().map(node => node.text());
      expect(groupList.length).toBe(2)
      expect(groupName).toEqual(['A', 'B'])
    });

});
