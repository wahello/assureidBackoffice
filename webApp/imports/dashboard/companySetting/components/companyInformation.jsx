import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {createContainer} from 'meteor/react-meteor-data';

import { TempLogoImage } from '../api/TempLogoImage.js';
import { CompanySettings } from '../api/CompanySettingMaster.js';


class companyInformation extends TrackerReact(Component){
  componentDidMount() {
    $('.companyInformation').addClass('divActive');
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
    $("#companyInformationForm").validate({
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
        companyContactNumber: {
          required: true,
          regx3: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
        companyAltContactNumber: {
          notEqual: $('#companyContactNumber').val(),
          regx4: /^\d{5}([- ]*)\d{6}$|^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$|^$/,
        },
        companyEmail: {
          required: true,
          regx2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        },
      }
    }); 
  }
  imgBrowse(event){
    event.preventDefault();

    /*--------------Code form Logo Image-----------*/

    var file = event.target.files[0];  //assuming you have only one file
    var render = new FileReader(); //this works only in html5
      render.onload =function(event){
         var fileData = render.result;
         var fileName = file.name;
         Meteor.call('tempLogoImageUpload', fileName, fileData,function(err,result){
          if(err){
            console.log(err);
          }else{
            // console.log('Image Uploaded!');
          }
         });
      };
      render.readAsDataURL(file);
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
      companyId            : this.props._id,
      companyName          : this.props.companyName,
      companyContactNumber : this.props.companyContactNumber,
      companyAltContactNumber : this.props.companyAltContactNumber,
      companyEmail         : this.props.companyEmail,
      companyAddressLine1  : this.props.companyAddressLine1,
      companyAddressLine2  : this.props.companyAddressLine2,
      companyPincode       : this.props.companyPincode,
      companyCity          : this.props.companyCity,
      companyState         : this.props.companyState,
      companyCountry       : this.props.companyCountry,

      subscription : {
        "tempLogoImage" : Meteor.subscribe('tempLogoImage'),
        "companyData" : Meteor.subscribe('companyData'),
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.post.companyLocationsInfo){
        this.setState({
          companyId             : nextProps.post._id,
          companyName           : nextProps.post.companyName,
          companyContactNumber  : nextProps.post.companyContactNumber,
          companyAltContactNumber : nextProps.post.companyAltContactNumber,
          companyEmail          : nextProps.post.companyEmail,
          companyAddressLine1   : nextProps.post.companyLocationsInfo[0].companyAddressLine1,
          companyAddressLine2   : nextProps.post.companyLocationsInfo[0].companyAddressLine2,
          companyPincode        : nextProps.post.companyLocationsInfo[0].companyPincode,
          companyCity           : nextProps.post.companyLocationsInfo[0].companyCity,
          companyState          : nextProps.post.companyLocationsInfo[0].companyState,
          companyCountry        : nextProps.post.companyLocationsInfo[0].companyCountry,
        })
      }
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  submitCompanyInformation(event){
    event.preventDefault();
    var image = TempLogoImage.findOne({});
    if(image){
      var logoFilename = image.logoFilename;
      var companyLogo= image.tempLogoImg;
    }else{
      var logoFilename = '';
      var companyLogo= '';
    }

    var companyInfoFormValue ={
      companyName          : $(".companyName").val(),
      companyContactNumber : $(".contactNo").val(),
      companyAltContactNumber : $(".companyAltContactNumber").val(),
      companyEmail         : $(".companyEmail").val(),
      logoFilename         : logoFilename,
      companyLogo          : companyLogo,
      companyAddressLine1  : $(".companyAddressLine1").val(),
      companyAddressLine2  : $(".companyAddressLine2").val(),
      companyPincode       : $(".companyPincode").val(),
      companyCity          : $(".companyCity").val(),
      companyState         : $(".companyState").val(),
      companyCountry       : $(".companyCountry").val(),
    }//close array
    
    if($('#companyInformationForm').valid()){
      Meteor.call('insertCompanyInfo', companyInfoFormValue,
        function(error, result){
          if(error){
            console.log(error);
          }else{
            //As logo is added to main companySettings table, we can now remove
            //the same logo from temporary collection.
            // Meteor.call('tempLogoImageDelete', fileName);
            // console.log('Added!');
          }
        }
      );
      $(event.target).find('input').removeClass('companyError');
    }else{
      $(event.target).find('input.error').addClass('companyError');
      // $(event.target).find('input.error:first-child').focus();
    }
  }
  getButton(){
    var companyData = CompanySettings.findOne({});
    if(companyData){
     return ( <button className="col-lg-3 col-md-4 col-sm-6 col-xs-12  btn btn-primary pull-right">Update</button>);
    }else{
      return (<button className="col-lg-3 col-md-4 col-sm-6 col-xs-12  btn btn-primary pull-right">Submit</button>);
    }
  }
  removeCompanyImage(event){
    event.preventDefault();
    var id = $(event.target).attr('data-id');
    var link = $(event.target).attr('data-link');
    Meteor.call("removeCompanyImage",id,link,(error, result)=>{
      // swal({
      //   position: 'top-right',
      //   type: 'success',
      //   title: 'Deleted Successfully',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
    });
  }

  render(){
    return(
      <section className="NotificationContent">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 ">
            <div className="box box-default">
            <div className="box-header with-border">
            <h3 className="box-title">COMPANY INFORMATION</h3>
            </div>

            <div className="box-body">
            <form id="companyInformationForm" onSubmit={this.submitCompanyInformation} className="companyInformationForm">
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                 <span className="input-group-addon ipAddons"><i className="fa fa-briefcase" aria-hidden="true"></i></span>
                 <input value={this.state.companyName} onChange={this.handleChange}  type="text" placeholder="Company Name" name="companyName" className="form-control companyName inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-phone" aria-hidden="true"></i></span>
                  <input value={this.state.companyContactNumber} onChange={this.handleChange}  type="text" placeholder="Contact Number" name="companyContactNumber" id="companyContactNumber" className="form-control contactNo inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                  <input value={this.state.companyAddressLine1} onChange={this.handleChange}  type="text" placeholder="Company Address Line1" name="companyAddressLine1" className="form-control companyAddressLine1 inputValid required" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-phone" aria-hidden="true"></i></span>
                  <input value={this.state.companyAltContactNumber} onChange={this.handleChange}  type="text" placeholder="Contact Alt Number" name="companyAltContactNumber" className="form-control companyAltContactNumber inputValid" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                  <span className="input-group-addon ipAddons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                  <input value={this.state.companyAddressLine2} onChange={this.handleChange}  type="text" placeholder="Company Address Line2" name="companyAddressLine2" className="form-control companyAddressLine2 inputValid" />
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-4 col-sm-12 col-xs-12">
                <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                   <input value={this.state.companyEmail} onChange={this.handleChange}  type="text" placeholder="Contact Email" name="companyEmail" className="form-control companyEmail inputValid required" />
                </div>
              </div>
               <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyCity} onChange={this.handleChange}  type="text" placeholder="City" name="companyCity" className="form-control companyCity inputValid required" />
                </div>
              </div>
              <div className={this.props.post.companyLogo ? "companyImgPos col-lg-6 col-md-4 col-sm-12 col-xs-12" : "companyInputPos form-group col-lg-6 col-md-4 col-sm-12 col-xs-12"}>
                {
                  !this.props.post.companyLogo ? 
                  <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-upload" aria-hidden="true"></i></span>
                   <input onChange={this.imgBrowse.bind(this)} type="file" className="form-control companyInfoInput inputValid" name="" required=""/>
                  </div>
                  :
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLeft">
                    <span className="lableleft">{this.props.post.logoFilename}</span>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">                    
                      <img src={this.props.post.companyLogo} className="commonLogo displayLogo img-responsive img-rounded"/>
                    </div>
                    <i className="fa fa-times-circle timeCircle iDelete col-lg-8" onClick={this.removeCompanyImage.bind(this)} data-link={this.props.post.companyLogo} data-id={this.state.companyId}></i>
                  </div>
                }    
              </div>
              {/* <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div> */}
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-address-card-o" aria-hidden="true"></i></span>
                   <input value={this.state.companyPincode} onChange={this.handleChange}  type="text" placeholder="Pincode" name="companyPincode" className="form-control companyPincode inputValid required" />
                </div>
              </div>
              {/* <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div> */}
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyState} onChange={this.handleChange}  type="text" placeholder="State" name="companyState" className="form-control companyState inputValid required" />
                 </div>
              </div>
              {/* <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6" style={{height: '35' + 'px'}}>
              </div> */}
              <div className="form-group col-lg-6 col-md-4 col-sm-6 col-xs-6">
                 <div className="input-group">
                   <span className="input-group-addon ipAddons"><i className="fa fa-globe" aria-hidden="true"></i></span>
                   <input value={this.state.companyCountry} onChange={this.handleChange}  type="text" placeholder="Country" name="companyCountry" className="form-control companyCountry inputValid required" />
                  </div>
              </div>
              
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {this.getButton()}
              </div>
            </form>
            </div>
            </div>
          </div>
          {/*<div className="emptyDiv"></div>*/}
        </div>

      </section>


      );
  }

 }

 EditCompanyInformation = createContainer((props)=>{

    const postHandle = Meteor.subscribe('companyData');
    const post       = CompanySettings.findOne({})||{};
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
    };
}, companyInformation);

export default EditCompanyInformation;
