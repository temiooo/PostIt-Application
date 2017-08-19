import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import Banner from '../common/Banner';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import * as authActions from '../../actions/authActions';

class LoginPage extends React.Component {
	constructor(props, context){
    super(props, context);

    this.state = {
      username: '',
			password: ''
    };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentWillMount() {
   if(this.props.currentUser) {
     browserHistory.push('/messageboard');
   } 
  }

  handleChange(event) {
		event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.login(this.state)
		.then(() => {
			if (this.props.currentUser) {
			toastr.success('Welcome Back');
			browserHistory.push('/messageboard');
			} 
		});
	}

	render() {
		return (
			<div className="container">
        <div className="row top-space">
					<div className="col s12 m6 l6">
          <Banner/>
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
									<a href="" className="black-text" onClick={this.props.actions.logout}>Forgot Password?</a>
								</h6>
							</div>
						</form>
					</div>
				</div>
			</div>
				);
		}
}


LoginPage.propTypes = {
  currentUser: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);