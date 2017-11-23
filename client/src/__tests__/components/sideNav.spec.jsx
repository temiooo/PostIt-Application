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
  it('should render without crashing', () => {
    const wrapper = setup([]);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the edit function when create new group link is clicked',
    () => {
      const wrapper = setup([]);
      const editLink = wrapper.find('a').first();
      editLink.simulate('click');
      expect(props.edit).toHaveBeenCalled();
    });

  it('should render group list if length of groups is greater than 0',
    () => {
      const wrapper = setup([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);
      const groupList = wrapper.find('Link');
      const groupName = groupList.children().map(node => node.text());
      expect(groupList.length).toBe(2)
      expect(groupName).toEqual(['A', 'B'])
    });
});
