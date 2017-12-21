import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedForgotPassword, { ForgotPassword } from
  '../../src/components/authentication/ForgotPassword';

let props;
let event;

const setup = (isAuthenticated) => {
  props = {
    isAuthenticated,
    isLoading: 0,
    forgotPassword: jest.fn()
  }
  return shallow(<ForgotPassword {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false },
  ajaxCallsInProgress: 0
});

describe('Forgot Password Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.getElement().type).toBe('div')
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup(false);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    event = {
      preventDefault: jest.fn(),
      target: {
        email: 'user@email.com'
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should set error state if email is invalid on form submission', () => {
    const wrapper = setup(false);
    wrapper.setState({
      email: 'myemail@'
    });
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors).toHaveProperty('email');
    expect(wrapper.state().errors.email).toEqual('Email is Invalid');
  });

  it('should clear error state when input field is focused', () => {
    const wrapper = setup(false);
    wrapper.setState({
      errors: { email: 'Email is Invalid' }
    });
    wrapper.instance().handleFocus();
    expect(wrapper.state().errors).toEqual({});
  });

  it('should call the handleSubmit method', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    wrapper.setState({
      email: 'user@gmail.com'
    });
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    expect(props.forgotPassword).toHaveBeenCalledTimes(1)
  });

  it('should not render if user is unauthenticated', () => {
    const wrapper = setup(true);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBe(0);
  });

  it('should render the right elements', () => {
    const wrapper = setup(false);
    expect(wrapper.find('TopNav').length).toBe(1);
    expect(wrapper.find('TextInput').length).toBe(1);
    expect(wrapper.find('Button').length).toBe(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedForgotPassword {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
