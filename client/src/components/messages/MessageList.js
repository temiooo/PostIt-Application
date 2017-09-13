import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Link } from 'react-router-dom'

const MessagesList = ({ messages, edit }) => {
	const messageLength = messages.groupMessages.length;
		return (
			<div className="tabcontent s12">
				<div>
					<div className="row">
						<div className="col s12 m12 l8">
							<h4>{messages.groupName}</h4>
						</div>
						<div className="col s12 m12 l4">
							<a
							className="group-action btn-floating waves-effect waves-light modal-trigger"
							href="#group"
							onClick={edit}
							><i className="material-icons right">edit</i>
							</a>
							<Link
								to={`/messageboard/group/${messages.groupId}/members`}
								className="group-action btn-floating waves-effect waves-light">	
									<i className="material-icons right">person_add</i>
							</Link>
						</div>
					</div>
					{ messageLength > 0 ? ( 
						<div className="msg-wrap">
						{messages.groupMessages.map(message =>
							<div className="single-msg" key={message.id}>
								<div>
									<small className="right time">{message.createdAt.slice(0, 10)}</small>
									<h6 className="msg-heading">{message.User.username}</h6>
									<h6>{message.content}</h6>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="msg-wrap">
						<h4 className="center-align">No Messages here!</h4>
					</div>
					)}
				</div>
			</div>
		);
	
};

MessagesList.propTypes = {
	messages: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired
};

export default MessagesList;
