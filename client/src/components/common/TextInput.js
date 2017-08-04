import React, { PropTypes } from 'react';

const TextInput = ({icon, type, name, value, label,
	onChange, error }) => {
		return(
			<div className="row">
				<div className="input-field col s12">
					<i className="material-icons prefix">{icon}</i>
						<input
						id={name}
						type={type} 
						name={name}
						value={value}
						onChange={onChange}
						/>
					<label  htmlFor={name}>{label}</label>
					{error && <span className="red-text errors">{error}</span>}
				</div>
			</div>
				)
};

TextInput.propTypes = {
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string
};

export default TextInput;
