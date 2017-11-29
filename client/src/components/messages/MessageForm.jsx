import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, trim } from 'lodash';
import { bindActionCreators } from 'redux';
import Button from '../common/Button';
import { validateMessageInput } from '../../utils/validateInput';
import { postMessage, postMessageSuccess } from '../../actions/messageActions';

/**
 * MessageForm component
 * @class MessageForm
 * @extends {React.Component}
 */
export class MessageForm extends React.Component {

  /**
   * Creates an instance of MessageForm
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      priority: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles change event for the input fields
   * @param {object} event
   * @returns {void} no return value
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Handles input validation
   * @returns {boolean} represents validity status of the input
   */
  isValid() {
    const { isValid } = validateMessageInput(this.state);
    return isValid;
  }

  /**
   * Handles message form submission
   * @param {object} event
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.groupId
    const content = trim(this.state.content)
    const message = {
      content,
      priority: this.state.priority
    }
    this.props.postMessage(id, message)
      .then(() => {
        this.setState({
          content: '',
          priority: ''
        });
      });
  }


  /**
   * Renders the component
   * @returns {JSX} jsx representation of the element
   */
  render() {
    const options = ['Normal', 'Urgent', 'Critical'];

    return (
      <div className="row send-msg s12">
        <form className="col s12">
          <div className="col s12">
            <textarea
              id="message"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
        </form>

        <div className="col s8 m6 l8">
          <div className="priority input-field">
            <select
              id="message-priority"
              className="browser-default"
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

        <div className="col s4 m6 l4">
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

MessageForm.propTypes = {
  groupId: PropTypes.string.isRequired,
  postMessage: PropTypes.func.isRequired
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postMessage,
    postMessageSuccess
  }, dispatch)

export default connect(null, mapDispatchToProps)(MessageForm);
