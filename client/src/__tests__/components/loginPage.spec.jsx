import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedLoginPage, { LoginPage } from
  '../../components/authentication/LoginPage';

let props;
const setup = (isAuthenticated) => {
  props = {
    isAuthenticated: isAuthenticated,
    login: jest.fn(() => Promise.resolve())
  }
  return shallow(<LoginPage {...props} />);
}
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false }
});

describe('Login Page Component', () => {
  it('always renders a div', () => {
    const wrapper = setup(false);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('calls handleChange', () => {
    const wrapper = setup(false);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );

    const event = {
      preventDefault: jest.fn(),
      target: {
        username: 'user'
      }
    };

    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    const event = {
      preventDefault: jest.fn()
    }

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('does not render if user is unauthenticated', () => {
    const wrapper = setup(true);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBe(0);
  });

  it('renders the connected components', () => {
    const connectedComponent = shallow(
      <ConnectedLoginPage {...props} store={store} />
    )
    console.log(connectedComponent.debug())
    expect(connectedComponent.length).toBe(1);
  });
});
