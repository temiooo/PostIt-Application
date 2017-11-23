import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import LandingPage from '../common/LandingPage';
import { login } from '../../actions/authActions';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state)
      .then(() => {
        if (this.props.isAuthenticated) {
          toastr.success('Welcome Back');
        }
      });
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
            <div className="col s12 m6 l6 login-form">
              <form className="white col s12 z-depth-5">
                <h6 className="center-align link">
                  New to Post-It?
								<Link to="/"> Create Account</Link>
                </h6>
                <div className="divider"></div>
                <TextInput
                  icon="account_circle"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  label="Username"
                />
                <TextInput
                  icon="lock"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  label="Password"
                />
                <div className="row  center-align">
                  <Button
                    className="btn waves-effect waves-light red lighten-2"
                    onClick={this.handleSubmit}
                    text="login"
                  />
                </div>
                <div className="row  right-align">
                  <h6 className="link">
                    <Link to="/forgotpassword" className="black-text">
                      Forgot Password?
										</Link>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
