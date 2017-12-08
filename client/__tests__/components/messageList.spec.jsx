import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../__mocks__/mockData';
import MessageList from '../../src/components/messages/MessageList';

let props;
const { messageList } = mockData.componentData;

const setup = (selectedGroup, isLoading) => {
  props = {
    selectedGroup,
    edit: jest.fn(),
    isLoading
  }
  return shallow(<MessageList {...props} />)
}

describe('Message List Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup({ groupMessages: [] }, 0);
    expect(wrapper.getElement().type).toBe('div')
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call edit function when edit group link is clicked', () => {
    const wrapper = setup({ groupMessages: [] }, 0);
    const editLink = wrapper.find('a').first();
    editLink.simulate('click')
    expect(props.edit).toHaveBeenCalledTimes(1);
  });

  it('should display messages if length of group messages is greater than 0',
    () => {
      const groupMessages = messageList;
      const wrapper = setup({ groupMessages }, 0);
      const messageDiv = wrapper.find('.single-msg');
      expect(messageDiv).toExist;
      expect(messageDiv.length).toBe(1);
    });

  it('should render a preloader when the messages are being fetched', () => {
    const wrapper = setup({ groupMessages: [] }, 1);
    const wrapperPreloader = wrapper.find('.preloader-wrapper');
    expect(wrapperPreloader).toExist;
    expect(wrapperPreloader.length).toBe(1);
  });
});
