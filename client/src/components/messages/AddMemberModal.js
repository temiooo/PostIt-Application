import React from 'react';

class AddMemberModal extends React.Component {
	render () {
		return (
			<div id="modal1" className="modal black-text">
        <div className="modal-content">
            <h5>Add New Group Member</h5>
            <select className="browser-default">
              <option value="" disabled selected>Select Group</option>
              <option value="1">Group A</option>
              <option value="2">Group B</option>
              <option value="3">Group C</option>
            </select>

            <div className="row">
              <div className="input-field col s12">
              	<i className="material-icons prefix">search</i>
                <input id="search" />
                <label htmlFor="search">Search for User</label>
              </div>
            </div>

            <div className="collection">
              <a href="#!" className="collection-item active">Alvin</a>
              <a href="#!" className="collection-item">Alvin</a>
            </div>
        </div>
        <div className="modal-footer">
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
