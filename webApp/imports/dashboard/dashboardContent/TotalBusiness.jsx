import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';

export default class TotalBusiness extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }

    componentWillMount(){
        var chart = AmCharts.makeChart( "totalbusiness", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "country": "Lithuania",
              "litres": 501.9
            }, {
              "country": "Czech Republic",
              "litres": 301.9
            }, {
              "country": "Ireland",
              "litres": 201.1
            }, {
              "country": "Germany",
              "litres": 165.8
            }, {
              "country": "Australia",
              "litres": 139.9
            }, {
              "country": "Austria",
              "litres": 128.3
            }, {
              "country": "UK",
              "litres": 99
            }, {
              "country": "Belgium",
              "litres": 60
            }, {
              "country": "The Netherlands",
              "litres": 50
            } ],
            "valueField": "litres",
            "titleField": "country",
             "balloon":{
             "fixedPosition":true
            },
            "export": {
              "enabled": true
            }
          } );
    }

    render(){
        return(    
            <div className="col-lg-12 col-md-3 col-sm-3 col-xs-3 noLRPad">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerblock tableinnetWrap noLRPad">
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ticketTableLabel">Total Business                     
                    <span>
                        <Link to="/ComingSoon" title="View All">
                            <i className="fa fa-arrow-right pull-right arrowcolor" aria-hidden="true"></i>
                        </Link>
                    </span>
                </label>
                <div id="totalbusiness" style={{"height":"400"+"px"}}>
                </div>
                </div>
               
            </div>
        )
    }
}
// AlllocatedTicketsContainer = withTracker(props => { 
   
// })(AlllocatedTickets);
// export default AlllocatedTicketsContainer;
