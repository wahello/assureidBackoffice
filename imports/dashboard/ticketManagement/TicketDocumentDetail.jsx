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
import { UserProfile } from '/imports/website/forms/api/userProfile.js';


export default class TicketDocumentDetails extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      "subscription" : {
        "singleTicket" : Meteor.subscribe("singleTicket"), 
        "userProfileSubscribe": Meteor.subscribe("userProfileData"),   
      } 
    }
  }
  acceptpermanentTicket(event){
    event.preventDefault();
    var id = "ffuEFEKHTAovKhqR6";
    var keyValue = "permanentAddress";
    var userProfile = UserProfile.findOne({"userId":id});
    var status = $(event.currentTarget).attr('data-status');
    console.log("status :"+status);
    var arrLen = userProfile+"."+keyValue+"."+length;

    if(arrLen){
        var currentObj = userProfile.permanentAddress[arrLen-1];
        currentObj.status = status;
        currentObj.date   = new Date();
    }
    
    Meteor.call("addDocument",currentObj,id,keyValue,function(error,result){
        if(result){
            console.log("add successfully");
        }
    });

   

  }

    acceptTicket(event){
        $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
        $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
        var path = "/admin/ticketdocumentdetails";
        browserHistory.replace(path);

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

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                    </div>
                                    
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm  pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptreject">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject">Reject</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Permanent Address</h5>
                                        <p>
                                            11/56, Premjyoti Co Op HSG Soc.
                                            Rambaug – 5, Kalyan (W), 
                                            Maharashtra - 421301
                                        </p>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                        <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptTicket acceptreject" data-status = "Approved" onClick={this.acceptpermanentTicket.bind(this)}>Approved</button>
                                                <button type="button" className="btn btn-info rejectTicket acceptreject" data-status = "Reject" onClick={this.acceptpermanentTicket.bind(this)}>Reject</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Current Address</h5>
                                        <p>
                                            11/56, Premjyoti Co Op HSG Soc.
                                            Rambaug – 5, Kalyan (W), 
                                            Maharashtra - 421301
                                        </p>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                        <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.acceptTicket.bind(this)}">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.rejectTicket.bind(this)}">Reject</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Date of Birth</h5>
                                        <p>
                                        15 – August - 1982
                                        </p>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                        <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.acceptTicket.bind(this)}">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.rejectTicket.bind(this)}">Reject</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Adhar Card</h5>
                                        <p>
                                        123456789012
                                        </p>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">
                                        <img src="/images/assureid/pdf.png" className=" img-thumbnail ticketUserImage" /> 
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                        <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.acceptTicket.bind(this)}">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.rejectTicket.bind(this)}">Reject</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 approvedstatus">
                                    {/* <div className="col-lg-4 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12"> */}
                                        <button type="button" className="btn btn-primary btnapproved">Submit</button>
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
