import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData'
import ConnectedWelcomePage, { WelcomePage } from
  '../../components/messages/WelcomePage';

let props;

const { welcomePage } = mockData.componentData;

const setup = (groups, currentUser) => {
  props = {
    groups,
    currentUser
  }
  return shallow(<WelcomePage {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { currentUser: {} },
  groups: []
});

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

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedWelcomePage {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
