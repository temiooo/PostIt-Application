import React, {PropTypes} from 'react';

const Button = ({onClick, className, text, icon}) => {
	return(
		<button
			onClick={onClick}
			className={className}
			type="submit">
			{text}
			{icon && <i className="material-icons right">{icon}</i>}
		</button>
	);
};

Button.PropTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	text: PropTypes.string.isRequired,
	icon: PropTypes.string
}
export default Button;