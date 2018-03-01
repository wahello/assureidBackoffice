import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { TempProofDocs } from "./api/userProfile.js";

export default class StatutoryForm extends React.Component{
  constructor(){
    super();
    this.state ={
      "adharCardNo"   :  '', 
      "panCardNo"     :  '',
      "drivingCardNo" :  '',
      "votingCardNo"  :  '', 
      "rationCardNo"  :  '',
      "passportNo"    :  '',
      "proofData" : {},      
      "subscription" : {
        "userProfileData" : Meteor.subscribe("userProfileData"),
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

   const target = event.target;
   const name   = target.name;
   this.setState({
    [name]: event.target.value,
   });
  }

  inputEffect(event){
    event.preventDefault();
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      if($('.effect-21').hasClass('error')){
        $(event.target).find('.effect-21.error').addClass('has-content');  
      }else{
        $(event.target).removeClass("has-content");
      }
    }
  }

  inputFileChange(event){
    event.preventDefault();
    $(event.target).siblings('.inputFiles').click();
  }

  handleStatutorySubmit(event){
    // if($('#identityForm').valid()){
      event.preventDefault();
      $('.proofLinkDiv').css('display','none');
      var adharCardNo         = this.refs.adharCardNo.value;
      var panCardNo           = this.refs.panCardNo.value;
      var drivingCardNo       = this.refs.drivingCardNo.value;
      var votingCardNo        = this.refs.votingCardNo.value;   
      var rationCardNo        = this.refs.rationCardNo.value;
      var passportNo          = this.refs.passportNo.value;
      var id                  = Meteor.userId();
      Meteor.call('insertStatutory',id,adharCardNo,panCardNo,drivingCardNo,votingCardNo,rationCardNo,passportNo,function (error,result) {
        if (error) {
          console.log(error.reason);
        }else{
          swal("Done","Statutory Information updated successfully!","success");   
        }
      });
      $('html, body').animate({
        'scrollTop' : $(".profileBody").position().top
      });
      $('#menu4').removeClass('in active');
      $('.menu4').removeClass('active');
      $('#menu1').addClass('in active');
      $('.menu1').addClass('active');
    // }else{
    //   $(event.target).find('.effect-21.error').addClass('has-content');
    // }
  }

  componentDidMount(){       
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
  
    $("#identityForm").validate({
      
    });

    this.proofDetailsTracker = Tracker.autorun(()=>{
      var handle = Meteor.subscribe('TempProofDocs');
      if(handle.ready()){
        var proofObj = TempProofDocs.findOne({"userId":Meteor.userId(),'prooftype':'identity'}, {sort: {createdAt: -1, limit: 1}});
        // console.log("session proof obj:",proofObj);
        if(proofObj){
          $('.browseButton').css('display','block');
          $('.backViewInput').css('display','none');
          $('.identityProofPro').css('display','none');
          Session.set("uploadProofDocProgressPercent","");
          if(proofObj.aadhar1){
            $('.aadhar .browseButton').css('display','none');
            $('.aadhar .backViewInput').css('display','block');
          } 
          if(proofObj.aadhar2 && proofObj.aadhar1){
            $('.aadhar .browseButton').css('display','none');
            $('.aadhar .backViewInput').css('display','none');
          }
          if(proofObj.pan1){
            $('.pan .browseButton').css('display','none');
            $('.pan .backViewInput').css('display','block');
          }
          if(proofObj.pan2 && proofObj.pan1){
            $('.pan .browseButton').css('display','none');
            $('.pan .backViewInput').css('display','none');
          }
          if(proofObj.driving1){
            $('.driving .browseButton').css('display','none');
            $('.driving .backViewInput').css('display','block');
          }
          if(proofObj.driving2 && proofObj.driving1){
            $('.driving .browseButton').css('display','none');
            $('.driving .backViewInput').css('display','none');
          }
          if(proofObj.ration1){
            $('.ration .browseButton').css('display','none');
            $('.ration .backViewInput').css('display','block');
          }
          if(proofObj.ration2 && proofObj.ration1){
            $('.ration .browseButton').css('display','none');
            $('.ration .backViewInput').css('display','none');
          }
          if(proofObj.passport1){
            $('.passport .browseButton').css('display','none');
            $('.passport .backViewInput').css('display','block');
          }
          if(proofObj.passport2 && proofObj.passport1){
            $('.passport .browseButton').css('display','none');
            $('.passport .backViewInput').css('display','none');
          }
          if(proofObj.voting1){
            $('.voting .browseButton').css('display','none');
            $('.voting .backViewInput').css('display','block');
          }
          if(proofObj.voting2 && proofObj.voting1){
            $('.voting .browseButton').css('display','none');
            $('.voting .backViewInput').css('display','none');
          }
          if(proofObj.prooftype == 'identity'){
            $('.FileDiv').css('display','none');
            this.setState({
              'proofData': proofObj,
            });
          }
        }
      }
    });
  }

  uploadProofDocs(event){
    event.preventDefault();
    var proofSubtype = $(event.target).attr('data-subtype');
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
        var prooftype = 'identity';
        var ext = fileName.split('.').pop();
        $(event.target).parent().siblings('.FileDiv').css('display','block');
        $(event.target).parent().siblings('.FileDiv').find('label').html(file.name);
        if(ext=="pdf" || ext=="jpg" || ext=="png" || ext=="jpeg"){
          if(fileSize < size){
            $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').removeClass('error');
            $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').html('');
            $(event.target).parent().siblings('.FileDiv').css('border','0px');
            $(event.target).parent().siblings('.identityProofPro').css('display','block');
            addProofToS3Function(userId,file,prooftype,proofSubtype,self);   
          }else{
            $(event.target).parent().siblings('.identityProofPro').css('display','block');
            $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').addClass('error');
            $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').html('<p>Document size should not exceed file size limit 2MB.</p>');
            $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').css({'color':'#e40b0b','fontSize':'13px'});
          } 
        }else{
          $(event.target).parent().siblings('.identityProofPro').css('display','block');
          $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').addClass('error');
          $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').html('<p>Only jpg, png, pdf format is supported.</p>');
          $(event.target).parent().siblings('.identityProofPro').find('#identyErrorList').css({'color':'#e40b0b','fontSize':'13px'});
        }
      }
    }
  }
  removeProofDocs(event){
    event.preventDefault();
    var imgLink = $(event.target).attr('data-value');
    var subtype = $(event.target).attr('data-subtype');
    Meteor.call("removeTempIdentyDocs",imgLink,subtype,(error, result)=>{
      // swal({
      //   position: 'top-right',
      //   type: 'success',
      //   title: 'Deleted Successfully',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
    });
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
    return(
      <form className="basicForm" id="identityForm">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding aadhar">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs required" name="adharCardNo" ref="adharCardNo" id="adharCardNo" onChange={this.handleChange}  onBlur={this.inputEffect.bind(this)} />
                {/*<span className="input-group-addon addonsRight"><i className="fa fa-upload" aria-hidden="true"></i></span>   */}
                <label className="">Aadhar Card No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="aadhar1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="aadhar2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.aadhar1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.aadhar1} target="_blank"><img src={this.state.proofData.aadhar1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.aadhar1} data-subtype="aadhar1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.aadhar1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.aadhar1} data-subtype="aadhar1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.aadhar2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.aadhar2} target="_blank"><img src={this.state.proofData.aadhar2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.aadhar2} data-subtype="aadhar2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.aadhar2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.aadhar2} data-subtype="aadhar2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding pan">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs" name="panCardNo" ref="panCardNo" id="panCardNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} />
                <label className="">Pan Card No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="pan1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="pan2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.pan1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.pan1} target="_blank"><img src={this.state.proofData.pan1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.pan1} data-subtype="pan1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.pan1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.pan1} data-subtype="pan1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.pan2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.pan2} target="_blank"><img src={this.state.proofData.pan2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.pan2} data-subtype="pan2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.pan2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.pan2} data-subtype="pan2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding driving">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs" name="drivingCardNo" ref="drivingCardNo" id="drivingCardNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} />
                <label className="">Driving License No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="driving1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="driving2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.driving1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.driving1} target="_blank"><img src={this.state.proofData.driving1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.driving1} data-subtype="driving1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.driving1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.driving1} data-subtype="driving1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.driving2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.driving2} target="_blank"><img src={this.state.proofData.driving2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.driving2} data-subtype="driving2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.driving2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.driving2} data-subtype="driving2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding voting">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs" name="votingCardNo" ref="votingCardNo" id="votingCardNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} />
                <label className="">Voting Card No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="voting1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="voting2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.voting1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.voting1} target="_blank"><img src={this.state.proofData.voting1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.voting1} data-subtype="voting1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.voting1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.voting1} data-subtype="voting1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.voting2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.voting2} target="_blank"><img src={this.state.proofData.voting2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.voting2} data-subtype="voting2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.voting2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.voting2} data-subtype="voting2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding ration">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs" name="rationCardNo" ref="rationCardNo" id="rationCardNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} />
                <label className="">Ration Card No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="ration1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="ration2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.ration1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.ration1} target="_blank"><img src={this.state.proofData.ration1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.ration1} data-subtype="ration1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.ration1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.ration1} data-subtype="ration1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.ration2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.ration2} target="_blank"><img src={this.state.proofData.ration2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.ration2} data-subtype="ration2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.ration2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.ration2} data-subtype="ration2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding passport">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noProfilePadding">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-effect input-group">
                <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
                <input type="text" className="effect-21 form-control loginInputs" name="passportNo" ref="passportNo" id="passportNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)} />
                <label className="">Passport No.</label>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 browseButton">
            <input type="file" className="btn btn-info inputFiles" data-subtype="passport1" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 backViewInput" style={{display: "none"}}>
            <input type="file" className="btn btn-info inputFiles" data-subtype="passport2" onChange={this.uploadProofDocs.bind(this)}/>
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12 inputFileButton" onClick={this.inputFileChange.bind(this)}>Browse</button>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 FileDiv" style={{display: "none"}}>
            <div className="input-effect input-group">
              <label></label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right proofDocsProgress identityProofPro" style={{display: "none"}}>
            <div id="identyErrorList"></div>
            {this.getUploadImagePercentage()}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding proofLinkDiv">
            { 
              this.state.proofData.passport1 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.passport1} target="_blank"><img src={this.state.proofData.passport1} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.passport1} data-subtype="passport1"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.passport1} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.passport1} data-subtype="passport1"></i>
                </div>
              :
              ""
            }
            { 
              this.state.proofData.passport2 ?
                this.state.proofData.ext == 'jpg' || this.state.proofData.ext == 'png' || this.state.proofData.ext == 'jpeg' ?
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" style={{height: "200"+"px"}}>
                    <a href={this.state.proofData.passport2} target="_blank"><img src={this.state.proofData.passport2} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                    <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.passport2} data-subtype="passport2"></i>
                  </div>
                :
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                  <a href={this.state.proofData.passport2} target="_blank"><i className="fa fa-file"></i> {this.state.proofData.name}</a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.state.proofData.passport2} data-subtype="passport2"></i>
                </div>
              :
              ""
            }
          </div>
        </div>
        {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">
              <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
              <select className="effect-21 form-control loginInputs" name="statutoryDocument" ref="statutoryDocument" id="statutoryDocument" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}>
                <option disabled="disabled" selected="true">-- Select Document --</option>
                <option>Aadhar Card</option>
                <option>Pan Card</option>
                <option>Driving License</option>
                <option>Voting Card</option>
                <option>Ration Card</option>
                <option>Passport</option>
              </select>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-1 col-md-1 col-sm-2 col-xs-2 noProfilePadding">
            <i className="fa fa-question-circle-o proQuestion" aria-hidden="true"></i>
          </div>
          <div className="form-group col-lg-5 col-md-5 col-sm-4 col-xs-4">
            <button type="button" className="btn btn-info col-lg-12 col-md-12 col-sm-12 col-xs-12">Upload</button>
          </div>
        </div>*/}
        <button type="submit" className="btn btn-info pull-right" onClick={this.handleStatutorySubmit.bind(this)}>Save</button>
      </form>
    );
  }
}
