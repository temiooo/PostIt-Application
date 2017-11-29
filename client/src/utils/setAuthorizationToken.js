import axios from 'axios';

/**
 * Sets authorization token in header
 * @param {string} token
 * @returns {void} no return value
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
