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

class UploadReport extends TrackerReact(Component){
	constructor(props){
    
        
        super(props); 
    }
  
    render(){
        if (!this.props.loading) {
            return(
                <div>
                    <div className="col-lg-12 noLRPad borderBottomBlock">
                    <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">team member</h5>
                        <div className="col-lg-12 noLRPad Selectimg reporttitle dataDetails"> Upload Report:</div>
                        <div className="col-lg-10 col-lg-offset-2">
                            <div className="col-lg-6 col-lg-offset-1">
                                <input type="file" ref="uploadReportFile" id="uploadReport" name="uploadReport" className="col-lg-7 reporttitle noLRPad" name="img" multiple />
                            </div>
                            <div className="col-lg-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc">Submit</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-12 noLRPad borderBottomBlock">
                        <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">Quality Team Member</h5>
                        <div className="col-lg-12 noLRPad Selectimg reporttitle dataDetails"> Download Report:</div>                
                        <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        </div>

                        <div className="docbtnwrap col-lg-6 col-lg-offset-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc" data-status="Approved">Approve</button>
                            <button type="button" className="btn-danger col-lg-4 ApprovRejDoc" data-status="Rejected">Reject</button>
                        </div>
                    </div> 
                    <div className="col-lg-12 noLRPad borderBottomBlock">
                        <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">Quality Team Leader</h5>
                        <div className="col-lg-12 noLRPad Selectimg reporttitle dataDetails"> Download Report:</div>                
                        <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        </div>

                        <div className="docbtnwrap col-lg-6 col-lg-offset-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc" data-status="Approved">Approve</button>
                            <button type="button" className="btn-danger col-lg-4 ApprovRejDoc" data-status="Rejected">Reject</button>
                        </div>
                        <div className="col-lg-10 col-lg-offset-4 col-md-12 col-xs-12 col-sm-12">
                            <div className="col-lg-5  col-md-5  col-sm-12 col-xs-12 otherInfoForm">
                                    <textarea className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason" rows='2' placeholder="Remark..."></textarea>
                            </div>
                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="Rejected">Submit</button>
                            </div>
                        </div>
                    </div>                    */}
                </div>
            );
        }else{
            return(
               <span>Loading</span>
            );
        }
    }
}uploadReportContainer = withTracker(props => {

    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    // const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
    const loading = !postHandle.ready();
      return {
          loading  : loading,
        //   getTicket : getTicket
      };
})(UploadReport);
export default uploadReportContainer;