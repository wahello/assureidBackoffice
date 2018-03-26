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
// import { TempTicketImages } from './api/TempUpload.js';
// import { TempTicketVideo } from './api/TempUpload.js';
// import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
// import { ChecklistFieldExpert } from '../reactCMS/api/Services.js';

export default class UploadReport extends TrackerReact(Component){
	 constructor(props){
    super(props); 
    this.state = {
      "subscription" : {
      } 
    } 
  }
  
    render(){
   	
        return(
            <div>.
                <div className="imgtitile col-lg-12 noLRPad">
                    <div className="col-lg-12  noLRPad Selectimg"> Upload Report:</div>
                    {/* <input type="file" ref="uploadReportFile" id="uploadReport" name="uploadReport"  onChange={this.handleUpload.bind(this)} className="col-lg-7 noLRPad" name="img" multiple /> */}
                </div>
            </div>
        );
   }
}