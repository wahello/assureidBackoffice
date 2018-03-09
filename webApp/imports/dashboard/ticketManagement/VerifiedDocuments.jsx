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

/*
  hideShowRejectReason function for show reason block click on Reject button
*/

  hideShowRejectReason(){
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }

/*
    This function execute when document get approved.  
*/

  approvedDocument(){
    $('.showHideReasonWrap').removeClass('showReasonSection');

    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    var rejectReason = '';
    var status       = 'Aprooved';
    Meteor.call("addApproovedStatus",rejectReason,status,_id,(error,result)=>{
      if(error){
      }else{
        swal('Aprooved successfully');
      }
    });
  }



  submitRejectReason(event){
    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    var rejectReason =  $('.rejectReason').val();
    var status       = 'Reject';
    Meteor.call("addRejectStatus",rejectReason,status,_id,(error,result)=>{
      if(error){

      }else{
        swal('Rejected successfully');
      }
    });
  }

  /*
  hideShowRejectReason function for show reason block click on Reject button
*/

  hideShowRejectCurReason(){
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }

/*
    This function execute when document get approved.  
*/

  approvedCurDocument(){
    $('.showHideReasonWrap').removeClass('showReasonSection');

    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    var rejectReason = '';
    var status       = 'Aprooved';
    Meteor.call("addApproovedCurStatus",rejectReason,status,_id,(error,result)=>{
      if(error){
      }else{
        swal('Aprooved successfully');
      }
    });
  }

  

  submitRejectCurReason(event){
    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    var rejectReason =  $('.rejectReason').val();
    var status       = 'Reject';
    Meteor.call("addRejectCurStatus",rejectReason,status,_id,(error,result)=>{
      if(error){

      }else{
        swal('Rejected successfully');
      }
    });
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
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img src={permanentAddrProof.proofOfPermanentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                      </div>
                                      <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm  detailsbtn">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <button type="button" className="btn btn-info acceptTicket acceptreject">Approved</button>
                                              <button type="button" className="btn btn-info rejectTicket acceptreject">Reject</button>
                                          </div>
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
                                      <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm  detailsbtn">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <button type="button" className="btn btn-info acceptTicket acceptreject">Approved</button>
                                              <button type="button" className="btn btn-info rejectTicket acceptreject">Reject</button>
                                          </div>
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
                                        <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                          <div className="col-lg-12 col-md-12 showAddrWrap">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                                              {this.props.perAddrArray[0].line1}, 
                                              {this.props.perAddrArray[0].line2}
                                            </div> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              {this.props.perAddrArray[0].line3}, 
                                              {this.props.perAddrArray[0].landmark}
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              {this.props.perAddrArray[0].city},
                                              {this.props.perAddrArray[0].state}, 
                                              {this.props.perAddrArray[0].Country}, 
                                              {this.props.perAddrArray[0].pincode}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                          <img src={permanentAddrProof.proofOfPermanentAddr}  className="col-lg-12 img-responsive addressImageModal showAddrImgWrap col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                        </div>
                                        <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <button type="button" className="btn btn-info acceptTicket acceptreject" onClick={this.approvedDocument.bind()}>Approved</button>
                                              <button type="button" className="btn btn-info rejectTicket acceptreject" onClick={this.hideShowRejectReason.bind()}>Reject</button>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                        <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                              <textarea className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason" rows='2' placeholder="Enter Reject reason..."></textarea>
                                        </div>
                                        <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                          <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" onClick={this.submitRejectReason.bind(this)}>Submit</button>
                                        </div>
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
                                      <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                          <div className="col-lg-12 col-md-12 showAddrWrap">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                                              {this.props.curAddrArray[0].tempLine1}, 
                                              {this.props.curAddrArray[0].tempLine2}
                                            </div> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              {this.props.curAddrArray[0].tempLine3}, 
                                              {this.props.curAddrArray[0].tempLandmark}
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              {this.props.curAddrArray[0].tempCity},
                                              {this.props.curAddrArray[0].tempState}, 
                                              {this.props.curAddrArray[0].tempCountry}, 
                                              {this.props.curAddrArray[0].tempPincode}
                                            </div>
                                          </div>
                                        </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 curImgWrap">
                                        <img src={currentAddrProof.proofOfCurrentAddr}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                      </div>
                                      <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <button type="button" className="btn btn-info acceptTicket acceptreject" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                              <button type="button" className="btn btn-info rejectTicket acceptreject" onClick={this.hideShowRejectCurReason.bind()}>Reject</button>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                        <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                              <textarea className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason" rows='2' placeholder="Enter Reject reason..."></textarea>
                                        </div>
                                        <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                          <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" onClick={this.submitRejectCurReason.bind(this)}>Submit</button>
                                        </div>
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
         var perAddrArray = firstTicketElen.permanentAddress;
         if(perAddrArray){
          var perAddrArray = perAddrArray;
         }else{
          var perAddrArray = '';
         }
         console.log("permanentAddress",perAddrArray);
         var curAddrArray = firstTicketElen.currentAddress;
         if(curAddrArray){
            var curAddrArray = curAddrArray;
         }else{
          var curAddrArray = '';

         }
         console.log("currentaddress",curAddrArray);
      }
     
    }
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
          perAddrArray,
          curAddrArray,
          firstTicketElen : firstTicketElen,
      };
})(VerifiedDocuments);
export default verifiedDocumentsContainer;
