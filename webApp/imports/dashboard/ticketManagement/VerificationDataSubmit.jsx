import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { TempTicketImages } from './api/TempUpload.js';
import { TempTicketVideo } from './api/TempUpload.js';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import { ChecklistFieldExpert } from '../reactCMS/api/Services.js';

class VerificationDataSubmit extends TrackerReact(Component){
    constructor(props){ 
        super(props); 
        if(this.props.EditValue){
            // console.log("edit values:",this.props.EditValue);
            this.state ={ 
                "checkLists"       : this.props.EditValue.checkLists,
                "textLists"        : this.props.EditValue.textLists,
                "images"           : this.props.EditValue.images,
                "videos"           : this.props.EditValue.videos,
                "remark"           : this.props.EditValue.remark,
                "documents"        : this.props.EditValue.documents,
                "status"           : this.props.EditValue.status,
                "subStatus"        : this.props.EditValue.subStatus,
                "subscription" : {
                }
            };
            // console.log("checkLists",this.state.checkLists);
        }else{
            this.state ={
                "checkLists"   : [],
                "textLists"    : [],
                "images"       : [],
                "videos"       : [],
                "remark"       : '',
                "documents"    : [],
                "status"       : '',
                "subStatus"    : '',
                "subscription" : {
                }
            };
        }
        this.handleChange = this.handleChange.bind(this);
    }
    getRole(role) {
        return role != "backofficestaff";
    }
    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name   = target.name;
        this.setState({
         [name]: event.target.value,
        });
    }
    handleUpload(event){
        event.preventDefault();
        let self = this;
         // this.setState({isUploading: true});
         // console.log(event.currentTarget.files.length);
        if (this.props.ticketImages.length >= 0 && this.props.ticketImages.length < 5 ) {
          if (event.currentTarget.files.length <= 5) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
              if (event.currentTarget.files[i]) {
                var dataImg = event.currentTarget.files[i]; 
                console.log("dataImg",dataImg);
                 if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){     
                   var reader = new FileReader();       
                   reader.onload = function (e) {         
                     // $('.uploadedImageFromLocl').attr('src', e.target.result);     
                   };      
                   reader.readAsDataURL(event.currentTarget.files[i]);     
                   var file = event.currentTarget.files[i];     
                    if (file) {        
                      addImgsToS3Function(file,self);      
                    }  
                 } else {
                  swal({   
                     position: 'top-right',    
                     type: 'error',   
                     title: 'Please select image',      
                     showConfirmButton: false,     
                     timer: 1500     
                   });  
                }
              }
            }
           }else if (event.currentTarget.files.length > 5 ) {
              swal({   
                 position: 'top-right',    
                 type: 'error',   
                 title: 'You can not add more than 5 images',      
                 showConfirmButton: false,     
                 timer: 3000     
               }); 
            }
        }else if (this.props.ticketImages.length >= 5 ){
           swal({   
             position: 'top-right',    
             type: 'error',   
             title: 'You can not add more than 5 images',      
             showConfirmButton: false,     
             timer: 3000     
           }); 
        }
    }
    handleVideoUpload(event){
        event.preventDefault();
        let self = this;
        if (this.props.ticketVideo.length >= 0 && this.props.ticketVideo.length < 1) {
            if (event.currentTarget.files.length > 1) {
                swal({   
                    position: 'top-right',    
                    type: 'error',   
                    title: 'You can not add more than one video',      
                    showConfirmButton: false,     
                    timer: 3000     
                }); 
            }else{
                if (event.currentTarget.files && event.currentTarget.files[0]) { 
                    var dataImg =event.currentTarget.files[0];
                    if(dataImg.type == "video/mp4"){      
                        var reader = new FileReader();       
                        reader.onload = function (e) {          
                        };       
                        var vid = document.createElement('video');
                        reader.readAsDataURL(event.currentTarget.files[0]);      
                        var file = event.currentTarget.files[0]; 
                        if (file) {         
                            var fileURL = URL.createObjectURL(event.currentTarget.files[0]);
                            vid.src = fileURL;
                            // wait for duration to change from NaN to the actual duration
                            vid.ondurationchange = function() {
                                var duration = this.duration;
                                if (duration <= 10) {
                                    addTicketVideoS3Function(file,self);       
                                }else{
                                    swal({    
                                        position: 'top-right',     
                                        type: 'error',    
                                        title: 'You are not allowed to add video Beyond 10Sec!',       
                                        showConfirmButton: false,      
                                        timer: 1500      
                                    });  
                                }   
                            }
                        };
                } else { 
                    swal({    
                        position: 'top-right',     
                        type: 'error',    
                        title: 'Please select Video',       
                        showConfirmButton: false,      
                        timer: 1500      
                    });   
                }
           }
        }
       
        }else if (this.props.ticketVideo.length >= 1 ){
           swal({   
             position: 'top-right',    
             type: 'error',   
             title: 'You can not add more than one video',      
             showConfirmButton: false,     
             timer: 3000     
           }); 
        }
    
    }
    deleteTempImage(event){
        event.preventDefault();
        var id = $(event.currentTarget).attr('id');
        // console.log("id",id);
        Meteor.call('deleteTempImage',id,function (error,result) {
          if (error) {
            console.log(error.reason);
          }else{
            console.log("Deleted Successfully");
          }
        });
    }
    deleteTempVideo(event){
        event.preventDefault();
        var id = $(event.currentTarget).attr('id');
        // console.log("id",id);
        Meteor.call('deleteTempVideo',id,function (error,result) {
          if (error) {
            console.log(error.reason);
          }else{
            console.log("Deleted Successfully");
          }
        });
    }
    deleteImageFromticket(event){
        event.preventDefault();
        var id = $(event.currentTarget).attr('id');
        console.log("id",id);
        var dataIndex = parseInt($(event.currentTarget).attr('data-index'));
        console.log("dataIndex",dataIndex);
        Meteor.call('deleteImageFromSubmitDocument',id,dataIndex,function(error,result){
            if (error) {
                console.log(error.reason);
            }else{
                console.log("deleted successfully");
            }
        });
    }
    submitReport(event){
        event.preventDefault();
        var checkLists = [];
        //Get values for all the check box
        $('input[name="checkObjs"]').each(function(i){
            var dataChk ={};
            if($(this).is(":checked")){
                dataChk.statement = $(this).val();
                dataChk.status = true;
            }else{
                dataChk.statement = $(this).val();
                dataChk.status = false;
            }
            checkLists.push(dataChk);
        });   
        //Get Values for all the text field
        var textLists = [];
		$('textarea.textObjs').each(function(i){
			var dataChk    = {};
			dataChk.task   = $(this).attr('id');
            dataChk.value  = $(this).val();
            textLists.push(dataChk);
        });
        if(this.props.EditValue){
            var status      = this.refs.documentStatus.value;
            var subStatus   = this.refs.documentSubStatus.value;
            var images      = this.state.images;
            var videos      = this.state.videos;
            var roleStatus  = "ProofResubmitted";
            var msg         = "Resubmitted Verification Information";
            var remark      = this.refs.remark.value;
        }else{
            var status      = this.refs.documentStatus.value;
            var subStatus   = this.refs.documentSubStatus.value;
            var images      = this.props.ticketImages;
            var videos      = this.props.ticketVideo;
            var roleStatus  = "ProofSubmit";
            var msg         = "Submitted Verification Information";
            var remark      = this.refs.remark.value;
        }  
        var documents ={
            checkLists : checkLists,
            textLists  : textLists,
            status     : status,
            subStatus  : subStatus,
            images     : images,
            videos     : videos,
            remark     : remark,
        }
        //Fetch object ticketElement for getting information of Team Leader
        if (this.props.tickets) {
            if (this.props.tickets.ticketElement) {
                if (this.props.tickets.ticketElement.length > 0) {
                    var ticketElements = this.props.tickets.ticketElement;
                    var teamMemberDetails = ticketElements.find(function (obj) { return obj.roleStatus == 'SelfAllocated' });
                    // console.log('teamMemberDetails ',teamMemberDetails);
                }
            }
            var role = Meteor.user().roles.find(this.getRole);
            if(role){
                var insertData ={
                    "userId"              : Meteor.userId(),
                    "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
                    "allocatedToUserid"   : teamMemberDetails.userId,
                    "allocatedToUserName" : teamMemberDetails.userName,
                    "role"                : role,
                    "roleStatus"          : roleStatus,
                    "msg"                 : msg,
                    "submitedDoc"         : documents,
                    "createdAt"           : new Date(),
                }
                // console.log('insertData ',insertData);    
            }
            Meteor.call('genericUpdateTicketMasterElement',this.props.tickets._id,insertData,function(error,result){
                if (error) {
                  console.log(error.reason);
                }else{
                  console.log("Inserted Successfully!");
                  $("#AddImagesVideo1").css({"display" : "none"});
                  $("#uploadButtonDiv").css({"display" : "none"});
                  $('#submitedDocWrap').css({"display" : "block"});
                }
            });
        }
    }
    render(){
         // console.log("ticketId",this.props.ticketId);

        return(
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 choosefilebox">
                    <form>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wholeborder ">
                            <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad Selectimg"> <b>Verify Information:</b></div>
                            </div>
                            {/* Check List Display */}
                            {this.props.EditValue ?
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerChecklisttoteamM">
                                    {this.state.checkLists ?
                                        this.state.checkLists.map((checkObjsDefault,index)=>{
                                        return(
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" key={index}>  
                                              <input type="checkbox" ref="checkObjs" id="checkObjs" name="checkObjs" className={"checkObjs-"+index} value={checkObjsDefault.statement} />&nbsp;{checkObjsDefault.statement}
                                            </div>
                                          );
                                        })
                                    :
                                        ""
                                    }
                                </div>
                               :
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerChecklisttoteamM">
                                    {this.props.checkObjs ?
                                        this.props.checkObjs.map((checkObjsDefault,index)=>{
                                        return(
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" key={index}>  
                                              <input type="checkbox" ref="checkObjs" id="checkObjs" name="checkObjs" className={"checkObjs-"+index} value={checkObjsDefault} />&nbsp;{checkObjsDefault}
                                            </div>
                                          );
                                        })
                                    :
                                        ""
                                    }
                                </div>
                            } 
                            {/* Data from user */}
                            {this.props.EditValue ? 
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {this.state.textLists ?
                                    this.state.textLists.map((textObjsUsrUpload, index)=>{
                                        return(
                                        <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" key={index}>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg">{textObjsUsrUpload.task}:</div>
                                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                                <textarea className="form-control textObjs" id={textObjsUsrUpload.task} name="textObjs" ref="textObjs" name rows="1" onChange={this.handleChange}>
                                                </textarea>
                                            </div>
                                        </div>
                                        );
                                    })
                                    :
                                        ""
                                    }
                               </div>
                              
                            : 
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {this.props.textObjs ?
                                    this.props.textObjs.map((textObjsUsrUpload, index)=>{
                                        return(
                                        <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" key={index}>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg">{textObjsUsrUpload}:</div>
                                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                                <textarea className="form-control textObjs" id={textObjsUsrUpload} name="textObjs" ref="textObjs" name rows="1" onChange={this.handleChange}>
                                                </textarea>
                                            </div>
                                        </div>
                                        );
                                    })
                                    :
                                        ""
                                    }
                               </div>

                            }
                            
                            {/* Images upload and Display */}
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wholeborder ">
                                <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad Selectimg"> Select images: (minium 3 images and maximum 5)</div>
                                    <input type="file" ref="ticketImageFile" id="s3file" name="ticketImageFile"  onChange={this.handleUpload.bind(this)} className="col-lg-7 noLRPad" name="img" multiple />
                                </div>
                            </div>
                            {!this.props.loading ?
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgbox">
                                    {
                                        this.props.ticketImages ? 
                                            this.props.ticketImages.length > 0 ? 
                                                this.props.ticketImages.map((ticketImages,index) =>{
                                                    return(
                                                    <div className="col-lg-3 imgbrPre" key={index}>
                                                        <i className="fa fa-times pull-right tempImageDelete" id={ticketImages._id} onClick={this.deleteTempImage.bind(this)}></i>
                                                        <div className="imgbr">
                                                        <img src={ticketImages.imageLink} className="img1 img-responsive" />
                                                        </div>
                                                    </div>
                                                    );
                                                })
                                            :
                                                this.state.images? 
                                                    this.state.images.map((ticketImages,index) =>{
                                                        return(
                                                        <div className="col-lg-3 imgbrPre" key={index}>
                                                        <i className="fa fa-times pull-right tempImageDelete" id={this.props.ticketId} data-index={index} onClick={this.deleteImageFromticket.bind(this)}></i>
                                                            <div className="imgbr">
                                                            <img src={ticketImages.imageLink} className="img1 img-responsive" />
                                                            </div>
                                                        </div>
                                                        );
                                                    })
                                            :
                                                ""
                                            :
                                                this.state.images? 
                                                    this.state.images.map((ticketImages,index) =>{
                                                        return(
                                                            <div className="col-lg-3 imgbrPre" key={index}>
                                                            <i className="fa fa-times pull-right tempImageDelete" id={this.props.ticketId} data-index={index} onClick={this.deleteImageFromticket.bind(this)}></i>
                                                            <div className="imgbr">
                                                                <img src={ticketImages.imageLink} className="img1 img-responsive" />
                                                            </div>
                                                            </div>
                                                        );
                                                    })
                                            :
                                                ""
                                    }
                                </div>
                            :
                                ""
                            } 
                            {/* End of Images upload and Display */}
                            {/* Video upload and Display */}
                            <div className="col-lg-12 wholeborder">
                                <div className="imgtitile col-lg-12 ">
                                    <div className="col-lg-12 noLRPad Selectimg"> Select Video:</div>
                                        <input type="file" ref="ticketVideoFile" id="s3file" name="ticketVideoFile"  onChange={this.handleVideoUpload.bind(this)} className="col-lg-7 noLRPad" name="img" multiple />
                                </div>
                            </div>
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgbox">

                            {this.props.ticketVideo ?
                                this.props.ticketVideo.length > 0 ?
                                    this.props.ticketVideo.map((ticketVideo,index) =>{
                                        return(
                                        <div className="col-lg-4 imgbrvid" key={index}>
                                            <i className="fa fa-times pull-right tempImageDelete" id={ticketVideo._id} onClick={this.deleteTempVideo.bind(this)}></i>
                                            <video width="200" height="200"  controls>
                                                <source src={ticketVideo.videoLink} type="video/mp4" />
                                            </video>
                                        </div>
                                        );
                                    })
                                :
                                    this.state.videos? 
                                        this.state.videos.map((ticketVideo,index) =>{
                                            return(
                                            <div className="col-lg-4 imgbrvid" key={index}>
                                                <i className="fa fa-times pull-right"></i>
                                                <video width="200" height="200"  controls>
                                                    <source src={ticketVideo.videoLink} type="video/mp4" />
                                                </video>
                                            </div>
                                            );
                                    })
                                :
                                    ""
                                :
                                    this.state.videos? 
                                        this.state.videos.map((ticketVideo,index) =>{
                                        return(
                                            <div className="col-lg-4 imgbrvid" key={index}>
                                                <i className="fa fa-times pull-right"></i>
                                                <video width="200" height="200"  controls>
                                                    <source src={ticketVideo.videoLink} type="video/mp4" />
                                                </video>
                                            </div>
                                        );
                                        })
                            :
                                ""
                            }
                            </div>
                            {/* End of Video upload and Display */}
                            {/* Status and Sub Status */}
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerStatusBlock">
                                {/* Status Block */}
                                <div className="imgtitile col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg"> Status:</div>
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                        <select className="form-control inputText documentStatus" ref="documentStatus" id="documentStatus" defaultValue={this.state.status ? this.state.status : ''} name="documentStatus" onChange={this.handleChange}>
                                            <option disabled="disabled">-- Select --</option>
                                            <option value="Initiated">Initiated</option>
                                            <option value="WIP">WIP ( Work in Progress)</option>
                                            <option value="Insufficiency">Insufficiency</option> 
                                            <option value="Insufficiency Cleared">Insufficiency Cleared</option> 
                                            <option value="Completed">Completed</option> 
                                        </select>
                                    </div>
                                </div>{/* Status Block */}
                                {/* Sub Status Block */}
                                <div className="imgtitile col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg"> Sub-status:</div>
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                        <select className="form-control inputText documentSubStatus" ref="documentSubStatus" id="documentSubStatus" defaultValue={this.state.subStatus ? this.state.subStatus : ''} name="documentSubStatus" onChange={this.handleChange}>
                                            <option disabled="disabled">-- Select --</option>
                                            <option value="Clear">Clear</option>
                                            <option value="Minor Discrepancy">Minor Discrepancy</option>
                                            <option value="Major Discrepancy">Major Discrepancy</option>
                                            <option value="Inaccessible">Inaccessible</option>
                                            <option value="Unable to Verify">Unable to Verify</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Case Drop">Case Drop</option>
                                        </select>
                                    </div>
                                </div>{/* Sub Status Block */}
                            </div>{/* End Status and Sub Status */}
                            {/* Remark Block */}
                            <div className="col-lg-12 wholeborder">
                                <div className="imgtitile col-lg-12 ">
                                    <div className="col-lg-12 noLRPad Selectimg">Remark:</div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                                    <textarea className="form-control col-lg-12 col-sm-12 col-md-12 col-xs-12" name="remark" ref="remark" id="remark" onChange={this.handleChange} value={this.state.remark} rows="5" id="remark"></textarea>          
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  wholeborder text-center">
                                <button type="submit" onClick={this.submitReport.bind(this)}className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            );
        }       
    }
VerificationDataSubmitContainer = withTracker(props => { 
    const ticketId       = props.ticketId;
    const postHandle   = Meteor.subscribe('allTicketImages');
    const postHandle1  = Meteor.subscribe('allTicketVideo');
    const postHandle2  = Meteor.subscribe('checklistFieldExpert');
    const postHandle3  = Meteor.subscribe('singleTicket',ticketId);
    const ticketImages = TempTicketImages.find({}).fetch() || []; 
    const ticketVideo  = TempTicketVideo.find({}).fetch() || [];  
    const loading     = !postHandle.ready();
    const loading1    = !postHandle1.ready();
    const loading3    = !postHandle3.ready();
    var checkList = [];
    if (ticketId) {
        var tickets =  TicketMaster.findOne({"_id" : ticketId});
        // console.log("tickets",tickets);
        if (tickets) {
            var verificationType = tickets.verificationType;
            if (verificationType == "professionalEducation") {
            var checkListFrom = "Academic Information";
            }else if (verificationType == "permanentAddress") {
            var checkListFrom = "Address Information";
            }else if (verificationType == "currentAddress") {
            var checkListFrom = "Address Information";
            }else if (verificationType == "employement") {
            var checkListFrom = "Employment Information";
            }else if (verificationType == "education") {
            var checkListFrom = "Academic Information";
            }else  if (verificationType == "certificates") {
            var checkListFrom = "Skills And CertificationInformation";
            }
            var checkListObjs = ChecklistFieldExpert.find({"checkListFor" : checkListFrom}).fetch();
            var checkObjs = [];
            var textObjs = [];
            if (checkListObjs) {
                for (var i = 0; i < checkListObjs.length; i++) {
                    if(checkListObjs[i].checkListFrom == 'Database'){
                        checkObjs.push(checkListObjs[i].task); 
                    }else{
                        textObjs.push(checkListObjs[i].task); 
                    }
                }
            }
        }
    }
    return {
        loading      : loading,
        loading1     : loading1,
        ticketImages : ticketImages,
        ticketVideo  : ticketVideo,
        ticketId     : ticketId,
        tickets      : tickets,
        checkObjs    : checkObjs,
        textObjs     : textObjs
    };
})(VerificationDataSubmit);
export default VerificationDataSubmitContainer;