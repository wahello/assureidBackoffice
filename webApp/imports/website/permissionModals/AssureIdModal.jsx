import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DoHaveProfile from './DoHaveProfile.jsx';

export default class AssureIdModal extends React.Component{
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
 showDoHaveProfile(event){
    event.preventDefault();
    $('#assureIDModal').hide();
    $('#DoHaveProfile').show();
  }
  render(){
    return(
      <div>
        {/*<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#assureIDModal">Open Modal</button>

        <div id="assureIDModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-body text-center">*/}

                <div className="row text-center" id="assureIDModal">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <span>AssureID : </span>
                      <span> </span>
                    </p>
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button type="button" className="btn btn-info" onClick={this.showDoHaveProfile.bind(this)}>Submit</button>
                    </p>
                  </div>
                </div>

              {/*</div>
            </div>

          </div>
        </div>*/}
        <DoHaveProfile />
      </div>
    );
  }
}
