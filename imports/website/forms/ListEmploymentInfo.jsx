import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ListEmploymentInfo extends React.Component{
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
                <th>Designation</th>
                <th>Company</th>
                <th>From</th>
                <th>To</th>
                <th>Industry</th>
                <th>Description</th>
                <th>Skill Set</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Application Developer</td>
                <td>iAssure International Technologies Pvt Ltd</td>
                <td>4 Mar 2017</td>
                <td>Present</td>
                <td>IT Industry</td>
                <td></td>
                <td>Meteor JS</td>
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
