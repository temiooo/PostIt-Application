import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import ConnectedMessages, { Messages } from
  '../../src/components/messages/Messages';

const props = {
  getGroup: jest.fn(),
  messages: {},
  getMessages: jest.fn(),
  editGroupOn: jest.fn(),
  isLoading: 0,
  match: {
    params: { id: 2 }
  },
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  messages: {},
  ajaxCallsInProgress: 0
});

describe('Messages component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Messages {...props} />);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should call the componentWillReceiveProps method', () => {
    const wrapper = shallow(<Messages {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
      match: {
        params: { id: 3 }
      }
    };
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the editGroupOn method', () => {
    const wrapper = shallow(<Messages {...props} />);
    const editGroupOnSpy = jest.spyOn(
      wrapper.instance(), 'editGroupOn'
    );
    wrapper.instance().editGroupOn();
    expect(editGroupOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the right elements', () => {
    const wrapper = shallow(<Messages {...props} />);
    const MessagesListWrapper = wrapper.find('MessagesList');
    expect(MessagesListWrapper.length).toBe(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedMessages {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
