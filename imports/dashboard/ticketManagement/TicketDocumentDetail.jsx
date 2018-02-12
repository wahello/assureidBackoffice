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


export default class TicketDocumentDetails extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      "subscription" : {
        "singleTicket" : Meteor.subscribe("singleTicket"),      
      } 
    }
  }

	 render(){
    // console.log("id = ",this.props.params.id);
    return(            
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header with-border">
                   <h2 className="box-title">Address Documents</h2> 
                  </div>
                  <div className="box-body">
                     <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     	 <div className="ticketHeader col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     	   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                     	   	  <img src="/images/assureid/Assure-ID-logo-Grey.png" className="assureidLogo" />
                     	   </div>
                         <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right outerTicketIcons">
                           <i className="fa fa-print ticketIcons" title="Print"></i>  
                           <i className="fa fa-file-pdf-o ticketIcons"  title="pdf"></i>  
                         </div>
                     	 </div> 
                       <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-2 col-lg-offset-1 col-md-4 col-sm-6 col-xs-6">
                                    <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 otherInfoForm pull-right detailsbtn">
                                    <div className="col-lg-12 col-md-4 col-sm-6 col-xs-6">
                                            <button type="button" className="btn btn-info acceptreject" onClick="{this.acceptTicket.bind(this)}">Accept</button>
                                            <button type="button" className="btn btn-info acceptreject" onClick="{this.rejectTicket.bind(this)}">Reject</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 docwrap">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp" data-toggle="modal" data-target="#docDetailModal">
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
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.acceptTicket.bind(this)}">Approved</button>
                                                <button type="button" className="btn btn-info acceptreject" onClick="{this.rejectTicket.bind(this)}">Reject</button>
                                        </div>
                                    </div>
                                       {/* Modal Code */}

                       {/* <div class="modal fade" id="docDetailModal" role="dialog">
                            <div class="modal-dialog">
                            
                            
                            <div class="modal-content">
                                <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Modal Header</h4>
                                </div>
                                <div class="modal-body">
                                <p>Some text in the modal.</p>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                            
                            </div>
                        </div>    */}
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
                            </div>  
                            
                                          
                       </div>


                      
                     </div> 
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>    
    );
   }
}
