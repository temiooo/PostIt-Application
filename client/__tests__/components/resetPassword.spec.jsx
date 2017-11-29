import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import ConnectedResetPassword, { ResetPassword } from
  '../../src/components/authentication/ResetPassword';

let props;
let event;

const { resetPassword } = mockData.componentData;

const setup = (isAuthenticated, isLoading) => {
  props = {
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    resetPassword: jest.fn(() => Promise.resolve()),
    match: {
      params: { token: resetPassword.resetToken }
    }
  }
  return shallow(<ResetPassword {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false },
  ajaxCallsInProgress: 0
});

describe('Reset Password Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup(false, 0);
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the handleFocus method', () => {
    const wrapper = setup(false, 0);
    const handleFocusSpy = jest.spyOn(
      wrapper.instance(), 'handleFocus'
    );
    wrapper.instance().handleFocus();
    expect(handleFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup(false, 0);
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

  it('should call the handleSubmit method', () => {
    const wrapper = setup(false, 0);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    wrapper.setState({
      password: 'funsho@gmail.com',
      confirmpassword: 'funsho@gmail.com'
    })
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should return password validation error', () => {
    const wrapper = setup(false, 0);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    wrapper.setState({
      password: 'pick',
      confirmpassword: 'pic'
    })
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors.password)
      .toBe('Password is too short (min of 8 characters).');
    expect(wrapper.state().errors.confirmpassword)
      .toBe('Passwords do not match')
  });

  it(`should ensure reset password button is disabled if isLoading prop is
    greater than 1`, () => {
      const wrapper = setup(false, 1);
      const button = wrapper.find('Button');
      expect(button.props().disabled).toBe(true);
    });

  it('should not render if user is unauthenticated', () => {
    const wrapper = setup(true, 0);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedResetPassword {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
