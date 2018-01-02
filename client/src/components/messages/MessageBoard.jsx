import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import GroupMember from './GroupMember';
import WelcomePage from './WelcomePage';
import CreateGroupModal from './CreateGroupModal';
import { logout } from '../../actions/authActions';
import { getUserGroups } from '../../actions/groupListActions';
import { editGroupOff } from '../../actions/selectedGroupActions';

/**
 * MessageBoard component
 * 
 * @class MessageBoard
 * 
 * @extends {React.Component}
 */
export class MessageBoard extends React.Component {

  /**
   * Creates an instance of MessageBoard
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);

  }

  /**
   * lifecycle method invoked when component mounts
   * 
   * @returns {void} no return value
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('select').material_select();
    if (this.props.auth.isAuthenticated) {
      this.props.getUserGroups(this.props.auth.currentUser.id);
    }
  }

  /**
   * Renders the component
   * 
   * @returns {JSX} jsx representation of the component
   */
  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <Redirect to='/login' />
      );
    }

    return (
      <div className="message-board">
        <TopNav logout={this.props.logout} />
        <div className="row">

          <SideNav
            groupList={this.props.groupList}
            edit={this.props.editGroupOff}
          />
          <CreateGroupModal />

          <main>
            <Route
              exact path={`${this.props.match.url}`}
              component={() => <WelcomePage
                groupList={this.props.groupList}
                currentUser={this.props.auth.currentUser}
              />}
            />

            <Route
              path={`${this.props.match.url}/group/:id/messages`}
              component={Messages}
            />

            <Route
              path={`${this.props.match.url}/group/:id/members`}
              component={GroupMember}
            />
          </main>

        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  groupList: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  editGroupOff: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * 
 * @param {Object} state
 * 
 * @returns {Object} contains sections of the redux store
 */
const mapStateToProps = (state) => ({
  auth: state.auth,
  groupList: state.groupList,

});

/**
 * Maps dispatch to props
 * 
 * @param {function} dispatch
 * 
 * @returns {Object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  getUserGroups,
  editGroupOff
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
