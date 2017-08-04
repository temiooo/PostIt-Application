import { isEmpty } from 'lodash';
import validator from 'validator';

export default function validateInput(state) {
  const errors = {};
  if (validator.isEmpty(state.email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (validator.isEmpty(state.username)) {
    errors.username = 'Username is required';
  } else if (state.username.length < 5) {
    errors.username = 'Minimum of 5 characters';
  }

  if (validator.isEmpty(state.phonenumber)) {
    errors.phonenumber = 'Phone Number is required';
  } else if (!validator.isInt(state.phonenumber)) {
    errors.phonenumber = 'Numbers only';
  }

  if (validator.isEmpty(state.password)) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Minimum of 8 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
