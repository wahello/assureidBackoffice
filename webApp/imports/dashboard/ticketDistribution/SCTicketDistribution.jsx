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
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
import { CompanySettings } from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';


class SCTicketDistribution extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
    }
  }
   render(){
      var ticketMasterData = [1, 2, 3, 4]
      return(            
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h2 className="box-title">Screening Committee Ticket Details</h2> 
                    </div>
                      <div className="box-body">
                        <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* {this.props.ticketBucketData[0].orderId} */}
                            <div>
                              <div className="reports-table-main">
                                <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                  <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader info UML-TableTr">
                                    {
                                        
                                            this.props.scNameArr.map((data,index)=>{
                                                return(
                                                    <th key={index}> {data.scName}</th>
                                                )
                                                
                                            })
                                       
                                            
                                    }
                                    </tr>
                                  </thead>
                                  <tbody>
                                  <tr>    
                                    {
                                        this.props.scCount.length>0?
                                            this.props.scCount.map((data,index)=>{
                                                return(
                                                    
                                                    <td key={index}>
                                                        <div className="divtdStyle">{data.count}/{this.props.MaxallocatedTickets ? this.props.MaxallocatedTickets:"" }</div>
                                                        <div className="divtdStyle">
                                                            {
                                                                data.ticketData.map((dataArr, i)=>{
                                                                    return(
                                                                            <div key={i}>
                                                                        <Link to={"/mainadmin/ticket/"+dataArr.id}>
                                                                            
                                                                                {dataArr.ticketNumber}
                                                                        </Link>
                                                                                
                                                                            </div>
                                                                        
                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                        
                                                    </td>
                                                    
                                                )
                                            })
                                        :
                                        ""
                                            
                                    }
                                       
                                 </tr>


                                
                              
                                 
                                    {/* {
                                        this.props.scNameArr.map((data, index)=>{
                                            return(
                                                <tr key={index}> 
                                                    {
                                                       data.ticketData.map((dataArr,i)=>{
                                                           return(
                                                                <td key={i}>
                                                                    {dataArr.ticketNumber}
                                                                </td>
                                                           );
                                                       }) 
                                                    }   
                                                   
                                                </tr>  
                                            );  
                                        })
                                    }  */}
                                    
                                       
                                 
                                  </tbody>
                                </table>
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
export default SCTicketDistributionContainer = withTracker(props => {

    var handleAllSCUsers = Meteor.subscribe('allUserData');
    console.log('handleAllSCUsers: ', handleAllSCUsers);
    var allTicketHandle = Meteor.subscribe('allTickets');
    var companyData = Meteor.subscribe('companyData');
    var allUsers = Meteor.users.find({"roles":{$in:['screening committee']}}).fetch();
    console.log('allUsers: ', allUsers);
    var scNameArr = [];
    var scCount   = [];

    var loading = !handleAllSCUsers.ready() && !companyData.ready();
    // var roles = Roles.userIsInRole(Meteor.users,['screening committee','team leader','quality team member','quality team leader'])
     
    var companyDetails =  CompanySettings.findOne({'companyId':1});
     if(companyDetails){
      var maxallocatedArr  = companyDetails.maxnoOfTicketAllocate;
      var singleObj  =  maxallocatedArr.find(o=>o.role === "screening committee");
     var MaxallocatedTickets = singleObj.maxTicketAllocate;
     }else{
      var MaxallocatedTickets = "";
     }

    if(allUsers.length>0){
        for(i=0;i<allUsers.length;i++){
            var ticketData = [];
            var scName = allUsers[i].profile.firstname +' '+ allUsers[i].profile.lastname;
            var count  = allUsers[i].count;
            var allTicket = TicketMaster.find({'ticketElement.allocatedToUserid':allUsers[i]._id}).fetch();
            if(allTicket.length>0){
                for(j=0;j<allTicket.length;j++){
                    ticketData.push({'id':allTicket[j]._id,"ticketNumber":allTicket[j].ticketNumber});
                }
            }
           
            scNameArr.push({"scName":scName,"ticketData":ticketData});

            var currentObj = {
                count: count,
                ticketData : ticketData,
            }

            scCount.push(currentObj);

        }
    }else{
        scNameArr = [];
        scCount   = [];
    }
    console.log("ticketData");
    console.log(ticketData);
    return {
        loading,
        scNameArr,
        scCount,
        MaxallocatedTickets,
        ticketData
    
    };
})(SCTicketDistribution);