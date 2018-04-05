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
import UserUploadTask from './UserUploadTask.jsx';

export default class SubmittedAdditionalReportData extends TrackerReact(Component){
  constructor(props){ 
    super(props); 
    this.state = {
      "subscription" : {
      } 
    } 
  } 
  EditDocument(event){
		event.preventDefault();
		console.log("Inside editDocument");
    $('#submitAdditionalReport1').css({"display" : "block"});
    // $('#outersubmitedDocWrap').css({"display" : "none"});
	}
  render(){ 	
  	// console.log("submittedAdditionalReportData : ",this.props.submittedAdditionalReportData);
   	return(
   		<div>
   		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
           <h6>Submitted Information:</h6>  
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submitedDocWrap">		        
				    <div className="col-lg-12 wholeborder">
				      <div className="col-lg-1 pull-right">
	               <span><i className="fa fa-pencil editdoc" aria-hidden="true" title="Edit Document" onClick={this.EditDocument.bind(this)}></i></span>
	           </div>		
	           <div id="submitAdditionalReport1" style={{"display":"none"}}>
        				<UserUploadTask EditValue={this.props.submittedAdditionalReportData} ticketId={this.props.ticketId}/>
             </div>
				       {this.props.submittedAdditionalReportData.documents ?
				       	  this.props.submittedAdditionalReportData.documents.map((submittedAdditionalReportData,index)=>{
				       	  	return(
				       	  		<div className="imgtitile col-lg-12  noLRPad" key={index}>
						            <div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>{submittedAdditionalReportData.task} &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
					              <div className="col-lg-9">{submittedAdditionalReportData.value}</div>
					            </div>
					       	  );
				       	  })
					      :
					      ""
					      }
					      <div className="imgtitile col-lg-12  noLRPad">
			            <div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>Status &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
		              <div className="col-lg-9">{this.props.submittedAdditionalReportData.status}</div>
		            </div>
		            <div className="imgtitile col-lg-12  noLRPad">
			            <div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>Sub-status &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
		              <div className="col-lg-9">{this.props.submittedAdditionalReportData.subStatus}</div>
		            </div>
				      </div>

							{/* <div className="docbtnwrap col-lg-6 col-lg-offset-4">
									<button type="button" className="bg-primary col-lg-4 ApprovRejDoc" data-status="VerificationPass" onClick ={this.approveTeamMemDoc.bind(this)}>Approve</button>
									<button type="button" className="btn-danger col-lg-4 ApprovRejDoc" data-status="VerificationFail" onClick ={this.approveTeamMemDoc.bind(this)}>Reject</button>
			        </div> */}
				  </div>
   		  </div>
   		</div>
   	);
  }
}