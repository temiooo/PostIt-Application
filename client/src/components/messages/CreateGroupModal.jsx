import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateGroupInput } from '../../utils/validateInput';
import { createGroup } from '../../actions/groupListActions';
import { editGroup } from '../../actions/selectedGroupActions';

/**
 * CreateGroupModal component
 * 
 * @class CreateGroupModal
 * 
 * @extends {React.Component}
 */
export class CreateGroupModal extends React.Component {

  /**
   * Creates an instance of CreateGroupModal
   * 
   * @param {Object} props 
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
   * 
   * @returns {void} no return value
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * lifecycle method invoked before component receives new props
   * 
   * @param {Object} nextProps
   * 
   * @returns {void} no return value
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedGroup.editGroupStatus) {
      const group = this.state.name;
      if (group !== nextProps.selectedGroup.groupName) {
        this.setState({ name: nextProps.selectedGroup.groupName })
      }
    } else {
      this.setState({ name: '' })
    }
  }

  /**
   * Handles change event for the input field
   * 
   * @param {Object} event
   * 
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
   * 
   * @returns {boolean} represents validity status of the input
   */
  isValid() {
    const { isValid } = validateGroupInput(this.state);
    return isValid;
  };

  /**
   * Sets error state if input values are invalid
   * 
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
   * 
   * @returns {void} no return value
   */
  handleBlur() {
    this.hasErrors();
  }

  /**
   * Handles onFocus event for the input field
   * 
   * @returns {void} no return value
   */
  handleFocus() {
    this.setState({ errors: {} })
  }

  /**
   * Handles create group form submission
   * 
   * @param {Object} event
   * 
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    const groupName = { name: this.state.name };
    const groupId = this.props.selectedGroup.groupId;
    const userId = this.props.currentUserId;

    this.props.selectedGroup.editGroupStatus ?
      this.props.editGroup(groupName, groupId, userId)
      : this.props.createGroup(groupName)
        .then(() => { this.setState({ name: '' }) });
  }

  /**
   * Renders the component
   * 
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
            id="save-group"
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
  editGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired
}

/**
 * Maps state to props
 * 
 * @param {Object} state
 * 
 * @returns {Object} contains sections of the redux store
 */
const mapStateToProps = (state) => ({
  selectedGroup: state.selectedGroup,
  currentUserId: state.auth.currentUser.id
});

/**
 * Maps dispatch to props
 * 
 * @param {function} dispatch
 * 
 * @returns {Object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  createGroup,
  editGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal);
