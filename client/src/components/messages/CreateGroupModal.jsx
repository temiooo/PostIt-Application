import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateGroupInput } from '../../utils/validateInput';
import { createGroup, updateGroup } from '../../actions/groupActions';

/**
 * CreateGroupModal component
 * @class CreateGroupModal
 * @extends {React.Component}
 */
export class CreateGroupModal extends React.Component {

  /**
   * Creates an instance of CreateGroupModal
   * @param {object} props 
   */
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

  /**
   * lifecycle method invoked when component mounts
   * @returns {void} no return value
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * lifecycle method invoked before component receives new props
   * @param {object} nextProps 
   * @returns {void} no return value
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.editGroupStatus) {
      const group = this.state.name;
      if (group !== nextProps.selectedGroup.groupName) {
        this.setState({ name: nextProps.selectedGroup.groupName })
      }
    }
  }

  /**
   * Handles change event for the input field
   * @param {object} event 
   * @returns {void} no return value
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  };

  /**
   * Handles input validation
   * @returns {boolean} represents validity status of the input
   */
  isValid() {
    const { isValid } = validateGroupInput(this.state);
    return isValid;
  };

  /**
   * Sets error state if input values are invalid 
   * @returns {void} no return value
   */
  hasErrors() {
    const { errors, isValid } = validateGroupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
  }

  /**
   * Handles onBlur event for the input field
   * @returns {void} no return value
   */
  handleBlur() {
    this.hasErrors();
  }

  /**
   * Handles onFocus event for the input field
   * @returns {void} no return value
   */
  handleFocus() {
    this.setState({ errors: {} })
  }

  /**
   * Handles create group form submission
   * @param {object} event
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    const groupName = { name: this.state.name };
    const groupId = this.props.selectedGroup.groupId;
    const userId = this.props.currentUserId;

    this.props.editGroupStatus ?
      this.props.updateGroup(groupName, groupId, userId)
      : this.props.createGroup(groupName);
  }

  /**
   * Renders the component
   * @returns {JSX} jsx representation of the component
   */
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
            text="save group"
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
  currentUserId: PropTypes.number.isRequired
}

/**
 * Maps state to props
 * @param {object} state 
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = (state) => ({
  selectedGroup: state.messages,
  editGroupStatus: state.editGroupStatus,
  currentUserId: state.auth.currentUser.id
});

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  createGroup,
  updateGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
