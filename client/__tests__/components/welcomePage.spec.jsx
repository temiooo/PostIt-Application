import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../__mocks__/mockData'
import WelcomePage from '../../src/components/messages/WelcomePage';

let props;

const { welcomePage } = mockData.componentData;

const setup = (groupList, currentUser) => {
  props = {
    groupList,
    currentUser
  }
  return shallow(<WelcomePage {...props} />);
};

describe('Welcome Page Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup([], {});
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should render the right information based on the props recieved', () => {
    const groups = welcomePage.groups;
    const currentUser = welcomePage.currentUser;

    const wrapper = setup(groups, currentUser);

    const usernameWrapper = wrapper.find('h4');
    const emailWrapper = wrapper.find('h5').first();
    const groupNumberWrapper = wrapper.find('h5').last();

    expect(usernameWrapper.text()).toBe('Hi Mike,');
    expect(emailWrapper.text()).toBe('Email : mike@gmail.com');
    expect(groupNumberWrapper.text()).toBe('Your Groups : 2');
  });
});
