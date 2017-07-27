import React from 'react';
import {Link} from 'react-router';

class Signin extends React.Component {
    render() {
        return (
			<div>
                <h1>Signin Page</h1>
			    <Link to="/">Signup</Link>
			</div>
        );
    }
}

export default Signin;