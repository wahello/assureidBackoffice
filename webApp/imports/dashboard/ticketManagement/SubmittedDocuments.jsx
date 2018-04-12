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
import VerificationDataSubmit from './VerificationDataSubmit.jsx';

export default class SubmittedDocuments extends TrackerReact(Component){
	constructor(props){ 
    super(props); 
    this.state = {
      "subscription" : {
      } 
    } 
  } 
  showSubmitted(event){
  	event.preventDefault();
    var idVal= $(event.target).attr('data-target');
    // console.log("idVal",idVal);
    $('#'+idVal).modal('show');
	} 
	
	/*==================== Team Member Approve/Reject Document */
	approveTeamMemDoc(event){
		event.preventDefault();
		var status   = $(event.currentTarget).attr('data-status');
		var ticketid = this.props.ticketId;
		Meteor.call('addTMDocStatus',ticketid,status);
	}
	EditDocument(event){
		event.preventDefault();
		console.log("Inside editDocument");
    $('#AddImagesVideo1').css({"display" : "block"});
    $('#submitedDocWrap').css({"display" : "none"});
	}
	showEditButton(){
		var userId = Meteor.userId();
	    if(userId){
	    	var getTicket = TicketMaster.findOne({"_id" :this.props.ticketId});
	    	if(getTicket){	
		      var ticketElement = getTicket.ticketElement;
		      if(ticketElement){
		        var docApproveRejectData = ticketElement.find(function(obj){return (obj.userId == userId && obj.roleStatus == 'SelfAllocated' ) ? obj : false});
		        if(docApproveRejectData){
		          var showEditButton = true;
		        }else{
		          var showEditButton = false;
		        }
		      }
	    	}
	    }
	    console.log('showEditButton ',showEditButton);
	    return showEditButton;
	}
  render(){ 
  	// var userId = Meteor.userId();
   //  if(userId){
   //  	var getTicket = TicketMaster.findOne({"_id" :this.props.ticketId});
   //  	if(getTicket){	
	  //     var ticketElement = getTicket.ticketElement;
	  //     if(ticketElement){
	  //       var docApproveRejectData = ticketElement.find(function(obj){return (obj.role == 'team member' ) ? obj : false});
	  //       if(docApproveRejectData){
	  //         var showEditButton = true;
	  //       }else{
	  //         var showEditButton = false;
	  //       }
	  //     }
   //  	}
   //  }	
   	return(
   		<div>
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" id="outersubmitedDocWrap">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submitedDocWrap" id="submitedDocWrap">			
				 <h6>Submitted Information:</h6>  
          <div className="col-lg-12 wholeborder ">
						<div className="imgtitile col-lg-12 noLRPad">
			        <div className="col-lg-6  noLRPad Selectimg">
			        	<strong>
			        		<span className="checkBoxtitle">Verified Information:</span>
			        	</strong>
			        </div>
			        {this.showEditButton() == true ? 
				       	<div className="col-lg-1 pull-right">
						    <span><i className="fa fa-pencil editdoc" aria-hidden="true" title="Edit Document" onClick={this.EditDocument.bind(this)}></i></span>					
			           	</div>
			        :
			        	""
			        }
			      </div>
			      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             {this.props.submittedDocuments.documents ?
                this.props.submittedDocuments.documents.checkLists.map((submittedChecklist,index)=>{
                  return(
                    <div className="col-lg-6 noLRPad" key={index}>  
                       <input type="checkbox" className="tickchkbox" ref="submittedChecklist" name="submittedChecklist" value={submittedChecklist.status} checked={submittedChecklist.status} />&nbsp;<span className="checkBoxtitle">{submittedChecklist.statement}</span>
                    </div>
                  );
                })
                :
               "" 
             }
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						 {this.props.submittedDocuments.documents ?
								this.props.submittedDocuments.documents.textLists.map((textListsData,index)=>{
									return(
										<div className="imgtitile col-lg-12  noLRPad" key={index}>
											<div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>{textListsData.task} &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
											<div className="col-lg-9">{textListsData.value}</div>
										</div>
									);
								})
							:
							""
							}
						</div>
          </div>
	        <div className="col-lg-12 wholeborder ">
		          <div className="imgtitile col-lg-12 noLRPad">
			          <div className="col-lg-12  noLRPad Selectimg"><strong><span className="checkBoxtitle">Captured Documents:</span></strong></div> 
			        </div> 
            	<div className="col-lg-12 submittedDashedLine">
               {this.props.submittedDocuments.documents ?
               	 this.props.submittedDocuments.documents.images.map((submittedImages,index) =>{
               	 	 return(
               	 	 	  <div key={index}>
	               	 	 	  <div className="col-lg-2 imgbrPre">
									        <div className="imgageDiv">
									          <img src={submittedImages.imageLink} className="img1 img-responsive" data-toggle="modal" data-target={"submiitedImagesModal-"+index} onClick={this.showSubmitted.bind(this)} />
					    			      </div>
								        </div>
								         <div className="modal fade" id={"submiitedImagesModal-"+index} role="dialog">
	                          <div className="modal-dialog">
	                            <div className="modal-content">
	                              <div className="modal-header">
	                                <button type="button" className="close" data-dismiss="modal">&times;</button>
	                              </div>
	                              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
	                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									                   <img src={submittedImages.imageLink} className="img img-responsive modalImage" />
	                                </div>
	                              </div> 
	                              <div className="modal-footer">
	                              </div>
	                            </div> 
	                          </div>
	                      </div>
                      </div> 
               	 	 	);
               	 })
               	 :
               	 ""
							 }
							 <div className="col-lg-2">
           {this.props.submittedDocuments.documents ?
           	 this.props.submittedDocuments.documents.videos.map((submittedVideo,index) =>{
           	 	 return(
           	 	 	  <div className="col-lg-4 VideoDiv" key={index}>
						          <video className="videoStyle" controls>
							          <source src={submittedVideo.videoLink} type="video/mp4" />
							        </video>
					        </div>
           	 	 	);
           	 })
           	 :
           	 ""
           }
		        
	        </div>
			        </div>
	       </div>
				 	<div className="imgtitile col-lg-12 ">
						<div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>Status &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
						<div className="col-lg-9">{this.props.submittedDocuments.documents.status}</div>
					</div>
					<div className="imgtitile col-lg-12 ">
						<div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>Sub-status &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
						<div className="col-lg-9">{this.props.submittedDocuments.documents.subStatus}</div>
					</div>
		      <div className="imgtitile col-lg-12">
	            <div className="col-lg-3 noLRPad Selectimg"><span className="checkBoxtitle"><strong>Remark &nbsp;</strong></span><span className="pull-right"><strong>:</strong></span></div> 
              <div className="col-lg-9">{this.props.submittedDocuments.documents.remark}</div>
          </div>

				</div>
				  <div id="AddImagesVideo1" style={{"display":"none"}}>
      				<VerificationDataSubmit key='editImageVideo' EditValue={this.props.submittedDocuments.documents} ticketId={this.props.ticketId}/>
        	</div>
      </div>
    </div>
   	);
   }
}