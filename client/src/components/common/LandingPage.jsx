import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <div className="row center-align">
        <div className="col l10 m11 s12"><h1 className="logo">POST-IT</h1></div>
      </div>
      <div className="row hide-on-small-only">
        <div className="col s6">
          <i className="medium material-icons white-text">person</i>
          <h5 className="grey-text text-darken-4">1. Create Account</h5>
        </div>
        <div className="col s6">
          <i className="medium material-icons white-text">group</i>
          <h5 className="grey-text text-darken-4">2. Create Group</h5>
        </div>
      </div>
      <div className="row hide-on-small-only">
        <div className="col s6">
          <i className="medium material-icons white-text">group_add</i>
          <h5 className="grey-text text-darken-4">3. Add Members to Your Group</h5>
        </div>
        <div className="col s6">
          <i className="medium material-icons white-text">message</i>
          <h5 className="grey-text text-darken-4">4. Start Posting Messages</h5>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;
