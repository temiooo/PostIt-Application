import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
import { logout } from '../../actions/authActions'
// import AddMemberModal from './AddMemberModal';

class TopNav extends React.Component {
	constructor(props, context){
    super(props, context);

    this.logout = this.logout.bind(this);
	}

	logout(event){
		event.preventDefault();
		browserHistory.push('/signin')
	}

	render() {
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
        			<li><a className="modal-trigger" href="#modal1">Add New Group Member</a></li>
        			<li><a >Logout</a></li>
      			</ul>
      			<ul className="side-nav" id="mobile-demo">
        			<li><a className="modal-trigger" href="#modal1">Add New Group Member</a></li>
        			<li><button onClick={this.logout}>Logout</button></li>
      			</ul>
    			</div>
  				</nav>
			</div>
		);
	}
}

TopNav.propTypes = {
	logout:	PropTypes.func
};

function mapDispatchToProps(dispatch){
	return {
		logout: bindActionCreators({ logout }, dispatch)
	}
}

export default connect(null, mapDispatchToProps)(TopNav);