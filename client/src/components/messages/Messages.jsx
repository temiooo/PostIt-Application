import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { getMessages } from '../../actions/messageActions';
import { editGroupOn, getGroup } from '../../actions/groupActions';

/**
 * Messages component
 * @class Messages
 * @extends {React.Component}
 */
export class Messages extends React.Component {

  /**
   * Creates an instance of Messages
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.editGroupOn = this.editGroupOn.bind(this);
  }

  /**
   * lifecycle method invoked before comoponent mounts
   * @returns {void} no return value
   */
  componentWillMount() {
    const groupId = this.props.match.params.id;
    this.props.getGroup(groupId);
    this.props.getMessages(groupId);
  }

  /**
   * lifecycle method invoked before component receives new props
   * @param {object} nextProps
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
   * changes edit group status to true
   * @returns {void} no return value
   */
  editGroupOn() {
    this.props.editGroupOn();
  }

  /**
   * Renders the conponent
   * @returns {JSX} jsx representation of the component
   */
  render() {
    return (
      <div className="white col s12 m12 l9 msg">
        <div>
          <MessageList messages={this.props.messages}
            edit={this.props.editGroupOn}
            isLoading={this.props.isLoading} />

          <MessageForm groupId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  getGroup: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.number.isRequired,
  editGroupOn: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * @param {object} state 
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = (state) => ({
  messages: state.messages,
  isLoading: state.ajaxCallsInProgress
});

/**
  * Maps dispatch to props
 * @param {function} dispatch
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages,
  editGroupOn,
  getGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
