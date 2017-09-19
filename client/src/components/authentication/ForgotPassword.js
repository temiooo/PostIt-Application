import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../common/Button';
import TopNav from '../messages/TopNav';
import TextInput from '../common/TextInput';
import { forgotPassword } from '../../actions/passwordActions';
import { validateForgotPasswordEmail } from '../../utils/validateInput';

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	isValid() {
		const { isValid } = validateForgotPasswordEmail(this.state);
		return isValid;
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.forgotPassword(this.state)
	}

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
							label="Email Address"
						/>
						<div className="row  center-align">
							<Button
								className="btn waves-effect waves-light red lighten-2"
								onClick={this.handleSubmit}
								text="SEND INSTRUCTIONS"
								disabled={(!this.isValid()) || this.props.isLoading > 0}
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

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.ajaxCallsInProgress,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ forgotPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
