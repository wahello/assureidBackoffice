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
import UserInformation from './UserInformation.jsx';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import { TicketBucket } from '../../website/ServiceProcess/api/TicketMaster.js';
import { UserProfile } from '/imports/website/forms/api/userProfile.js';
import {CompanySettings} from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';

class TicketDocumentDetails extends TrackerReact(Component){
    constructor(props){
        super(props);
        
        this.state = {
            "ticketDocDetails" : {},
            "ticketDocDetailsBoth" : {},
            "ticketId" :'',
            "index"         : '',
            "addressType":'',
             "subscription" : {
              "singleTicket" : Meteor.subscribe("allTickets"),  
              "ticketBucket" : Meteor.subscribe("allTicketBucket"),
              "userProfileSubscribe": Meteor.subscribe("userProfileData"),   
              "companyData"  : Meteor.subscribe("companyData"),
          } 
        }
    }
    acceptpermanentTicket(event){
        event.preventDefault();
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
        var status = $(event.currentTarget).attr('data-status');
        var index = $(event.currentTarget).attr('data-index');
        var id = $(event.currentTarget).attr('data-id');
        var addressType = $(event.currentTarget).attr('data-addresstype');
           
        Meteor.call("addDocument",id,index,status,addressType,function(error,result){
            if(result){
                console.log("add successfully");
            }
        });  
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.loading){
            var ticketId = this.props.ticketId;
            var ticketObj = TicketMaster.findOne({'_id':ticketId,'ticketElement.0.empid':Meteor.userId()});
            if(ticketObj){
                
                if(ticketObj.addressType == "currentAddress"){
                    var arrLen = ticketObj.ticketElement[0].currentAddress.length;
                    var index  = arrLen-1;
                    
                    
                    this.setState({
                        'ticketId': ticketId,
                        'index': index,
                        'addressType': "Current Address",
                        'ticketDocDetails':ticketObj.ticketElement[0].currentAddress[arrLen-1],
                    });
                    
                } else if(ticketObj.addressType == "permanentAddress"){
                    var currentPos = 0;
                    var arrLen = ticketObj.ticketElement[0].permanentAddress.length;
                    var index  = arrLen-1;
                    this.setState({
                        'ticketId': ticketId,
                        'index': index,
                        'addressType': "Permanent Address",
                        'ticketDocDetails':ticketObj.ticketElement[0].permanentAddress[arrLen-1],
                    });
                    
                    
                } 
            }
        }
           
    }
    updateTicketStatus(event){
        console.log("Inside updateTicketStatus");
        event.preventDefault();
        var ticketId = $(event.currentTarget).attr('data-id');  
        var ticketObj = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid':Meteor.userId()});                         
        if(ticketObj){
          
            if(ticketObj.serviceName == 'Address Verification'){
                console.log("Inside ticketObj");
                var permanentLen = ticketObj.ticketElement[0].permanentAddress.length;
                var currentLen = ticketObj.ticketElement[0].currentAddress.length;
                if(ticketObj.ticketElement[0].permanentAddress.length> 0){
                    if(ticketObj.ticketElement[0].permanentAddress[permanentLen-1].status == "Approved"){
                        var finalStatus = "Approved";           
                    }else{
                        var finalStatus = "Rejected";
                    }    
                }else if(ticketObj.ticketElement[0].currentAddress.length> 0){
                    if(ticketObj.ticketElement[0].currentAddress[currentLen-1].status == "Approved"){
                        var finalStatus = "Approved";           
                    }else{
                        var finalStatus = "Rejected";
                    }    
                }
            }
            
            Meteor.call('updateTicketFinalStatus',ticketId,finalStatus,function(error,result){
                if(result){
    				var memberDetails = Meteor.users.find({"roles":"team leader"},{sort:{'count':1}}).fetch();
    				var companyObj = CompanySettings.findOne({"maxnoOfTicketAllocate.role":"team leader"});
    				for(var i=0;i<companyObj.maxnoOfTicketAllocate.length;i++){
    					if(companyObj.maxnoOfTicketAllocate[i].role == "team leader"){
    						var allocatedtickets = companyObj.maxnoOfTicketAllocate[i].maxTicketAllocate;
    					}
    				}
    				for(var k=0;k<memberDetails.length;k++){
    					
                        var newTicketAllocated = {
                            'ticketid' : ticketId,
                            'empID'    : memberDetails[k]._id,
                            'role'     : 'team leader',
                        }
    				    
                        Meteor.call('updateTicketBucket',newTicketAllocated,function(error,result){
                            if(result){
                                var ticketBucketDetail = TicketBucket.findOne({"ticketid":newTicketAllocated.ticketid});
                                if(ticketBucketDetail){
                                    var ticketId = newTicketAllocated.ticketid;
                                    var empID    = newTicketAllocated.empID;
                                    var role     = newTicketAllocated.role;
                                    if(ticketObj.ticketElement[0].permanentAddress.length> 0){
                                        var permanentAddress   = ticketObj.ticketElement[0].permanentAddress[permanentLen-1];
                                    }else{
                                        var permanentAddress = [];
                                    }
                                    if(ticketObj.ticketElement[0].currentAddress.length> 0){
                                        // var currentAddress     = ticketObj.ticketElement[0].currentAddress[currentLen-1];
                                        var currentAddress     = ticketObj.ticketElement[0].currentAddress;
                                    }else{
                                        var currentAddress = [];
                                    }
                                    Meteor.call('updateTicketElement',ticketId,empID,role,permanentAddress,currentAddress,function(error,result){
                                        
                                    });
                                } 
                            }
    					});
    						

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
    }

    acceptTicket(event){
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
        
    }
    rejectTicket(event){
        event.preventDefault();
        $(event.target).parent().parent().siblings('.otherInfoFormGroup').slideUp();
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
    }

  render(){
    
    return(            
      <div className ="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="box-header with-border">
                   <h2 className="box-title">Address Documents</h2> 
                  </div>
                  <div className="box-body">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     	
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 docwrap">
                                {
                                    this.state.addressType == "Current Address" ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                               <h5> {this.state.addressType}</h5>
                                               
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressdetails">
                                                {this.state.ticketDocDetails.tempLine1}
                                                {this.state.ticketDocDetails.tempLine2}
                                                {this.state.ticketDocDetails.tempLine3}, &nbsp;
                                                {this.state.ticketDocDetails.tempLandmark},
                                                {this.state.ticketDocDetails.tempCity},{this.state.ticketDocDetails.tempState}, {this.state.ticketDocDetails.tempState},{this.state.ticketDocDetails.tempPincode}

                                                  
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                                <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                            </div>
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                                <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                        <button type="button" className="btn btn-info acceptTicket acceptreject" data-addresstype={this.state.addressType} data-id={this.state.ticketId} data-index={this.state.index} data-status = "Approved" onClick={this.acceptpermanentTicket.bind(this)}>Approved</button>
                                                        <button type="button" className="btn btn-info rejectTicket acceptreject" data-addresstype = {this.state.addressType} data-id={this.state.ticketId} data-index={this.state.index} data-status = "Reject" onClick={this.acceptpermanentTicket.bind(this)}>Reject</button>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    :
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                            <h5> {this.state.addressType}</h5>
                                        
                                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressdetails">
                                                  {this.state.ticketDocDetails.line1}
                                                  {this.state.ticketDocDetails.line2}
                                                  {this.state.ticketDocDetails.line3}, &nbsp;
                                                  {this.state.ticketDocDetails.landmark},
                                                  {this.state.ticketDocDetails.city},{this.state.ticketDocDetails.state}, {this.state.ticketDocDetails.country},{this.state.ticketDocDetails.pincode}
                                                  {this.state.ticketDocDetails.residingFrom} - {this.state.ticketDocDetails.residingTo}
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                            <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                            <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                    <button type="button" className="btn btn-info acceptTicket acceptreject" data-addresstype={this.state.addressType} data-id={this.state.ticketId} data-index={this.state.index} data-status = "Approved" onClick={this.acceptpermanentTicket.bind(this)}>Approved</button>
                                                    <button type="button" className="btn btn-info rejectTicket acceptreject" data-addresstype = {this.state.addressType} data-id={this.state.ticketId} data-index={this.state.index} data-status = "Reject" onClick={this.acceptpermanentTicket.bind(this)}>Reject</button>
                                            </div>
                                        </div>
                                
                                    </div>
                                    
                                }
                               

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 approvedstatus">
                                    
                                        <button type="button" className="btn btn-primary btnapproved" data-id={this.state.ticketId} onClick={this.updateTicketStatus.bind(this)}>Submit</button>
                                    
                                </div>
                            </div>  
                            
                                          
                       </div>

                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                       </div>


                      
                     </div> 
                  </div>
      </div>    
    );
   }
}
ticketDocDetailContainer = withTracker(props => {
    
        var _id = props.ticketId;
        const postHandle = Meteor.subscribe('singleTicket',_id);
        const userfunction = Meteor.subscribe('userfunction');
        const singleTicket = Meteor.subscribe("allTickets"); 
        const ticketBucket = Meteor.subscribe("allTicketBucket");
        const userProfilSubscribe = Meteor.subscribe("userProfileData");   
        const companyData   = Meteor.subscribe("companyData");      
        const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
        const loading = !postHandle.ready() && !userfunction.ready() && !singleTicket.ready() && !ticketBucket.ready() && !userProfilSubscribe.ready() && !companyData.ready();
            return {
              loading  : loading,
              getTicket : getTicket,
              ticketId  : _id
          };
    })(TicketDocumentDetails);
    export default ticketDocDetailContainer;
    
