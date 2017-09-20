import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateGroupInput } from '../../utils/validateInput';
import { createGroup, updateGroup } from '../../actions/groupActions';

class CreateGroupModal extends React.Component {
  constructor(props) {
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

  componentDidMount() {
    $('.modal').modal();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editGroupStatus) {
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
    if (!isValid) {
      this.setState({ errors });
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
    const userId = this.props.currentUserId;

    if (this.props.editGroupStatus) {
      this.props.updateGroup(groupName, groupId, userId)
    } else {
      this.props.createGroup(groupName);
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="group" className="modal black-text">
        <div className="modal-content">
          <h5>Group Name</h5>
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
  editGroupStatus: PropTypes.bool.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  currentUserId: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  selectedGroup: state.messages,
  editGroupStatus: state.editGroupStatus,
  currentUserId: state.auth.currentUserId
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createGroup,
  updateGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
