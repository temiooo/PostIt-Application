import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import NewMessage from './NewMessage';
import GroupMember from './GroupMember';
import CreateGroupModal from './CreateGroupModal';
import * as authActions from '../../actions/authActions';
import * as groupActions from '../../actions/groupActions';
import * as messageActions from '../../actions/messageActions';

class MessageBoard extends React.Component {
	constructor(props, context) {
		super(props, context);

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
		 this.props.actions.getGroups(this.props.currentUser);
	 }
	}

	searchUsers(event){
		event.preventDefault();
		this.setState({ searching: true })
	}

	getMessages(group) {
		event.preventDefault();
		this.setState({ searching: false });
		this.props.actions.getMessages(group);
	}

	logout(event) {
		event.preventDefault();
		this.props.actions.logout();
		browserHistory.push('/login');	
	}
	
  render() {
	  const {searching} = this.state
		return(
			<div className="white message-board">
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
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
		currentUser: state.auth.currentUser,
		groups: state.groups,
		messages: state.messages
  }
}

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(
      Object.assign({},
      authActions,
      groupActions,
      messageActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
