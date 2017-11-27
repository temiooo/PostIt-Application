import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, className, text, icon, disabled }) => {
  return (
    <button
      id={text.split(' ').join('-')}
      onClick={onClick}
      className={className}
      type="submit"
      disabled={disabled}>
      {text}
      {icon && <i className="material-icons right">{icon}</i>}
    </button>
  );
};

Button.PropTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  disabled: PropTypes.bool
}
export default Button;
