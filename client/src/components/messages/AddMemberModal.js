import React from 'react';

class AddMemberModal extends React.Component {
	render () {
		return (
			<div id="modal1" class="modal black-text">
        <div class="modal-content">
            <h5>Add New Group Member</h5>
            <select class="browser-default">
              <option value="" disabled selected>Select Group</option>
              <option value="1">Group A</option>
              <option value="2">Group B</option>
              <option value="3">Group C</option>
            </select>

            <div class="row">
              <div class="input-field col s12">
              	<i class="material-icons prefix">search</i>
                <input id="search" />
                <label for="search">Search for User</label>
              </div>
            </div>

            <div class="collection">
              <a href="#!" class="collection-item active">Alvin</a>
              <a href="#!" class="collection-item">Alvin</a>
            </div>
        </div>
        <div class="modal-footer">
					<Button 
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
						>ADD MEMBER
					</Button>
        </div>
      </div>
		);
	}
}

export default AddMemberModal;
