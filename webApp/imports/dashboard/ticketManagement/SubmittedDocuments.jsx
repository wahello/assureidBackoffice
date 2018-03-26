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
// import { TempTicketImages } from './api/TempUpload.js';
// import { TempTicketVideo } from './api/TempUpload.js';
// import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
// import { ChecklistFieldExpert } from '../reactCMS/api/Services.js';

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
    console.log("idVal",idVal);
    $('#'+idVal).modal('show');
  }
   render(){
   	console.log("submittedDocuments",this.props.submittedDocuments);
   	return(
   		<div>.
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
        <h5 className="dataDetails">Submitted Attachment:</h5>        
          <div className="col-lg-12 wholeborder ">
             {this.props.submittedDocuments.documents ?
                this.props.submittedDocuments.documents.checkLists.map((submittedChecklist,index)=>{
                  return(
                    <div className="col-lg-6 noLRPad" key={index}>  
                       <input type="checkbox" ref="submittedChecklist" name="submittedChecklist" value={submittedChecklist.status} checked={submittedChecklist.status} />&nbsp;{submittedChecklist.statement}
                    </div>
                  );
                })
                :
               "" 
             }
          </div>
	        <div className="col-lg-12 wholeborder ">
		          <div className="imgtitile col-lg-12 noLRPad">
			          <div className="col-lg-12  noLRPad Selectimg"> Submitted Images:</div> 
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
			        </div>
	       </div>
	      <div className="col-lg-12 wholeborder">
	        <div className="imgtitile col-lg-12  noLRPad">
	          <div className="col-lg-12 noLRPad Selectimg"> Submitted Videos:</div> 
	        </div>
        	<div className="col-lg-12 submittedDashedLine">
           {this.props.submittedDocuments.documents ?
           	 this.props.submittedDocuments.documents.videos.map((submittedVideo,index) =>{
           	 	 return(
           	 	 	  <div className="col-lg-4 VideoDiv" key={index}>
						          <video width="150" height="150"  controls>
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
	      <div className="col-lg-12 wholeborder">
	          <div className="imgtitile col-lg-12  noLRPad">
	            <div className="col-lg-12 noLRPad Selectimg">Remark:</div> 
              <span>{this.props.submittedDocuments.documents.remark}</span>
            </div>
	      </div>

				<div className="docbtnwrap col-lg-6 col-lg-offset-4">
						<button type="button" className="bg-primary col-lg-4 ApprovRejDoc" data-status="Accepted">Approve</button>
						<button type="button" className="btn-danger col-lg-4 ApprovRejDoc" data-status="Rejected">Reject</button>
        </div>
      </div>

     </div>
   	);
   }
}