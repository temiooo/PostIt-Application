import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import toastr from 'toastr';
import { isEmpty, trim } from 'lodash';
import { validateMessageInput } from '../../utils/validateInput';
import { postMessage } from '../../actions/messageActions';

class NewMessage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			content: '',
			priority: '',
    };
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	isValid() {
		const { isValid } = validateMessageInput(this.state);
		return isValid;
	}

  handleSubmit(event) {
		event.preventDefault();
		const id = this.props.groupId
		const content = trim(this.state.content)
		const message = {
			content,
			priority: this.state.priority
		}
		this.props.postMessage(id, message)
			.then(() =>
			this.setState({
				content: '',
				priority: ''
			}));
	}

	render() {
		const options = ['Normal', 'Urgent', 'Critical']

		return (
			<div className="row send-msg fixed">
				<form className="col s12">
					<div className="col s12">
						<textarea
						name="content"
						value={this.state.content}
						onChange={this.handleChange}
						/>
					</div>
				</form>
						
				<div className="col s12 m6 l6">
					<div className="priority input-field col s12">
						<select
							name="priority"
							value={this.state.priority}
							onChange={this.handleChange}>
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
      			onClick={this.handleSubmit}
						disabled={!this.isValid()}
           	text="send"
						icon="send"
          />
				</div>
			</div>
		);
	}
}

NewMessage.propTypes = {
	groupId: PropTypes.number.isRequired,
	postMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ postMessage }, dispatch)

export default connect(null, mapDispatchToProps)(NewMessage);
