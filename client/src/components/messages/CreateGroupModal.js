import React from 'react';
import Button from './Button';

class SideNav extends React.Component {
	render() {
		return(
			<div id="modal2" className="modal black-text">
        <div className="modal-content">
          <h5>Create New Group</h5>
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="Enter Group Name Here" id="search" type="text" />
                <label for="search">Group Name</label>
              </div>
            </div>
        </div>
        <div className="modal-footer">
					<Button 
						className="btn modal-action modal-close waves-effect waves-green red darken-1"
						>CREATE GROUP
					</Button>
				</div>
      </div>
		);
	}
}