import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import { Order } from '/imports/website/ServiceProcess/api/Order.js';
import { TicketMaster} from '/imports/website/ServiceProcess/api/TicketMaster.js';


class OpenOrdersForDispatchTeam extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }

    allTicketListDetails(ticketId){
      /**================== Ticket Information=================**/
      var sc  = ['NewScrAllocated','ScreenApproved','ScreenRejected'];
      var tl  = ['screenTLAllocated','Assign','Reassign'];
      var tm  = ['AssignAccept','AssignReject','SelfAllocated','ProofSubmit','VerificationPass','TMReviewRemark'];
      var fe  = ['FEAllocated','BAAllocated','ProofSubmit'];
      var qtm = ['VerificationPassQTMAllocated','QAPass','QTMReviewRemark','ReportGenerated'];
      var qtl = ['QAPassQTLAllocated','ReviewPass','QTLReviewRemark','ReportReGenerated'];
      var closeTicket = ['TicketClosed'];
      var tickteObj = {};
      var allTicketList = TicketMaster.findOne({"_id":ticketId});
      
      if(allTicketList){
        var ticket = allTicketList;
        var scObj  = {'role':'SC',  'date':'','color':'btn-default'};
        var tlObj  = {'role':'TL',  'date':'','color':'btn-default'};
        var tmObj  = {'role':'TM',  'date':'','color':'btn-default'};
        var feObj  = {'role':'','date':'','color':'btn-default'};
        // var feObj  = {'role':'FE',  'date':'','color':'btn-default'};
        var qtmObj = {'role':'QTM', 'date':'','color':'btn-default'};
        var qtlObj = {'role':'QTL', 'date':'','color':'btn-default'};
        var closeObj = {'role':'','date':'','color':'btn-default'};
        var blockDetails = [];

        var ticetEles = ticket.ticketElement;
        var ticketLength = ticetEles.length;
        
        for(var j=0;j<ticetEles.length;j++){
          
          var status = ticetEles[j].roleStatus;
          if(status != 'New'){
          var scIndex    = sc.indexOf(status);
          var tlIndex    = tl.indexOf(status);
          var tmIndex    = tm.indexOf(status);
          var feIndex    = fe.indexOf(status);
          var qtmIndex   = qtm.indexOf(status);
          var qtlIndex   = qtl.indexOf(status);
          var closeIndex = closeTicket.indexOf(status);
          
          
          if(tmIndex > 0 && feIndex > 0){
            var statusChk = ticetEles[j-1].roleStatus;
            if(statusChk == 'SelfAllocated'){
              feIndex = -1;
            }else{
              tmIndex = -1;
            }
          }

          var a = [scIndex,tlIndex,tmIndex,feIndex,qtmIndex,qtlIndex,closeIndex];
          var maxIndex = Math.max(scIndex,tlIndex,tmIndex,feIndex,qtmIndex,qtlIndex,closeIndex);
          var indexOfMaxValue = a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0); 
          if(indexOfMaxValue == 0){
            scObj={
              'role':'SC',
              'date': ticket.createdAt,
              'color':'btn-danger',
              'status':status
            }
          }else if(indexOfMaxValue == 1){
            tlObj={
              'role':'TL',
              'date': ticket.createdAt,
              'color':'btn-danger',
              'status':status
            }
            scObj.color = 'btn-success';

          }else if(indexOfMaxValue == 2){
            tmObj={
              'role':'TM',
              'date': ticket.createdAt,
              'color':'btn-success',
              'status':status
              
            }
            tlObj.color = 'btn-success';            
           

          }else if(indexOfMaxValue == 3){
            feObj={
              'role':'FE',
              'date': ticket.createdAt,
              'color':'btn-success',
              'status':status
              
            }
            tmObj.color = 'btn-success';            
            
          }else if(indexOfMaxValue == 4){
            qtmObj={
              'role':'QTM',
              'date': ticket.createdAt,
              'color':'btn-success',
              'status':status
              
            }
            tmObj.color = 'btn-success';            
            
          }else if(indexOfMaxValue == 5){
            qtlObj={
              'role':'QTL',
              'date': ticket.createdAt,
              'color':'btn-success',
              'status':status
              
            }
            scObj.color = 'btn-success';
            tmObj.color = 'btn-success';                        
            qtmObj.color = 'btn-success';            
            
          }else if(indexOfMaxValue == 6){
            closeObj={
              'role':'Ticket Close',
              'date': ticket.createdAt,
              'color':'btn-success',
              'status':status
            }

            scObj.color = 'btn-success';
            tmObj.color = 'btn-success';                        
            qtmObj.color = 'btn-success'; 
            qtlObj.color = 'btn-success';   
            tlObj.color = 'btn-success';            
          }
      }
          blockDetails =[scObj,tlObj,tmObj,feObj,qtmObj,qtlObj,closeObj];
        }// EOF j loop
        tickteObj={
          'ticketNumber' : allTicketList.ticketNumber,
          'status'       : blockDetails
        }
      }//EOF allTicketList
      // blockDetails.ticketNumber = allTicketList.ticketNumber;
      
     
      return tickteObj;
    }


    render(){
       return(            
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h2 className="box-title"> My Open Orders</h2> 
                    </div>
                      <div className="box-body">
                        <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* {this.props.ticketBucketData[0].orderId} */}
                            <div>
                              <div className="reports-table-main">
                                <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                  <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader UML-TableTr col-lg-12">
                                        <th className="col-lg-1"> Order No.</th>
                                        <th className="col-lg-2"> User Name</th>
                                        <th className="col-lg-2"> Service Purchased </th>
                                        <th className="col-lg-2"> Order Date </th>
                                        <th className="col-lg-1"> Completion Date </th>
                                        <th className="col-lg-1"> Final Status </th>                          
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      !this.props.loading ?
                                        this.props.allOrderList.map((data, index)=>{
                                          return(
                                              <tr className="col-lg-12 outerTrwrap" key={index}>
                                              <tr className="ordertablerowWrap col-lg-12" data-id={data._id}>
                                                  <td className="col-lg-1"><Link to={"/admin/orderdetails/"+data._id}>{data.orderNo}</Link></td>
                                                  <td className="col-lg-2"><Link to={"/admin/orderdetails/"+data._id}>{data.userName}</Link></td>
                                                  <td className="col-lg-2"><Link to={"/admin/orderdetails/"+data._id}>{data.serviceName}</Link></td>
                                                  <td className="col-lg-2"><Link to={"/admin/orderdetails/"+data._id}>{moment(data.createdAt).format('DD MMM YYYY')}</Link></td>
                                                  <td className="col-lg-1"><Link to={"/admin/orderdetails/"+data._id}>{moment(data.completedDate).format('DD MMM YYYY')}</Link></td> 
                                                  <td className="col-lg-1"> 
                                                      <div className={'noLRPad col-lg-9 ' + data.bgClassName}> 
                                                      <Link to={"/admin/orderdetails/"+data._id} className="statuswcolor">{data.orderStatus}</Link> </div> 
                                                       <i className="fa fa-caret-right orderDownArrow" data-toggle="collapse" data-target={"#collapseme"+index}> </i> 
                                                  </td> 
                                                 
                                              </tr>  
                                               <tr className="col-lg-12 trBottom">
                                               <div className="collapse out " id={"collapseme"+index}>
                                             
                                               {
                                                 data.ticket.map((ticketData,index)=>{
                                                  return(
                                                    <div  key={index}  className = "col-lg-12 noLRPad">
                                                        <span className="col-lg-12 noLRPad orderTicketHead">{ this.allTicketListDetails(ticketData.ticketId).ticketNumber}</span>
                                                        {
                                                          this.allTicketListDetails(ticketData.ticketId).status.map((statusData,index)=>{
                                                              return(
                                                                 statusData.status !="TicketClosed" && statusData.role != "" ?
                                                                    
                                                                      <div key = {index} className="col-lg-2">
                                                                        <div className={"col-lg-12 noLRPad dispatchtldiv "+ statusData.color}>
                                                                          <span className="col-lg-12 noLRPad orderRoleName">{statusData.role!='' ? statusData.role : ""}</span>
                                                                          <span className="col-lg-12 noLRPad">{statusData.date!='' ? moment(statusData.date).format('DD MMM YYYY'):""}</span>
                                                                        </div>
                                                                      </div>
                                                                   
                                                                :
                                                                statusData.status =="TicketClosed" ?
                                                                 
                                                                  <div className="col-lg-2 noLRPad" key = {index}>
                                                                    <div className="col-lg-12 noLRPad">
                                                                      <Link to={ticketData.report}>
                                                                        <img src="/images/assureid/pdf.png" className="img-responsive orderpdfimg"/>
                                                                      </Link>
                                                                    </div>
                                                                  </div>
                                                                 
                                                              :
                                                              null
                                                                
                                                              )
                                                          })
                                                                                                       
                                                        }   
                                                    </div>
                                                  )
                                                 })
                                               
                                               }
                                           
                                                
                                                {
                                                  
                                                  data.orderStatus =="New" ?
                                                  
                                                      <div className="col-lg-12">
                                                  
                                                      <Link to={"/admin/orderdetails/"+data._id}> 
                                                        <button type="button" className="col-lg-2 generatereportbtn orderGenerateReport pull-right">Generate Report</button>
                                                        </Link>
                                                      </div>
                                                  
                                                    :
                                                    null
                                                } 
                                                </div>
                                             </tr> 
                                             </tr>
                                          );
                                        })
                                      :
                                      <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td className ="nodata">Nothing To Dispaly</td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                      </tr>
                                    }
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
OpenOrdersForDispatchTeamContainer = withTracker(props => { 
    var handleAllOrdersList = Meteor.subscribe("allOrders");
    var handleAllTicketsList = Meteor.subscribe("allTickets");
    var loading = !handleAllOrdersList.ready() && !handleAllTicketsList.ready();
    var _id  = Meteor.userId();
    
    var allOrderList = Order.find({"allocatedToUserid":Meteor.userId(),"orderStatus":"Order Completed - Generating Report"},{sort:{createdAt: 1}}).fetch() || [];


    if(allOrderList){
        for(i=0;i< allOrderList.length; i++){
          switch(allOrderList[i].orderStatus){
            case 'Order Completed - Generating Report' :
              allOrderList[i].orderStatus = 'New';
              allOrderList[i].bgClassName = 'btn-primary';
              break;
            case 'Order Completed - Report Completed' :
              allOrderList[i].orderStatus = 'Completed';
              allOrderList[i].bgClassName = 'btn-success';
              break;
            default :
              allOrderList[i].orderStatus = 'Work In Progress';
              allOrderList[i].bgClassName = 'btn-warning';
              break;
          }
        } 
    }

    return {
        loading,
        allOrderList
    };
   
})(OpenOrdersForDispatchTeam);
export default OpenOrdersForDispatchTeamContainer;
