import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import validateInput from '../../utils/validateInput';
import {createGroup} from '../../actions/groupActions';

class CreateGroupModal extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      name: '',
      errors: {},
      disabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(event) {
    this.setState({
      name: event.target.value
    });
    if(this.isValid) {
      this.setState({ disabled: false })
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onBlur(event){
    this.isValid();
  }

  onFocus(event){
    this.setState({
      errors: ''
    })
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const {name} = this.state
      this.props.createGroup({name})
      .then(() =>
        this.setState({
          name: '',
          errors: {}
        }))
    }
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
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              error={errors.groupname}
            />
        </div>
        <div className="modal-footer">
					<Button
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
						text="CREATE GROUP"
            onClick={this.onSubmit}
            disabled={this.state.disabled}
					/>
				</div>
      </div>
		);
	}
}

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    createGroup: bindActionCreators(createGroup, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CreateGroupModal);
