import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageActions';

class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.getMessages = this.getMessages.bind(this);
	}

	getMessages(group) {
		event.preventDefault();
		this.props.actions.getMessages(group);
	}
	render() {
		const {groups} = this.props;

		return(
			<div className="col s12 m12 l3 pull-l1 white">
				<ul id="slide-out" className="side-nav z-depth-3 fixed teal lighten-1">
					<li className="hide-on-medium">
						<a className="modal-trigger waves-effect" data-target="modal1">
							<i className="material-icons">loupe</i>
								Create New Group
						</a>
					</li>
					<li>
						<div className="divider"><a>link </a></div>
					</li>
					{groups.map(group => <li key={group.id}>
						<a className="waves-effect" onClick={() => this.getMessages(group)}>{group.name}</a>
					</li>)}
				</ul>
				<a href="#" data-activates="slide-out" className="button-collapse">
					<i className="medium white-text material-icons">group</i>
				</a>
			</div>
		);
	};
}

SideNav.propTypes = {
	groups: PropTypes.array.isRequired,
	getMessages: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
		groups: state.groups,
		messages: state.messages
  }
}

function mapDispatchToProps(dispatch) {
	return {
	actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
