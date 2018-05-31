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
            <section className="contentForReport">
            <div className="reportgenerationwrap">
            <div className="outerWrap">
             {<label className="col-lg-12 reporttableHead">{this.props.getTicket ? this.props.getTicket.serviceName : 'Comming Soon'}</label>}
              <table className="table table-bordered reportGenTable">
                <tbody>
                  <tr style={{backgroundColor: '#'+'b9bed2'}}>
                    <td className="col-lg-3" >Parameter</td>
                    <td className="col-lg-4" >Information Provided</td>
                    <td className="col-lg-4" >Information Verified</td>
                  </tr>
                  {/*{
                    this.props.getTicket.reportGenerated.documents.documents.checkLists
                  }*/}
                    {
                      this.props.getTicket ?

                      this.props.getTicket.reportGenerated.documents.checkLists.map((data,i)=>{
                        return(

                          <tr key={i}>
                          <td className="col-lg-3">{data.titleVal}</td>
                          <td className="col-lg-4">
                          {
                            data.textVal.map((checkObjsRelatedField,index)=>{
                              return(
                                  <span key={index}>{checkObjsRelatedField.value},&nbsp;</span>
                              );
                            })
                          }
                          </td>
                          <td className="col-lg-4" >
                           <i className={data.correctVal == "Correct" ? "fa fa-check-circle fa-lg text-success" : data.correctVal == "Incorrect"  ? "fa fa-times-circle fa-lg text-danger" : "" }></i>
                          &nbsp;{data.remarkVal ? data.remarkVal : '' }
                          </td>
                          </tr>
                        )
                         
                      })
                      :
                      null

                        
                    }
                    {this.props.getTicket ?
                      this.props.getTicket.reportGenerated.documents.textLists ?
                         this.props.getTicket.reportGenerated.documents.textLists.map((data,i)=>{
                           return(
                              <tr key={i}>
                                <td>{data.task}</td>
                                <td className="text-left" colSpan="3">{data.value}</td>
                              </tr>
                            );
                         })
                       :
                       null
                      :
                      null

                    }
                  <tr>
                    <td>Remarks</td>
                    <td className="text-left" colSpan="3"> 
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
               {this.props.getTicket ?
                  this.props.getTicket.reportGenerated.documents.images ?
                    this.props.getTicket.reportGenerated.documents.images.length > 0 ?
                    this.props.getTicket.reportGenerated.documents.images.map((data,i)=>{
                      return(
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerReportImage" key={i}>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <img src={data.imageLink} className="img img-responsive imagesOnReport" />
                            </div> 
                          </div>
                        );
                    })
                    :
                    null
                  :
                  null
                :
                null
               }
            </div>
            </div>
            </section>
          {/* </div> */}
        </div>    
      );
    }
}
export default ReportGenerationContainer = withTracker(props => {
  //Get id from the props
  var idValue = props.ticketId;
  if(!idValue){
    //Get the ticket id from the url
    var currentLocation = browserHistory.getCurrentLocation();
    if(currentLocation){
      var splitUrl = currentLocation.pathname.split('/');
      var url = splitUrl[2]; 
      console.log('url ',url);
      idValue= url;
    }
  }
  var handleSinTick = Meteor.subscribe("singleTicket",idValue);
  var loading = !handleSinTick.ready();
  var getTicket = TicketMaster.findOne({"_id":idValue});
  if(getTicket){

  // console.log('getTicket ',getTicket);
  // console.log(getTicket.reportGenerated.documents.documents.checkLists);

  }

return{
  getTicket
}
})(ReportGeneration);
