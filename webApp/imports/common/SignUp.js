import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

export default class SignUp extends React.Component {
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
      let fname = this.refs.ffname.value.trim();
      let lname = this.refs.llname.value.trim();
      let email = this.refs.eemail.value.trim();
      let password = this.refs.ppassword.value.trim();
      if (password.length < 5) {
          return this.setState({error: 'Password must be at least 6 characters.'})
      }
      Accounts.createUser({email, password, profile:{fname,lname}  }, (err) => {
          if (err) {
              this.setState({error: err.reason});
              console.log(err.reason);
          } else {
              this.setState({error: ''})
              Meteor.call('add-Role',{
                role: 'Recruiter'
              }, (err, res) => {
                if(err){
                  console.log(err);
                }else {
                  console.log('Success Recruiter role added');
                }
              });
          }
      });
}
    render() {
        return (
            <div className="box-view">
                <div className="login">
                    <h1>Company SignUp</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="text" ref="ffname" name="fname" placeholder="Company Name"/>
                        <input type="text" ref="llname" name="lname" placeholder="Industry Class"/>
                        <input type="email" ref="eemail" name="email" placeholder="Email"/>
                        <input type="password" ref="ppassword" name="password" placeholder="Password"/>
                        <button className="btn">Create Account</button>
                    </form>

                    <Link to="/">Have an account?</Link>
                </div>
            </div>

        );
    }
}
