import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUserDetails } from '../../actions/userActions'

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);

	}

	componentWillMount() {
		const { currentUserInfo } = this.props;

		if (!currentUserInfo.username) {
			this.props.getCurrentUserDetails();
		}
	}

	render() {
		const { currentUserInfo } = this.props;
		const groupNo = this.props.groups.length;
		return (
			<div className="white col s12 m12 l9">
				<div className="welcome-page">
					<h4> Hi {currentUserInfo.username}, </h4>
					<h5>Email : { currentUserInfo.email} </h5>
					<h5>Your Groups : { groupNo }</h5>
				</div>
			</div>
		);
	}
}

WelcomePage.propTypes = {
	groups: PropTypes.array.isRequired,
	currentUserInfo: PropTypes.object.isRequired,
	getCurrentUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	currentUserInfo: state.currentUserInfo,
	groups: state.groups
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getCurrentUserDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
