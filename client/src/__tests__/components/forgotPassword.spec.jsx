import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedForgotPassword, { ForgotPassword } from
  '../../components/authentication/ForgotPassword';

let props;
const setup = (isAuthenticated) => {
  props = {
    isAuthenticated: isAuthenticated,
    isLoading: 0,
    forgotPassword: jest.fn()
  }
  return shallow(<ForgotPassword {...props} />);
}
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false },
  ajaxCallsInProgress: 0
});

describe('Forgot Password Component', () => {
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
        email: 'user@email.com'
      }
    };

    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit', () => {
    const wrapper = setup(false);;

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

  it('renders the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedForgotPassword {...props} store={store} />
    )
    expect(connectedComponent.length).toBe(1);
  });
});
