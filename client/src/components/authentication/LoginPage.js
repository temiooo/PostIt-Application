import React from 'react';
import {Link} from 'react-router';
import Banner from '../common/Banner';
import Button from '../common/Button';

class LoginPage extends React.Component {
	constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
	render() {
		return (
			<div>
        <div className="row top-space">
          <Banner />
					<div className="col s12 m6 l6 top-space">
						<form className="white col s12 z-depth-5">
							<h6 className="center-align link">
								New to Post-It?
								<Link to="/">Create Account</Link>
							</h6>
							<div className="divider"></div>
	
							<div className="row">
        			  <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
          				<input
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}/>
          				<label htmlFor="username">Username</label>
        			  </div>
      			  </div>
							<div className="row">
        			  <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
          				<input
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  />
          				<label htmlFor="password">Password</label>
        			  </div>
      			  </div>
							<div className="row  center-align">
									<Button 
										className="btn waves-effect waves-light red lighten-2"
										>LOGIN
									</Button>
							</div>
							<div className="row  right-align">
								<h6 className="link">
									<a href="#" className="black-text">Forgot Password?</a>
								</h6>
							</div>
						</form>
					</div>
				</div>
			</div>
				);
		}
}

export default LoginPage;