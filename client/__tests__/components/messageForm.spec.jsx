import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedMessageForm, { MessageForm } from
  '../../src/components/messages/MessageForm';

let props;

const setup = () => {
  props = {
    groupId: '1',
    postMessage: jest.fn(() => Promise.resolve())
  };

  return shallow(<MessageForm {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Message Form Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup();
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        content: 'Hello',
        priority: 'Normal'
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('should call the handleSubmit method', () => {
    const wrapper = setup();
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it(`should ensure the send message button is disabled if message content and
    priority is invalid`, () => {
      const wrapper = setup();
      wrapper.setState({
        content: '',
        priority: ''
      });
      const sendButton = wrapper.find('Button');
      expect(sendButton.props().disabled).toBe(true);
    });

  it(`should ensure the send message button is enabled if message content and
    priority is valid`, () => {
      const wrapper = setup();
      wrapper.setState({
        content: 'hello',
        priority: 'Normal'
      });
      const sendButton = wrapper.find('Button');
      expect(sendButton.props().disabled).toBe(false);
    });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedMessageForm {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
})
