import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateGroupInput } from '../../utils/validateInput';
import { createGroup } from '../../actions/groupActions';

class CreateGroupModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  };

  isValid() {
    const { isValid } = validateGroupInput(this.state);
    return isValid;
  };

  hasErrors() {
    const { errors, isValid } = validateGroupInput(this.state);
    if(!isValid) {
      this.setState({errors});
    } 
  }

  handleBlur() {
    this.hasErrors();
  }

  handleFocus() {
    this.setState({ errors: {} })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state
    this.props.createGroup({name})
    .then(() =>
      this.setState({
        name: '',
        errors: {}
      }))
  }

	render() {
    const { errors } = this.state;

		return(
			<div id="creategroup" className="modal black-text">
        <div className="modal-content">
          <h5>Create New Group</h5>
            <TextInput
              name="name"
              type="text"
              value={this.state.name}
              label="Group Name"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              error={errors.name}
            />
        </div>
        <div className="modal-footer">
					<Button
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
						text="CREATE GROUP"
            onClick={this.handleSubmit}
            disabled={!this.isValid()}
					/>
				</div>
      </div>
		);
	}
}

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ createGroup }, dispatch)

export default connect(null, mapDispatchToProps)(CreateGroupModal);
