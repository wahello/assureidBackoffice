import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component{
  componentWillMount() {
    var commonCss = document.createElement("link");
    commonCss.type="text/css";
    commonCss.rel ="stylesheet";
    commonCss.href="/css/common.css";
    document.head.append(commonCss);
  }
  componentWillUnmount() {
    $("link[href='/css/common.css']").remove();
  }
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        console.log(err);
        this.setState({error: 'Unable to login. Check email and password.'});
      } else {
        this.setState({error: ''});
        
      }
    });
  }
  render(){
    return(
      <div className="box-view">
        <div className="login">
            <h1>Log In</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <p>Need an account? <Link to="/signup">Create an account</Link>
            </p>
            <form onSubmit={this.onSubmit.bind(this)} noValidate onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="email" ref="email" name="email" placeholder="Email"/>
                <input type="password" ref="password" name="password" placeholder="Password"/>
                <button className="btn">Log In</button>
            </form>
            <Link to="/forgotpassword">Forgot password?</Link>
        </div>
      </div>
    );
  }
}
