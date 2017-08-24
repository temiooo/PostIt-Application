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
import { getGroups } from '../../actions/groupActions';
import { getMessages } from '../../actions/messageActions';

class MessageBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleEdit: false
		}
		
		this.groupEditOn = this.groupEditOn.bind(this);
		this.groupEditOff = this.groupEditOff.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.logout = this.logout.bind(this);
		}

	componentWillMount() {
		this.props.getGroups(this.props.currentUser);
	}

	getMessages(group) {
		event.preventDefault();
		this.props.getMessages(group);
	}

	logout(event) {
		event.preventDefault();
		this.props.logout();
	}

	groupEditOn(event) {
		event.preventDefault();
		this.setState({ toggleEdit: true });
	}
	
	groupEditOff(event) {
		event.preventDefault();
		this.setState({ toggleEdit: false })
	}
	
  render() {
	  if (!this.props.currentUser) {
      return (
        <Redirect to = '/login'/>
      );
		}
		return (
			<div className="message-board">
				<TopNav logout={this.logout}/>
				<div className="row">
					<SideNav
						getMessages={this.getMessages}
						groups={this.props.groups}
						edit={this.groupEditOff}
						/>
					<CreateGroupModal
						edit={this.state.toggleEdit}/> 

					<main>
						<Route
							exact
							path={`${this.props.match.url}/`}
							component={WelcomePage}
						/>

						<Route
							path={`${this.props.match.url}/group/:id/messages`}
							component={() => <Messages messages={this.props.messages}
								edit={this.groupEditOn} /> }
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
	currentUser: PropTypes.number,
	groups: PropTypes.array.isRequired,
	messages: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	getGroups: PropTypes.func.isRequired,
	getMessages: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	currentUser: state.auth.currentUser,
	groups: state.groups,
	messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logout,
	getGroups,
	getMessages
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
