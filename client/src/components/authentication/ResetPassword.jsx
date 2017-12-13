import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../common/Button';
import TopNav from '../messages/TopNav';
import TextInput from '../common/TextInput';
import { resetPassword } from '../../actions/passwordActions';
import { validateNewPassword } from '../../utils/validateInput';

/**
 * ResetPassword Component
 * 
 * @class ResetPassword
 * 
 * @extends {React.Component}
 */
export class ResetPassword extends React.Component {

  /**
   * Creates an instance of ResetPassword
   * 
   * @param {object} props
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: '',
      confirmPassword: '',
      errors: {},
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
    const { errors, isValid } = validateNewPassword(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Handles onfocus event for input fields
   * 
   * @returns {void} no return value
   */
  handleFocus() {
    this.setState({ errors: {} })
  }

  /**
   * Handles change event for input fields
   * 
   * @param {object} event
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
   * Handles reset password form submission
   * 
   * @param {object} event
   * 
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const resetToken = this.props.match.params.token;
      this.setState({ errors: {} });
      this.props.resetPassword(resetToken, this.state)
        .then(() => {
          this.props.history.push('/login');
        });
    };
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
          <h4 className="center-align grey-text text-darken-3">
            Reset Password
					</h4>
          <div className="divider"></div>
          <form className="col s12 z-depth-5">
            <TextInput
              icon="lock_outline"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              label="Password"
              onFocus={this.handleFocus}
              error={this.state.errors.password}
            />
            <TextInput
              icon="lock"
              type="password"
              name="confirmpassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              label="Confirm Password"
              onFocus={this.handleFocus}
              error={this.state.errors.confirmPassword}
            />
            <div className="row  center-align">
              <Button
                id="reset-password"
                className="btn waves-effect waves-light red lighten-2"
                onClick={this.handleSubmit}
                text="RESET PASSWORD"
                disabled={this.props.isLoading > 0}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.number.isRequired,
  resetPassword: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * 
 * @param {object} state
 * 
 * @returns {object} contains sections of the redux store
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
 * @returns {object} actions to be dispatched 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
