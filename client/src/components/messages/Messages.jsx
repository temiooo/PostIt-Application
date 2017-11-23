import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { getMessages } from '../../actions/messageActions';
import { editGroupOn, getGroup } from '../../actions/groupActions';

export class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.editGroupOn = this.editGroupOn.bind(this);
  }

  componentWillMount() {
    const groupId = this.props.match.params.id;
    this.props.getGroup(groupId);
    this.props.getMessages(groupId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const groupId = nextProps.match.params.id;
      this.props.getGroup(groupId);
      this.props.getMessages(groupId);
    }
  }

  editGroupOn() {
    this.props.editGroupOn();
  }

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

const mapStateToProps = (state) => ({
  messages: state.messages,
  isLoading: state.ajaxCallsInProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages,
  editGroupOn,
  getGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
