import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ListAcademics extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      "subscription" : {
      }
    }
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }

  render(){
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="table-responsive">          
          <table className="table table-bordered listAcademicsTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Degree / Diploma</th>
                <th>Specialization</th>
                <th>University / Institute</th>
                <th>Year of Passing</th>
                <th>Percentage / Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>M.tech.</td>
                <td>Computers</td>
                <td>Amravati University</td>
                <td>2016</td>
                <td>8.0</td>
                <td>
                  <span className="fa fa-pencil-square-o"></span>
                  <span className="fa fa-trash-o"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
