import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import LandingPage from '../common/LandingPage';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../../actions/authActions';
import { validateSignupInput } from '../../utils/validateInput';

/**
 * SignupPage component
 * 
 * @class SignupPage
 * 
 * @extends {React.Component}
 */
export class SignupPage extends React.Component {

  /**
   * Creates an instance of SignupPage
   * 
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * Handles change event for input fields
   * 
   * @param {object} event 
   * 
   * @returns {void} no return value
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handles input validation
   * 
   * @returns {boolean} represents validity status of the input
   */
  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Handles signup form submission
   * 
   * @param {object} event 
   * 
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.signup(this.state)
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
      <div className="login teal lighten-1">
        <div className="container">
          <div className="row top-space">
            <div className="col s12 m6 l6">
              <LandingPage />
            </div>
            <div className="col s12 m6 l6">
              <form className="white col s12 z-depth-5">
                <h6 className="center-align link">
                  Already a member?
                <Link to="/login"> Login</Link>
                </h6>
                <div className="divider"></div>
                <TextInput
                  icon="mail"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  label="Email Address"
                  error={this.state.errors.email}
                />
                <TextInput
                  icon="account_circle"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  label="Username"
                  error={this.state.errors.username}
                />
                <TextInput
                  icon="lock_outline"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  label="Password"
                  error={this.state.errors.password}
                />
                <TextInput
                  icon="lock"
                  type="password"
                  name="confirmpassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  label="Confirm Password"
                  error={this.state.errors.confirmPassword}
                />
                <div className="row center-align">
                  <Button
                    id="create-account"
                    className=
                    "btn waves-effect waves-light red lighten-2 signup-button"
                    onClick={this.handleSubmit}
                    text="create account"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

SignupPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * 
 * @param {object} state
 * 
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/**
 * Maps dispatch to props
 * 
 * @param {function} dispatch 
 * 
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signup },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
