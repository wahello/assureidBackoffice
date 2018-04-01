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
import {CompanySettings} from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';

class UploadReport extends TrackerReact(Component){
	constructor(props){
        super(props); 
    }
    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name   = target.name;
        this.setState({
         [name]: event.target.value,
        });
    }

    handleReportUpload(event){
        event.preventDefault();
        let self = this;
        if (event.currentTarget.files && event.currentTarget.files[0]) { 
        var dataImg =event.currentTarget.files[0];
            if(dataImg){      
            var reader = new FileReader();       
            reader.onload = function (e) {          
            };      
            reader.readAsDataURL(event.currentTarget.files[0]);      
            var file = event.currentTarget.files[0];
            if (file) {         
                    addReportFunction(file,self);       
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
    submitReport(event){
        event.preventDefault();
        var ticketId = this.props.id;
        console.log("id :"+ticketId);
        Meteor.call("uploadReport",ticketId,(error,result)=>{
            console.log("result:"+result);            
            if(result == 1){
            //Auto allocate to quality team member
            //Get max allocate number for quality team member
                var memberDetails = Meteor.users.find({"roles":"quality team member"},{sort:{'count':1}}).fetch();
                var companyObj = CompanySettings.findOne({"maxnoOfTicketAllocate.role":"quality team member"});
                for(var i=0;i<companyObj.maxnoOfTicketAllocate.length;i++){
                    if(companyObj.maxnoOfTicketAllocate[i].role == "quality team member"){
                        var allocatedtickets = companyObj.maxnoOfTicketAllocate[i].maxTicketAllocate;
                    }
                }
                
                for(var k=0;k<memberDetails.length;k++){
                var newTicketAllocated = {
                    'ticketid' : this.props.id,
                    'empID'    : memberDetails[k]._id,
                    'role'     : 'quality team member',
                    'status'   : "ReportSubmit",
                }
                
                // var ticketBucketDetail = TicketBucket.findOne({"ticketid":newTicketAllocated.ticketid});
                // if(ticketBucketDetail){
                    var ticketId = newTicketAllocated.ticketid;
                    var empID    = newTicketAllocated.empID;
                    var role     = newTicketAllocated.role;
                    var status     = newTicketAllocated.status;    
                    Meteor.call('addQTM',ticketId,empID,role,status,function(error,result){
                        
                    });
                // }
                    

                if(memberDetails[k].count){
                    var newCount = memberDetails[k].count + 1;
                } else{
                    var newCount = 1;
                }
                    Meteor.call('updateCommitteeUserCount',newCount,memberDetails[k]._id);
                    break;
                }
            }
        });
    }   
    
    addQAStatus(event){
        event.preventDefault();
        var ticketId = this.props.id;
        Meteor.call('updateQAStatus',ticketId)

    }
  
    render(){
        if (!this.props.loading) {
            return(
                <div>
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xm-12 col-xs-12">
                        <div className="col-lg-6 col-lg-offset-1">
                            <input type="file" ref="uploadReportFile" id="uploadReport" name="uploadReport" className="col-lg-7 reporttitle noLRPad" onChange={this.handleReportUpload.bind(this)} multiple />
                        </div>
                        <div className="col-lg-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc" onClick={this.submitReport.bind(this)}>Submit</button>
                        </div>
                        <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    {/* <div className="col-lg-12 noLRPad borderBottomBlock">
                        <div className="col-lg-12 noLRPad Selectimg reporttitle dataDetails"> Upload Report:</div>
                        <div className="col-lg-10 col-lg-offset-2">
                            <div className="col-lg-6 col-lg-offset-1">
                                <input type="file" ref="uploadReportFile" id="uploadReport" name="uploadReport" className="col-lg-7 reporttitle noLRPad" onChange={this.handleReportUpload.bind(this)} multiple />
                            </div>
                            <div className="col-lg-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc" onClick={this.submitReport.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </div> */}
                     {/* <div className="col-lg-12 noLRPad borderBottomBlock">
                        <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">Quality Team Member</h5>
                        <div className="col-lg-12 noLRPad Selectimg reporttitle dataDetails"> Download Report:</div>                
                        <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        </div>

                        <div className="docbtnwrap col-lg-6 col-lg-offset-4">
                            <button type="button" className="bg-primary col-lg-4 ApprovRejDoc" data-status="QAPass" onClick={this.addQAStatus.bind(this)}>Approve</button>
                            <button type="button" className="btn-danger col-lg-4 ApprovRejDoc" data-status="QAFail">Reject</button>
                        </div>
                    </div>  */}
                  {/*  <div className="col-lg-12 noLRPad borderBottomBlock">
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
          id      : _id,
        //   getTicket : getTicket
      };
})(UploadReport);
export default uploadReportContainer;