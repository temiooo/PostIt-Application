import React, { PropTypes } from 'react';
import MessageList from './MessageList';
import NewMessage from './NewMessage'; 

const Messages = ({ messages, searchUsers }) => {
	if (messages.groupId) {
		return (
			<div className="white col s12 m12 l9">
				<MessageList messages={ messages } searchUsers={ searchUsers }/>
				<NewMessage groupId={ messages.groupId }/>
			</div>
		); 
	} else {
		return (
			<div className="white col s12 m12 l9">
				<h4 className="center-align top-space">
					Click on a group to view your messages
				</h4>
				<h4 className="center-align top-space">
					Not in any group? Create one.
				</h4>
			</div>
		);
	}

	
};

Messages.propTypes = {
	messages: PropTypes.object.isRequired,
	searchUsers: PropTypes.func.isRequired
};

export default Messages;
