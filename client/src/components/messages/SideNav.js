import React, {PropTypes} from 'react';

const SideNav = ({ groups, getMessages }) => {
	return(
		<div className="col s12 m12 l3 pull-l1 teal lighten-1">
			<ul id="slide-out" className="side-nav z-depth-3 fixed teal lighten-1">
				<li className="hide-on-medium">
					<a className="modal-trigger" href="#creategroup">
						<i className="material-icons">loupe</i>
						Create New Group
					</a>
				</li>
				<li>
					<div className="divider"></div>
				</li>
				{groups.map(group => <li key={group.id}>
					<a className="waves-effect" onClick={() => getMessages(group) }>{group.name}</a>
				</li>)}
			</ul>
			<a href="#" data-activates="slide-out" className="button-collapse">
				<i className="medium white-text material-icons">group</i>
			</a>
		</div>
	);
};

SideNav.propTypes = {
	groups: PropTypes.array.isRequired,
	getMessages: PropTypes.func.isRequired
}

export default SideNav;
