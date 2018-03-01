import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AssureIdModal from './AssureIdModal.jsx';
import OTPModal from './OTPModal.jsx';
import DoHaveProfile from './DoHaveProfile.jsx';

export default class DemoPage extends React.Component{
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
      <div className="col-lg-12" style={{marginTop: 150 + "px", marginBottom: 100 + "px"}}>
        <AssureIdModal /> 
        <OTPModal />
        <DoHaveProfile /> 
      </div>
    );
  }
}
