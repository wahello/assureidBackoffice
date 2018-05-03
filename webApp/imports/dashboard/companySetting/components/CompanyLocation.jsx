import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Validation from 'react-validation';
import validator from 'validator';
import { CompanySettings } from '../api/CompanySettingMaster.js';
import {createContainer} from 'meteor/react-meteor-data';

import CompanyInfoList from './CompanyInfoList.jsx';
import CompanySettingIndicators from './companySettingIndicators.jsx';


class CompanyLocation extends TrackerReact(Component){

  componentDidMount(){
    // $('.CLcompanyAddress').prop('disabled', false);
    $.validator.addMethod("regxA1", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Name should only contain letters & space.");
    $.validator.addMethod("regxA2", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Please enter a valid pincode.");
    $.validator.addMethod("regx2", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Please enter a valid email address.");
    $.validator.addMethod("regx3", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "Please enter a valid mobile number.");
    $.validator.addMethod("regx4", function(value, element, regexpr) {
      // console.log('value: ',value + element);          
      return regexpr.test(value);
    }, "Please enter a valid phone number.");
    jQuery.validator.addMethod("notEqual", function(value, element, param) {
      return this.optional(element) || value != param;
    }, "Please specify a different value");
          
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#companyLocationForm").validate({
      rules: {
        companyCity: {
          regxA1: /^[A-za-z']+( [A-Za-z']+)*$|^$/,
        },
        companyState: {
          regxA1: /^[A-za-z']+( [A-Za-z']+)*$|^$/,
        },
        companyCountry: {
          regxA1: /^[A-za-z']+( [A-Za-z']+)*$|^$/,
        },
        companyPincode: {
          regxA2: /^[1-9][0-9]{5}$|^$/,
        },
        companyNumber: {
          required: true,
          regx3: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
        companyAltNumber: {
          notEqual: $('#companyNumber').val(),
          regx4: /^\d{5}([- ]*)\d{6}$|^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$|^$/,
        },
        companyMail: {
          required: true,
          regx2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        },
      }
    }); 
  }

  handleChange(event){
	  const target = event.target;
	  const name   = target.name;
	  this.setState({
	  	[name]: event.target.value,
	  });
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    companyLocation      : this.props.companyLocation,
      companyAddress       : this.props.companyAddress,
	    companyAddress2      : this.props.companyAddress2,
	    companyPincode       : this.props.companyPincode,
	    companyCity          : this.props.companyCity,
	    companyState         : this.props.companyState,
      companyCountry       : this.props.companyCountry,
      companyMail          : this.props.companyMail,
      companyNumber        : this.props.companyNumber,
	    companyAltNumber     : this.props.companyAltNumber,

	    subscription : {
        "companyData" : Meteor.subscribe('companyData'),
      }

	  };
	  this.handleChange = this.handleChange.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    this.setState({
      companyLocation     : nextProps.post.companyLocation,
      companyAddress      : nextProps.post.companyAddress,
      companyAddress2   	: nextProps.post.companyAddress2,
      companyPincode   	  : nextProps.post.companyPincode,
      companyCity     	  : nextProps.post.companyCity,
      companyState     	  : nextProps.post.companyState,
      companyCountry     	: nextProps.post.companyCountry,
      companyMail         : nextProps.post.companyMail,
      companyNumber       : nextProps.post.companyNumber,
      companyAltNumber    : nextProps.post.companyAltNumber,
    })

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    }

  companyListData(){
  	var companyData = CompanySettings.findOne({"companyId" : 1});
  	var companyarray = [];
  	if(companyData){
  		if(companyData.companyLocationsInfo){
  			for(i=1;i<companyData.companyLocationsInfo.length;i++){
  				companyarray.push({
  					'companyLocation' : companyData.companyLocationsInfo[i].companyLocation,
            'companyAddress'  : companyData.companyLocationsInfo[i].companyAddress,
            'companyAddress2' : companyData.companyLocationsInfo[i].companyAddress2,
            'companyMail'     : companyData.companyLocationsInfo[i].companyMail,
            'companyNumber'   : companyData.companyLocationsInfo[i].companyNumber,
  					'companyAltNumber': companyData.companyLocationsInfo[i].companyAltNumber,
  					'companyPincode'  : companyData.companyLocationsInfo[i].companyPincode,
  					'companyCity'	    : companyData.companyLocationsInfo[i].companyCity,
  					'companyState'    : companyData.companyLocationsInfo[i].companyState,
  					'companyCountry'  : companyData.companyLocationsInfo[i].companyCountry,
  					'index'			      : i,
  					'_id'			        : companyData._id,
  				})
  			}//i
  		}
  	}//companyData
  	return companyarray;
  }

  submitCompanyLocation(event){
    event.preventDefault();
    var sessionVar = Session.get('location');

    var companyLocationFormValue ={
    	companyLocation      : $(".CLcompanyLocation").val(),
      companyAddress       : $(".CLcompanyAddress").val(),
      companyAddress2      : $(".CLcompanyAddress2").val(),
      companyPincode       : $(".CLcompanyPincode").val(),
      companyCity          : $(".CLcompanyCity").val(),
      companyState         : $(".CLcompanyState").val(),
      companyCountry       : $(".CLcompanyCountry").val(),
      companyMail          : $(".companyMail").val(),
      companyNumber        : $(".companyNo").val(),
      companyAltNumber     : $(".companyAltNo").val(),
    }//close array

    if($('#companyLocationForm').valid()){
      if(sessionVar){
        $(".compLocationBtn").prop('disabled', false);
      	Meteor.call('updateCompanyLocations', companyLocationFormValue,
          function(error, result){
            if(error){
              console.log(error);
            }else{
              // swal('Company Address Updated Successfully!');
              $(".CLcompanyLocation").val('');
              $(".CLcompanyAddress").val('');
      		    $(".CLcompanyAddress2").val('');
      		    $(".CLcompanyPincode").val('');
      		    $(".CLcompanyCity").val('');
       		    $(".CLcompanyState").val('');
              $(".CLcompanyCountry").val('');
              $(".companyMail").val('');
              $(".companyNo").val('');
      		    $(".companyAltNo").val('');
            }
          }
  	    );
      }else{
  	    Meteor.call('insertCompanyLocations', companyLocationFormValue,
          function(error, result){
            if(error){
              console.log(error);
            }else{

              // swal('Company Address Added Successfully!');
              $(".CLcompanyLocation").val('');
              $(".CLcompanyAddress").val('');
      		    $(".CLcompanyAddress2").val('');
      		    $(".CLcompanyPincode").val('');
      		    $(".CLcompanyCity").val('');
       		    $(".CLcompanyState").val('');
      		    $(".CLcompanyCountry").val('');
              $(".companyMail").val('');
              $(".companyNo").val('');
              $(".companyAltNo").val('');
            }
          }
  	    );
  	  }
    }else{
      $(event.target).parent().parent().find('input.error').addClass('companyError');
    }
  }

  render(){
  	return(
      <section className="Content">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 ">
            <div className="box box-default">
            <div className="box-header with-border">
            <h3 className="box-title">Branch Details</h3>
            </div>

            <div className="box-body">
            <form id="companyLocationForm" className="companyLocationForm">
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                 <span className="input-group-addon ipAddons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                 <input value={this.state.companyLocation} onChange={this.handleChange} type="text" placeholder="Branch Name" name="CLcompanyLocation" className="form-control CLcompanyLocation inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-phone" aria-hidden="true"></i></span>
                  <input id="companyNumber" value={this.state.companyContactNumber} onChange={this.handleChange}  type="text" placeholder="Contact Number" name="companyNumber" className="form-control companyNo inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                  <input value={this.state.companyAddress} onChange={this.handleChange} type="text" placeholder="Branch Address Line1" name="CLcompanyAddress" className="form-control CLcompanyAddress inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-phone" aria-hidden="true"></i></span>
                  <input value={this.state.companyAltNumber} onChange={this.handleChange}  type="text" placeholder="Alt Contact Number" name="companyAltNumber" className="form-control companyAltNo inputValid" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                  <input value={this.state.companyAddress2} onChange={this.handleChange} type="text" placeholder="Branch Address Line2" name="CLcompanyAddress2" className="form-control CLcompanyAddress2 inputValid" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                   <input value={this.state.companyMail} onChange={this.handleChange}  type="text" placeholder="Contact Email" name="companyMail" className="form-control companyMail inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
    	             <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyCity} onChange={this.handleChange} type="text" placeholder="City" name="CLcity" className="form-control CLcompanyCity inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-address-card-o" aria-hidden="true"></i></span>
                   <input value={this.state.companyPincode} onChange={this.handleChange} type="number" placeholder="Pincode" name="CLpincode" className="form-control CLcompanyPincode inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
    	             <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyState} onChange={this.handleChange} type="text" placeholder="State" name="CLstate" className="form-control CLcompanyState inputValid required" />
                 </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
    	             <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyCountry} onChange={this.handleChange} type="text" placeholder="Country" name="CLcountry" className="form-control CLcompanyCountry inputValid required" />
                  </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button className="col-lg-3 col-md-4 col-sm-6 col-xs-12  btn btn-primary pull-right compLocation" onClick={this.submitCompanyLocation.bind(this)}>Submit</button>
              </div>
            </form>
            </div>
            </div>
          </div>
  		  </div>

  		  <div className="table-responsive">
			<table className="table table-bordered table-striped table-hover">
				<thead>
					<tr className="tableHeader">
						<th> Branch Name </th>
            <th> Branch Address </th>
            <th> Email Id </th>
            <th> Contact Number </th>
						<th> Alt Number </th>
						<th> Pincode </th>
						<th> City </th>
						<th> State </th>
						<th> Country </th>
						<th> Action </th>
					</tr>
				</thead>
				<tbody>
					{ this.companyListData().map( (locationData)=>{
						return <CompanyInfoList key={locationData.index} companyLocationDataVales={locationData}/>
					  })
					}
				</tbody>
			</table>
		  </div>



      {/*<div className="emptyDiv"></div>*/}
      </section>


  		);
  }

 }

 EditCompanyLocation = createContainer((props)=>{
  const postHandle = Meteor.subscribe('companyData');
  const post       = CompanySettings.findOne({})||{};
  const loading    = !postHandle.ready();

  return {
    loading,
    post,
  };
}, CompanyLocation);

export default EditCompanyLocation;
