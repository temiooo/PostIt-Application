import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * WelcomePage component
 * @class WelcomePage
 * @extends {React.Component}
 */
export class WelcomePage extends React.Component {

  /**
   * Creates an instance of WelcomePage
   * @param {object} props 
   */
  constructor(props) {
    super(props);

  }
  /**
   * Renders the component
   * @returns {JSX} jsx representation of the element
   */
  render() {
    const { currentUser } = this.props;
    const groupNo = this.props.groups.length;
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
}

WelcomePage.propTypes = {
  groups: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

/**
 * Maps state to props
 * @param {object} state
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  groups: state.groups
});

export default connect(mapStateToProps, null)(WelcomePage);
