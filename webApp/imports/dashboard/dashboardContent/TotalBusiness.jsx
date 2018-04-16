import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import { TicketMaster} from '/imports/website/ServiceProcess/api/TicketMaster.js';


class TotalBusiness extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }
    // amchartDisplay()
   componentDidlMount(){

      var chart = AmCharts.makeChart( "chartdiv", {
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
        // return chart;
      

      //   if(!this.props.loading &&  this.props.dataWithLabels.length > 0 ){
      //     var chart = AmCharts.makeChart( "totalbusiness",{
      //         "type": "pie",
      //         "theme": "light",
      //         "dataProvider": this.props.dataWithLabels,
      //         "valueField": "litres",
      //         "titleField": "country",
      //         "balloon":{
      //         "fixedPosition":true
      //         },
      //         "export": {
      //           "enabled": true
      //         }
      //     });
      //   return (<div id="totalbusiness"></div>);
      // }else{
      //   return(<span>No Data Available</span>)
      // }
    }

    render(){
        return(    
            <div className="col-lg-12 col-md-3 col-sm-3 col-xs-3 noLRPad">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerblock innerblock1 tableinnetWrap noLRPad">
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ticketTableLabel ticketchartTableLabel">Total Business                     
                    <span>
                        <Link to="/ComingSoon" title="View All">
                            {/* <i className="fa fa-arrow-right pull-right arrowcolor" aria-hidden="true"></i> */}
                        </Link>
                    </span>
                </label>
                <div id="totalbusiness">
                  {/* {this.amchartDisplay()} */}
                </div>
                  
                </div>
               
            </div>
        )
    }
}
export default TotalBusinessContainer = withTracker(props => {
  var ticketHandle = Meteor.subscribe("allTickets");
  var loading   = !ticketHandle.ready();
  var allTickets = TicketMaster.find({}).fetch();
  var serviceArray = [];
  var datavalues = [];
  var datalabels = [];
  var dataWithLabels = [];
  if(allTickets.length> 0){
    for(i=0;i<allTickets.length;i++){
      var serviceValue = allTickets[i].serviceName;
      serviceArray.push({'service':serviceValue});
    }
   
    var pluckService = _.pluck(serviceArray,"service");
    var uniqueService = _.uniq(pluckService);

    console.log("uniqueService");
    console.log(uniqueService);
    if(uniqueService.length>0){
      for(j=0;j<uniqueService.length;j++){
          var ticketDetails = TicketMaster.find({'serviceName':uniqueService[j]}).fetch();
          var count = ticketDetails.length;
        console.log("count :"+count);
        // datavalues.push(count);
        dataWithLabels.push({'country':uniqueService[j],'litres':count});
        
        }//EOF j

      }//EOF i
      // chartValues(dataWithLabels);
  }

     
  return {
    loading,    
    dataWithLabels
  };
})(TotalBusiness);