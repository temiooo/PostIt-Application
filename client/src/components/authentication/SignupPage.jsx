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

class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.signup(this.state).then(() => {
        if (this.props.isAuthenticated) {
          toastr.success('Welcome to PostIt');
        }
      });
    }
  }

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
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                  label="Confirm Password"
                  error={this.state.errors.confirmpassword}
                />
                <div className="row center-align">
                  <Button
                    className="btn waves-effect waves-light red lighten-2"
                    onClick={this.handleSubmit}
                    text="Create Account"
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signup },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
