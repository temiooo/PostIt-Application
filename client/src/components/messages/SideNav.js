import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideNav = ({ groups, getMessages, edit }) => {
	return(
		<div className="col s12 m12 l3 pull-l1 teal lighten-1">
			<ul id="slide-out" className="side-nav side-nav-bar z-depth-3 fixed">
				<li className="hide-on-medium">
					<a className="modal-trigger" href="#group" onClick={edit}>
						<i className="material-icons">loupe</i>
						Create New Group
					</a>
				</li>
				<li>
					<div className="divider"></div>
				</li>
				{groups.map(group => <li key={group.id}>
					<a href={`/#/messageboard/group/${group.id}/messages`}
						className="waves-effect"
						onClick={() => getMessages(group.id) }>
						{group.name}
					</a>
				</li>)}
			</ul>	
			<a href="#" data-activates="slide-out" className="button-collapse">
				<div className="row nav-row">
					<div className="col s3 m1">
						<i className="medium white-text material-icons">group</i>
					</div>
					<div className="col s9 m11">
						<h5 className="white-text">Groups</h5>
					</div>
				</div>	
			</a>
		</div>
	);
};

SideNav.propTypes = {
	groups: PropTypes.array.isRequired,
	getMessages: PropTypes.func.isRequired,
	edit: PropTypes.func.isRequired
}

export default SideNav;
