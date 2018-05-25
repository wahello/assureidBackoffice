import React, {Component} from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Router, Route, browserHistory} from 'react-router';

export default class OrderGeneration extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state ={ 
      "subscription" : { 
      } 
    };
  }
  componentDidMount(){      
  }

  render(){
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding generationHeader"> 
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pull-left">
            <img src="../images/assureid/Assure-ID-logo-Grey.png" className="generationImg" />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <h1 className="pull-right">FINAL SCREENING REPORT</h1>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 generationInfo">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Name :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">Nagesh Siddheshwar Kurle</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Reference :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">S001-50260-VS-2018</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Date :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">9 January 2018</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Level :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">Standard</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Account :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">SLK Group</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Client Reference :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">110988</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Date :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">17 January 2018</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Result :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">INACCESSIBLE</p>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <h3>EXECUTIVE SUMMARY</h3>
          <table className="table table-bordered generationTable">
            <thead>
              <tr>
                <th colSpan='3'>Employment Verification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wipro Limited, Pune</td>
                <td>Verified</td>
                <td>Clear</td>
              </tr>
              <tr>
                <td>Segreto Technologies Pvt. Ltd, Pune</td>
                <td>Verified</td>
                <td>Inaccessible for Verification</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}