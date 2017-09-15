import React from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import NewMessage from './NewMessage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMessages } from '../../actions/messageActions';

class Messages extends React.Component{

	constructor(props) {
		super(props);

		this.getMessages = this.getMessages.bind(this);
	}

	componentWillMount() {
		if (!this.props.messages.groupId) {
			const groupId = this.props.urlParams.id;
			this.props.getMessages(groupId);
		}
	}

	getMessages() {
		event.preventDefault();
		this.props.getMessages(groupId);
	}

	render() {
		return (	
			<div className="white col s12 m12 l9 msg">
				{this.props.isLoading === 0 ? (
					<div>
						<MessageList messages={ this.props.messages }
							edit={ this.props.edit } />
				
						<NewMessage groupId= { this.props.urlParams.id }/> 
					</div> 
				) : (
					<div className="preloader-wrapper small active">
    				<div className="spinner-layer spinner-teal-only">
      				<div className="circle-clipper left">
        				<div className="circle"></div>
      				</div>
							<div className="gap-patch">
        				<div className="circle"></div>
      				</div>
							<div className="circle-clipper right">
        				<div className="circle"></div>
      				</div>
    				</div>
  				</div>
      	)}	
			</div>
		); 	
	}
}

Messages.propTypes = {
	messages: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	getMessages: PropTypes.func.isRequired,
	urlParams: PropTypes.object.isRequired,
	isLoading: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
	messages: state.messages,
	isLoading: state.ajaxCallsInProgress
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getMessages }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
