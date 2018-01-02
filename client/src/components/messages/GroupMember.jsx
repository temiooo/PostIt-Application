import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import {
  getGroupMembers, searchUsers, searchUsersFailure, addUser
} from '../../actions/userActions';

/**
 * GroupMember component
 * 
 * @class GroupMember
 * 
 * @extends {React.Component}
 */
export class GroupMember extends React.Component {

  /**
   * Creates an instance of GroupMember
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * lifecycle method invoked when component mounts
   * 
   * @returns {void} no return value
   */
  componentDidMount() {
    const group = this.props.match.params.id;
    this.props.getGroupMembers(group);
  }

  /**
   * lifecycle method invoked before component is unmounted
   * 
   * @returns {void} no return value
   */
  componentWillUnmount() {
    this.props.searchUsersFailure();
  }

  /**
   * Handles change event for the input field
   * 
   * @param {Object} event
   * 
   * @returns {void} no return value
   */
  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  /**
   * Makes API call to search for user based on search query
   * 
   * @param {number} offset
   * 
   * @returns {void} no return value
   */
  searchUser(offset) {
    const { searchTerm } = this.state;
    const group = this.props.match.params.id;
    const limit = 9;
    offset = offset || 0;
    this.props.searchUsers(searchTerm, group, limit, offset);
  }

  /**
   * Handles searching of users
   * 
   * @param {Object} event
   * 
   * @returns {void} no return value
   */
  handleSearch(event) {
    event.preventDefault();
    this.searchUser();
  }

  /**
   * Handles adding a user to a group
   * 
   * @param {number} user
   * 
   * @returns {void} no return value
   */
  addUserToGroup(user) {
    const group = this.props.match.params.id;
    const userDetail = { userId: user }
    this.props.addUser(group, userDetail)
      .then(() => {
        this.props.getGroupMembers(group);
        this.searchUser();
      })
  }

  /**
   * Handles page click for paginated search result
   * 
   * @param {Object} data
   * 
   * @returns {void} no return value
   */
  handlePageClick(data) {
    const selected = data.selected;
    const limit = 9;
    const offset = selected * limit;
    this.searchUser(offset);
  }

  /**
   * Renders the component
   * 
   * @returns {JSX} jsx representation of the component
   */
  render() {
    const { members, nonMembers, pagination } = this.props.users;
    const paginationSize = nonMembers.length;

    return (
      <div className="col s12 m12 l9">
        <div className="row">
          <div className="col s12 m8 l8 search-user">
            <h4 className="center-align"> Add New Member </h4>
            <form>
              <div className="search row z-depth-3">
                <div className="col s10">
                  <input
                    id="search"
                    type="search"
                    placeholder="Search"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                  />
                </div>
                <div className=" search-icon col s2 center-align">
                  <button
                    id="search"
                    className="btn search-btn waves-effect waves-light"
                    onClick={this.handleSearch}>
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </div>
            </form>

            {nonMembers.length > 0 ? (
              <ul id="search-results" className="collection"> {nonMembers.map(user =>
                <li className="collection-item" key={user.id}>
                  <div>{user.username}
                    <a className="waves-effect secondary-content non-members"
                      onClick={() => this.addUserToGroup(user.id)}>
                      <i className="material-icons">add</i>
                    </a>
                  </div>
                </li>)}
              </ul>
            ) : (
                <h5 className="no-user center-align grey-text text-darken-3">
                  No Users Found
                </h5>
              )
            }

            {paginationSize > 0 &&
              <ReactPaginate
                previousLabel={<i className="material-icons">chevron_left</i>}
                nextLabel={<i className="material-icons">chevron_right</i>}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                forcePage={pagination.pageNumber - 1}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination center-align"}
                activeClassName={"active"}
              />}
          </div>

          <div className="col s12 m4 l4 group-members">
            <h5 className="center-align grey-text text-darken-3">
              Group Members ({members.length})
            </h5>
            <ul className="collection">
              {members.map(member =>
                <li className="collection-item" key={member.id}>
                  {member.username}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

GroupMember.propTypes = {
  users: PropTypes.object.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchUsersFailure: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

/**
 * Map state to props
 * 
 * @param {Object} state
 * 
 * @returns {Object} contains section of the redux store
 */
const mapStateToProps = state => ({
  users: state.users
});

/**
 * Maps dispatch to props
 * 
 * @param {function} dispatch
 * 
 * @returns {Object} actions to be dispatched 
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMembers,
  searchUsers,
  searchUsersFailure,
  addUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GroupMember);
