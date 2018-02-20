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



export default class TicketDocumentDetails extends TrackerReact(Component){
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

    componentDidMount(){
        this.ticketTracket=Tracker.autorun(()=>{
            if(this.state.subscription.singleTicket.ready()){
                var ticketId = this.props.ticketId;
                
                
                var ticketObj = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid':Meteor.userId()});
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
                    } else {
                        
                       
                        var currentPosCurrent = 1;
                        var index  = arrLen-1;                 
                        var arrLen = ticketObj.ticketElement[0].currentAddress.length;
                        this.setState({
                            'ticketId': ticketId,
                            'index': index,
                            'addressType': "both",
                            'ticketDocDetails':ticketObj.ticketElement[0].currentAddress[arrLen-1],
                        });

                        var currentPosPerm = 0;
                        var arrLen =ticketObj.ticketElement[0].permanentAddress.length;
                        var index  = arrLen-1;
                        this.setState({
                            'ticketId': ticketId,
                            'index': index,
                            'addressType': "both",
                            'ticketDocDetailsBoth':ticketObj.ticketElement[0].permanentAddress[arrLen-1],
                        });

                    
                    }
                    

                }
            }
        });
        

    }

    updateTicketStatus(event){

        event.preventDefault();
        console.log("inside onclick");
        var ticketId = $(event.currentTarget).attr('data-id');  
        console.log("ticketId :"+ticketId);
        var ticketObj = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid':Meteor.userId()});                         
        if(ticketObj){
            console.log(ticketObj);
                var permanentLen = ticketObj.ticketElement[0].permanentAddress.length;
                var currentLen = ticketObj.ticketElement[0].currentAddress.length;
                console.log("permanentLen :"+permanentLen);
                console.log("currentLen :"+currentLen);
            // console.log("ticketObj.ticketElement[0].permanentAddress.status:"+ticketObj.ticketElement[0].permanentAddress[permanentLen-1].status);
            // console.log("ticketObj.ticketElement[0].currentAddress.status:"+ticketObj.ticketElement[0].currentAddress[currentLen-1].status);
            // if((ticketObj.ticketElement[0].permanentAddress.length> 0) && (ticketObj.ticketElement[0].currentAddress.length> 0)){
            //     if((ticketObj.ticketElement[0].permanentAddress[permanentLen-1].status == "Approved")&&(ticketObj.ticketElement[0].currentAddress[currentLen-1].status== "Approved")){
            //         console.log("Inside if");
            //         var finalStatus = "Approved";
            //     }else{
            //         var finalStatus = "Rejected"
            //     }
            // }else if((ticketObj.ticketElement[0].permanentAddress.length> 0) || (ticketObj.ticketElement[0].currentAddress.length==0)){
            //     var finalStatus = "Approved";
            // }
            // else if((ticketObj.ticketElement[0].permanentAddress[permanentLen-1].status == "Approved") || (ticketObj.ticketElement[0].currentAddress[currentLen-1].status== "Approved")){
                           
            // }else{
            //     var finalStatus = "Rejected";
            // }
            // console.log("finalStatus :"+finalStatus);
            Meteor.call('updateTicketFinalStatus',ticketId,"Approved",function(error,result){
                if(result){
                    console.log("result :"+ticketId);
                    // var totalTicketCount =  TicketBucket.find({}).count();
					var memberDetails = Meteor.users.find({"roles":"team leader"},{sort:{'count':1}}).fetch();
					// var companyObj = CompanySettings.findOne({"maxnoOfTicketAllocate.role":"screening committee"});
					// for(var i=0;i<companyObj.maxnoOfTicketAllocate.length;i++){
					// 	if(companyObj.maxnoOfTicketAllocate[i].role == "team leader"){
					// 		var allocatedtickets = companyObj.maxnoOfTicketAllocate[i].maxTicketAllocate;
					// 		console.log("allocatedtickets :"+allocatedtickets);
					// 	}
					// }
					// var totalmulti = allocatedtickets*memberDetails.length;
					// if(totalTicketCount<totalmulti){
					// var allocateticket = companyObj.maxnoOfTicketAllocate.maxTicketAllocate;
					// console.log("allocateticket :"+allocateticket);
					// console.log("companyObj :"+companyObj);
					console.log("memberDetails :"+memberDetails);
					for(var k=0;k<memberDetails.length;k++){
					console.log("memberDetails length :"+memberDetails.length);						
					console.log("memberDetails length :"+memberDetails[k]._id);						
					console.log("memberDetails[k].count :"+memberDetails[k].count);						
						// if(memberDetails[k].count==undefined || memberDetails[k].count<allocatedtickets){
					console.log("inside if memberDetails[k].count :"+memberDetails[k].count);						
							
							var newTicketAllocated = {
								'ticketid' : ticketId,
								'empID'    : memberDetails[k]._id,
								'role'     : 'team leader',
							}
							// console.log(newTicketAllocated);
							Meteor.call('updateTicketBucket',newTicketAllocated,function(error,result){
								if(result){
									console.log("Onsuccess insertTicketBucket");
									var ticketBucketDetail = TicketBucket.findOne({"ticketid":"C63QuhxRN8oNHhyXf"});
										console.log("ticketBucketDetail:"+ticketBucketDetail);
									
									if(ticketBucketDetail){
										console.log("ticketBucketDetail:"+ticketBucketDetail);
										var ticketId = newTicketAllocated.ticketid;
										var empID    = newTicketAllocated.empID;
										var role     = newTicketAllocated.role;
										
	                                    var permanentAddresslen = ticketObj.ticketElement[0].permanentAddress.length;
                                        var currentAddresslen   = ticketObj.ticketElement[0].currentAddress.length;
                                        var permanentAddress   = [];
                                        var currentAddress     = ticketObj.ticketElement[0].currentAddress[currentLen-1];

                                        // console.log("ticketId :"+ticketId);
										// console.log("empID :"+empID);
										// console.log("role :"+role);
										// console.log(permanentAddress);
                                        // console.log(currentAddress);
										Meteor.call('updateTicketElement',ticketId,empID,role,permanentAddress,currentAddress,function(error,result){
                                            console.log("success updateTicketElement");
                                        });
										// Meteor.call("updateOuterStatus",ticketId,memberDetails._id);
		
									} 
								}
							});
							

							if(memberDetails[k].count){
								console.log("memberDetails[k].count :"+memberDetails[k].count);
								
								var newCount = memberDetails[k].count + 1;
							} else{
								var newCount = 1;
							}
							Meteor.call('updateCommitteeUserCount',newCount,memberDetails[k]._id);
							break;
						// }else{
						// 	console.log("Inside else updateCommitteeUserCount");							
						// 	// Meteor.call('updateCommitteeUserCount',0,memberDetails[k]._id);
						// }
					}
                }
            });

        
        }
    }

    acceptTicket(event){
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
        // var path = "/admin/ticketdocumentdetails";
        // browserHistory.replace(path);

    }
    rejectTicket(event){
        event.preventDefault();
        $(event.target).parent().parent().siblings('.otherInfoFormGroup').slideUp();
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
        // $(event.target).parent().parent().siblings().children().find('textarea').attr('disabled','disabled');
    }

	 render(){
    // console.log("id = ",this.props.params.id);
    return(            
      <div className ="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    {/* //     <div className="content-wrapper">
    //       <section className="content">
    //         <div className="row">
    //           <div className="col-md-12">
    //             <div className="box"> */}

                  <div className="box-header with-border">
                   <h2 className="box-title">Address Documents</h2> 
                  </div>
                  <div className="box-body">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     	 {/* <div className="ticketHeader col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     	   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                     	   	  <img src="/images/assureid/Assure-ID-logo-Grey.png" className="assureidLogo" />
                     	   </div>
                         
                     	 </div>  */}
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 docwrap">

                                {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                    </div>
                                    
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm  pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptreject">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject">Reject</button>
                                        </div>
                                    </div>
                                    
                                </div> */}
                                {
                                    this.state.addressType == "Current Address" || this.state.addressType == "Permanent Address" ?
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
                                    <div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                            <h5> Permanent Address</h5>
                                            
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressdetails">
                                                {this.state.ticketDocDetailsBoth.line1}
                                                {this.state.ticketDocDetailsBoth.line2}
                                                {this.state.ticketDocDetailsBoth.line3}, &nbsp;
                                                {this.state.ticketDocDetailsBoth.landmark},
                                                {this.state.ticketDocDetailsBoth.city},{this.state.ticketDocDetailsBoth.state}, {this.state.ticketDocDetailsBoth.country},{this.state.ticketDocDetailsBoth.pincode}
                                                {this.state.ticketDocDetailsBoth.residingFrom} - {this.state.ticketDocDetailsBoth.residingTo}
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                <h5> Current Address</h5>
                                                
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressdetails">
                                                    {this.state.ticketDocDetails.tempLine1}
                                                    {this.state.ticketDocDetails.tempLine2}
                                                    {this.state.ticketDocDetails.tempLine3}, &nbsp;
                                                    {this.state.ticketDocDetails.tempLandmark},
                                                    {this.state.ticketDocDetails.tempCity},{this.state.ticketDocDetails.tempState}, {this.state.ticketDocDetails.tempState},{this.state.ticketDocDetails.tempPincode}
                                                    {this.state.ticketDocDetails.tempresidingFrom} - {this.state.ticketDocDetails.tempresidingTo}
                                                    
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
                                    </div>
                                }
                               

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 approvedstatus">
                                    {/* <div className="col-lg-4 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12"> */}
                                        <button type="button" className="btn btn-primary btnapproved" data-id={this.state.ticketId} onClick={this.updateTicketStatus.bind(this)}>Submit</button>
                                    {/* </div> */}
                                </div>
                            </div>  
                            
                                          
                       </div>


                      
                     </div> 
                  </div>
                {/* </div>
              </div>
            </div>
          </section>
        </div> */}
      </div>    
    );
   }
}
