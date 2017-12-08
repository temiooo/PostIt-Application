import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import ConnectedMessages, { Messages } from
  '../../src/components/messages/Messages';

let event;

const props = {
  getGroup: jest.fn(),
  selectedGroup: {},
  getMessages: jest.fn(),
  postMessage: jest.fn(() => Promise.resolve()),
  editGroupOn: jest.fn(),
  isLoading: 0,
  match: {
    params: { id: 2 }
  },
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  selectedGroup: {},
  ajaxCallsInProgress: 0
});

describe('Messages component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Messages {...props} />);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should call the handleChange method', () => {
    const wrapper = shallow(<Messages {...props} />);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    event = {
      preventDefault: jest.fn(),
      target: {
        content: 'A message'
      }
    };

    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleSubmit method', () => {
    const wrapper = shallow(<Messages {...props} />);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
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

  it('should render the right elements', () => {
    const wrapper = shallow(<Messages {...props} />);
    const messageListWrapper = wrapper.find('MessageList');
    const messageFormWrapper = wrapper.find('MessageForm');

    expect(messageListWrapper.length).toBe(1);
    expect(messageFormWrapper.length).toBe(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedMessages {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
