import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import { Order } from '/imports/website/ServiceProcess/api/Order.js';

class CompletedOrdersForDispatchTeam extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
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
                      <h2 className="box-title"> My Completed Orders</h2> 
                    </div>
                      <div className="box-body">
                        <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* {this.props.ticketBucketData[0].orderId} */}
                            <div>
                              <div className="reports-table-main">
                                <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                  <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader UML-TableTr">
                                      <th className=""> Order No.</th>
                                      <th className=""> Service Name </th>
                                      <th className=""> Receive Date </th>
                                      <th className=""> Due Date </th>
                                      <th className=""> Aging &nbsp;( In Days ) </th>                                      
                                      <th className=""> Status </th>                          
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      !this.props.loading ?
                                        this.props.allOrderList.map((data, index)=>{
                                          return(
                                              <tr key={index}>
                                                  
                                                  <td><Link to={"/admin/orderdetails/"+data._id}>{data.orderNo}</Link></td>
                                                  <td><Link to={"/admin/orderdetails/"+data._id}>{data.serviceName}</Link></td>
                                                  <td><Link to={"/admin/orderdetails/"+data._id}>{moment(data.createdAt).format('DD MMM YYYY')}</Link></td>
                                                  <td><Link to={"/admin/orderdetails/"+data._id}>{moment(data.tatDate).format('DD MMM YYYY')}</Link></td> 
                                                  <td><Link to={"/admin/orderdetails/"+data._id}>{Math.round(Math.abs((new Date().getTime() - data.createdAt.getTime())/(24*60*60*1000)))}</Link></td>
                                                  <td className={data.bgClassName}><Link to={"/admin/orderdetails/"+data._id} className="statuswcolor">{data.orderStatus}</Link></td>       
                                              </tr>
                                          );
                                        })
                                      :
                                      <tr>
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
AllOrderContainer = withTracker(props => { 
    var handleAllOrdersList = Meteor.subscribe("allOrders");
    var loading = !handleAllOrdersList.ready();
    var _id  = Meteor.userId();
    // var allOrderList = Order.find({"allocatedToUserid":Meteor.userId(),"orderStatus":"Order Completed - Generating Report"},{sort:{createdAt: 1}}).fetch() || [];
    var allOrderList = Order.find({"allocatedToUserid":Meteor.userId(),"orderStatus":"Order Completed - Report Completed"},{sort:{createdAt: 1}}).fetch() || [];
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
            case 'Clear':
              allOrderList[i].orderStatus = 'Completed';
              allOrderList[i].bgClassName = 'btn-success';
              break;
            default :
              allOrderList[i].orderStatus = 'Work In Progrss';
              allOrderList[i].bgClassName = 'btn-warning';
              break;
          }
        } 
    }
    
    

    return {
        loading,
        allOrderList
    };
   
})(CompletedOrdersForDispatchTeam);
export default AllOrderContainer;
