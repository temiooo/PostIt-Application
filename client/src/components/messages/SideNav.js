import React from 'react';
import CreateGroupModal from './CreateGroupModal';

class SideNav extends React.Component {
	render() {
		return(
			<div class="row">
  			<div class="col s12 m12 l3 pull-l1 teal lighten-1">
    			<ul id="slide-out" class="side-nav z-depth-3 fixed teal lighten-1">
      			<li class="hide-on-medium"><a class="modal-trigger" href="#modal2"><i class="material-icons">loupe</i>Create New Group</a></li>
      			<li><div class="divider"></div></li>
      			<li><a class="waves-effect" href="#!">Group A</a></li>
      			<li><a class="waves-effect" href="#!">Group B</a></li>
      			<li><a class="waves-effect" href="#!">Group C</a></li>
      			<li><a class="waves-effect" href="#!">Group D</a></li>
      			<li><a class="waves-effect" href="#!">Group E</a></li>
    			</ul>
    			<a href="#" data-activates="slide-out" class="button-collapse">
						<i class="medium white-text material-icons">group</i>
					</a>
  			</div>
				<CreateGroupModal />
			</div>
		);
	}
}

export default SideNav;