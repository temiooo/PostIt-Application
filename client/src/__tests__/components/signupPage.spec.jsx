import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/mockData'
import ConnectedSignupPage, { SignupPage } from
  '../../components/authentication/SignupPage';

let props;
let event;
let handleSubmitSpy;

const { signup } = mockData.componentData

const setup = (isAuthenticated) => {
  props = {
    isAuthenticated: isAuthenticated,
    signup: jest.fn(() => Promise.resolve())
  }
  return shallow(<SignupPage {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isAuthenticated: false }
});

describe('Signup Page Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.getElement().type).toBe('div');
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
        username: 'user'
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('should call the handleSubmit method', () => {
    const wrapper = setup(false);
    handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const { username, email, password } = signup.validSignupDetails;
    wrapper.setState({
      email,
      username,
      password,
      confirmpassword: password
    })
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should return email validation error', () => {
    const wrapper = setup(false);
    const { username, email, password } = signup.invalidEmail;
    wrapper.setState({
      email,
      username,
      password,
      confirmpassword: password
    });
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors.email).toBe('Email is Invalid');
  });

  it('should return username validation error', () => {
    const wrapper = setup(false);
    const { username, email, password } = signup.invalidUserName;
    wrapper.setState({
      email,
      username,
      password,
      confirmpassword: password
    });
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors.username)
      .toBe('Username cannot begin with space characters');
  });

  it('should return password validation error', () => {
    const wrapper = setup(false);
    const { username, email, password } = signup.invalidPassword;
    wrapper.setState({
      email,
      username,
      password,
      confirmpassword: ''
    });
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state().errors.password)
      .toBe('Password is too short (min of 8 characters).');
    expect(wrapper.state().errors.confirmpassword)
      .toBe('Passwords do not match');
  });

  it('should not render if user is unauthenticated', () => {
    const wrapper = setup(true);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedSignupPage {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
