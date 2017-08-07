import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../../actions/groupActions';
// import CreateGroupModal from './CreateGroupModal';

class SideNav extends React.Component {
	constructor(props, context) {
		super(props, context); 
			this.state = {
		groups: [],
			}
	};
	componentWillMount() {
		debugger;
		this.props.actions.getGroups(this.props.currentUser);
	}

	render() {
		const { groups } = this.state;
		return(
			<div className="row">
  			<div className="col s12 m12 l3 pull-l1 teal lighten-1">
    			<ul id="slide-out" className="side-nav z-depth-3 fixed teal lighten-1">
      			<li className="hide-on-medium"><a className="modal-trigger" href="#modal2"><i className="material-icons">loupe</i>Create New Group</a></li>
      			<li><div className="divider"></div></li>
      			{groups.map(group => <li key={group.id}><a className="waves-effect" href="#!">{group.name}</a></li>)}
    			</ul>
    			<a href="#" data-activates="slide-out" className="button-collapse">
						<i className="medium white-text material-icons">group</i>
					</a>
  			</div>
			</div>
		);
	}
}

SideNav.propTypes = {
  currentUser: PropTypes.number,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return{
	currentUser: state.auth.currentUser,
	groups: state.groups
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(groupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
