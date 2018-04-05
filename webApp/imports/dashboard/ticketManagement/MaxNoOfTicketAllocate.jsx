import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import {TicketMaster} from "/imports/website/ServiceProcess/api/TicketMaster.js";
import {Order} from "/imports/website/ServiceProcess/api/Order.js";
import {CompanySettings} from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';


class MaxNoOfTicketAllocate extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
            // "tableListData":[],
            // "tatDate": "",
            // "subscribe": Meteor.subscribe("allTickets"),
            // "subscribeOrder": Meteor.subscribe("allOrders"),
            "roleSubscribe" : Meteor.subscribe("rolefunction"),
            "roleList"      : [],
        }
        
    }

    componentDidMount(){
          this.roleTracker = Tracker.autorun(()=>{
          if(this.state.roleSubscribe.ready()){
            var allRoleObj  = Meteor.roles.find({name: { $nin: [ "superAdmin", "admin","user"]} }).fetch();
            if(allRoleObj){
              // console.log("allRoleObj :"+JSON.stringify(allRoleObj));
              this.setState({
                  "roleList": allRoleObj,
              })
            }
          }
      });
    }

    delAllocatedTicket(event){
    	event.preventDefault();
    	var selectedTax = this;
	  	var targetedID = event.currentTarget.id;
      Meteor.call('removeAllocatedTickets', targetedID);
    }

    editAllocatedTicket(event){
      event.preventDefault();
      var targetedID = event.currentTarget.id;
      var companyData = CompanySettings.findOne({"companyId":1});
      var maxTicketAllocate =  companyData.maxnoOfTicketAllocate[targetedID].maxTicketAllocate;
      var role              =  companyData.maxnoOfTicketAllocate[targetedID].role;
    	$(".numberallocated").val(maxTicketAllocate);
      $(".role").val(role);
          
        if ($(".companyTaxSubmit").text("Submit")){			
        	$(".companyTaxSubmit").html("Update");
        }
        Session.set('targetedID',targetedID);
        Session.set('role',role)
    }

    maxticketallocate(event){
      event.preventDefault();
      var formValues = {
        'maxTicketAllocate' : this.refs.numberallocated.value,
        'role'              : this.refs.role.value,
      }   
      var targetedID = Session.get('targetedID'); 
      var role = Session.get('role'); 
      if(targetedID){
        Meteor.call('updateAllocatedTicket',formValues,targetedID,(error, result)=>{
          if(error){
            console.log(error);
          }else{     

            swal('Allocated Ticket Updated!');
            $(".numberallocated").val('');
            $(".role").val('');
          }
        });
      }else{
        Meteor.call('insertMaxTicketAllocate', formValues ,(error,result) => {
          if(error){ 
          swal(error.reason);
          }else{      

          // CLEAR ALL FIELDS
          this.refs.numberallocated.value      = '';
          this.refs.role.value       = '';
          }
          })
      }

    }

    render(){
        return (
            <div className="content-wrapper">
              <section className="content-header">
                <h1> Ticket Management </h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="#"><i className="fa fa-newspaper-o" />Ticket Management</a></li>
                  <li className="active">Allocate Maximum Ticket</li>
                </ol>
              </section>
               <section className="content">
                 <div className="row">
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <div className="box box-primary">
                        <div className="box-header with-border">
                         <h2 className="box-title">Allocate Maximum Ticket</h2>  
                        </div>
                        <div className="box-body ">
                          <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 noofticketwrapouter">
                            <form id="maxnoofticketallocate" onSubmit={this.maxticketallocate.bind(this)}>
                              <div className="noofticketwrap col-lg-8 col-lg-offset-3 col-md-8 col-sm-12 col-xs-12">
                                <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                                  <span className="blocking-span">
                                      <label className="floating-label">Enter Maximum No. Of Tickets Allocate </label>
                                      <input type="text" className="form-control inputText numberallocated" ref="numberallocated"  required />
                                  </span>
                                </div>
                                <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                                  <span className="blocking-span">
                                      <label className="floating-label">Role</label>
                                      <select className="form-control allProductSubCategories role" aria-describedby="basic-addon1" ref="role">
                                        { this.state.roleList.map( (data, index)=>{
                                            return (
                                                <option key={index}>
                                                  
                                                  {data.name}
                                                </option>
                                            );
                                        })
                                        }
                                     </select>
                                  </span>
                                </div>
                                <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                  <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right companyTaxSubmit" type="submit" value="Submit" >Submit</button>
                                </div> 
                              </div> 
                            </form>
                          </div>  
                          {/* <ListOfUniversity /> */}
                        </div>
                     </div>
                     {
                       !this.props.loading ?
                      //  return(
                        <div className="col-lg-6 col-lg-offset-4 col-md-6 col-md-offset-4 col-sm-12 col-xs-12  ">
                          <div className="table-responsive">
                              <table className="table table-bordered table-striped table-hover">
                                <thead>
                                  <tr className="tableHeader">
                                    <th> Maximum No. of Ticket Allocated </th>
                                    <th> Role </th>
                                    <th> Action </th>
                                  </tr>
                                </thead>
                                 <tbody>
                                 { this.props.maxAllocatedData.map((allocationNumber,index)=>{
                                      return(
                                        <tr key={index}>
                                          <td> {allocationNumber.maxTicketAllocate} </td>			
                                          <td> {allocationNumber.role} </td>	
                                          <td>
                                          <button onClick={this.editAllocatedTicket.bind(this)} id={index} className="editTax fa fa-pencil-square-o"></button>	
                                          <button className= "taxDelete fa fa-trash delIcon detailsCenter" data-toggle="modal" data-target={`#del-${allocationNumber.role}`}></button>
                                            <div className="modal fade" id={`del-${allocationNumber.role}`} role="dialog">
                                              <div className="modal-dialog modal-sm">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    <h4 className="modal-title">Delete Max Ticket Allocated Count</h4>
                                                  </div>
                                                  <div className="modal-body">
                                                    <p><b>Are you sure you want to continue?.</b></p>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button  onClick={this.delAllocatedTicket.bind(this)} id={index} type="button" data-dismiss="modal" className="btn btn-danger deleteRole" >Delete</button>
                                                  <button type="button" data-dismiss="modal" className="btn btn-primary ">Cancel</button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            </td>	
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
                          </div>
                        </div>
                      //  )
                       :
                       ""
                     }
                    

                    </div>
                 </div>
               </section>
            </div> 
            );
    }
}export default maxTicketAllocationContainer = withTracker(props => {

  const companySettingHandle = Meteor.subscribe('companyData');
  var companyDetails = CompanySettings.findOne({'companyId':1});
  if(companyDetails){
    var maxAllocatedData = companyDetails.maxnoOfTicketAllocate;
  }else{
    var maxAllocatedData = [];
  }

  var loading = !companySettingHandle.ready();
  return{
    loading,
    maxAllocatedData,

  };

})(MaxNoOfTicketAllocate)
