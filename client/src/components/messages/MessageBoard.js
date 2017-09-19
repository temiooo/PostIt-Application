import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import GroupMember from './GroupMember';
import WelcomePage from './WelcomePage';
import CreateGroupModal from './CreateGroupModal';
import { logout } from '../../actions/authActions';
import { getGroups, editGroupOff } from '../../actions/groupActions';
import { getMessages } from '../../actions/messageActions';

class MessageBoard extends React.Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
		this.editGroupOff = this.editGroupOff.bind(this);
	}

	componentWillMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.getGroups(this.props.auth.currentUserId);
		}
	}

	componentDidMount() {
		$('.button-collapse').sideNav();
		$('select').material_select();
	}

	editGroupOff(event) {
		event.preventDefault();
		this.props.editGroupOff();
	}

	logout(event) {
		event.preventDefault();
		this.props.logout();
	}

	render() {
		if (!this.props.auth.isAuthenticated) {
			return (
				<Redirect to='/login' />
			);
		}
		return (
			<div className="message-board">
				<TopNav logout={this.logout} />
				<div className="row">

					<SideNav
						groups={this.props.groups}
						edit={this.editGroupOff}
					/>

					<CreateGroupModal />

					<main>
						<Route
							exact path={`${this.props.match.url}`}
							component={WelcomePage}
						/>

						<Route
							path={`${this.props.match.url}/group/:id/messages`}
							component={Messages}
						/>

						<Route
							path={`${this.props.match.url}/group/:id/members`}
							component={GroupMember}
						/>
					</main>

				</div>
			</div>
		);
	}
}

MessageBoard.propTypes = {
	auth: PropTypes.object.isRequired,
	groups: PropTypes.array.isRequired,
	logout: PropTypes.func.isRequired,
	getGroups: PropTypes.func.isRequired,
	editGroupOff: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	groups: state.groups
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logout,
	getGroups,
	editGroupOff
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
