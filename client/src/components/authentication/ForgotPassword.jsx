import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import Button from '../common/Button';
import TopNav from '../messages/TopNav';
import TextInput from '../common/TextInput';
import { forgotPassword } from '../../actions/passwordActions';
import { validateForgotPasswordEmail } from '../../utils/validateInput';

/**
 * ForgotPassword component
 * 
 * @class ForgotPassword
 * 
 * @extends {React.Component}
 */
export class ForgotPassword extends React.Component {

  /**
   * Creates an instance of ForgotPassword
   * 
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles input validation
   * 
   * @returns {boolean} represents validity status of the input
   */
  isValid() {
    const { errors, isValid } = validateForgotPasswordEmail(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Handles change event for input fields
   * 
   * @param {Object} event
   * 
   * @returns {void} no return value
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
    * Handles onfocus event for the input field
    * 
    * @returns {void} no return value
    */
  handleFocus() {
    this.setState({ errors: {} });
  }

  /**
   * Handles form submission
   * 
   * @param {Object} event
   * 
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.forgotPassword(this.state)
    }
  }

  /**
  * Renders the component
  *
  * @returns {JSX} jsx representation of the component
  */
  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/messageboard' />
      );
    }

    return (
      <div>
        <TopNav />
        <div className="container fgt-pwd">
          <h4 className="center-align">
            Forgot your password?
					</h4>
          <h6 className="center-align grey-text text-darken-3">
            Enter your email below to receive your password reset instructions
					</h6>
          <form className="col s12 z-depth-5">

            <TextInput
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              label="Email Address"
              error={this.state.errors.email}
            />
            <div className="row  center-align">
              <Button
                id="forgot-password"
                className="btn waves-effect waves-light red lighten-2"
                onClick={this.handleSubmit}
                text="SEND INSTRUCTIONS"
                disabled={this.props.isLoading > 0}
              />
            </div>

          </form>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.number.isRequired,
};

/**
 * Maps state to props
 * 
 * @param {Object} state
 * 
 * @returns {Object} contains sections of the redux store
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.ajaxCallsInProgress,
});

/**
 * Maps dispatch to props
 * 
 * @param {function} dispatch
 * 
 * @returns {Object} actions to be dispatched 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ forgotPassword },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
