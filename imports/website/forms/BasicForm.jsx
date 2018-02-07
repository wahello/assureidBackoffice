import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { UserProfile } from './api/userProfile.js';
import { TempProofDocs } from "./api/userProfile.js";

export default class BasicForm extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      "firstName"        : '',
      "lastName"         : '',
      "fatherFirstName"  : '',
      "fatherLastName"   : '',
      "motherFirstName"  : '',
      "motherLastName"   : '',
      "spouseFirstName"  : '',
      "spouseLastName"   : '',
      "gender"           : '',
      "dateofbirth"      : '',
      "mobileNo"         : '',
      "altMobileNo"      : '',
      "emailId"            : '',
      "altEmailId"       : '',
      "proofData" : {},
      "subscription" : { 
        "userData" : Meteor.subscribe("userData",Meteor.userId()),
        "userProfileData" : Meteor.subscribe("userProfileData"),
        "LatestTempProofDocs" : Meteor.subscribe("LatestTempProofDocs"),
      }
    };
   this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  handleChange(event){
   event.preventDefault();
   if($(event.target).parent.hasClass('radio-inline')){
      $(event.target).attr('checked','checked');
      $(event.target).siblings().removeAttr('checked','checked');
   }
   const target = event.target;
   const name   = target.name;
   this.setState({
    [name]: event.target.value,
   });
  }

  componentDidMount(){
    $.validator.addMethod("regx1", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Name should only contain letters & space.");

    $.validator.addMethod("regx2", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Please enter a valid email address.");
    
    $.validator.addMethod("regx3", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "Please enter a valid mobile number.");
       
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
  
    $("#basicForm").validate({
      // debug: true,
      rules: {
        firstName: {
          required: true,
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        lastName: {
          required: true,
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        fatherFirstName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        fatherLastName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        motherFirstName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        motherLastName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        spouseFirstName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        spouseLastName: {
          regx1: /^[A-za-z']+( [A-Za-z']+)*$/,
        },
        mobileNo: {
          required: true,
          regx3: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
        altMobileNo: {
          regx3: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
        emailId: {
          required: true,
          regx2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        },
        altEmailId: {
          regx2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        },
      }  
    });

    this.proofDetailsTracker = Tracker.autorun(()=>{
      var handle = Meteor.subscribe('LatestTempProofDocs');
      if(handle.ready()){
        var proofObj = TempProofDocs.findOne({"userId":Meteor.userId(),"prooftype":'basic'},{sort: {createdAt: -1, limit: 1}});
        // console.log("session proof obj:",proofObj);
        if(proofObj){
          $('.basicProgressDiv').css('display','none');
          Session.set("uploadProofDocProgressPercent","");
          if(proofObj.prooftype == 'basic'){
            $('.selectWidth').css({'marginTop':'-20px','fontSize':'13px','marginBottom':'0px'});
            $('.selectWidth').find('label').css('fontWeight','100');
            $('.fileNameDiv').css('display','none');
            $('.BrowseButton').css({'display':'none','marginTop':'18px'});
            this.setState({
              'proofData': proofObj,
            });
          }
        }
      }
    });      
  }

  inputEffect(event){
    event.preventDefault();
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
      // $('label').not('label.error').removeClass('hidden-lg');
    }else{
      if($('.effect-21').hasClass('error')){
        // $('.form-group').css('marginBottom','20px');
        $(event.target).find('.effect-21.error').addClass('has-content');  
      }else{
        $(event.target).removeClass("has-content");
      }
    }
  }
  
  currentUserDetails(){
    var userDetails = Meteor.users.findOne({"_id":Meteor.userId()});
    // console.log("userDetails: ",userDetails);
    if(userDetails){
      // userDetails.hasContent = 'has-content';
      return userDetails;
    } 
  }
  // latestProofDetails(){
  //   var proofObj = TempProofDocs.findOne({},{sort: {createdAt: -1, limit: 1}});
  //   if(proofObj){
  //     // console.log(proofObj);
  //     return proofObj;
  //   }
  // }
  basicForm(event){
    event.preventDefault();
    if($('#altMobileNo').val()!=''){
      $('#altMobileNo').attr("name","altMobileNo");
    }
    if($('#altEmailId').val()!=''){
      $('#altEmailId').attr("name","altEmailId");             
    }
    if($('#fatherFirstName').val()!='' || $('#fatherLastName').val()!=''){
      $('#fatherFirstName').attr("name","fatherFirstName");             
      $('#fatherLastName').attr("name","fatherLastName");                     
    }
    if($('#motherFirstName').val()!='' || $('#motherLastName').val()!=''){
      $('#motherFirstName').attr("name","motherFirstName");             
      $('#motherLastName').attr("name","motherLastName");                     
    }
    if($('#spouseFirstName').val()!='' || $('#spouseLastName').val()!=''){
      $('#spouseFirstName').attr("name","spouseFirstName");             
      $('#spouseLastName').attr("name","spouseLastName");                     
    }
    
    if($('#basicForm').valid()){
      if($('#errorProofList').hasClass('error')){
        $('#errorProofList').css('fontWeight','700');
        $('.BrowseButton').find('button').focus();
        $('.fileNameDiv').css('border','1px solid #e40b0b');
      }else{
        $('.hideimageLink').css('display','none');
        var formValues = {
          "firstName"       : this.refs.firstName.value,
          "lastName"        : this.refs.lastName.value,
          "fatherFirstName" : this.refs.fatherFirstName.value,
          "fatherLastName"  : this.refs.fatherLastName.value,
          "motherFirstName" : this.refs.motherFirstName.value,
          "motherLastName"  : this.refs.motherLastName.value,
          "spouseFirstName" : this.refs.spouseFirstName.value,
          "spouseLastName"  : this.refs.spouseLastName.value,
          "gender"          : $('input[name=gender]:checked', '#basicForm').val(),
          "dateOfBirth"     : this.refs.dateofbirth.value,
          "mobileNo"        : this.refs.mobileNo.value,
          "altMobileNo"     : this.refs.altMobileNo.value,
          "emailId"         : this.refs.emailId.value,
          "altEmailId"      : this.refs.altEmailId.value,
        }
        
        var getuserProfileData = UserProfile.find({}).fetch();
        if (getuserProfileData) {
          var getuserProfileCount = getuserProfileData.length;
          if (getuserProfileCount == 0) {
            Meteor.call("insertBasicData", formValues, function(error,result){
              if(error){
                console.log(error.reason);
              }else{
                swal("Done","Basic Information updated successfully!"); 
                // $('#firstName').val(""); 
                // $('#lastName').val(""); 
                // $('#fatherFirstName').val(""); 
                // $('#fatherLastName').val(""); 
                // $('#motherFirstName').val(""); 
                // $('#motherLastName').val(""); 
                // $('#spouseFirstNa').val(""); 
                // $('#spouseLastName').val(""); 
                // $('#gender').val(""); 
                // $('#dateOfBirth').val(""); 
                // $('#mobileNo').val(""); 
                // $('#altMobileNo').val(""); 
                // $('#emailId').val(""); 
                // $('#altEmailId').val(""); 
              }
            });  
          }else{
            var userProfileObj = UserProfile.findOne({"userId" : Meteor.userId()});
            if (userProfileObj) {
              var getuserId = userProfileObj.userId;
               Meteor.call("updateBasicData",getuserId,formValues, function(error,result){
                if(error){
                  console.log(error.reason);
                }else{
                  swal("Done","Basic Information updated successfully!");   
                }
              });  
            }
          }
          $('html, body').animate({
            'scrollTop' : $(".profileBody").position().top
          });
          // $("html,body").scrollTop(0);
          $('#home').removeClass('in active');
          $('.home').removeClass('active');
          $('#menu4').addClass('in active');
          $('.menu4').addClass('active');
        }
      }
    }else{
      // console.log("false");
      $(event.target).find('.effect-21.error').addClass('has-content');
      // $('.form-group').css('marginBottom','20px');
    }
  }

  inputFileChange(event){
    event.preventDefault();
    $(event.target).siblings('.inputFiles').click();
  }
  uploadProofDocs(event){
    event.preventDefault();
    var proofSubtype = '';
    let self = this; 
     // this.setState({isUploading: true});
     //  this.calculateProgress();
    Session.set("uploadProofDocProgressPercent","");
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      // console.log("file",file);
      var userId = Meteor.userId();
      // console.log("userId",userId);
      if (file) {
        var fileName = file.name;
        var fileSize = file.size;
        var size = 2000000;
        var prooftype = "basic";
        var ext = fileName.split('.').pop();
        $('.selectWidth').css({'marginTop':'-20px','fontSize':'13px','marginBottom':'0px'});
        $('.selectWidth').find('label').css('fontWeight','100');
        $('.fileNameDiv').css({'display':'block','marginTop':'1px','marginBottom':'0px'});
        $('.fileNameDiv').siblings('.nopadLeft').css('marginTop','0px');
        $('.fileNameDiv').find('label').html(file.name);
        if(ext=="pdf" || ext=="jpg" || ext=="png" || ext=="jpeg"){
          if(fileSize < size){
            $('#errorProofList').removeClass('error');
            $('#errorProofList').html('');
            $('.fileNameDiv').css('border','0px');
            addProofToS3Function(userId,file,prooftype,proofSubtype,self);   
            $(event.target).parent().siblings('.basicProgressDiv').css('display','block');
          }else{
            $(event.target).parent().siblings('.basicProgressDiv').css('display','block');
            $('#errorProofList').addClass('error');
            $('#errorProofList').html('<p>Document size should not exceed file size limit 2MB.</p>');
            $('#errorProofList').css({'color':'#e40b0b','fontSize':'13px'});
          } 
        }else{
          $(event.target).parent().siblings('.basicProgressDiv').css('display','block');
          $('#errorProofList').addClass('error');
          $('#errorProofList').html('<p>Only jpg, png, pdf format is supported.</p>');
          $('#errorProofList').css({'color':'#e40b0b','fontSize':'13px'});
        }
      }
    }
  }
  removeProofDocs(event){
    event.preventDefault();
    if(this.state.proofData.imageLink){
      var imgLink = $(event.target).attr('data-value');
      Meteor.call("removeTempProofDocs",imgLink,(error, result)=>{
        // swal({
        //   position: 'top-right',
        //   type: 'success',
        //   title: 'Deleted Successfully',
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.setState({
          'proofData': '',
        });
        $('.selectWidth').css({'marginTop':'15px','fontSize':'14px'});
        $('.selectWidth').find('label').css('fontWeight','700');
        $('.BrowseButton').css('display','block');
      });
    }
  }
  getUploadImagePercentage(){
    var uploadProgressPercent = Session.get("uploadProofDocProgressPercent");
    if(uploadProgressPercent){
        var percentVal = parseInt(uploadProgressPercent);
        if(percentVal){
            
            var styleC = {
                width:percentVal + "%",
                display:"block",
            }
            var styleCBar = {
                display:"block",
                marginTop:5,
            }
        }
        if(!percentVal){
            var percentVal = 0;

            var styleC = {
                width:0 + "%",
                display:"none",
            }
            var styleCBar = {
                display:"none",
                marginTop:5,
            }
        }

        return (
          <div className="progress"  style= {styleCBar}>
            <div className="progress-bar progress-bar-striped active" role="progressbar"
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
              {percentVal} %
            </div>
          </div>
        );
    }
  }

  render(){
    return (
      <form className="basicForm" id="basicForm" onSubmit={this.basicForm.bind(this)}>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs has-content" id="firstName" name="firstName" ref="firstName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} value={this.currentUserDetails() ? this.currentUserDetails().profile.firstname : ""}/>
            <label>First Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs has-content" id="lastName" name="lastName" ref="lastName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} value={this.currentUserDetails() ? this.currentUserDetails().profile.lastname : ""}/>
            <label>Last Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="fatherFirstName" ref="fatherFirstName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Father First Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="fatherLastName" ref="fatherLastName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Father Last Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="motherFirstName" ref="motherFirstName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Mother First Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="motherLastName" ref="motherLastName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Mother Last Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="spouseFirstName" ref="spouseFirstName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Spouse First Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="spouseLastName" ref="spouseLastName"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Spouse Last Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-group">
              {/*<span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>*/}
              <label style={{marginRight: "15"+"px"}}>Gender</label>
              <label className="radio-inline"><input type="radio" name="gender" value="female" ref="gender"  onChange={this.handleChange}  checked="checked"/>Female</label>
              <label className="radio-inline"><input type="radio" name="gender" value="male"  ref="gender"  onChange={this.handleChange} />Male</label>
              <label className="radio-inline"><input type="radio" name="gender" value="other"  ref="gender"   onChange={this.handleChange} />Other</label>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
              <input type="date" className="effect-21 form-control loginInputs required" id="dateofbirth" name="dateofbirth"  ref="dateofbirth"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label className="">Date of Birth</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-4 col-md-3 col-sm-4 col-xs-4 selectWidth">
            <div className="input-effect input-group">
              <label className="">Proof of Date of Birth</label>&nbsp;&nbsp;
              <i className="fa fa-question-circle-o proQuestion" aria-hidden="true" data-toggle="modal" data-target="#proofInfoModal"></i>
            </div>
          </div>
          <div className="form-group col-lg-4 col-md-3 col-sm-4 col-xs-4 fileNameDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="form-group col-lg-2 col-md-3 col-sm-4 col-xs-4 nopadLeft BrowseButton">
            <input type="file" className="btn btn-info inputFiles" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right proofDocsProgress basicProgressDiv" style={{display: "none"}}>
            <div id="errorProofList"></div>
            {this.getUploadImagePercentage()}
          </div>
          { 
            this.state.proofData.imageLink ?
              this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right hideimageLink" style={{height: "200"+"px"}}>
                  <a href={this.state.proofData.imageLink} target="_blank"><img src={this.state.proofData.imageLink} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.imageLink}></i>
                </div>
              :
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right hideimageLink">
                <a href={this.state.proofData.imageLink} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.imageLink}></i>
              </div>
            :
            ""
          }
           
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-phone-square" aria-hidden="true"></i></span>
            <input type="number" className="effect-21 form-control loginInputs has-content required" id="mobileNo" name="mobileNo" ref="mobileNo" onBlur={this.inputEffect.bind(this)} value={this.currentUserDetails() ? this.currentUserDetails().profile.mobNumber : ""}/>
            <label>Phone No.</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-phone-square" aria-hidden="true"></i></span>
            <input type="number" className="effect-21 form-control loginInputs" id="altMobileNo" ref="altMobileNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Alternate Phone No.</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            <input type="email" className="effect-21 form-control loginInputs has-content" id="emailId" name="emailId" ref="emailId" aria-label="Email Id" onBlur={this.inputEffect.bind(this)} value={this.currentUserDetails() ? this.currentUserDetails().username : ""} id="emailId" />
            <label>Email Id</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            <input type="email" className="effect-21 form-control loginInputs" id="altEmailId" ref="altEmailId" aria-label="Email Id" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} id="altEmailId" />
            <label>Alternate Email Id</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-info pull-right">Save</button>
        
        <div className="modal fade proofInfoModals" id="proofInfoModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <div className="logoWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center noProfilePadding">
                    <img src="../images/AssureIDlogo.png" className="loginPageLogo"  alt="AssureID logo"/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5><b>What are applicable proof for Date of Birth? Use any one.</b></h5>
                    <ul>
                      <li><i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span>Birth Certificate</span></li>
                      <li><i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span>Aadhar Card</span></li>
                      <li><i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span>School Leaving Certificate</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>     
      </form>
    );
  }
}