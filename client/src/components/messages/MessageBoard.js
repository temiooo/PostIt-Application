import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import NewMessage from './NewMessage';
import * as authActions from '../../actions/authActions';
import * as groupActions from '../../actions/groupActions';
import * as messageActions from '../../actions/messageActions';


class MessageBoard extends React.Component {
	constructor(props, context) {
	super(props, context);

	this.logout = this.logout.bind(this);
	}

	componentWillMount() {
   if(!this.props.currentUser) {
     browserHistory.push('login');
   } else {
		 this.props.actions.getGroups(this.props.currentUser);
	 }
	}

	logout(event) {
		event.preventDefault();
		this.props.actions.logout();
		browserHistory.push('/login');	
	}
	
  render() {
		return(
			<div className="white">
				<TopNav logout={this.logout}/>
				<div className="row">
					<SideNav/>
					<div className="white col s12 m12 l9">
						<Messages  messages={this.props.messages}/>
						<NewMessage/>
					</div>
				</div>
			</div>
		);
	}
}

MessageBoard.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
		currentUser: state.auth.currentUser,
		messages: state.messages
  }
}

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(
      Object.assign({},
      authActions,
      groupActions,
      messageActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
