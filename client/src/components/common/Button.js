import React, {PropTypes} from 'react';

const Button = ({onClick, className, children, disabled}) => {
	return(
		<button
			onClick={onClick}
			className={className}
			type="submit">
			{children}
		</button>
	);
};

Button.PropTypes ={
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool
}
export default Button;