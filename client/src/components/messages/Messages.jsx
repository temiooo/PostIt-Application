import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { trim } from 'lodash';
import { bindActionCreators } from 'redux';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { validateMessageInput } from '../../utils/validateInput';
import {
  getMessages,
  postMessage,
  getGroup,
  editGroupOn
} from '../../actions/selectedGroupActions';

/**
 * Messages component
 * 
 * @class Messages
 * 
 * @extends {React.Component}
 */
export class Messages extends React.Component {

  /**
   * Creates an instance of Messages
   * 
   * @param {object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: ''
    };

    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * lifecycle method invoked when component mounts
   * 
   * @returns {void} no return value
   */
  componentDidMount() {
    const groupId = this.props.match.params.id;
    this.props.getGroup(groupId);
    this.props.getMessages(groupId);
  }

  /**
   * lifecycle method invoked before component receives new props
   * 
   * @param {object} nextProps
   * 
   * @returns {void} no return value
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const groupId = nextProps.match.params.id;
      this.props.getGroup(groupId);
      this.props.getMessages(groupId);
    }
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
   * Handles message form submission
   * 
   * @param {object} event
   * 
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.match.params.id
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
  * Handles input validation

  * @returns {boolean} represents validity status of the input
  */
  isValid() {
    const { isValid } = validateMessageInput(this.state);
    return isValid;
  }

  /**
   * Renders the conponent
   * 
   * @returns {JSX} jsx representation of the component
   */
  render() {
    return (
      <div className="white col s12 m12 l9 msg">
        <div>
          <MessageList
            selectedGroup={this.props.selectedGroup}
            edit={this.props.editGroupOn}
            isLoading={this.props.isLoading}
          />

          <MessageForm
            isValid={this.isValid}
            content={this.state.content}
            priority={this.state.priority}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  getGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.number.isRequired,
  editGroupOn: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * 
 * @param {object} state
 * 
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = (state) => ({
  selectedGroup: state.selectedGroup,
  isLoading: state.ajaxCallsInProgress
});

/**
  * Maps dispatch to props

 * @param {function} dispatch
 * 
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages,
  editGroupOn,
  getGroup,
  postMessage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
