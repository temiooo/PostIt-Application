import React, { PropTypes } from 'react';
import Button from '../common/Button';

const MessagesList = ({ messages, searchUsers }) => {
	const messageLength = messages.groupMessages.length;
		return (
			<div className="tabcontent">
				<div>
					<div className="row">
						<div className="col s12 m12 l8">
							<h4>{messages.groupName}</h4>
						</div>
						<div className="col s12 m12 l4">
							<a
							className="group-action btn-floating waves-effect waves-light modal-trigger"
							href="#creategroup"
							><i className="material-icons right">edit</i>
							</a>
							<Button
							className="group-action btn-floating waves-effect waves-light"
							icon="person_add"
							onClick={searchUsers}
							/>
						</div>
					</div>
					{ messageLength > 0 ? ( 
						<div className="msg-wrap">
						{messages.groupMessages.map(message =>
							<div className="msg" key={message.id}>
								<div>
									<small className="right time">{message.createdAt}</small>
									<h6 className="msg-heading">{message.User.username}</h6>
									<h6>{message.content}</h6>
								</div>
							</div>
						)}
					</div>
					) : (
						<h4 className="center-align">No Messages here!</h4>
					)}
				</div>
			</div>
		);
	
};

MessagesList.propTypes = {
	messages: PropTypes.object.isRequired,
	searchUsers: PropTypes.func.isRequired
};

export default MessagesList;
