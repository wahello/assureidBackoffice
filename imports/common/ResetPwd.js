import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

export default class ResetPwd extends React.Component{
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
    let remail = this.refs.remail.value.trim();
    Accounts.forgotPassword({email:remail},(err) =>{
      if(err){
        this.setState({error: err.reason});
    } else {
        this.setState({error: ''})
    }
    });
  }
    render() {
        return (
            <div className="box-view">
              <div className="login">
                  <h1>Reset Your Password</h1>
                  {this.state.error ? <p>{this.state.error}</p> : undefined}
                  <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                      <input type="remail" ref="remail" name="remail" placeholder="Email"/>
                      <button className="btn">Reset Password</button>
                  </form>
                  <Link to="/">Return to login</Link>
              </div>
            </div>
        );
  }
}
