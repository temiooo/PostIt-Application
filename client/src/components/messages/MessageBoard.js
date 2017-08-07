import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import TopNav from './TopNav';
import SideNav from './SideNav';
import * as authActions from '../../actions/authActions';


class MessageBoard extends React.Component {
	componentWillMount() {
   if(!this.props.currentUser) {
     browserHistory.push('login');
   } 
	}
	
  render() {
		return(
			<div>
			<TopNav/>
			<SideNav/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
  return{
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(authActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
