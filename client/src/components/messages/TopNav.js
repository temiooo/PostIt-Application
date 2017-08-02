import React from 'react';
import AddMemberModal from './AddMemberModal';

class TopNav extends React.Component {
	render() {
		return(
			<div>
				<nav className="teal darken-1">
    			<div className="nav-wrapper container">
      			<a href="#!" className="brand-logo">
							<h6 className="logo">POST-IT</h6>
						</a>
      			<a href="#" data-activates="mobile-demo" className="button-collapse">
							<i className="material-icons">menu</i>
						</a>
      			<ul className="right hide-on-med-and-down">
        			<li><a className="modal-trigger" href="#modal1">Add New Group Member</a></li>
        			<li><a href="login.html">Logout</a></li>
      			</ul>
      			<ul className="side-nav" id="mobile-demo">
        			<li><a className="modal-trigger" href="#modal1">Add New Group Member</a></li>
        			<li><a href="login.html">Logout</a></li>
      			</ul>
    			</div>
  			</nav>
				<AddMemberModal />
			</div>
		);
	}
}
export default TopNav;