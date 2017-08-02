import React from 'react';

class MessagePriority extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priority: 'Normal'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			priority: event.target.value
		});	
	}

	render() {
		return (
			<select value={this.state.priority} onChange={this.handleChange}>
				<option value="" disabled selected>Choose Priority</option>
				<option value="Normal">Normal</option>
			  <option value="Urgent">Urgent</option>
				<option value="Critical">Critical</option>
		 </select>
		);
	}
}

export default MessagePriority;
