import React from 'react';
import Button from '../common/Button';
import TextInput from '../common/TextInput';

class CreateGroupModal extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      groupname: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

	render() {
		return(
			<div id="modal2" className="modal black-text">
        <div className="modal-content">
          <h5>Create New Group</h5>
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="Enter Group Name Here" id="search" type="text" />
                <label htmlFor="search">Group Name</label>
              </div>
            </div>
        </div>
        <div className="modal-footer">
					<Button 
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
            onClick={this.onSubmit}
						>CREATE GROUP
					</Button>
				</div>
      </div>
		);
	}
}

export default (CreateGroupModal);
