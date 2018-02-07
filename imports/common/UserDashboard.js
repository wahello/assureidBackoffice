import React from 'react';
import {Link} from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Mongo} from 'meteor/mongo';
import {Meteor } from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

export default class UserDashboard extends React.Component {
  componentWillMount() {
    if(!$("link[href='/css/common.css']").length > 0){
      var commonCss = document.createElement("link");
      commonCss.type="text/css";
      commonCss.rel ="stylesheet";
      commonCss.href="/css/common.css";
      document.head.append(commonCss);
    }
    if(!$("link[href='/css/user.css']").lenth > 0){
      var userCss = document.createElement("link");
      commonCss.type="text/css";
      commonCss.rel ="stylesheet";
      commonCss.href="/css/user.css";
      document.head.append(userCss);
    }
  }
  componentWillUnmount() {
    $("link[href='/css/common.css']").remove();
    $("link[href='/css/user.css']").remove();
    this.userDataTracker.stop();
  }
    constructor(props){
      super(props);
      var metaContext = {dir: "images" , name: "avatar"}
      var uploader = new Slingshot.Upload("myFileUploads" ,metaContext);
      this.state = {
        upload: uploader,
        isUploading: false,
        progressValue: "0%",
        userData: [],
      };
    }
    calculateProgress(){
      this.uploadComputation = Tracker.autorun(() => {
           const uploadProgress = Math.round(this.state.upload.progress() * 100);
           if (!isNaN(uploadProgress)) this.setState({progressValue: uploadProgress +"%" });
      });
    }

    handleUpload(e) {
      e.preventDefault();
      this.setState({isUploading: true});
      this.calculateProgress();
      var comp = this;
      // console.log(comp);

      this.state.upload.send(document.getElementById('s3file').files[0], function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', error.reason);
          console.error (error);
        }
        else {
          // console.log(comp);
          comp.setState({isUploading:false});
          comp.uploadComputation.stop();
          comp.setState({progressValue:"0%"});
          // console.log(comp.state.isUploading);
          // console.log(comp.state.uploadComputation);
          // console.log(comp.state.progressValue);
          console.log("Success file uploaded! " + downloadUrl);
          Meteor.users.update(Meteor.userId(), {$set: {"profile.image": downloadUrl}});
        }
      });
    }
    onSubmitDel(e){
      e.preventDefault();
      let user = Meteor.users.findOne(Meteor.userId());
      Meteor.call('removePhotoData',{
        image: user.profile.image
      },(err, res) => {
        if(err){
          console.log(user.profile.image);
          console.log("delete error" + err);
        }else {
          console.log('Success file deleted.');
        }
      });

    }
    componentDidMount() {
      var $Menu = $('.Img');
    	$('.Img').mouseenter(function() {
            $('.PopUp').css('opacity', '1');
    		$('.PopUp').css('margin-top', '20px');
      });
  		$('.Img').mouseleave(function() {
          $('.PopUp').css('opacity', '0');
  		$('.PopUp').css('margin-top', '0px');
      });
    	$('.Img').on('click', function() {
    		if($Menu.hasClass('Img')){
    				$('.Img').addClass('click');
    		$('.Img').removeClass('Img');
    				$('.Profile').addClass('clickProfile');
    				$('.Profile').removeClass('Profile');
    				$('.clickPopUp').css('display', 'block');
    				$('.PopUp').css('display', 'none');
    		}else{
    		$('.click').addClass('Img');
    		$('.click').removeClass('click');
    				$('.clickProfile').addClass('Profile');
    				$('.clickProfile').removeClass('clickProfile');
    								$('.clickPopUp').css('display', 'none');
    				$('.PopUp').css('display', 'block');
    			}
    		});
        this.userDataTracker = Tracker.autorun(() => {
          Meteor.subscribe('userData');
          const userData = Meteor.users.find().fetch();
          this.setState({ userData });
        });
    }
    getName(){
      console.log(this.state.userData);
      return this.state.userData.map((user) => {
        return user.profile.fname + " " +user.profile.lname;
      });
    }
    getEmail(){
      return this.state.userData.map((user) => {
        return user.emails[0].address;
      });
    }
    getEmailStatus(){
      return this.state.userData.map((user) => {
        return String(user.emails[0].verified);
      });
    }
    render() {
        return (
            <div id="body">
              <div className="ACon">
                <div className="Profile">
                  <div className="Img">
                    <div className="overlay">
                      <span><img /></span>
                    </div>
                  </div>
                  <div className="PopUp">Open Profile</div>
                  <div className="clickPopUp">
                    <h4>
                    <a className="username" href>{this.getName()}</a>
                    </h4>
                    <h5 className="buttons">
                      <a className="username" href>{this.getEmail()}</a>
                    </h5>
                    <h5 className="buttons">
                      <a className="username" href>Verified {this.getEmailStatus()}</a>
                    </h5>
                    <h5 className="buttons">
                      <button className="btn button--link-text" onClick={() => Accounts.logout()}>Logout</button>
                    </h5>
                    <div className="Social">
                      <svg viewBox="0 0 512 512" id="logo" className="codepen">
                        <path className="box" d="M427 201.9c-0.6-4.2-2.9-8-6.4-10.3L264.2 87.3c-4.9-3.3-11.4-3.3-16.3 0L91.4 191.6c-4 2.7-6.5 7.4-6.5 12.2v104.3c0 4.8 2.5 9.6 6.5 12.2l156.4 104.3c4.9 3.3 11.4 3.3 16.3 0L420.6 320.4c4-2.6 6.6-7.4 6.6-12.2V203.9C427.1 203.2 427.1 202.6 427 201.9 427 201.7 427.1 202.6 427 201.9zM270.7 127.1l115.2 76.8 -51.5 34.4 -63.8-42.7V127.1zM241.3 127.1v68.6l-63.8 42.7 -51.5-34.4L241.3 127.1zM114.3 231.4l36.8 24.6 -36.8 24.6V231.4zM241.3 384.9L126.1 308.1l51.5-34.4 63.8 42.6V384.9zM256 290.8l-52-34.8 52-34.8 52 34.8L256 290.8zM270.7 384.9V316.3l63.8-42.6 51.5 34.4L270.7 384.9zM397.7 280.6l-36.8-24.6 36.8-24.6V280.6z" />
                      </svg>
                      <svg viewBox="0 0 512 512" id="logo">
                        <path className="box" d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z" />
                      </svg>
                      <svg viewBox="0 0 512 512" id="logo">
                        <path d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            // <div>
            //   <h1>Welcome to User dashboard</h1>
            //     <button className="btn button--link-text" onClick={() => Accounts.logout()}>Logout</button>
            //     <div className="widths">
            //       <form  onSubmit={this.handleUpload.bind(this)} noValidate className="boxed-view__form">
            //         <input type="file" id="s3file"/>
            //         {this.state.isUploading?<div className="progress">
            //           <div className="progress-bar" role="progressbar" data-width={this.state.progressValue} aria-valuemin="0" aria-valuemax="100" style={{width:this.state.progressValue} } >
            //              <span className="sr-only">{this.state.progressValue}% Complete</span>
            //           </div>
            //         </div>: <div></div>}
            //         <button className="btn button--link-text">Upload</button>
            //       </form>
            //     </div>
            //     <div className="widths">
            //       <form  onSubmit={this.onSubmitDel.bind(this)} noValidate className="boxed-view__form">
            //         <button className="btn button--link-text">Delete Uploaded file</button>
            //       </form>
            //     </div>
            // </div>
        );
    }
}
