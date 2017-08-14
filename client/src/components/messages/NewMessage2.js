import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../common/Button';
import SelectInput from '../common/SelectInput';
import * as messageActions from '../../actions/messageActions';

class NewMessage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			message: '',
			priority: ''
    };
			
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({message: event.target.value});
  }

  onSubmit(event) {
		event.preventDefault();
		this.props.actions.postMessage(this.state)
			.then(() =>
			this.setState({message: '', priority: ''}));
  }

	render() {
		return (
			<div className="row send-msg fixed">
				<form className="col s12"  onSubmit={this.onSubmit} >
					<div className="col s12">
						<textarea value={this.state.message} onChange={this.onChange} />
					</div>

					<input type="submit" value="Submit"/>
				</form>
						
				<div className="col s12 m6 l6">
                    <div className="priority input-field col s12">
                        <select
                        value={this.state.priority}
                        onChange={this.onChange}>
                            <option value="" defaultOption>Choose Priority</option>
                            <option value="Normal">Normal</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>

				<div className="col s12 m6 l6">
					<Button
						className="btn waves-effect waves-light red darken-1"
            onClick={this.onSubmit}
            text="send"
						icon="send"
          />
				</div>
			</div>
		);
	}
}

NewMessage.propTypes = {
};

function mapStateToProps(state, ownProps) {
	return {
		message: state.messages
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
