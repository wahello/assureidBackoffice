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

class VerifiedDocuments extends TrackerReact(Component){
	constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      } 
    }
  }
  showDocuments(event){
    event.preventDefault();
    var idVal= $(event.currentTarget).attr('data-target');
     // console.log("idVal",idVal);
    $('#'+idVal).modal('show');
    // Session.set('editExp','editexperienceinfo');
  }
  render(){
    if (!this.props.loading) {
     return(            
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="verifiedDocumentsWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="verifiedDocumentsHeader text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <h5 className="dataDetails">Document Attachment:</h5>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressDashedLine">
          <div className="col-lg-10 col-lg-offset-1">
             {this.props.getTicket.addressType === "both" ?
                <div className="col-lg-10 col-lg-offset-1">
                   {this.props.firstTicketElen.permanentAddress ?
                      this.props.firstTicketElen.permanentAddress.map((permanentAddrProof, index)=>{
                        return (
                          <div key={index}>
                             <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" >
                               {/*<i className="fa fa-times-circle timeCircle"></i>**/}
                               <div data-toggle="modal" data-target={"showDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)}>
                                 <img src={permanentAddrProof.proofOfPermanentAddr} className="img-responsive addressImage"/>
                              </div>
                             </div>
                             <div className="modal fade" id={"showDocumnetsModal-"+index} role="dialog">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img src={permanentAddrProof.proofOfPermanentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                      </div>
                                    </div> 
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
                 
                   {this.props.firstTicketElen.currentAddress ?
                      this.props.firstTicketElen.currentAddress.map((currentAddrProof, index)=>{
                        return (
                          <div key={index}>
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" >
                             <div data-toggle="modal" data-target={"showcurrentDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)}>
                               <img src={currentAddrProof.proofOfCurrentAddr} className="img-responsive addressImage"/>
                             </div>
                           </div>
                            <div className="modal fade" id={"showcurrentDocumnetsModal-"+index} role="dialog">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img src={currentAddrProof.proofOfCurrentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                      </div>
                                    </div> 
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
                :
                ""
             }
             {this.props.getTicket.addressType === "permanentAddress" ?
                <div>
                   {this.props.firstTicketElen.permanentAddress ?
                      this.props.firstTicketElen.permanentAddress.map((permanentAddrProof, index)=>{
                        return (
                           <div key={index}>
                             <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" >
                               <div data-toggle="modal" data-target={"showPermanentDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)}>
                                <img src={permanentAddrProof.proofOfPermanentAddr} className="img-responsive addressImage"/>
                                </div>
                             </div>
                              <div className="modal fade" id={"showPermanentDocumnetsModal-"+index} role="dialog">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-body">
                                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <img src={permanentAddrProof.proofOfPermanentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                        </div>
                                      </div> 
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
                :
                ""
             }
             {this.props.getTicket.addressType === "currentAddress" ?
                <div>
                   {this.props.firstTicketElen.currentAddress ?
                      this.props.firstTicketElen.currentAddress.map((currentAddrProof, index)=>{
                        return (
                          <div key={index}>
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" >
                            <div data-toggle="modal" data-target={"CurrentAddrDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)}>
                              <img src={currentAddrProof.proofOfCurrentAddr} className="img-responsive addressImage"/>
                            </div>
                           </div>
                           <div className="modal fade" id={"CurrentAddrDocumnetsModal-"+index} role="dialog">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img src={currentAddrProof.proofOfCurrentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                      </div>
                                    </div> 
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
                :
                ""
             }
          </div>
          </div>
          </div>
        </div>    
      );  
   }else{
    return(
       <span>Loading</span>
      );
   }
   
  }
}
verifiedDocumentsContainer = withTracker(props => {  
    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
    if (getTicket) {
      var ticketElement = getTicket.ticketElement;
      if (ticketElement) {
         var firstTicketElen = ticketElement[0];
      }
     
    }
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
          firstTicketElen : firstTicketElen,
      };
})(VerifiedDocuments);
export default verifiedDocumentsContainer;
