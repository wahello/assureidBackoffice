import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import {TicketMaster} from "/imports/website/ServiceProcess/api/TicketMaster.js";
import {Order} from "/imports/website/ServiceProcess/api/Order.js";


export default class MaxNoOfTicketAllocate extends TrackerReact(Component){
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
              console.log("allRoleObj :"+JSON.stringify(allRoleObj));
              this.setState({
                  "roleList": allRoleObj,
              })
            }
          }
      });
    }

    maxticketallocate(event){
      event.preventDefault();
      var formValues = {
        'maxTicketAllocate' : this.refs.numberallocated.value,
        'role'              : this.refs.role.value,
        
      }   
      console.log("formValue :"+JSON.stringify(formValues));
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
                                      <input type="text" className="form-control inputText UniversityName" ref="numberallocated" id="UniversityName"  required />
                                  </span>
                                </div>
                                <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                                  <span className="blocking-span">
                                      <label className="floating-label">Role</label>
                                      <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="role">
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
                                  <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="Submit" >Submit</button>
                                </div> 
                              </div> 
                            </form>
                          </div>  
                          {/* <ListOfUniversity /> */}
                        </div>
                     </div>
                    </div>
                 </div>
               </section>
            </div> 
            );
    }
}
