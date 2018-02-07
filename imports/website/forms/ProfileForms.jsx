import React, { Component }  from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import BasicForm from './BasicForm.jsx';
import AddressForm from './AddressForm.jsx';
import EducationForm from './EducationForm.jsx';
import ProfessionalEduForm from './ProfessionalEduForm.jsx';
import WorkForm from './WorkForm.jsx';
import StatutoryForm from './StatutoryForm.jsx';
import NewsFeed from '../news/NewsFeed.jsx';
import ListAcademics from './ListAcademics.jsx';
import ListEmploymentInfo from './ListEmploymentInfo.jsx';
import ListAddress from './ListAddress.jsx';
import OtherInfoForm from './OtherInfoForm.jsx';
import ProfileView from '../views/ProfileView.jsx';
import { UserProfile } from './api/userProfile.js';

class ProfileForms extends TrackerReact(Component){
  constructor(){
    super(); 
    this.state ={ 
      'firstname'   : '',
      'lastname'    : '',
      'userProfile' : '',
      "subscription" : {
        "userData" : Meteor.subscribe("userData"),      
        "userprofile" : Meteor.subscribe("userprofile"),      
      } 
    }
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.usersDetails){
         this.setState({
             firstname           : nextProps.usersDetails.profile.firstname,
             lastname            : nextProps.usersDetails.profile.lastname,
             userProfile         : nextProps.usersDetails.profile.userProfile,
             id                  : nextProps.usersDetails._id,
         });
      }
    }else{
      this.setState({
             firstname      : '',
             lastname       : '',
             userProfile    : '',
             id             : '',
      });
    }
  }
  inputFileChange(event){
    event.preventDefault();
    if($(event.target).hasClass('inputFileSpan')){
      // console.log('true');
      $(event.target).removeClass('inputFileSpan');
      $(event.target).parent().parent().siblings('.inputFiles').click();
    }else{
      $('.fa-plus-circle').addClass('inputFileSpan');
      $(event.target).siblings('.inputFiles').click();
    }
  } 
  uploadProfileImg(event){
      event.preventDefault();
      let self = this; 
       this.setState({isUploading: true});
       //  this.calculateProgress();
      if (event.currentTarget.files && event.currentTarget.files[0]) {
          var file = event.currentTarget.files[0];
          // console.log("file",file);
          var userId = Meteor.userId();
          // console.log("userId",userId);
          if (file) {
              addUserToS3Function(userId,file,self);
          }
      }
  }

  homeActive(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#home').addClass('in active');
    $('.home').addClass('active');
  }
  menu4Active(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#menu4').addClass('in active');
    $('.menu4').addClass('active');
  }
  menu1Active(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#menu1').addClass('in active');
    $('.menu1').addClass('active');
  }
  menu2Active(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#menu2').addClass('in active');
    $('.menu2').addClass('active');
  }
  menu3Active(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#menu3').addClass('in active');
    $('.menu3').addClass('active');
  }
  nocontentActive(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#nocontent').addClass('in active');
    $('.nocontent').addClass('active');
  }
  menu5Active(event){
    event.preventDefault();
    $('.pillsContent').find('.active').removeClass('in active');
    $('#menu5').addClass('in active');
    $('.menu5').addClass('active');
  }
  

  render(){
    if(Meteor.userId())
    return(
      <div className="profileForms">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileFormsHead">
          <div className="profileHead">
            <div className="color-overlay"></div>
            <div className="proHeadContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {/*<img src="../images/assureid/testimonials1.jpg" className="img-circle"/>*/}
              { this.state.userProfile ? 
                <div>
                  <input type="file" className="btn btn-info inputFiles"/>  
                  <div className="addUserImage addUserImage1">
                    <img src={this.state.userProfile} className="img-circle userPrfileImg"/>
                  </div>
                </div>               
                :          
                <div>
                  <input type="file" onChange={this.uploadProfileImg.bind(this)} className="btn btn-info inputFiles"/>  
                  <div className="addUserImage" onClick={this.inputFileChange.bind(this)}>
                    <span><i onClick={this.inputFileChange.bind(this)} className="fa fa-plus-circle fa-lg inputFileSpan"></i><br/>Add Photo</span>
                  </div>
                </div>
              }
              <h4 className=""><b>{this.state.firstname} {this.state.lastname}</b></h4>
              <h5>AssureID MHP1234567IN</h5>
              <div className="proheadNavTitle col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ul>
                  <li><a><h5 className="fancy_title1">
                    <span className="charBas1">B</span>
                    <span className="charBas2">a</span>  
                    <span className="charBas3">s</span>
                    <span className="charBas4">i</span>
                    <span className="charBas5">c</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title2">
                    <span className="charIdn1">I</span>
                    <span className="charIdn2">d</span>
                    <span className="charIdn3">e</span>
                    <span className="charIdn4">n</span>
                    <span className="charIdn5">t</span>
                    <span className="charIdn6">i</span>
                    <span className="charIdn7">t</span>
                    <span className="charIdn8">y</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title3">
                    <span className="charAdd1">A</span>
                    <span className="charAdd2">d</span>
                    <span className="charAdd3">d</span>
                    <span className="charAdd4">r</span>
                    <span className="charAdd5">e</span>
                    <span className="charAdd6">s</span>
                    <span className="charAdd7">s</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title4">
                    <span className="charAca1">A</span>
                    <span className="charAca2">c</span>
                    <span className="charAca3">a</span>
                    <span className="charAca4">d</span>
                    <span className="charAca5">e</span>
                    <span className="charAca6">m</span>
                    <span className="charAca7">i</span>
                    <span className="charAca8">c</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title5">
                    <span className="charEmp1">E</span>
                    <span className="charEmp2">m</span>
                    <span className="charEmp3">p</span>
                    <span className="charEmp4">l</span>
                    <span className="charEmp5">o</span>
                    <span className="charEmp6">y</span>
                    <span className="charEmp7">m</span>
                    <span className="charEmp8">e</span>
                    <span className="charEmp9">n</span>
                    <span className="charEmp10">t</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title6">
                    <span className="charCer1">C</span>
                    <span className="charCer2">e</span>
                    <span className="charCer3">r</span>
                    <span className="charCer4">t</span>
                    <span className="charCer5">i</span>
                    <span className="charCer6">f</span>
                    <span className="charCer7">i</span>
                    <span className="charCer8">c</span>
                    <span className="charCer9">a</span>
                    <span className="charCer10">t</span>
                    <span className="charCer11">i</span>
                    <span className="charCer12">o</span>
                    <span className="charCer13">n</span>
                  </h5></a></li>
                  <li><a><h5 className="fancy_title7">
                    <span className="charOth1">O</span>
                    <span className="charOth2">t</span>
                    <span className="charOth3">h</span>
                    <span className="charOth4">e</span>
                    <span className="charOth5">r</span>
                  </h5></a></li>
                </ul>
              </div>
              <div className="proheadNav col-lg-6 col-md-12 col-sm-12 col-xs-12">
                {/*<hr/>*/}
                <div className="progress">
                  <div className="progress-bar progress-bar-striped" role="progressbar"
                  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:40+'%'}}>
                  </div>
                </div>
                <ul className="nav nav-pills pillsContent">
                  <li className="home" onClick={this.homeActive.bind(this)}><a data-toggle="pill" href="#home" className="smallFaPills"><i className="fa fa-user"></i></a></li>
                  <li className="menu4" onClick={this.menu4Active.bind(this)}><a data-toggle="pill" href="#menu4" className="incompleteDetails largeFaPills"><i className="fa fa-id-card"></i></a></li>
                  <li className="menu1" onClick={this.menu1Active.bind(this)}><a data-toggle="pill" href="#menu1" className="halfcompleteDetails smallFaPills"><i className="fa fa-map-marker"></i></a></li>
                  {/*<li><a data-toggle="pill" href="#menu1" className="halfcompleteDetails"><i className="fa fa-map-marker"></i></a></li>*/}
                  <li className="menu2" onClick={this.menu2Active.bind(this)}><a data-toggle="pill" href="#menu2" className="largeFaPills"><i className="fa fa-graduation-cap"></i></a></li>
                  <li className="menu3" onClick={this.menu3Active.bind(this)}><a data-toggle="pill" href="#menu3" className="incompleteDetails mediumFaPills"><i className="fa fa-briefcase"></i></a></li>
                  <li className="nocontent" onClick={this.nocontentActive.bind(this)}><a data-toggle="pill" href="#nocontent" className="incompleteDetails mediumFaPills"><i className="fa fa-certificate"></i></a></li>
                  <li className="menu5" onClick={this.menu5Active.bind(this)}><a data-toggle="pill" href="#menu5" className="incompleteDetails mediumFaPills"><i className="fa fa-file-o"></i></a></li>
                </ul>
              </div>
              <div className="col-lg-4 headProgressNav">
                <h5>Your profile is 40% completed</h5>
                {/*<div className="progress">
                  <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
                  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:75+'%'}}>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileBody"> 
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileBodyMenu">
              <h4 className="">Menu</h4>
              <hr className="profileMenuHR" style={{width: 21+'%'}}/>
              <ul className="nav nav-pills pillsContent">
                <li className="active col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight home" onClick={this.homeActive.bind(this)}>
                  <a data-toggle="pill" href="#home" className="noProfilePadding">
                    <i className="fa fa-user col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Basic Information
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu4" onClick={this.menu4Active.bind(this)}>
                  <a data-toggle="pill" href="#menu4" className="noProfilePadding">
                    <i className="fa fa-id-card col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Identity Information
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu1" onClick={this.menu1Active.bind(this)}>
                  <a data-toggle="pill" href="#menu1" className="noProfilePadding">
                    <i className="fa fa-map-marker col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Address Information
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu2" onClick={this.menu2Active.bind(this)}>
                  <a data-toggle="pill" href="#menu2" className="noProfilePadding">
                    <i className="fa fa-graduation-cap col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Academic Infomation
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu3" onClick={this.menu3Active.bind(this)}>
                  <a data-toggle="pill" href="#menu3" className="noProfilePadding">
                    <i className="fa fa-briefcase col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Employment Infomation
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight nocontent" onClick={this.nocontentActive.bind(this)}>
                  <a data-toggle="pill" href="#nocontent" className="noProfilePadding">
                    <i className="fa fa-certificate col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Skills & Certification Infomation
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu5" onClick={this.menu5Active.bind(this)}>
                  <a data-toggle="pill" href="#menu5" className="noProfilePadding">
                    <i className="fa fa-file-o col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">Other Infomation
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
                <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadRight menu6">
                  <a data-toggle="pill" href="#menu6" className="noProfilePadding">
                    <i className="fa fa-file-o col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding"></i>
                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 noProfilePadding">View
                      <hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>       
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileBodyContent">
              <div className="tab-content">
                <div id="home" className="tab-pane fade in active">
                  <h4 className="">Basic Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <BasicForm />
                </div>
                <div id="menu4" className="tab-pane fade">
                  <h4 className="">Identity Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <StatutoryForm />
                </div>
                <div id="menu1" className="tab-pane fade">
                  <h4 className="">Address Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <AddressForm />
                  <hr className="listAcademicsHR col-lg-11 col-md-12 col-sm-12 col-xs-12"/>
                  <ListAddress/>
                </div>
                <div id="menu2" className="tab-pane fade">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                    <h4 className="">Academic Infomation</h4>
                    <hr className="profileMenuHR"/>
                    <EducationForm />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                    <h4 className="">Professional Qualification Infomation [Only in case of IIT, CA, ICWAI, CS, MBBS etc]</h4>
                    <hr className="profileMenuHR"/>
                    <ProfessionalEduForm />
                  </div>
                  <hr className="listAcademicsHR col-lg-11 col-md-12 col-sm-12 col-xs-12"/>
                  <ListAcademics/>
                </div>
                <div id="menu3" className="tab-pane fade">
                  <h4 className="">Employment Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <WorkForm />  
                  <hr className="listAcademicsHR col-lg-11 col-md-12 col-sm-12 col-xs-12"/>
                  <ListEmploymentInfo/>
                </div>
                <div id="nocontent" className="tab-pane fade">
                  <h4 className="">Skills & Certification Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <p>No form available</p>
                </div>
                <div id="menu5" className="tab-pane fade">
                  <h4 className="">Other Infomation</h4>
                  <hr className="profileMenuHR"/>
                  <OtherInfoForm/>
                </div>
                <div id="menu6" className="tab-pane fade">
                  <h4 className="">Background</h4>
                  <hr className="profileMenuHR"/>
                  <ProfileView/>
                </div>  
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileBodyNews">
              <h4 className="">News Feed</h4>
              <hr className="profileMenuHR" style={{width: 38+'%'}}/>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proNewsBlock">
                <NewsFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditPageContainer = withTracker(({props}) => {
    const postHandle = Meteor.subscribe('userData',Meteor.userId());
    var _id = Meteor.userId();
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const usersDetails  = Meteor.users.findOne({"_id":_id})|| {};
    const loading       = !postHandle.ready();
    
    if(_id){
      return {
          loading,
          usersDetails,
      };
    }
})(ProfileForms);

export default EditPageContainer;