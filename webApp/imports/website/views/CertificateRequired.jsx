import React, { Component }  from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
// import Certificate from '../forms/Certificate.jsx';
import { UserProfile } from '../forms/api/userProfile.js';
import {browserHistory} from 'react-router';

export default class CertificateRequired extends TrackerReact(Component){
	constructor(props){
    super(props); 
    this.state ={
      "subscription" : {
        // "userData" : Meteor.subscribe('userprofile',Meteor.userId()),    
        // "userProfileData" : Meteor.subscribe("userProfileData"),
      } 
    }
  }
  editCertificate(event){
    event.preventDefault();
    var idVal= $(event.target).attr('data-target'); 
    $('#'+idVal).modal('show');
    // Session.set('editExp','editexperienceinfo');
  }
  deleteCertificate(event){
    event.preventDefault();
    var index = $(event.target).attr('data-index');
    Meteor.call("removeCertificateData",index,(error, result)=>{
      if (error) {
       console.log(error.reason);
      }else{  
        $('#delCertificateInfo-'+index).modal('hide');
      }
    });
  }
  render() {
  	// console.log("certificateData",this.props.certificateData);
    return ( 
      <div>
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <i className="fa fa-certificate col-lg-1 col-md-1 col-sm-1 col-xs-1 viewlogo"></i> 
          <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 viewTitle">Certification Information</span>
          {
            // browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
            //   Meteor.userId() == this.props.currentUrl ?
            //     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add-btn">
            //       <i className="fa fa-plus add-plus pull-right" data-toggle="modal" data-target="#certificateinfo"></i>
            //     </div>
            //   :
            //   ""
            // :
            // <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add-btn">
            //   <i className="fa fa-plus add-plus pull-right" data-toggle="modal" data-target="#certificateinfo"></i>
            // </div>
          }
        </div>
        <div className="Experience-info col-lg-12 col-md-12 col-sm-12 col-xs-12" >
          {this.props.certificateData ?
            this.props.certificateData.map((certificateDetails, index)=>{
              return (   
		           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"  key={index}>             
			           {/* { browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms' 
                    ?
                     ""
                    : 
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                      <input type="checkbox" className="reqInfocheck" name="certificateCheck" id={certificateDetails.chkid} value={"Certificate Details : "+certificateDetails.certificateId}/>
                    </div> 
                 } */}
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noProfilePadding">
			              <div className={certificateDetails.editStatus == "Reopen" ? "reOpenedu-box" : "edu-box"}>
			              <img src="/images/assureid/certificate.png" className="college-img"/>
			              </div>
			            </div>
			            <div className={ browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl || browserHistory.getCurrentLocation().pathname == '/profileForms' ? "edu-university col-lg-9 col-md-9 col-sm-9 col-xs-9" : "edu-university col-lg-8 col-md-8 col-sm-8 col-xs-8" }>
			              <span className="university-name">{certificateDetails.certificateName}</span><br />
			              <span className="company-name">{certificateDetails.issuedBy}</span><br />
			              <span className="year">{certificateDetails.certificatedOn ? moment(certificateDetails.certificatedOn).format('MMMM YYYY') : ""}</span>                
			            </div>
                  { 
                    this.props.currentUrl ?
                      (certificateDetails.editStatus == "Open" || certificateDetails.editStatus == "Reopen") && Meteor.userId() == this.props.currentUrl ?
                       <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                         <i className="fa fa-trash edit-pencil pull-right add-btn" title="Delete Certificate" data-toggle="modal" onClick={this.editCertificate.bind(this)} data-target={"delCertificateInfo-"+index}></i>
    		                 <i className="fa fa-pencil edit-pencil pull-right add-btn" onClick={this.editCertificate.bind(this)} title="Edit Certificate" data-toggle="modal" data-target={"editCertificateInfo-"+index} style={{marginRight: '10'+'px'}}></i>
    		               </div>
                       :
                       ""
                    :
                    certificateDetails.editStatus == "Open" || certificateDetails.editStatus == "Reopen" ?
                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                         <i className="fa fa-trash edit-pencil pull-right add-btn" title="Delete Certificate" data-toggle="modal" onClick={this.editCertificate.bind(this)} data-target={"delCertificateInfo-"+index}></i>
                         <i className="fa fa-pencil edit-pencil pull-right add-btn" onClick={this.editCertificate.bind(this)} title="Edit Certificate" data-toggle="modal" data-target={"editCertificateInfo-"+index} style={{marginRight: '10'+'px'}}></i>
                      </div>
                    :
                    ""
                  }
                  <div className="modal fade" id={"delCertificateInfo-"+index} role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 deleteModal">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <p className="">Do you want to delete this data?</p>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 yesDelete" onClick={this.deleteCertificate.bind(this)} data-index={index}>Yes</button>
                            &nbsp;&nbsp;
                            <button type="button" className="pull-right btn btn-default col-lg-3 col-md-3 col-sm-3 col-xs-3 noDelete" data-dismiss="modal">No</button>
                          </div>
                        </div>
                        <div className="modal-footer">
                        </div>
                      </div>  
                    </div>
                  </div>
		              <div className="modal fade" id={"editCertificateInfo-"+index} role="dialog">
		                <div className="modal-dialog">
		                  <div className="modal-content">
		                    <div className="modal-body">
		                      <button type="button" className="close" data-dismiss="modal">&times;</button>
		                      <div className="row">
		                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                          <h4 className="text-center">Edit Certificate Information</h4>
		                          <br/>
		                         {/* <Certificate key={index + '-certificate'} certificateValues={certificateDetails} indexValue={index}/> */}
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
            browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props.currentUrl ?
              Meteor.userId() == this.props.currentUrl ?
                <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">Please add your Certificate Information</span>
              :
              <p>No data available.</p>
            :
            <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">Please add your Certificate Information</span>
          }
        </div>
        <div className="modal fade" id="certificateinfo" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="text-center">Add Certificate Information</h4>
                    <br/>
                    {/* <Certificate /> */}
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }

}