import React, { PropTypes } from 'react';

const TopNav = ({ logout }) => {
	return(
		<div>
			<nav className="teal darken-1">
				<div className="nav-wrapper container">
	  			<a className="brand-logo">
						<h6 className="logo">POST-IT</h6>
					</a>
	  			<a href="#" data-activates="mobile-demo" className="button-collapse">
						<i className="material-icons">menu</i>
					</a>
	  			<ul className="right hide-on-med-and-down">
						<li>
							<a className="modal-trigger" href="#modal1">
								Add New Group Member
							</a>
						</li>
						<li>
							<a onClick={logout}>
								Logout
							</a>
						</li>
	  			</ul>
	  			<ul className="side-nav" id="mobile-demo">
						<li>
							<a className="modal-trigger" href="#modal1">
								Add New Group Member
							</a>
						</li>
						<li>
							<a onClick={logout}>
								Logout
							</a>
						</li>
	  			</ul>
				</div>
  		</nav>
		</div>
	);
};

TopNav.propTypes = {
	logout: PropTypes.func.isRequired
};

export default TopNav;