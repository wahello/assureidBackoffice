import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EducationForm extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
       "educationLevel"            : '',
       "educationQualification"    : '',
       "educationMode"             : '',
       "dateAttendedFrom"          : '',
       "dateAttendedTo"            : '',
       "collegeName"               : '',
       "university"                : '',
       "collegeAddress"            : '',
       "rollNo"                    : '',
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
  submitAcademicInfo(event){
    event.preventDefault(); 
    var id   = Meteor.userId();
    var education = {
      "educationLevel"            : this.refs.educationLevel.value,
      "educationQualification"    : this.refs.educationQualification.value,
      "educationMode"             : this.refs.educationMode.value,
      "dateAttendedFrom"          : this.refs.dateAttendedFrom.value,
      "dateAttendedTo"            : this.refs.dateAttendedTo.value,
      "collegeName"               : this.refs.collegeName.value,
      "university"                : this.refs.university.value,
      "collegeAddress"            : this.refs.collegeAddress.value,
      "rollNo"                    : this.refs.rollNo.value,
    }
    Meteor.call('insertEducation',id,education,function (error,result) {
     if(error){
        console.log(error.reason);
      }else{
        swal("Done","Education Details added successfully!","success"); 
        // $("#educationLevel").val("");  
        // $("#educationQualification").val("");
        // $("#educationMode").val("");  
        // $("#dateAttendedFrom").val("");  
        // $("#dateAttendedTo").val("");  
        // $("#collegeName").val("");  
        // $("#university").val("");  
        // $("#collegeAddress").val("");  
        // $("#rollNo").val(""); 
        // $("#professionalQualification").val("");  
        // $("#registrationNo").val("");  
        // $("#dateOfQualification").val("");  
        // $("#qualifyingBodyNm").val("");  
        // $("#professionalRollNo").val("");  
      }
    });
  }

  render(){
    return(
      <form className="educationForm basicForm">
        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <select className="effect-21 form-control loginInputs" id="educationLevel" name="educationLevel" ref="educationLevel" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}>
              <option disabled="disabled" selected="true">-- Select --</option>
              <option>Post Graduation</option>
              <option>Graduation</option>
              <option>Diploma</option>
              <option>HSC</option>
              <option>SSC</option>
              <option>Below Matriculation</option>
              <option>Others</option>
            </select>       
            <label>Level</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="educationQualification" name="educationQualification" ref="educationQualification" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Qualification</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <select className="effect-21 form-control loginInputs" id="educationMode" name="educationMode" ref="educationMode" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}>
              <option disabled="disabled" selected="true">-- Select --</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Distance</option>
            </select> 
            <label>Mode</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "> 
          <label style={{marginTop: "10"+"px"}}>Dates Attended (MM/YYYY)</label>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group"> 
           <span className="input-group-addon addons " id="basic-addon1"><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <input type="date" className="effect-21 form-control loginInputs" id="dateAttendedFrom" name="dateAttendedFrom" ref="dateAttendedFrom" onChange={this.handleChange}  onBlur={this.inputEffect.bind(this)}/>
            <label className="">From</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons " id="basic-addon1"><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <input type="date" className="effect-21 form-control loginInputs" id="dateAttendedTo" name="dateAttendedTo" ref="dateAttendedTo" onChange={this.handleChange}  onBlur={this.inputEffect.bind(this)}/>
            <label className="">To</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>

        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons UniversityAddons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="collegeName" name="collegeName" ref="collegeName" onChange={this.handleChange}   onBlur={this.inputEffect.bind(this)}/>
            <label>College / Institute</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
         <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons UniversityAddons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="university" name="university" ref="university" onChange={this.handleChange}   onBlur={this.inputEffect.bind(this)}/>
            <label>University</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-building-o" aria-hidden="true"></i></span>
            <textarea className="effect-21 form-control loginInputs" onBlur={this.inputEffect.bind(this)} ref="collegeAddress"></textarea>
            <label>College Address</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons UniversityAddons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="number" className="effect-21 form-control loginInputs" id="rollNo" name="rollNo" ref="rollNo" onChange={this.handleChange}   onBlur={this.inputEffect.bind(this)}/>
            <label>Regn No. / Roll No. / Seat No.</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-info pull-right" onClick={this.submitAcademicInfo.bind(this)}>Save</button>
      </form>
    );
  }
}
