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

class VerifyDetailsDocument extends TrackerReact(Component){
	constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      } 
    }
  }

  render(){
    if (!this.props.loading) {
        this.props.getTicket.verificationData.verificationType
        switch(this.props.getTicket.verificationData.verificationType){

            case 'employement':
            return(
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">     
                                
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                                        <h5 className="dataDetails"> {this.props.getTicket.verificationData.verificationType}</h5>
                                        
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                            {this.props.getTicket.verificationData.nameOfEmployer}
                                            {this.props.getTicket.verificationData.employerAddress}
                                            {this.props.getTicket.verificationData.contactNo}
                                            {this.props.getTicket.verificationData.employeeCode}
                                            {this.props.getTicket.verificationData.designation},{this.props.getTicket.verificationData.department},{this.props.getTicket.verificationData.employmentFrom},
                                            {this.props.getTicket.verificationData.employmentTo},{this.props.getTicket.verificationData.typeOfEmployement} {this.props.getTicket.verificationData.dutiesAndResponsibilites}
                                            
                                            </div>
                                        </div>                
                                    </div>
                            
                    </div>
                    )
            break;

            case 'permanentAddress':
                    return(       
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                    
                                { 
                                    
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h5 className="dataDetails">Permanent Address</h5>
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                                {this.props.getTicket.verificationData.line1}
                                                {this.props.getTicket.verificationData.line2}
                                                {this.props.getTicket.verificationData.line3}
                                                {this.props.getTicket.verificationData.landmark}
                                                {this.props.getTicket.verificationData.city},{this.props.getTicket.verificationData.state},{this.props.getTicket.verificationData.country},{this.props.getTicket.verificationData.pincode},
                                                Residing From {this.props.getTicket.verificationData.residingFrom} Residing Till {this.props.getTicket.verificationData.residingTo}
                                                </div>
                                            </div>       
                                        </div>
                                }
                        </div>       
                );
                break;
                case 'currentAddress':
                        return(
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                                     
                                {
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                                            <h5 className="dataDetails"> Current Address</h5>
                                            
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                                {this.props.getTicket.verificationData.tempLine1}
                                                {this.props.getTicket.verificationData.tempLine2}
                                                {this.props.getTicket.verificationData.tempLine3}
                                                {this.props.getTicket.verificationData.tempLandmark}
                                                {this.props.getTicket.verificationData.tempCity},{this.props.getTicket.verificationData.tempState},{this.props.getTicket.verificationData.tempPincode},
                                                Residing From {this.props.getTicket.verificationData.residingFrom} Residing Till {this.props.getTicket.verificationData.residingTo}
                                                </div>
                                            </div>                
                                        </div>
                                }
                            </div>  
                        );

                break;

                case 'education':
                        return(
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                    
                                { 
                                    
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h5 className="dataDetails">{this.props.getTicket.verificationData.verificationType}</h5>
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                                {this.props.getTicket.verificationData.educationLevel}
                                                {this.props.getTicket.verificationData.educationQualification}
                                                {this.props.getTicket.verificationData.specialization}
                                                {this.props.getTicket.verificationData.grades}
                                                {this.props.getTicket.verificationData.educationMode},
                                                {this.props.getTicket.verificationData.dateAttendedFrom}-{this.props.getTicket.verificationData.dateAttendedTo},
                                                {this.props.getTicket.verificationData.collegeName} {this.props.getTicket.verificationData.university}
                                                {this.props.getTicket.verificationData.collegeAddress} 
                                                </div>
                                            </div>       
                                        </div>
                                }
                            </div>
                        );
                break;

                // case 'skills':
                //     return(
                //     <h6>Inside skills</h6>
                //     );
                // break;

                case 'certificates':
                return(
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                    
                        { 
                            
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h5 className="dataDetails">{this.props.getTicket.verificationData.verificationType}</h5>
                                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                        {this.props.getTicket.verificationData.certificateName}
                                        {this.props.getTicket.verificationData.issuedBy}
                                        {this.props.getTicket.verificationData.certificatedOn}
                                        {this.props.getTicket.verificationData.validTill}
                                        
                                        </div>
                                    </div>       
                                </div>
                        }
                    </div>
                );
                break;
                
                case 'professionalEducation':
                        return(
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                    
                                { 
                                    
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h5 className="dataDetails">{this.props.getTicket.verificationData.verificationType}</h5>
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                                                {this.props.getTicket.verificationData.professionalQualification}
                                                {this.props.getTicket.verificationData.registrationNo}
                                                {this.props.getTicket.verificationData.dateOfQualification}
                                                {this.props.getTicket.verificationData.professionalRollNo}
                                                {this.props.getTicket.verificationData.qualifyingBodyNm}
                                                </div>
                                            </div>       
                                        </div>
                                }
                            </div>
                        );
                break;
                
                default:
                        
                return(
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">                    
                        <h4>Oops Something Went Wrong</h4>
                    </div>
                );

                

                
                
            
        }
    
   }else{
    return(
       <span>Loading</span>
      );
   }
   
  }
}
verifyDetailsDocumentsContainer = withTracker(props => {  
    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {}; 
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
        //   firstTicketElen : firstTicketElen,
      };
})(VerifyDetailsDocument);
export default verifyDetailsDocumentsContainer;
