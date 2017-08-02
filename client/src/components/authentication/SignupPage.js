import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';
import Banner from '../common/Banner';
import Button from '../common/Button';

class SignupPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      username: '',
      phonenumber: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/user/signup', this.state).then(
      () => {
        browserHistory.push('/messageboard')
      });
  }

  render() {
    return (
      <div>
        <div className="row top-space">
          <Banner />
          <div className="col s12 m6 l6">
            <form className="white col s12 z-depth-5">
  			      <h6 className="center-align link">
                Already a member?
                <Link to="signin">Login</Link>
              </h6>
              <div className="divider"></div>
  				      <div className="row">
        			    <div className="input-field col s12">
                    <i className="material-icons prefix">mail</i>
          				  <input
                    id="email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    />
          				  <label htmlFor="email">Email Address</label>
        			    </div>
      			    </div>
      			    <div className="row">
        			    <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
          				  <input
                    id="username"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}/>
          				  <label htmlFor="username">Username</label>
        			    </div>
      			    </div>
      			    <div className="row">
        			    <div className="input-field col s12">
                    <i className="material-icons prefix">phone</i>
          				  <input
                    id="phone_number"
                    type="tel" 
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.onChange}
                    />
                    <label  htmlFor="phone_number">Phone Number</label>
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
                  onChange={this.onChange}
                  />
          				<label htmlFor="password">Password</label>
        			    </div>
      			    </div>
      			    <div className="row center-align">
      				    <Button 
                    className="btn waves-effect waves-light red lighten-2"
                    onClick={this.onSubmit}
                    >CREATE ACCOUNT
                  </Button>
      			    </div>
			      </form>  
          </div>
			  </div> 
			</div>
    );
  }

}

export default SignupPage;
