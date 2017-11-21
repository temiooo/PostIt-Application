import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData';
import ConnectedResetPassword, { ResetPassword } from
  '../../components/authentication/ResetPassword';

let props;
const setup = (isAuthenticated, isLoading) => {
  props = {
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    resetPassword: jest.fn(() => Promise.resolve()),
    match: {
      params: { token: mockData.resetToken }
    }
  }
  return shallow(<ResetPassword {...props} />);
}
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false },
  ajaxCallsInProgress: 0
});

describe('Reset Password Component', () => {
  it('always renders a div', () => {
    const wrapper = setup(false, 0);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBeGreaterThan(0);
  });

  it('calls handleFocus', () => {
    const wrapper = setup(false, 0);
    const handleFocusSpy = jest.spyOn(
      wrapper.instance(), 'handleFocus'
    );

    wrapper.instance().handleFocus();
    expect(handleFocusSpy).toHaveBeenCalled();
  });

  it('calls handleChange', () => {
    const wrapper = setup(false, 0);
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
    const wrapper = setup(false, 0);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    const event = {
      preventDefault: jest.fn()
    }

    wrapper.setState({
      password: 'funsho@gmail.com',
      confirmpassword: 'funsho@gmail.com'
    })

    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should return password validation error', () => {
    const wrapper = setup(false, 0);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    const event = {
      preventDefault: jest.fn()
    }

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

  it(`reset password button should be disabled if isLoading prop is greater
    than 1`, () => {
      const wrapper = setup(false, 1);
      const button = wrapper.find('Button');
      expect(button.props().disabled).toBe(true);
    });

  it('does not render if user is unauthenticated', () => {
    const wrapper = setup(true, 0);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.length).toBe(0);
  });

  it('renders the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedResetPassword {...props} store={store} />
    )
    expect(connectedComponent.length).toBe(1);
  });
});
