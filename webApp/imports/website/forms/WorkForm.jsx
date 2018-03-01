import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class WorkForm extends React.Component{
  constructor(){
    super();
    this.state ={
     "nameOfEmployer"           : '',
     "employerAddress"          : '',
     "contactNo"                : '',
     "employeeCode"             : '',
     "designation"              : '',
     "department"               : '',
     "employmentFrom"           : '',
     "employmentTo"             : '',
     "lastSalaryDrawn"          : '',
     "typeOfEmployement"        : '',
     "detailOfAgency"           : '',
     "reasonOfLeaving"          : '',
     "dutiesAndResponsibilites" : '',
     "reportingManagerNm"       : '',
     "prevDesignation"          : '',
     "contactDetails"           : '',
     "subscription" : {
        "userProfileData" : Meteor.subscribe("userProfileData"),
      }
    };
   this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  handleChange(event){
   event.preventDefault();
   const target = event.target;
   const name   = target.name;
   this.setState({
    [name]: event.target.value,
   });
  }
  inputEffect(event){
    event.preventDefault();
    // alert('hi');
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      $(event.target).removeClass("has-content");
    }
  }
  submitEmployerInformation(event){
    event.preventDefault();
    var id   = Meteor.userId();
    var employement = {
      "nameOfEmployer"           : this.refs.nameOfEmployer.value,
      "employerAddress"          : this.refs.employerAddress.value,
      "contactNo"                : this.refs.contactNo.value,
      "employeeCode"             : this.refs.employeeCode.value,
      "designation"              : this.refs.designation.value,
      "department"               : this.refs.department.value,
      "employmentFrom"           : this.refs.employmentFrom.value,
      "employmentTo"             : this.refs.employmentTo.value,
      "lastSalaryDrawn"          : this.refs.lastSalaryDrawn.value,
      "typeOfEmployement"        : this.refs.typeOfEmployement.value,
      "detailOfAgency"           : this.refs.detailOfAgency.value,
      "reasonOfLeaving"          : this.refs.reasonOfLeaving.value,
      "dutiesAndResponsibilites" : this.refs.dutiesAndResponsibilites.value,
      "reportingManagerNm"       : this.refs.reportingManagerNm.value,
      "prevDesignation"          : this.refs.prevDesignation.value,
      "contactDetails"           : this.refs.contactDetails.value,

    }
    Meteor.call('insertEmployement',id,employement,function (error,result) {
     if(error){
        console.log(error.reason);
      }else{
        swal("Done","Employement Details added successfully!","success");
        $("html,body").scrollTop(0);
        $('#menu3').removeClass('in active');
        $('.menu3').removeClass('active');
        $('#menu5').addClass('in active');
        $('.menu5').addClass('active'); 
        // $("#nameOfEmployer").val("");  
        // $("#employerAddress").val("");
        // $("#contactNo").val("");  
        // $("#employeeCode").val("");  
        // $("#designation").val("");  
        // $("#department").val("");  
        // $("#employmentFrom").val("");  
        // $("#employmentTo").val("");  
        // $("#lastSalaryDrawn").val(""); 
        // $("#typeOfEmployement").val("");  
        // $("#detailOfAgency").val("");  
        // $("#reasonOfLeaving").val("");  
        // $("#dutiesAndResponsibilites").val("");  
        // $("#reportingManagerNm").val("");  
        // $("#prevDesignation").val("");  
        // $("#contactDetails").val("");  
      }
    });
  }
  render(){
    return(
      <form className="workForm basicForm">
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="nameOfEmployer" name="nameOfEmployer" ref="nameOfEmployer" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Name of Employer</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="employerAddress" name="employerAddress" ref="employerAddress" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Company Address</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-phone" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="contactNo" name="contactNo" ref="contactNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Company Contact No</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-id-badge" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="employeeCode" name="employeeCode" ref="employeeCode" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Employee Code / Employee ID</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="designation" name="designation" ref="designation" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Designation</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="department" name="department" ref="department" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Department</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
          <label  style={{marginTop: "10"+"px"}}>Employment Period</label>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <input type="date" className="effect-21 form-control loginInputs" id="employmentFrom" name="employmentFrom" ref="employmentFrom" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label className="">From</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <input type="date" className="effect-21 form-control loginInputs" id="employmentTo" name="employmentTo" ref="employmentTo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label className="">To</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-inr" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="lastSalaryDrawn" name="lastSalaryDrawn" ref="lastSalaryDrawn" onChange={this.handleChange}  onBlur={this.inputEffect.bind(this)}/>
            <label>Last Salary Drawn</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <select className="effect-21 form-control loginInputs" id="typeOfEmployement" name="typeOfEmployement" ref="typeOfEmployement" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}>
              <option disabled="disabled" selected="true">-- Select --</option>
              <option>Permanent</option>
              <option>Temporary</option>
              <option>Contractual</option>
            </select>
            <label className="">Type of Employment</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div> 
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-info" aria-hidden="true"></i></span>
            <textarea rows="2" className="effect-21 form-control loginInputs" ref="detailOfAgency" id="detailOfAgency" name="detailOfAgency" onBlur={this.inputEffect.bind(this)}></textarea>
            <label>Details of Agency [If deployed from another agency]</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="reasonOfLeaving" name="reasonOfLeaving" ref="reasonOfLeaving" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Reason Of Leaving</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <textarea rows="2" className="effect-21 form-control loginInputs" ref="dutiesAndResponsibilites" id="dutiesAndResponsibilites" name="dutiesAndResponsibilites" onBlur={this.inputEffect.bind(this)}></textarea>
            <label>Duties & Responsibilities</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="reportingManagerNm" name="reportingManagerNm" ref="reportingManagerNm" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Reporting Manager Name</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="prevDesignation" name="prevDesignation" ref="prevDesignation" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Reporting Manager Designation</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons"><i className="fa fa-info" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="contactDetails" name="contactDetails" ref="contactDetails" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Reporting Manager Contact No</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-info pull-right" onClick={this.submitEmployerInformation.bind(this)}>Save</button>
      </form>
    );
  }
}
