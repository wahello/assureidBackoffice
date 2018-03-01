import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ListAddress extends React.Component{
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
                <th>Address Type</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pin Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Permanant</td>
                <td>1/5/2 Hirkani Colony, Karve Nagar</td>
                <td>Pune</td>
                <td>Maharashtra</td>
                <td>India</td>
                <td>411 051</td>
                <td>
                  <span className="fa fa-pencil-square-o"></span>
                  <span className="fa fa-trash-o"></span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Current</td>
                <td>#323 iAssure International Technologies Pvt Ltd, Hadapsar</td>
                <td>Pune</td>
                <td>Maharashtra</td>
                <td>India</td>
                <td>411 028</td>
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
