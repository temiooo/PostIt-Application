import React from 'react';
import { shallow } from 'enzyme';
import MessageList from '../../components/messages/MessageList';
let props;

const setup = (messages, isLoading) => {
  props = {
    messages: messages,
    edit: jest.fn(),
    isLoading
  }
  return shallow(<MessageList {...props} />)
}

describe('Side Nav Component', () => {
  it('renders a div', () => {
    const wrapper = setup({ groupMessages: [] }, 0);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('calls edit function when edit group link is clicked', () => {
    const wrapper = setup({ groupMessages: [] }, 0);
    const editLink = wrapper.find('a').first();
    editLink.simulate('click')
    expect(props.edit).toHaveBeenCalled();
  });

  it('renders a list of messages if messages props includes messages', () => {
    const groupMessages = [
      {
        id: 1,
        content: 'A',
        createdAt: '2017-11-14 12:15:42.121+01',
        User: { username: 'tim' }
      }
    ];
    const wrapper = setup({ groupMessages }, 0);
    const messageDiv = wrapper.find('.single-msg');
    expect(messageDiv).toExist;
    expect(messageDiv.length).toBe(1);
  });

  it('renders a preloader when the messages are being fetched', () => {
    const wrapper = setup({ groupMessages: [] }, 1);
    const wrapperPreloader = wrapper.find('.preloader-wrapper');
    expect(wrapperPreloader).toExist;
    expect(wrapperPreloader.length).toBe(1);
  });
});
