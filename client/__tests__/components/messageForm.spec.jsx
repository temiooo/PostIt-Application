import React from 'react';
import { shallow } from 'enzyme';
import MessageForm from '../../src/components/messages/MessageForm';

let props = {
  isValid: jest.fn(() => false),
  content: '',
  priority: '',
  handleChange: jest.fn(),
  handleSubmit: jest.fn()
};

describe('Message Form Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MessageForm {...props} />);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('should render the right elements', () => {
    const wrapper = shallow(<MessageForm {...props} />);
    const formField = wrapper.find('form');
    const selectField = wrapper.find('select');
    const sendButton = wrapper.find('Button');

    expect(formField.length).toBe(1);
    expect(selectField.length).toBe(1);
    expect(sendButton.length).toBe(1);
  })

  it(`should ensure the send message button is disabled if isValid function
    returns false`, () => {
      const wrapper = shallow(<MessageForm {...props} />);
      const sendButton = wrapper.find('Button');
      expect(sendButton.props().disabled).toBe(true);
    });

  it(`should ensure the send message button is enabled if isValid function
    returns true`, () => {
      props = { ...props, isValid: jest.fn(() => true) }
      const wrapper = shallow(<MessageForm {...props} />);
      const sendButton = wrapper.find('Button');
      expect(sendButton.props().disabled).toBe(false);
    });
});
