import React from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import NewMessage from './NewMessage';
import { Redirect } from 'react-router-dom';

const Messages = ({ messages, edit }) => {
	if (!messages.groupId) {
		return (
			<Redirect push to = {{
				pathname: '/messageboard'
			}}/>
		);
	}

	return (
		<div className="white col s12 m12 l9">
			<MessageList messages={ messages }
				edit={ edit } />
			<NewMessage groupId={ messages.groupId }/>
		</div>
	); 	
};

Messages.propTypes = {
	messages: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired
};

export default Messages;
