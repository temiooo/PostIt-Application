import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../common/Button';
import SelectInput from '../common/SelectInput';
import * as messageActions from '../../actions/messageActions';

class NewMessage extends React.Component {
	
 constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select
                value={this.state.value}
                onChange={this.handleChange}
                className="form-control">
                <option value="">defaultOption</option>
                <option value="99">99</option>;
                </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

NewMessage.propTypes = {
};

function mapStateToProps(state, ownProps) {
	return {
		message: state.messages
	};
}

function mapDispatchToProps(dispatch) {
	return {
	actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
