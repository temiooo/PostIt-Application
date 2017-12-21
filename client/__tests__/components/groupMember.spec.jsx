import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import ConnectedGroupMember, { GroupMember } from
  '../../src/components/messages/GroupMember';

let props;

const { groupMember } = mockData.componentData;

const setup = (users) => {
  props = {
    users,
    getGroupMembers: jest.fn(),
    searchUsers: jest.fn(),
    searchUsersFailure: jest.fn(),
    addUser: jest.fn(() => Promise.resolve()),
    match: {
      params: { id: groupMember.groupId }
    }
  }
  return shallow(<GroupMember {...props} />)
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  messages: {},
  users: {}
});

describe('Group Member Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup(groupMember.users);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup(groupMember.users);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        searchterm: 'aaron'
      }
    };

    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handlePageClick method', () => {
    const wrapper = setup(groupMember.users);
    const handlePageClickSpy = jest.spyOn(
      wrapper.instance(), 'handlePageClick'
    );
    const data = {
      selected: 1
    };
    wrapper.instance().handlePageClick(data);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleSearch method', () => {
    const wrapper = setup(groupMember.users);
    const handleSearchSpy = jest.spyOn(
      wrapper.instance(), 'handleSearch'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSearch(event);
    expect(handleSearchSpy).toHaveBeenCalledTimes(1);
  });

  it(`should call the addUserToGroup method when the add user button is 
    clicked`, () => {
      const wrapper = setup(groupMember.users);
      const addUserToGroupSpy = jest.spyOn(
        wrapper.instance(), 'addUserToGroup'
      );
      const addUserButton = wrapper.find('.non-members');
      addUserButton.simulate('click');
      expect(addUserToGroupSpy).toHaveBeenCalledTimes(1);
    });

  it('should call the componentWillUnmount method', () => {
    const wrapper = setup(groupMember.users);
    const componentWillUnmountSpy = jest.spyOn(
      wrapper.instance(), 'componentWillUnmount'
    );

    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
  });

  it(`should call the searchUsersFailure function when component is
    unmounted`, () => {
      const wrapper = setup(groupMember.users);
      wrapper.instance().componentWillUnmount();
      expect(props.searchUsersFailure).toHaveBeenCalledTimes(1);
    });

  it('should return no users found if non members props is empty', () => {
    const users = { members: [], nonMembers: [] }
    const wrapper = setup(users);
    const noUserFoundWrapper = wrapper.find('.no-user');
    expect(noUserFoundWrapper.text()).toBe('No Users Found');
  });

  it('should always display the number of members in a group', () => {
    const wrapper = setup(groupMember.users);
    const memberDisplay = wrapper.find('h5').last();
    expect(memberDisplay.text()).toBe('Group Members (1)')
  })

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedGroupMember {...props} store={store} />
    )
    expect(connectedComponent.length).toBe(1);
  });
});
