import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import MockData from '../__mocks__/mockData';
import ConnectedMessageBoard, { MessageBoard } from
  '../../src/components/messages/MessageBoard';

let event;

const props = {
  auth: { isAuthenticated: true, currentUser: { id: 1 } },
  groupList: [],
  logout: jest.fn(),
  getUserGroups: jest.fn(),
  editGroupOff: jest.fn(),
  match: {
    url: '/messageBoard'
  }
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: {},
  groupList: []
});

describe('MessageBoard component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MessageBoard {...props} />);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBe(2);
  });

  it('should not render elements if user is unauthenticated ', () => {
    const newProps = { ...props, auth: { ...props.auth, isAuthenticated: false } };
    const wrapper = shallow(<MessageBoard {...newProps} />);
    expect(wrapper.find('TopNav').length).toBe(0);
    expect(wrapper.find('SideNav').length).toBe(0);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedMessageBoard {...props} store={store} />
    )
    expect(connectedComponent.length).toBe(1);
  });
});
