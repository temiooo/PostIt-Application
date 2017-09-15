import { isEmpty, trim } from 'lodash';
import validator from 'validator';

const validateSignupInput = (state) => {
  const errors = {};
  const len = state.username.length;

  if (trim(state.email).length === 0) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (trim(state.username).length === 0) {
    errors.username = 'Username is required';
  } else if (trim(state.username).length < 5) {
    errors.username = 'Minimum of 5 characters';
  } else if (state.username.charAt(0) === ' ') {
    errors.username = 'Username cannot begin with space characters';
  } else if (state.username.charAt(len - 1) === ' ') {
    errors.username = 'Username cannot end with space characters';
  }

  if (trim(state.password).length === 0) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Minimum of 8 characters';
  }

  if (state.confirmpassword !== state.password) {
    errors.confirmpassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateGroupInput = (state) => {
  const errors = {};
  const len = state.name.length;

  if (trim(state.name).length === 0) {
    errors.name = 'Group Name is required';
  } else if (trim(state.name).length < 5) {
    errors.name = 'Minimum of 5 characters';
  } else if (state.name.charAt(0) === ' ') {
    errors.name = 'Group Name cannot begin with a space character';
  } else if (state.name.charAt(len - 1) === ' ') {
    errors.name = 'Group Name cannot end with a space character';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateMessageInput = (state) => {
  const errors = {};

  if (trim(state.content).length === 0) {
    errors.message = 'Message cannot be empty';
  }

  if (trim(state.priority).length === 0) {
    errors.priority = 'Please select a priority';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateForgotPasswordEmail = (state) => {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is empty';
  }

  return {
    isValid: isEmpty(errors)
  };
};

const validateNewPassword = (state) => {
  const errors = {};

  if (trim(state.password).length === 0) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Minimum of 8 characters';
  }

  if (state.confirmpassword !== state.password) {
    errors.confirmpassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export { validateSignupInput, validateGroupInput,
  validateMessageInput, validateForgotPasswordEmail,
  validateNewPassword };
