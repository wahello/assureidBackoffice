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
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';

class ReportGeneration extends TrackerReact(Component){
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
             {<label className="col-lg-12 reporttableHead">{this.props.getTicket ? this.props.getTicket.serviceName : 'Comming Soon'}</label>}
              <table className="table table-bordered reportGenTable">
                <tbody>
                  <tr style={{backgroundColor: '#'+'b9bed2'}}>
                    <td colSpan="2">Parameter</td>
                    <td colSpan="2">Information Provided</td>
                    <td colSpan="2" >Information Verified</td>
                  </tr>
                  {/*{
                    this.props.getTicket.reportGenerated.documents.documents.checkLists
                  }*/}

                 
                    {
                      this.props.getTicket ?

                      this.props.getTicket.reportGenerated.documents.documents.checkLists.map((data,i)=>{
                        return(

                          <tr key={i}>
                          <td colSpan="2">{data.titleVal}</td>
                          {
                            data.textVal.map((checkObjsRelatedField,index)=>{
                              return(
                                  <span key={index}>{checkObjsRelatedField.value},&nbsp;</span>
                              );
                            })
                          }
                          <td colSpan="2">{data.remarkVal ? data.remarkVal : 'NA' }</td>
                          </tr>
                        )
                         
                      })

                      :
                      null

                        
                    }
                  <tr>
                    <td colSpan="2">Remarks</td>
                    <td colSpan="3"> 
                       {
                          this.props.getTicket ?

                          this.props.getTicket.reportGenerated.reviewRemark.map((reviewData,i)=>{

                            return(
                                
                                  <span key={i}>{reviewData.remark}<br/><br/></span>
                            )
                          })
                          :
                          null
                      }
                    </td>
                  </tr>
                  
                 {/*} <tr>
                    <td colSpan="2">Remarks</td>
                    <td colSpan="3"> 
                      Multiple internet searches revealed that currently Coin Technologies Pvt Ltd is currently functional at the given address i.e. 1 floor, Pride Plaza, Senapati Bapat Road, Pune. [Refer Annexure B ] Call was placed at +91 20 60606017 [number mentioned on the experience certificate furnished by the Subject]. The call was answered by an executive at Rajmudra Travels who confirmed the address however refused to divulge any further information about the company. An email requesting the verification was sent at th info@segretotechnologies.com on 10 January 2018 was un-delivered. [Refer Annexure C] th Physical site visit conducted on 11 January 2018 at 107 & 108, 1st Floor, Pride Silicon Plaza, Senapati Bapat Road, Pune – 411016 [company address mentioned on the experience certificate furnished by the Subject] revealed that Segreto Technologies Pvt. Ltd. does not exist at the above stated address and currently COIN Technologies Pvt Ltd is operational at the stated address. [Refer Annexure D] Additionally, enquiries conducted with the HR official at COIN Technologies Pvt Ltd confirmed that Segreto Technologies Pvt. Ltd. did exist at the stated address however has ceased its operations 3 years ago in the year 2014 without any forwarding contact details. Enquires conduct with security personnel at COIN Technologies Pvt Ltd also confirmed that Segreto Technologies Pvt. Ltd. did exist at the stated address however has ceased its operations 3 years ago. Hence Inaccessible for Verification.
                    </td> 
                  </tr>
                  <tr>
                    <td colSpan="2">Status</td>
                    <td colSpan="3">INACCESSIBLE FOR VERIFICATION</td> 
                  </tr>*/}
                  
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
export default ReportGenerationContainer = withTracker(props => {
  //Get the ticket id from the url
  var currentLocation = browserHistory.getCurrentLocation();
  if(currentLocation){
    var splitUrl = currentLocation.pathname.split('/');
    var url = splitUrl[2]; 
    console.log('url ',url);
  // var handleSinTick = Meteor.subscribe("singleTicket",props.params.id);
    var idValue= url;
    var handleSinTick = Meteor.subscribe("singleTicket",idValue);

    console.log("handleSinTick");
    console.log(handleSinTick);
    var loading = !handleSinTick.ready();
    var getTicket = TicketMaster.findOne({"_id":"Gr6avMhJvcn3DXfTn"});
    if(getTicket){

    console.log('getTicket ',getTicket);
    console.log(getTicket.reportGenerated.documents.documents.checkLists);

    }
  }

  console.log("this.props.getTicket.reportGenerated.documents.documents.checkLists");
  // console.log(getTicket.reportGenerated);
  // if(url){
  //   var handleSinTick = Meteor.subscribe("singleTicket",url);
  //   var loading = !handleSinTick.ready();
  //   var getTicket = TicketMaster.findOne({"_id":url}) ;
  //   // if(getTicket){
  //   //   console.log('getTicket ',getTicket);
  //   //   
  //   // }
  // }
  return{
    // loading,
    getTicket
  }
})(ReportGeneration);
