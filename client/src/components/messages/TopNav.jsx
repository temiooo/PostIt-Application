import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * TopNav component
 * 
 * @param {object} props
 * 
 * @returns {JSX} jsx representation of the component
 */
const TopNav = ({ logout }) => {
  return (
    <div>
      <nav className="teal darken-1">
        <div className="nav-wrapper nav-wrap">
          <Link to="/messageboard" className="brand-logo left">
            <h6 className="logo">
              POST-IT
						</h6>
          </Link>
          <ul className="right">
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
        </div>
      </nav>
    </div>
  );
};

TopNav.propTypes = {
  logout: PropTypes.func
};

export default TopNav;
