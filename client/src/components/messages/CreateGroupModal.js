import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateGroupInput } from '../../utils/validateInput';
import { createGroup, updateGroup } from '../../actions/groupActions';
import { updateGroupInfo } from '../../actions/messageActions';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      const group = this.state.name;
      if (group !== nextProps.selectedGroup.groupName) {
        this.setState({ name: nextProps.selectedGroup.groupName })
      }
    } else {
      this.setState({ name: '' })
    }
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
    const groupName = { name: this.state.name };
    const groupId = this.props.selectedGroup.groupId;
    const user = this.props.user;

    if (this.props.edit) {
      this.props.updateGroup(groupName, groupId, user)
      .then(() => {
        const group = this.props.groups.filter(group => group.id == groupId)
        this.props.updateGroupInfo(group)
      });
    } else {
      this.props.createGroup(groupName);
    }
  }

	render() {
    const { errors } = this.state;

		return(
			<div id="group" className="modal black-text">
        <div className="modal-content">
          <h5>Create New Group</h5>
            <TextInput
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Enter group name here"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              error={errors.name}
            />
        </div>
        <div className="modal-footer">
					<Button
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
						text="SAVE GROUP"
            onClick={this.handleSubmit}
            disabled={!this.isValid()}
					/>
				</div>
      </div>
		);
	}
}

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  updateGroupInfo: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  user: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  selectedGroup: state.messages,
  groups: state.groups,
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createGroup,
  updateGroup,
  updateGroupInfo }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
