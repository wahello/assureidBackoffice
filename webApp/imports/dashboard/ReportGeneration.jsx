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


export default class ReportGeneration extends TrackerReact(Component){
  constructor(props){
    super(props);
  }
   render(){
      return(            
        <div>
          {/* <div className="content-wrapper"> */}
            <section className="content">
            <div className="reportgenerationwrap">
            {/* <h2 className="reportHead">Final Report</h2>  */}
            <div className="outerWrap">
            <label className="col-lg-12 reporttableHead">Employment Verification </label>
            <div className="col-lg-12 reporttablesecondHead">Research Findings</div>
            <table className="table table-bordered reportGenTable">
           
              <tbody>
                <tr>
                <td colSpan="1">Employer</td>
                  {/* <th>Employer</th> */}
                  <td colSpan="8">Segreto Technologies Pvt Ltd, Pune</td>
                {/* <td>john@example.com</td> */}
                </tr>
                <tr>
                  <td colSpan="1">Type of Ownership </td>
                  <td colSpan="1">Private Limited Company</td>
                  <td colSpan="2">Site Visit</td>
                  <td colSpan="2">Conducted</td>
                  
                </tr>
                <tr>
                  <td colSpan="1">CIN NO. </td>
                  <td colSpan="1">U72900PN2011PTC140744</td>
                  <td colSpan="2">Current Status</td>
                  <td colSpan="2">Closed</td>
                  
                </tr>
                <tr>
                <td colSpan="1">Registration In.</td>
                 <td colSpan="1">Pune</td>
                 <td colSpan="2">Past Aberrations</td>
                 <td colSpan="2">Nil</td>
                </tr>
                <tr style={{backgroundColor: '#'+'b9bed2'}}>
                  <td colSpan="2">Parameter</td>
                  <td colSpan="2">Information Provided</td>
                  <td colSpan="2" >Information Verified</td>
                </tr>
                <tr>
                  <td colSpan="2">Period of Employment</td>
                  <td colSpan="2">24 June 2013 – 18 July 2014</td>
                  <td colSpan="2">-</td>
                </tr>
                <tr>
                  <td colSpan="2">Employee ID</td>
                  <td colSpan="2">Not provided</td>
                  <td colSpan="2">-</td>
                </tr>
  
                <tr>
                  <td colSpan="2">Designation</td>
                  <td colSpan="2">MIS Executive</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Remunerations</td>
                  <td colSpan="2">Not provided</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Supervisor</td>
                  <td colSpan="2">Not provided</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Reason for Leaving</td>
                  <td colSpan="2">Company is closed in August 2014</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Exit Formalities Completed [ Y/ N]</td>
                  <td colSpan="2">-</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Any issue reported during employment</td>
                  <td colSpan="2">-</td>
                  <td colSpan="2">-</td>
                </tr>

                <tr>
                  <td colSpan="2">Eligible for Rehire</td>
                  <td colSpan="2">-</td>
                  <td colSpan="2">-</td>
                </tr>
                <tr>
                  <td colSpan="2">Document Authentication</td>
                  <td colSpan="3">-</td> 
                </tr>
                <tr>
                  <td colSpan="2">Verified through</td>
                  <td colSpan="3">-</td> 
                </tr>
                <tr>
                  <td colSpan="2">Remarks</td>
                  <td colSpan="3"> 
                    Multiple internet searches revealed that currently Coin Technologies Pvt Ltd is currently functional at the given address i.e. 1 floor, Pride Plaza, Senapati Bapat Road, Pune. [Refer Annexure B ] Call was placed at +91 20 60606017 [number mentioned on the experience certificate furnished by the Subject]. The call was answered by an executive at Rajmudra Travels who confirmed the address however refused to divulge any further information about the company. An email requesting the verification was sent at th info@segretotechnologies.com on 10 January 2018 was un-delivered. [Refer Annexure C] th Physical site visit conducted on 11 January 2018 at 107 & 108, 1st Floor, Pride Silicon Plaza, Senapati Bapat Road, Pune – 411016 [company address mentioned on the experience certificate furnished by the Subject] revealed that Segreto Technologies Pvt. Ltd. does not exist at the above stated address and currently COIN Technologies Pvt Ltd is operational at the stated address. [Refer Annexure D] Additionally, enquiries conducted with the HR official at COIN Technologies Pvt Ltd confirmed that Segreto Technologies Pvt. Ltd. did exist at the stated address however has ceased its operations 3 years ago in the year 2014 without any forwarding contact details. Enquires conduct with security personnel at COIN Technologies Pvt Ltd also confirmed that Segreto Technologies Pvt. Ltd. did exist at the stated address however has ceased its operations 3 years ago. Hence Inaccessible for Verification.
                  </td> 
                </tr>
                <tr>
                  <td colSpan="2">Status</td>
                  <td colSpan="3">INACCESSIBLE FOR VERIFICATION</td> 
                </tr>
                
              </tbody>
            </table>
            </div>
            </div>
            </section>
          {/* </div> */}
        </div>    
      );
    }
}
