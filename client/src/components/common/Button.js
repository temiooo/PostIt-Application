import React, {PropTypes} from 'react';

const Button = ({onClick, className, children}) => {
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
	children: PropTypes.string.isRequired
}
export default Button;