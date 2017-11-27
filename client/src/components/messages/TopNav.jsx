import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNav = ({ logout }) => {
  return (
    <div>
      <nav className="teal darken-1">
        <div className="nav-wrapper nav-wrap">
          <Link to="/messageboard" className="brand-logo">
            <h6 className="logo">
              POST-IT
						</h6>
          </Link>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {logout ? (
              <li>
                <a id="logout-button" onClick={logout}>Logout</a>
              </li>
            ) : (
                <div>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/">Register</Link>
                  </li>
                </div>
              )}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            {logout ? (
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            ) : (
                <div>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/">Register</Link>
                  </li>
                </div>
              )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

TopNav.propTypes = {
  logout: PropTypes.func
};

export default TopNav;
