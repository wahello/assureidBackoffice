import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignUp from './SignUp.jsx';
import OTPModal from '../permissionModals/OTPModal.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import {Router, Route, browserHistory} from 'react-router';

export default class LogIn extends TrackerReact(React.Component) {
  componentDidMount() {
    $("#login").validate();
    $("body").removeClass('adminLte');
    
  }
	showSignUp(event){
		event.preventDefault();
		$('#outerLoginWrapper').hide();
    $('#outerSignUpWrapper').show();
    $('.modalContent').addClass('addModalHeight');
	}
  showForgotModal(event){
    event.preventDefault();
    $('#outerLoginWrapper').hide();
    $('#ForgotBlock').show();
  }
  userlogin(event){
    event.preventDefault();

    var email       = this.refs.loginusername.value;
    var passwordVar = this.refs.loginPassword.value;  

    Meteor.call('checkEmailVerification', email, function(error,data){
      console.lo
      if (data == "verified"){
        
        Meteor.call('checkBlockedUser', email, function(error,data){
          
          if (data == "Active"){
            console.log("email,password:"+email,passwordVar);
            Meteor.loginWithPassword(email, passwordVar, function(error) {
              if (error) {
                
                return swal({
                  title: "Either email or password is incorrect",
                  text: "Please try again",
                  timer: 3000,
                  showConfirmButton: false,
                  type: "error"
                });
              }
              //  else {
              //   if(Roles.userIsInRole(Meteor.userId(),['admin','superAdmin','screening committee','team leader','team member','field expert','quality team member','quality team leader'])) {
              //     // FlowRouter.go('/adminDashboard');
              //     $('#loginModal').modal('hide');
              //     $('.modal-backdrop').hide();
              //     browserHistory.replace('/admin/dashboard');
              //   }else{
              //     $('#loginModal').modal('hide');
              //     $('.modal-backdrop').hide();
              //     browserHistory.replace('/');
              //     // swal({
              //     //   title: 'Welcome to ASSUREiD!!',
              //     //   text: 'Your Parking Assistant.',
              //     //   imageUrl: '/images/spotyl.png',
              //     //   imageWidth: 400,
              //     //   imageHeight: 200,
              //     //   animation: false,
              //     //   customClass: 'animated wobble',
              //     // });
              //   }
              // }
            });
          }else if(data == "Blocked"){
            swal({
              title: "Your profile is blocked",
              text: "Please contact with Admin",
              timer: 3000,
              showConfirmButton: false,
              type: "error"
            });
          }else{
            swal({
              title: "Either email or password is incorrect",
              text: "Please try again",
              timer: 3000,
              showConfirmButton: false,
              type: "error"
            });
          }
        });  
      }else if(data == "unverified"){
        swal({
          title: "Your Account is not verified",
          // timer: 10000,
          text: "Please click on 'OK' button to verify now",
          showConfirmButton: true,
          type: "error"
        });
        $('#outerLoginWrapper').hide();
        $('#OtpBlock').show();
      }else{
        swal({
          title: "Username does not exist",
          text: "Please create an account",
          timer: 3000,
          showConfirmButton: false,
          type: "error"
        });
      }
      $("html,body").scrollTop(0);
    });
    return false;       
  }

  inputEffect(event){
    event.preventDefault();
    // alert('hi');
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      $(event.target).removeClass("has-content");
    }
  }

	render() {
    return (
    	<div>
  	   <div className="modal fade in" id="loginModal" role="dialog">
          <div className="modal-dialog modal-md">
            <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 modalContent"> 
              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerLoginWrapper" id="outerLoginWrapper">
                    <div className="logoWrapper col-lg-6 col-lg-offset-3 col-md-12 col-md-offset-4 col-sm-12 col-sm-offset-4 col-xs-4 col-xs-offset-4">
                      <img src="../images/AssureIDlogo.png" className="loginPageLogo"  alt="AssureID logo"/>
                      <h2>Sign In</h2>
                    </div>
                    <div className="FormWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <form className="" id="login" onSubmit={this.userlogin.bind(this)}>
                        <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="input-effect input-group">
                            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                            <input type="text" className="effect-21 form-control loginInputs" ref="loginusername" name="loginusername" onBlur={this.inputEffect.bind(this)} aria-label="Username" aria-describedby="basic-addon1" required/>
                            <label>Username</label>
                            <span className="focus-border">
                              <i></i>
                            </span>
                          </div>
                        </div> 
                        <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="input-effect input-group">
                            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                            <input type="password" className="effect-21 form-control loginInputs" ref="loginPassword" name="loginPassword" onBlur={this.inputEffect.bind(this)} aria-label="Username" aria-describedby="basic-addon1" required/>
                            <label>Password</label>
                            <span className="focus-border">
                              <i></i>
                            </span>
                          </div>
                        </div>  
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 keepmeloginOuter"> 
                         <input type="checkbox" name="" value=""/> Keep me Signed In
                        </div>
                        <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                         <button type="submit" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn">Sign In</button>
                        </div>
                      </form>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bottomLiksOuter">
                        <div className="text-left col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadLeft ">
                          <a href="#" className="bottomLinks" onClick={this.showSignUp.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i> Sign Up</a>
                        </div>
                        <div className="text-right col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadRight">
                          <a href="#" className="bottomLinks" onClick={this.showForgotModal.bind(this)}>Forgot Password ?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <SignUp />
                  {/* <OTPModal /> */}
                  <ForgotPassword />
              </div>
             
            </div>
          </div>
        </div>
    	</div>
    );
  }
}
