import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AddressForm extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      'line1'           : '',
      'line2'           : '',
      'line3'           : '',
      'landmark'        : '',
      'city'            : '',
      'state'           : '',
      'country'         : '',
      'pincode'         : '',
      'residingFrom'    : '',  
      'residingTo'      : '',
      'tempLine1'       : '',
      'tempLine2'       : '',
      'tempLine3'       : '',
      'tempLandmark'    : '',
      'tempCity'        : '',
      'tempState'       : '',
      'tempCountry'     : '',
      'tempPincode'     : '',
      'tempresidingFrom': '',
      'tempresidingTo'  : '',
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
  currentAddress(event){
    if($('input[name="sameAsPermanent"]').is(':checked')){
      $('input[name="sameAsPermanent"]').attr('checked', true);
      $('#tempLine1').attr('value',this.refs.line1.value);
      $('#tempLine2').attr('value',this.refs.line2.value);
      $('#tempLine3').attr('value',this.refs.line3.value);
      $('#tempLandmark').attr('value',this.refs.landmark.value);
      $('#tempCity').attr('value',this.refs.city.value);
      $('#tempState').attr('value',this.refs.state.value);
      $('#tempCountry').attr('value',this.refs.country.value);
      $('#tempPincode').attr('value',this.refs.pincode.value);
      $('#tempresidingFrom').attr('value',this.refs.residingFrom.value);
      $('#tempresidingTo').attr('value',this.refs.residingTo.value);
      if(this.refs.tempLine1.value !=''){
        $('#tempLine1').addClass('has-content');
      } 
      if(this.refs.tempLine2.value !=''){
        $('#tempLine2').addClass('has-content');
      }
      if(this.refs.tempLine3.value !=''){
        $('#tempLine3').addClass('has-content');
      }
      if(this.refs.tempLandmark.value !=''){
        $('#tempLandmark').addClass('has-content');
      }
      if(this.refs.tempCity.value !=''){
        $('#tempCity').addClass('has-content');
      }
      if(this.refs.tempState.value !=''){
        $('#tempState').addClass('has-content');
      }
      if(this.refs.tempCountry.value !=''){
        $('#tempCountry').addClass('has-content');
      }
      if(this.refs.tempPincode.value !=''){
        $('#tempPincode').addClass('has-content');
      }
      if(this.refs.tempresidingFrom.value !=''){
        $('#tempresidingFrom').addClass('has-content');
      }
      if(this.refs.tempresidingTo.value !=''){
        $('#tempresidingTo').addClass('has-content');
      }
    }else{
      $('input[name="sameAsPermanent"]').attr('checked', false);
      $('#tempLine1').attr('value','');
      $('#tempLine2').attr('value','');
      $('#tempLine3').attr('value','');
      $('#tempLandmark').attr('value','');
      $('#tempCity').attr('value','');
      $('#tempState').attr('value','');
      $('#tempCountry').attr('value','');
      $('#tempPincode').attr('value','');
      $('#tempresidingFrom').attr('value','');
      $('#tempresidingTo').attr('value','');
      $('.currentAddrContent').find('input.effect-21').removeClass('has-content');
    }
  }
  inputEffect(event){
    event.preventDefault();
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
      $('label').not('label.error').removeClass('hidden-lg');
    }else{
      if($('.effect-21').hasClass('error')){
        // console.log('effect-21-has-content');
        $(event.target).find('.effect-21.error').addClass('has-content');  
      }else{
        $(event.target).removeClass("has-content");
      }
    }
  }
  componentDidMount(){ 
    $.validator.addMethod("regxA1", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Name should only contain letters & space.");

    $.validator.addMethod("regxA2", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Please enter a valid pincode.");
          
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
  
    // $("#addressForm").validate({
    //   rules: {
    //     city: {
    //       required: true,
    //       regxA1: /^[A-za-z']+( [A-Za-z']+)*$/,
    //     },
    //     state: {
    //       required: true,
    //       regxA1: /^[A-za-z']+( [A-Za-z']+)*$/,
    //     },
    //     country: {
    //       required: true,
    //       regxA1: /^[A-za-z']+( [A-Za-z']+)*$/,
    //     },
    //     pincode: {
    //       required: true,
    //       regxA2: /^[1-9][0-9]{5}$/,
    //     }
    //   }
    // });
  }
  submitPermanantAddress(event){
    event.preventDefault(); 
    // if($('#addressForm').valid()){
      var id   = Meteor.userId();
      var permanentAddress = {
        "line1"          : this.refs.line1.value,
        "line2"          : this.refs.line2.value,
        "line3"          : this.refs.line3.value,
        "landmark"       : this.refs.landmark.value,
        "city"           : this.refs.city.value,
        "state"          : this.refs.state.value,
        "country"        : this.refs.country.value,
        "pincode"        : this.refs.pincode.value,
        "residingFrom"   : this.refs.residingFrom.value,
        "residingTo"     : this.refs.residingTo.value,
      }
      Meteor.call('insertPermanantAddress',id,permanentAddress,function (error,result) {
       if(error){
          console.log(error.reason);
        }else{
          swal("Done","Permanent Address added successfully!","success");   
          // $("#line1").val("");  
          // $("#line2").val("");
          // $("#line3").val("");  
          // $("#city").val("");  
          // $("#state").val("");  
          // $("#country").val("");  
          // $("#pincode").val("");  
          // $("#residingFrom").val("");  
          // $("#residingTo").val("");  
        }
      });
    // }else{
    //   // console.log('false');
    //   $(event.target).parent().parent().find('.effect-21.error:first').focus();
    //   $(event.target).parent().parent().find('.effect-21.error').addClass('has-content');
    // }
  }
  submitTemporaryAddress(event){
    event.preventDefault(); 
    var id   = Meteor.userId();
    var temporaryAddress = {
      "tempLine1"          : this.refs.tempLine1.value,
      "tempLine2"          : this.refs.tempLine2.value,
      "tempLine3"          : this.refs.tempLine3.value,
      "tempLandmark"       : this.refs.tempLandmark.value,
      "tempCity"           : this.refs.tempCity.value,
      "tempState"          : this.refs.tempState.value,
      "tempCountry"        : this.refs.tempCountry.value,
      "tempPincode"        : this.refs.tempPincode.value,
      "tempresidingFrom"   : this.refs.tempresidingFrom.value,
      "tempresidingTo"     : this.refs.tempresidingTo.value,
    }
    Meteor.call('insertTemporaryAddress',id,temporaryAddress,function (error,result) {
     if(error){
        console.log(error.reason);
      }else{
        swal("Done","Temporary Address added successfully!","success");
        $('html, body').animate({
          'scrollTop' : $(".profileBody").position().top
        });
        $('#menu1').removeClass('in active');
        $('.menu1').removeClass('active');
        $('#menu2').addClass('in active');
        $('.menu2').addClass('active'); 
        // $("#tempLine1").val("");  
        // $("#tempLine2").val("");
        // $("#tempLine3").val("");  
        // $("#tempCity").val("");  
        // $("#tempState").val("");  
        // $("#tempCountry").val("");  
        // $("#tempPincode").val("");  
        // $("#tempresidingFrom").val("");  
        // $("#tempresidingTo").val("");  
      }
    });
  }
  render(){
    return(
      <form className="addressForm basicForm" id="addressForm">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userAddress">
          <p>
            Permanent Address
          </p>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs required" id="line1" name="line1" ref="line1" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line1</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="line2" name="line2" ref="line2" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line2</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="line3" name="line3" ref="line3" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line3</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="landmark" name="landmark" ref="landmark" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Landmark</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs has-content" id="country" name="country" ref="country" value="India" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Country</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="state" name="state"  ref="state" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>State</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="city" name="city"  ref="city" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>City</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="pincode" name="pincode" ref="pincode" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Pincode</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">
              <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
              <input type="date" className="effect-21 form-control loginInputs required" id="residingFrom" name="residingFrom" ref="residingFrom" onChange={this.handleChange}/>
              <label className="">Residing From</label>
              <span className="focus-border"><i></i></span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">
              <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
              <input type="date" className="effect-21 form-control loginInputs required" id="residingTo" name="residingTo" ref="residingTo" onChange={this.handleChange}/>
              <label className="">Residing To</label>
              <span className="focus-border"><i></i></span>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <button type="submit" className="btn btn-info  pull-right" onClick={this.submitPermanantAddress.bind(this)} >Save</button>
        </div>
        {/*<hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12"/>*/}
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userAddress">
          <p>
            Current Address
            <span>
              <input type="checkbox" name="sameAsPermanent" value="" onChange={this.currentAddress.bind(this)}/> &nbsp; Same as permanent address
            </span>
          </p>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 currentAddrContent">
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempLine1" name="tempLine1" ref="tempLine1"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line1</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempLine2" name="tempLine2" ref="tempLine2"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line2</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempLine3" name="tempLine3" ref="tempLine3"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Line3</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempLandmark" name="tempLandmark" ref="tempLandmark" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Landmark</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempCountry" name="tempCountry" ref="tempCountry" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Country</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempState" name="tempState" ref="tempState" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>State</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempCity" name="tempCity" ref="tempCity"  onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>City</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="input-effect input-group">  
              <span className="input-group-addon addons"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              <input type="text" className="effect-21 form-control loginInputs" id="tempPincode" name="tempPincode" ref="tempPincode" onChange={this.handleChange} onBlur={this.inputEffect.bind(this)}/>
              <label>Pincode</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">
              <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
              <input type="date" className="effect-21 form-control loginInputs" id="tempresidingFrom" name="tempresidingFrom" ref="tempresidingFrom" onChange={this.handleChange} />
              <label className="">Residing From</label>
              <span className="focus-border"><i></i></span>
            </div>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="input-effect input-group">
              <span className="input-group-addon addons"><i className="fa fa-calendar" aria-hidden="true"></i></span>
              <input type="date" className="effect-21 form-control loginInputs" id="tempresidingTo" name="tempresidingTo" ref="tempresidingTo" onChange={this.handleChange} />
              <label className="">Residing To</label>
              <span className="focus-border"><i></i></span>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <button type="submit" className="btn btn-info pull-right"  onClick={this.submitTemporaryAddress.bind(this)}>Save</button>
        </div>
      </form>
    );
  }
}
