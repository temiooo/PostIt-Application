import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedLoginPage, { LoginPage } from
  '../../components/authentication/LoginPage';

let props;
let event;

const setup = (isAuthenticated) => {
  props = {
    isAuthenticated: isAuthenticated,
    login: jest.fn(() => Promise.resolve())
  }
  return shallow(<LoginPage {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false }
});

describe('Login Page Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup(false);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup(false);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    event = {
      preventDefault: jest.fn(),
      target: {
        username: 'user'
      }
    };

    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('should call the handleSubmit method', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should not render if user is unauthenticated', () => {
    const wrapper = setup(true);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedLoginPage {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
