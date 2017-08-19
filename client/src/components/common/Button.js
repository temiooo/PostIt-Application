import React, {PropTypes} from 'react';

const Button = ({onClick, className, text, icon, disabled}) => {
	return(
		<button
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
	text: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.bool
}
export default Button;