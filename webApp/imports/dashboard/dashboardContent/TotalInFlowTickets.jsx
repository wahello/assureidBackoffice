import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';

export default class TotalInFlowTickets extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }

    componentWillMount(){

        var chart = AmCharts.makeChart( "inflowtickets", {
            "type": "serial",
            "addClassNames": true,
            "theme": "light",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,
            "balloon": {
              "adjustBorderColor": false,
              "horizontalPadding": 10,
              "verticalPadding": 8,
              "color": "#ffffff"
            },
          
            "dataProvider": [ {
              "year": 2009,
              "income": 23.5,
              "expenses": 21.1
            }, {
              "year": 2010,
              "income": 26.2,
              "expenses": 30.5
            }, {
              "year": 2011,
              "income": 30.1,
              "expenses": 34.9
            }, {
              "year": 2012,
              "income": 29.5,
              "expenses": 31.1
            }, {
              "year": 2013,
              "income": 30.6,
              "expenses": 28.2,
              "dashLengthLine": 5
            }, {
              "year": 2014,
              "income": 34.1,
              "expenses": 32.9,
              "dashLengthColumn": 5,
              "alpha": 0.2,
              "additional": "(projection)"
            } ],
            "valueAxes": [ {
              "axisAlpha": 0,
              "position": "left"
            } ],
            "startDuration": 1,
            "graphs": [ {
              "alphaField": "alpha",
              "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
              "fillAlphas": 1,
              "title": "Income",
              "type": "column",
              "valueField": "income",
              "dashLengthField": "dashLengthColumn"
            }, {
              "id": "graph2",
              "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
              "bullet": "round",
              "lineThickness": 3,
              "bulletSize": 7,
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "useLineColorForBulletBorder": true,
              "bulletBorderThickness": 3,
              "fillAlphas": 0,
              "lineAlpha": 1,
              "title": "Expenses",
              "valueField": "expenses",
              "dashLengthField": "dashLengthLine"
            } ],
            "categoryField": "year",
            "categoryAxis": {
              "gridPosition": "start",
              "axisAlpha": 0,
              "tickLength": 0
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
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ticketTableLabel">Total Inflow Of Tickets                     
                    <span>
                        <Link to="/ComingSoon" title="View All">
                            <i className="fa fa-arrow-right pull-right arrowcolor" aria-hidden="true"></i>
                        </Link>
                    </span>
                </label>
                <div id="inflowtickets">
                </div>
                </div>
               
            </div>
        )
    }
}
// AlllocatedTicketsContainer = withTracker(props => { 
   
// })(AlllocatedTickets);
// export default AlllocatedTicketsContainer;
