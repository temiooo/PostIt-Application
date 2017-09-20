import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import {
  getGroupMembers, searchUsers, searchUsersFailure,
  addUser
} from '../../actions/userActions';

class GroupMember extends React.Component {
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

  componentWillMount() {
    const group = this.props.messages.groupId || this.props.match.params.id;
    this.props.getGroupMembers(group);
  }

  componentWillUnmount() {
    this.props.searchUsersFailure();
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  searchUser(offset) {
    const query = this.state.searchTerm;
    const group = this.props.messages.groupId || this.props.match.params.id;
    const limit = 9;
    offset = offset || 0;
    this.props.searchUsers(query, group, limit, offset);
  }

  handleSearch(event) {
    event.preventDefault();
    this.searchUser();
  }

  addUserToGroup(user) {
    event.preventDefault();
    const group = this.props.messages.groupId;
    const userDetail = { userId: user }
    this.props.addUser(group, userDetail)
      .then(() => {
        this.props.getGroupMembers(group);
        this.searchUser();
      })
  }

  handlePageClick(data) {
    const selected = data.selected;
    const limit = 9;
    const offset = selected * limit;
    this.searchUser(offset);
  }

  render() {
    const { members, nonMembers, pagination } = this.props.users;
    const paginationSize = Object.keys(pagination).length;

    return (
      <div className="col s12 m12 l9">
        <div className="row">
          <div className="col s12 m8 l8">
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
                    className="btn search-btn waves-effect waves-light"
                    onClick={this.handleSearch}>
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </div>
            </form>

            {nonMembers.length > 0 ? (
              <ul className="collection"> {nonMembers.map(user =>
                <li className="collection-item" key={user.id}>
                  <div>{user.username}
                    <a className=" waves-effect secondary-content"
                      onClick={() => this.addUserToGroup(user.id)}>
                      <i className="material-icons">add</i>
                    </a>
                  </div>
                </li>)}
              </ul>
            ) : (
                <h4 className="no-user center-align"> No Users Found</h4>
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

          <div className="col s12 m4 l4">
            <h4 className="center-align">Group Members({members.length})</h4>
            <ul className="group-members collection">
              {members.map(member =>
                <li className="collection-item" key={member.id}>{member.username}</li>
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
  messages: PropTypes.object.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchUsersFailure: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMembers,
  searchUsers,
  searchUsersFailure,
  addUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GroupMember);
