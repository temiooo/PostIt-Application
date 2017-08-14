import React, {PropTypes} from 'react';

const Messages = ({messages}) => {
	return (
		<div className="tabcontent">
			<div><h4>{messages.groupName}</h4></div>
				<div className="msg-wrap">
				{messages.groupMessages.map(message => <div className="msg" key={message.id}>
					<div>
						<small className="right time">{message.createdAt}</small>
						<h6 className="msg-heading">{message.senderId}</h6>
						<h6>{message.content}</h6>
					</div>
				</div>
				)}
				</div>
		</div>
	);
};

Messages.propTypes = {
	messages: PropTypes.object.isRequired
};

export default Messages;
