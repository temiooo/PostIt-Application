import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

/**
 * MessageForm component
 * 
 * @param {object} props
 * 
 * @returns {JSX} jsx representation of the component
 */
const MessageForm =
  ({ isValid, content, priority, handleChange, handleSubmit }) => {
    const options = ['Normal', 'Urgent', 'Critical'];
    return (
      <div className="row send-msg s12">
        <form className="col s12 m6 l7">
          <div className="col s12">
            <textarea
              id="message"
              name="content"
              value={content}
              onChange={handleChange}
              placeholder='Type your message here...'
            />
          </div>
        </form>

        <div className="col s8 m4 l3">
          <div className="priority input-field">
            <select
              id="message-priority"
              className="browser-default"
              name="priority"
              value={priority}
              onChange={handleChange}>
              <option value="" disabled>Set Priority</option>
              {options.map((option) => {
                return <option key={option} value={option}>{option}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="col s4 m2 l2 send-btn-wrapper">
          <Button
            id="send-message"
            className="btn waves-effect waves-light red darken-1 right"
            onClick={handleSubmit}
            disabled={!isValid()}
            text="send"
          />
        </div>
      </div>
    );
  };

MessageForm.propTypes = {
  isValid: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};


export default MessageForm;
