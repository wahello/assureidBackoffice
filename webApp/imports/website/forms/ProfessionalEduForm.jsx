import React from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ProfessionalEduForm extends React.Component{
  constructor(){
    super();
    this.state ={
       "professionalQualification" : '',
       "registrationNo"            : '',
       "dateOfQualification"       : '',
       "qualifyingBodyNm"          : '',
       "professionalRollNo"        : '',
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
  submitProfessionalInfo(event){
    event.preventDefault(); 
    var id   = Meteor.userId();
    var education = {
      "professionalQualification" : this.refs.professionalQualification.value,
      "registrationNo"            : this.refs.registrationNo.value,
      "dateOfQualification"       : this.refs.dateOfQualification.value,
      "qualifyingBodyNm"          : this.refs.qualifyingBodyNm.value,
      "professionalRollNo"        : this.refs.professionalRollNo.value,
    }
    Meteor.call('insertProfessionalEducation',id,education,function (error,result) {
     if(error){
        console.log(error.reason);
      }else{
        swal("Done","Education Details added successfully!","success"); 
        $("html,body").scrollTop(0);
        $('#menu2').removeClass('in active');
        $('.menu2').removeClass('active');
        $('#menu3').addClass('in active');
        $('.menu3').addClass('active'); 
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
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="professionalQualification" name="professionalQualification" ref="professionalQualification" onChange={this.handleChange}   onBlur={this.inputEffect.bind(this)}/>
            <label>Qualification / Membersip</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="input-effect input-group"> 
           <span className="input-group-addon addons " id="basic-addon1"><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <input type="date" className="effect-21 form-control loginInputs" id="dateOfQualification" name="dateOfQualification" ref="dateOfQualification" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label className="">Date of Qualification (MM/YYYY)</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="number" className="effect-21 form-control loginInputs" id="registrationNo" name="registrationNo" ref="registrationNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Registration No.</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="text" className="effect-21 form-control loginInputs" id="qualifyingBodyNm" name="qualifyingBodyNm" ref="qualifyingBodyNm" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Name of Qualifying Body</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="input-effect input-group">
            <span className="input-group-addon addons" id="basic-addon1"><i className="fa fa-file-o" aria-hidden="true"></i></span>
            <input type="number" className="effect-21 form-control loginInputs" id="professionalRollNo" name="professionalRollNo" ref="professionalRollNo" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
            <label>Regn No. / Roll No. / Seat No.</label>
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-info pull-right" onClick={this.submitProfessionalInfo.bind(this)}>Save</button>
      </form>
    );
  }
}
