import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../common/Button';
import * as messageActions from '../../actions/messageActions';

class NewMessage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			message:{
				content: '',
				priority: ''
			},
    };
			
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
			const field = event.target.name;
			const message = this.state.message;
			message[field] = event.target.value;
			return this.setState({
				message
			});
	}

  onSubmit(event) {
		event.preventDefault();
		const id = this.props.messages.groupId
		this.props.actions.postMessage(id, this.state.message)
			.then(() =>
			this.setState({
				message:{
					content: '',
					priority: ''
				}
			}));
  }

	render() {
		const options = ['Normal', 'Urgent', 'Critical']
		const { content, priority } = this.state.message

		return (
			<div className="row send-msg fixed">
				<form className="col s12">
					<div className="col s12">
						<textarea
						name="content"
						value={content}
						onChange={this.onChange}
						/>
					</div>
				</form>
						
				<div className="col s12 m6 l6">
					<div className="priority input-field col s12">
						<select
							name="priority"
							value={priority}
							onChange={this.onChange}>
							<option value="" disabled>Choose Your Priority</option>
							{options.map((option) => {
								return <option key={option} value={option}>{option}</option>;
							})}
						</select>
					</div>
				</div>

				<div className="col s12 m6 l6">
					<Button
						className="btn waves-effect waves-light red darken-1"
      			onClick={this.onSubmit}
           	text="send"
						icon="send"
						disabled={this.state.disabled}
          />
				</div>
			</div>
		);
	}
}

NewMessage.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		messages: state.messages
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
