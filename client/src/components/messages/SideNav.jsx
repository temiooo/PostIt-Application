import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * SideNav component
 * 
 * @param {object} props
 * 
 * @returns {JSX} jsx representation of the element
 */
const SideNav = ({ groupList, edit }) => {
  return (
    <div className="col s12 m12 l3 pull-l2 teal lighten-1">
      <ul id="slide-out" className="side-nav side-nav-bar z-depth-3 fixed">
        <li className="hide-on-medium">
          <a className="modal-trigger" href="#group" onClick={edit}>
            <i className="material-icons">loupe</i>
            Create New Group

					</a>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        {groupList.map(group => <li key={group.id}>
          <Link
            id={group.name.toLowerCase().split(' ').join('-')}
            to={`/messageboard/group/${group.id}/messages`}
            className="waves-effect">
            {group.name}
          </Link>
        </li>)}
      </ul>
      <a href="#" data-activates="slide-out" className="button-collapse">
        <div className="row nav-row">
          <div className="col s3 m1">
            <i className="medium white-text material-icons">group</i>
          </div>
          <div className="col s9 m11">
            <h5 className="white-text">Groups</h5>
          </div>
        </div>
      </a>
    </div>
  );
};

SideNav.propTypes = {
  groupList: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired
}

export default SideNav;
