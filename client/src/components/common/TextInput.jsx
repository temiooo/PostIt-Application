import React from 'react';
import PropTypes from 'prop-types';

/**
 * TextInput component
 * 
 * @param {Object} props
 * 
 * @returns {JSX} jsx representation of the component
 */
const TextInput = ({ icon, type, name, value, label, placeholder,
  onChange, error, onBlur, onFocus }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        {icon && <i className="material-icons prefix">{icon}</i>}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <label htmlFor={name}>{label}</label>
        {error && <span className="red-text errors" id={name + "-error"} >{error}</span>}
      </div>
    </div>
  )
};

TextInput.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string
};

export default TextInput;
