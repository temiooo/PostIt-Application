import validator from 'validator';
import { isEmpty, trim } from 'lodash';
import { User, Group } from '../models';

/**
 * Checks validity of input supplied
 * @param {object} input
 * @returns {object} returns errors if any and validity status of the input
 */
const checkValidity = (input) => {
  let error = '';

  if (trim(input.email).length === 0) {
    error = 'Email is required';
  } else if (!validator.isEmail(input.email)) {
    error = 'Email is Invalid';
  }

  if (trim(input.username).length === 0) {
    error = 'Username is required';
  } else if (trim(input.username).length < 5) {
    error = 'Username is too short (min of 5 characters).';
  } else if (input.username.charAt(0) === ' ') {
    error = 'Username cannot begin with space characters';
  } else if (input.username.charAt(input.username.length - 1) === ' ') {
    error = 'Username cannot end with space characters';
  }

  if (trim(input.password).length === 0) {
    error = 'Password is required';
  } else if (input.password.length < 8) {
    error = 'Password is too short (min of 8 characters).';
  }
  return {
    error,
    isValid: isEmpty(error)
  };
};

const validateInput = {
  /**
   * Checks if username or email exist already in the database
   * @param {object} req - request object
   * @param {object} res -response object
   * @param {function} next - calls the next function
   * @returns {(function|object)} calls next function or returns response object
   */
  validateSignupInput(req, res, next) {
    const { error, isValid } = checkValidity(req.body);
    if (!isValid) {
      return res.status(401).send({
        message: error
      });
    }

    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'Username taken already. Please use another one.'
        });
      }

      User.findOne({
        where: {
          email: req.body.email
        }
      }).then((existingUser) => {
        if (existingUser) {
          return res.status(409).send({
            message: 'Email taken already. Please use another one.'
          });
        }
        next();
      });
    });
  },

  /**
   * checks if group name exists already in the database
   * @param {object} req - request object
   * @param {object} res -response object
   * @param {function} next - calls the next function
   * @returns {(function|object)} calls next function or returns response object
   */
  validateGroupname(req, res, next) {
    Group.findOne({
      where: {
        name: req.body.name
      }
    }).then((group) => {
      if (group) {
        return res.status(409).send({
          message: 'Group name exists already. Please use another one.'
        });
      }
      next();
    });
  },

  /**
   * Checks if message input is valid
   * @param {object} req - request object
   * @param {object} res -response object
   * @param {function} next - calls the next function
   * @returns {(function|object)} calls next function or returns response object
   */
  validateMessageInput(req, res, next) {
    const { content, priority } = req.body;

    if (trim(content).length === 0) {
      return res.status(400).send({
        message: 'Message content is required'
      });
    } else if (trim(priority).length === 0) {
      return res.status(400).send({
        message: 'Message priority is required'
      });
    } else if (priority !== 'Urgent' && priority !== 'Critical' &&
      priority !== 'Normal') {
      return res.status(400).send({
        message:
          'Message priority has to be Normal, Critical, or Urgent'
      });
    }
    next();
  }
};

export default validateInput;
