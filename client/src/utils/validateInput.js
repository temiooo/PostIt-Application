import { isEmpty, trim } from 'lodash';
import validator from 'validator';

export default function validateInput(state) {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (trim(state.username).length === 0) {
    errors.username = 'Username is required';
  } else if (trim(state.username).length < 5) {
    errors.username = 'Minimum of 5 characters';
  }

  if (trim(state.phonenumber).length === 0) {
    errors.phonenumber = 'Phone Number is required';
  } else if (!validator.isInt(state.phonenumber)) {
    errors.phonenumber = 'Numbers only';
  }

  if (trim(state.password).length === 0) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Minimum of 8 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
