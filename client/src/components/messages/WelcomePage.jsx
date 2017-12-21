import React from 'react';
import PropTypes from 'prop-types';

/**
 * WelcomePage component
 * 
 * @param {object} props
 * 
 * @returns {JSX} jsx representation of the component
 */
const WelcomePage = ({ groupList, currentUser }) => {
  const groupNo = groupList.length;
  return (
    <div className="white col s12 m12 l9">
      <div className="welcome-page">
        <h4>Hi {currentUser.name},</h4>
        <h5>Email : {currentUser.email}</h5>
        <h5>Your Groups : {groupNo}</h5>
      </div>
    </div>
  );
}

WelcomePage.propTypes = {
  groupList: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default WelcomePage;
