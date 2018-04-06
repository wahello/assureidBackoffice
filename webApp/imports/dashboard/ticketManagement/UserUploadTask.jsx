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
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import { ChecklistFieldExpert } from '../reactCMS/api/Services.js';

class UserUploadTask extends TrackerReact(Component){ 
	constructor(props){
    super(props);
   if(this.props.EditValue){
      // console.log("edit values:",this.props.EditValue);
      this.state ={ 
       "documents"        : this.props.EditValue.documents,
       "status"           : this.props.EditValue.status,
       "subStatus"        : this.props.EditValue.subStatus,
       "subscription" : {
        }
      };
    }else{
      this.state ={
       "documents"          : [],
       "status"             : '',
       "subStatus"          : '',
       "subscription" : {
          // "userProfileData" : Meteor.subscribe("userProfileData"),
        }
      };
    }
    this.handleChange = this.handleChange.bind(this);
  } 
  handleChange(event){
   event.preventDefault();
   const target = event.target;
   const name   = target.name;
   this.setState({
    [name]: event.target.value,
   });
  }
  getRole(role) {
    return role != "backofficestaff";
  }
	submitFinalReportData(event){
		event.preventDefault();
		var checkLists = [];
		var ticketId   = this.props.ticketId;
    // console.log("ticketId",ticketId);
		$('textarea.checkListValue').each(function(i){
			// console.log("in each");
			var dataChk    = {};
			dataChk.task   = $(this).attr('id');
      dataChk.value  = $(this).val();
      checkLists.push(dataChk);
    });
    // console.log("checkLists",checkLists);
    var status     = this.refs.documentStatus.value;
    var subStatus  = this.refs.documentSubStatus.value;
		var submitOtherReportData = {
       documents : checkLists,
       status    : status,
       subStatus : subStatus,
		};
    // console.log("submitOtherReportData",submitOtherReportData);
     if(this.props.EditValue){ 
      console.log("In EditValue");
       var insertData = {
        "userId"                    : Meteor.userId(),
        "userName"                  : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
        "role"                      : Meteor.user().roles.find(this.getRole),
        "roleStatus"                : 'ReSubmittedOtherReportInfo',
        "msg"                       : 'ReSubmitted Other Information Related to Ticket',
        "allocatedToUserid"         : '',
        "allocatedToUserName"       : '',
        "submitOtherReportData"     : submitOtherReportData,
        "createdAt"                 : new Date()
      }
     }else{
      var insertData = {
        "userId"                    : Meteor.userId(),
        "userName"                  : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
        "role"                      : Meteor.user().roles.find(this.getRole),
        "roleStatus"                : 'OtherReportInfo',
        "msg"                       : 'Submitted Other Information Related to Ticket',
        "allocatedToUserid"         : '',
        "allocatedToUserName"       : '',
        "submitOtherReportData"     : submitOtherReportData,
        "createdAt"                 : new Date()
      }
     }
		// console.log("insertData",insertData);

    Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData,function (error,result) {
    	if (error) {
    		console.log(error.reason);
    	}else{
    		console.log("added Succcessfully");
        $('#submitAdditionalReportData').css({"display" : "none"});
    	}
    });
	}
  render(){ 
    
   return(
      <div>
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 choosefilebox" id="submitAdditionalReportData">
         <form>
		      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wholeborder">
          {this.props.EditValue ?
            <div>
             {this.state.documents ?
                 this.state.documents.map((documents, index)=>{
                  return(
                    <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" key={index}>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg">{documents.task}:</div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                          <textarea className="form-control checkListValue" id={documents.task} name="checkListValue" ref="checkListValue" name rows="3" onChange={this.handleChange}>
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
            <div>
             {this.props.checkList ?
               this.props.checkList.map((userUploadChecklist, index)=>{
                return(
                  <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" key={index}>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg">{userUploadChecklist}:</div>
                      <div className="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                        <textarea className="form-control checkListValue" id={userUploadChecklist} name="checkListValue" ref="checkListValue" name rows="3" onChange={this.handleChange}>
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
		        <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
		          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg"> Status:</div>
		            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
			          <select className="form-control inputText documentStatus" ref="documentStatus" id="documentStatus" defaultValue={this.state.status ? this.state.status : '-- Select --'} name="documentStatus" onChange={this.handleChange}>
                  <option disabled="disabled">-- Select --</option>
                  <option value="Value 1">Initiated</option>
			            <option value="Value 2">WIP ( Work in Progress)</option>
			            <option value="Value 3">Insufficiency</option> 
                  <option value="Value 4">Insufficiency Cleared</option> 
                  <option value="Value 5">Completed</option> 
			          </select>
            </div>
		        </div> 
		        <div className="imgtitile col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
		          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  Selectimg"> Sub-status:</div>
		            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
			            <select className="form-control inputText documentSubStatus" ref="documentSubStatus" id="documentSubStatus" defaultValue={this.state.subStatus ? this.state.subStatus : '-- Select --'} name="documentSubStatus" onChange={this.handleChange}>
                    <option disabled="disabled">-- Select --</option>
                    <option value="Value 1">Clear</option>
				            <option value="Value 2">Minor Discrepancy</option>
				            <option value="Value 3">Major Discrepancy</option>
                    <option value="Value 3">Inaccessible</option>
                    <option value="Value 3">Unable to Verify</option>
                    <option value="Value 3">Cancelled</option>
                    <option value="Value 3">Case Drop</option>
			          </select>
                </div>
		        </div>
		        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  wholeborder text-center">
			         <button type="submit" onClick={this.submitFinalReportData.bind(this)} className="btn btn-primary">Submit</button>
			      </div>

		      </div>
        </form>
       </div>
      </div>
    );
  }
}
UserUploadContainer = withTracker(props => { 
    const ticketId     = props.ticketId;
    const postHandle2  = Meteor.subscribe('checklistFieldExpert');
    const postHandle3  = Meteor.subscribe('singleTicket',ticketId);

    const loading    = !postHandle3.ready() && !postHandle2.ready();
    var checkList = [];
    if (ticketId) {
       var tickets =  TicketMaster.findOne({"_id" : ticketId});
       
       if (tickets) {
          var verificationType = tickets.verificationType;
       // console.log("tickets",tickets);
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

        var checkListObj = ChecklistFieldExpert.find({"checkListFor" : checkListFrom , "checkListFrom" : "User Upload"}).fetch();
        if (checkListObj) {
           for (var i = 0; i < checkListObj.length; i++) {
            checkList.push(checkListObj[i].task);
           }
          //  console.log("checkList",checkList);
        }
       }   
    }
    return {
        loading : loading,
        checkList  : checkList,
        tickets    : tickets,
    };
})(UserUploadTask);
export default UserUploadContainer;