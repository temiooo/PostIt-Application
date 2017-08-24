import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import NewMessage from './NewMessage';
import GroupMember from './GroupMember';
import CreateGroupModal from './CreateGroupModal';
import { logout } from '../../actions/authActions';
import { getGroups } from '../../actions/groupActions';
import { getMessages } from '../../actions/messageActions';

class MessageBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searching: false
		}
		
		this.searchUsers = this.searchUsers.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.logout = this.logout.bind(this);
		}

	componentWillMount() {
  	if(!this.props.currentUser) {
    	browserHistory.push('login');
  	} else {
			this.props.getGroups(this.props.currentUser);
		}
	}

	searchUsers(event) {
		event.preventDefault();
		this.setState({ searching: true })
	}

	getMessages(group) {
		event.preventDefault();
		this.setState({ searching: false });
		this.props.getMessages(group);
	}

	logout(event) {
		event.preventDefault();
		this.props.logout();
		browserHistory.push('/login');	
	}
	
  render() {
	  const {searching} = this.state
		return(
			<div className="message-board">
				<TopNav logout={this.logout}/>
				<div className="row">
					<SideNav
						getMessages={this.getMessages}
						groups={this.props.groups}/>
					<CreateGroupModal/>

					{searching ? (
						<GroupMember/>
					) : (
						<Messages
							messages={this.props.messages}
							searchUsers={this.searchUsers}/>
					)}

				</div>
			</div>
		);
	}
}

MessageBoard.propTypes = {
	currentUser: PropTypes.number.isRequired,
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
