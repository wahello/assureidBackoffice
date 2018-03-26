import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import { UserProfile } from '../forms/api/userProfile.js';
import { TempProofDocs } from "../forms/api/userProfile.js";
// import PermanentAddress from "../forms/PermanentAddress.jsx";
// import CurrentAddress from "../forms/CurrentAddress.jsx";

class AddressRequired extends TrackerReact(Component){
   constructor(props){
    super(props);
    this.state ={
      'permanentAddressId' : '', 
      'line1'           : '',
      'line2'           : '',
      'line3'           : '',
      'landmark'        : '',
      'city'            : '',
      'state'           : '',
      'country'         : '',
      'pincode'         : '',
      'residingFrom'    : '',  
      'residingTo'      : '',
      'tempLine1'       : '',
      'tempLine2'       : '',
      'tempLine3'       : '',
      'tempLandmark'    : '',
      'tempCity'        : '',
      'tempState'       : '',
      'tempCountry'     : '',
      'tempPincode'     : '',
      'tempresidingFrom': '',
      'tempresidingTo'  : '',
      'residingToDateOfAddress' : 'stillLivingHere',
      'currentResidingToDate'   : 'stillLivingHere',
      "proofData"       : {},
      "subscription" : {
        "userData" : Meteor.subscribe("userData",Meteor.userId()),
        "userProfileData" : Meteor.subscribe("userProfileData"),
        "LatestTempProofDocs" : Meteor.subscribe("LatestTempProofDocs"),
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    
  }
  handleChange(event){
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;
    // console.log("target",target);
    // console.log("name",event.target.value);
    this.setState({
      [name]: event.target.value,
    });
  }  
  editPermanaantAddress(event){
    var idVal= $(event.target).attr('data-target');
    console.log("idVal",idVal);
    $('#'+idVal).modal('show');
  }
  editCurrentAddress(event){
    var idVal= $(event.target).attr('data-target');
    $('#'+idVal).modal('show');
  }
  newaddPermAddressModal(event){
   event.preventDefault(); 
   $('#permaddAddressModal').modal('show');
  }
  newAddCurrentAddressModal(event){
   $('#currentaddAddressModal').modal('show');
  }
  deleteAcademics(event){
    event.preventDefault();
    var index = $(event.target).attr('data-index');
    Meteor.call("removePermanentAddress",index,(error, result)=>{
      if (error) {
       console.log(error.reason);
      }else{  
        $('#delPermanentAddrInfo-'+index).modal('hide');
      }
    });
  }
  deleteProfessionalAcadamic(event){
    event.preventDefault();
    var index = $(event.target).attr('data-index');
    Meteor.call("removeCurrentAddress",index,(error, result)=>{
      if (error) {
       console.log(error.reason);
      }else{  
        $('#delCurrentAddrInfo-'+index).modal('hide');
      }
    });
  }

  requiredAddressInformation(){ 
      return(
        <div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
            <i className="fa fa-id-card col-lg-1 col-md-1 col-sm-1 col-xs-1 viewlogo"></i> 
            <span className="col-lg-11 col-md-11 col-sm-11 col-xs-11 viewTitle">Address Information</span>
          </div> 
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressInfoOuter">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressInfoInner requiredAddress noProfilePadding">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                <h5 className="pull-left">Permanent Address</h5>
                {
                  // browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
                  //   Meteor.userId() == this.props.currentUrl ?
                  //     <i className="fa fa-plus pull-right add-btn" title="Add Address" onClick={this.newaddPermAddressModal.bind(this)}></i>              
                  //   :
                  //   ""
                  // :
                  // <i className="fa fa-plus pull-right add-btn" title="Add Address" onClick={this.newaddPermAddressModal.bind(this)}></i>              
                }
              </div>  
              { this.props.permanentAddress ?
                this.props.permanentAddress.map((permAddress,index)=>{
                  return(
                    <div key={index}> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding outerPermanentAddress">
                        { browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms'
                          ?
                           ""
                          : 
                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                            <input type="checkbox" className="reqInfocheck" name="permanentAddressCheck" id ={permAddress.chkid} value={"Permanent Address : "+permAddress.permanentAddressId}/>
                          </div>

                        }
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding">
                          <div className={permAddress.editStatus == "Reopen" ? "reOpenedu-box" : "edu-box"}>
                            <img src="/images/assureid/pinImage2.png" className="college-img"/>
                          </div>
                        </div>
                        <div className={ browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms' ? "edu-university col-lg-9 col-md-9 col-sm-9 col-xs-9" : "edu-university col-lg-8 col-md-8 col-sm-8 col-xs-8" }>
                          <span className="pull-left"> {permAddress.line1} {permAddress.line2 ? ', ' + permAddress.line2 : ""} {permAddress.line3 ? ', ' + permAddress.line3 : ""} {permAddress.landmark ? ', ' + permAddress.landmark : ""} {permAddress.city ? ', ' +permAddress.city : ""} {permAddress.state ? ', ' + permAddress.state : ""} {permAddress.country ? ', ' + permAddress.country : "" } {permAddress.pincode}</span><br />
                          <span className="year">{permAddress.residingFrom ? moment(permAddress.residingFrom).format('DD/MM/YYYY') + ' - ' : ""}{permAddress.residingTo ? permAddress.residingTo == 'Present' ? permAddress.residingTo : moment(permAddress.residingTo).format('DD/MM/YYYY') : ""}</span>                          
                        </div>
                        { 
                          this.props.currentUrl ?
                            (permAddress.editStatus == "Open" || permAddress.editStatus == "Reopen") && Meteor.userId() == this.props.currentUrl ?
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">                          
                              <i className="fa fa-trash edit-pencil pull-right add-btn" title="Delete Address" data-toggle="modal" onClick={this.editPermanaantAddress.bind(this)} data-target={"delPermanentAddrInfo-"+index}></i>
                              <i className="fa fa-pencil pull-right add-btn" title="Edit Address" data-toggle="modal" data-target={"permAddressModal-"+index} id={permAddress.permanentAddressId} onClick={this.editPermanaantAddress.bind(this)} style={{marginRight: '10' + 'px'}}></i>
                            </div>
                            :
                            ""
                          :
                          permAddress.editStatus == "Open" || permAddress.editStatus == "Reopen" ?
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">                          
                              <i className="fa fa-trash edit-pencil pull-right add-btn" title="Delete Address" data-toggle="modal" onClick={this.editPermanaantAddress.bind(this)} data-target={"delPermanentAddrInfo-"+index}></i>
                              <i className="fa fa-pencil pull-right add-btn" title="Edit Address" data-toggle="modal" data-target={"permAddressModal-"+index} id={permAddress.permanentAddressId} onClick={this.editPermanaantAddress.bind(this)} style={{marginRight: '10' + 'px'}}></i>
                            </div>
                          :
                          ""
                        }

                      </div>
                      <div className="modal fade" id={"delPermanentAddrInfo-"+index} role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 deleteModal">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                              </div>
                              <p className="">Do you want to delete this data?</p>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 yesDelete" onClick={this.deleteAcademics.bind(this)} data-index={index}>Yes</button>
                                &nbsp;&nbsp;
                                <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 noDelete" data-dismiss="modal">No</button>
                              </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                          </div>  
                        </div>
                      </div> 
                      <div className="modal fade" id={"permAddressModal-"+index} role="dialog">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  <h4 className="modal-title">Edit Permanent Address</h4>                 
                              </div>
                              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <form className="basicForm col-lg-12 col-md-12 col-sm-12 col-xs-12 addressForm" id={"permanentAddressForm-" + index}>
                                 {/* <PermanentAddress  id={this.props.userprofile._id} permanentAddressValues={permAddress} indexVal={index} /> */}
                                </form>
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
                browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
                  Meteor.userId() == this.props.currentUrl ? 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                      <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 noProfilePadding">
                        <span>Please Add Your Permanent Address</span>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                      </div>
                    </div> 
                  :
                  <p>No data available.</p>
                :
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 noProfilePadding">
                    <span>Please Add Your Permanent Address</span>
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                  </div>
                </div> 
              }
                        
            </div> 
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressInfoInner requiredAddress noProfilePadding">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                <h5 className="pull-left">Current Address</h5>
                {
                  // browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
                  //   Meteor.userId() == this.props.currentUrl ?
                  //     <i className="fa fa-plus pull-right add-btn" title="Add Address" onClick={this.newAddCurrentAddressModal.bind(this)}></i>              
                  //   :
                  //   ""
                  // :
                  // <i className="fa fa-plus pull-right add-btn" title="Add Address" onClick={this.newAddCurrentAddressModal.bind(this)}></i>              
                }  
              </div>  
              { this.props.currentAddress ?
                this.props.currentAddress.map((currentAddress,index)=>{
                  return(
                    <div key={index}> 
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding outerPermanentAddress">
                        { browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms' ?
                           ""
                          :   
                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                            <input type="checkbox" className="reqInfocheck" name="permanentAddressCheck" id ={currentAddress.chkid} value={"Current Address : "+currentAddress.currentAddressId}/>
                          </div>
                        }
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding">
                          <div className={currentAddress.editStatus == "Reopen" ? "reOpenedu-box" : "edu-box"}>
                            <img src="/images/assureid/pinImage2.png" className="college-img"/>
                          </div>
                        </div>
                        <div className={ browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms' ? "edu-university col-lg-9 col-md-9 col-sm-9 col-xs-9" : "edu-university col-lg-8 col-md-8 col-sm-8 col-xs-8" }>
                          <span className="pull-left"> {currentAddress.tempLine1} {currentAddress.tempLine2 ? ', ' + currentAddress.tempLine2 : ""} {currentAddress.tempLine3 ? ', ' + currentAddress.tempLine3 : ""} {currentAddress.tempLandmark ? ', ' +  currentAddress.tempLandmark : ""} {currentAddress.tempCity ? ', ' +  currentAddress.tempCity : ""} {currentAddress.tempState ? ', ' + currentAddress.tempState : ""} {currentAddress.tempCountry ? ', ' + currentAddress.tempCountry : ""} {currentAddress.tempPincode}</span><br />
                          <span className="year">{currentAddress.tempresidingFrom ? moment(currentAddress.tempresidingFrom).format('DD/MM/YYYY') + ' - ' : ""}{currentAddress.tempresidingTo ? currentAddress.tempresidingTo == 'Present' ? currentAddress.tempresidingTo : moment(currentAddress.tempresidingTo).format('DD/MM/YYYY') : ""}</span>                           
                        </div>
                        { 
                          this.props.currentUrl ?
                            (currentAddress.editStatus == "Open" || currentAddress.editStatus == "Reopen") && Meteor.userId() == this.props.currentUrl ?
                              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding"> 
                                <i className="fa fa-trash edit-pencil add-btn pull-right" title="Delete Address" onClick={this.editCurrentAddress.bind(this)} data-toggle="modal" data-target={"delCurrentAddrInfo-"+index}></i>
                                <i className="fa fa-pencil pull-right add-btn" title="Edit Address" data-toggle="modal" data-target={"currentAddressModal-"+index} id={currentAddress.currentAddressId} onClick={this.editCurrentAddress.bind(this)} style={{marginRight: '10' + 'px'}}></i>
                              </div>
                            :
                            ""
                          :
                          currentAddress.editStatus == "Open" || currentAddress.editStatus == "Reopen" ?
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding"> 
                              <i className="fa fa-trash edit-pencil add-btn pull-right" title="Delete Address" onClick={this.editCurrentAddress.bind(this)} data-toggle="modal" data-target={"delCurrentAddrInfo-"+index}></i>
                              <i className="fa fa-pencil pull-right add-btn" title="Edit Address" data-toggle="modal" data-target={"currentAddressModal-"+index} id={currentAddress.currentAddressId} onClick={this.editCurrentAddress.bind(this)} style={{marginRight: '10' + 'px'}}></i>
                            </div>
                          :
                          ""
                        }                        
                      </div> 
                      <div className="modal fade" id={"delCurrentAddrInfo-"+index} role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 deleteModal">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                              </div>
                              <p className="">Do you want to delete this data?</p>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 yesDelete" onClick={this.deleteProfessionalAcadamic.bind(this)} data-index={index}>Yes</button>
                                &nbsp;&nbsp;
                                <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 noDelete" data-dismiss="modal">No</button>
                              </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                          </div>  
                        </div>
                      </div>
                       <div className="modal fade" id={"currentAddressModal-"+index} role="dialog">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  <h4 className="modal-title">Edit Current Address</h4>                 
                              </div>
                              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <form className="basicForm col-lg-12 col-md-12 col-sm-12 col-xs-12 addressForm" id={"currentAddressForm-"+index}>
                                 {/* <CurrentAddress  id={this.props.userprofile._id} currentAddressValues={currentAddress} indexVal={index} /> */}
                                </form>
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
                browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
                  Meteor.userId() == this.props.currentUrl ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                      <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 noProfilePadding">
                           <span>Please Add Your Current Address</span>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                      </div>
                    </div> 
                  :
                  <p>No data available.</p>
                :
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 noProfilePadding">
                       <span>Please Add Your Current Address</span>
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 noProfilePadding">
                  </div>
                </div> 
              }
                        
            </div> 

            
           <div className="modal fade" id="permaddAddressModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Add Permanent Address</h4>                 
                    </div>
                    <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressForm basicForm" id="addPermanentAddressForm">
                        {/* <PermanentAddress key={this.props.proofPerAddrData._id + 'editPermanentAddr'} proofPerAddrData={this.props.proofPerAddrData}/> */}
                      </form>
                    </div> 
                    <div className="modal-footer">
                    </div>
                  </div> 
                </div>
           </div> 
            <div className="modal fade" id="currentaddAddressModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Add Current Address</h4>                 
                    </div>
                    <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressForm basicForm" id="addCurrentAddressForm">
                        {/* <CurrentAddress key={this.props.proofCurrAddrData._id + 'editCurrentAddr'} proofCurrAddrData={this.props.proofCurrAddrData}/> */}
                      </form>
                    </div> 
                    <div className="modal-footer">
                    </div>
                  </div> 
                </div>
            </div> 
          </div> 
       </div>
      );  
  }
  render(){
    // console.log(this.props.profileId);
    if (!this.props.loading1) {
     return (
        <div>
          {this.requiredAddressInformation()}
        </div>
      );  
    }else{
      return(
        <span></span>
      );
    }
  }
}
addrRequiredContainer = withTracker(props => {
    // console.log('props: ',this.props);
    var _id = props.profileId;
    var id = Meteor.userId();
    // console.log("_id",_id);
    const postHandle1      = Meteor.subscribe('userprofile',Meteor.userId());
    const postHandle = Meteor.subscribe('TempProofDocs',Meteor.userId());
    var permanentAddress = props.permanentAddress;
    var currentAddress   = props.currentAddress;
    const userprofile      = UserProfile.findOne({"_id" : _id});
    const loading  = !postHandle.ready();
    const loading1 = !postHandle1.ready();
    const proofPerAddrData  = TempProofDocs.findOne({"userId":_id,"prooftype":"address","proofSubtype": 'permanentAddress'})|| {};
    // console.log("proofObj" ,proofObj);
    const proofCurrAddrData  = TempProofDocs.findOne({"userId":_id,"prooftype":"address","proofSubtype": 'currentAddress'})|| {};
    // console.log("proofData" ,proofData);
    // if(_id){
      // console.log("permanentAddress",permanentAddress);
      return {
          loading1 : loading1,
          userprofile : userprofile,
          // reqPermnentAddress : reqPermnentAddress,
          // reqCurrentAddress  : reqCurrentAddress,
          permanentAddress  : permanentAddress,
          currentAddress  : currentAddress,
          proofPerAddrData,
          proofCurrAddrData,
          loading,
      };
    // }
})(AddressRequired);
export default addrRequiredContainer;
