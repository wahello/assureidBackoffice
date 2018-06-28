import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { Link } from 'react-router';
import {Services} from '../api/Services';
import {TempServiceImages} from '../api/Services';
import {browserHistory} from 'react-router';
// import { ChecklistFieldExpert } from '../api/Services.js';

 
class EditService extends TrackerReact (Component){
  constructor(props) {
    super(props); 
    var metaContext = {id: Meteor.userId(), dir: "images" , name: "serviceImage"};
    // var uploader    = new Slingshot.Upload("myFileUploads" ,metaContext);
    this.state = {
      serviceName         : '',
      serviceRate         : '',
      serviceDuration     : '',
      servicesDescription : '',
      serviceFor          : '',
      id                  : '',
      services            : [],
      serviceRequired     : '',
      isUploading         : false,
      // progressValue     : "0%",
      edit                : false,
      serviceDayNumbers   : '',
      "subscription"  : {
        "singleServices" : Meteor.subscribe("singleServices"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempServiceImages" : Meteor.subscribe("tempServiceImages"),
      }  
    }; 
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.services){
        // console.log("nextProps.services",nextProps.services);
         this.setState({
             // fieldChecklist      : nextProps.services.fieldChecklist,
             serviceName         : nextProps.services.serviceName,
             serviceRate         : nextProps.services.serviceRate,
             servicesDescription : nextProps.services.servicesDescription,
             image               : nextProps.services.image,
             id                  : nextProps.services._id,
             serviceRequired     : nextProps.services.serviceRequired,
             serviceDayNumbers   : nextProps.services.serviceDayNumbers,
         });
      }
    }else{
      this.setState({
             // fieldChecklist      : '',
             serviceName         : '',
             serviceRate         : '',
             servicesDescription : '',
             serviceRequired     : '',
             image               : '',
             id                  : '',
             serviceDayNumbers   : '',
      });
    }
    // console.log("nextProps.services",nextProps.services);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
   const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log("name",name);
    // console.log("value",value);
    this.setState({
      [name]: value
    });
  }
  componentDidMount() {
   $("html,body").scrollTop(0);
    $(".serviceName").focus();
    if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }
    this.serviceTracker = Tracker.autorun( ()=> {
      Meteor.subscribe("services");
      const services = Services.find().fetch();
      this.setState({services: services});
    });
    this.tempServiceImageTracker = Tracker.autorun(()=>{
      Meteor.subscribe('tempServiceImages');
      const tempServiceImages = TempServiceImages.find().fetch();
      this.setState({tempServiceImages});
    });
    // $('#servicesDescription').summernote({
    //   height: 190,
    //   maxHeight:190,
    //   minHeight:175,
    // });
  }
  componentWillMount() {
    
  }
  componentWillUnmount() {
      $("script[src='/js/adminLte.js']").remove(); 
     // $("link[href='/css/dashboard.css']").remove(); 
    // const tempServiceImages = TempServiceImages.find().fetch();
    // for(i=0;i<tempServiceImages.length;i++){
    //   if(!tempServiceImages[i].submitted)
    //     Meteor.call('removeS3Data',tempServiceImages[i].amazonUrl);
    // }
    // Meteor.call('removeServiceUnsubmitImages',Meteor.userId());
    // console.log('unmounted');
    if (this.serviceTracker) {
    this.serviceTracker.stop();
    }
    if (this.tempServiceImageTracker) {
      this.tempServiceImageTracker.stop();
    }
  }
  // handleClose(e){
  //   e.preventDefault();
  //   console.log('deleting ' + e.target.getAttribute('id'));
  //   if(this.props.params.id&&this.state.edit){
  //     Meteor.call('removeS3Data',e.target.getAttribute('id'));
  //     Meteor.call('updateEditService',e.target.getAttribute('id'));
  //   }
  //   Meteor.call('removeServiceUrlImages',e.target.getAttribute('id'));
  //   Meteor.call('removeS3Data',e.target.getAttribute('id'));
  // }
  handleUpload(event){
    event.preventDefault();
    let self = this;
     this.setState({isUploading: true});
     //  this.calculateProgress();
    // if (event.currentTarget.files && event.currentTarget.files[0]) {
    //     var file = event.currentTarget.files[0];
    //     if (file) {
    //         addServicesImgsToS3Function(file,self);
    //     }
    // }
    if (event.currentTarget.files && event.currentTarget.files[0]) {   
      var dataImg =event.currentTarget.files[0];   
       if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){       
         var reader = new FileReader();        reader.onload = function (e) {           
           $('.uploadedImageFromLocl').attr('src', e.target.result);       
         };        
         reader.readAsDataURL(event.currentTarget.files[0]);       
         var file = event.currentTarget.files[0];       
          if (file) {          
            addServicesImgsToS3Function(file,self);        
          }    
       } else {  
        swal({     
           position: 'top-right',      
           type: 'error',     
           title: 'Please select image',        
           showConfirmButton: false,       
           timer: 1500       
         });    
      }
    }
  }
 
  handleSubmit(e){
      e.preventDefault();
      let serviceName         = this.refs.serviceName.value;
      let serviceRate         = this.refs.serviceRate.value;
      var serviceDayNumbers   = this.refs.serviceDayNumbers.value;
      // let servicesDescription = $('#servicesDescription').summernote('code');
      let servicesDescription = this.refs.servicesDescription.value;
      let userId              = Meteor.userId();
      var id                  = this.props.params.id;
      // var serviceFor = $('input[name=serviceFor]:checked', '.newTemplateForm').val();
      var serviceFor          = "user";
      var serviceRequired     = this.state.serviceRequired;
      // console.log("serviceRequired",serviceRequired);        
      if (id) {
        let lastModified        = new Date();
         Meteor.call('updateService',id,serviceName,serviceRate,serviceDayNumbers,servicesDescription,serviceRequired,userId,lastModified,serviceFor,(error,result)=>{
            if(error){
                console.log(error.reason);
            }else{               
                swal("Done","Your service has been Updated!.","success");
                $('.uploadedImageFromLocl').attr('src', "");
                $("#serviceName").val("");
                var path = "/admin/ListOfServices";
                browserHistory.replace(path);
                $('.uploadedImageFromLocl').attr('src', "");
                $(".serviceName").val("");   
                $(".serviceRate").val("");   
                $(".serviceDuration").val("");   
                $(".servicesDescription").val("");  
                  // $('#servicesDescription').summernote('code','');
            }
        });
      }
  }
  // addCheckList(event){
  //   event.preventDefault();
  //   var task = this.refs.fieldChecklist.value;
  //   Meteor.call('addCheckList',task,function(error,result) {
  //     if (error) {
  //       console.log(error.reason);
  //     }else{
  //       console.log("add successfully!");
  //       $('#fieldChecklist').val('');
  //     }
  //   });
  // }
  // deleteTask(event){
  //   event.preventDefault();
  //   var id = $(event.currentTarget).attr('id');
  //   Meteor.call('deleteTask',id,function(error,result) {
  //     if (error) {
  //       console.log(error.reason);
  //     }else{
  //       // console.log('deleted successfully');
  //     }
  //   });
  // }
  // deletefieldChecklist(event){
  //   event.preventDefault();
  //   var serviceId = this.state.id;
  //   console.log("serviceId",serviceId);
  //   var id = $(event.currentTarget).attr('id');
  //   console.log("id",id);
  //   var checklistData = $(event.currentTarget).attr('data-checklist'); 
  //   Meteor.call('deletefieldChecklist',serviceId,id,checklistData,function(error,result) {
  //     if (error) {
  //       console.log(error.reason);
  //     }else{
  //       // console.log('deleted successfully');
  //     }
  //   });
  // }
 
  render(){
   // $('.note-editable').html(this.state.servicesDescription);
    return(
      <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1> Service Management </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#"><i className="fa fa-briefcase" />Service Management</a></li>
              <li className="active">Edit Service</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      Edit Service
                    </h3>
                    <div className="box-tools pull-right">
                      {/*<button type="button" className="btn btn-box-tool btn-minus" data-widget="collapse">
                        <i className="fa fa-minus" />
                      </button>
                      <div className="btn-group">
                        <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                          <i className="fa fa-wrench" /></button>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="#">Action</a>
                          </li>
                          <li>
                            <a href="#">Another action </a>
                          </li>
                          <li>
                            <a href="#">Something else here</a>
                          </li>
                          <li className="divider" />
                          <li>
                            <a href="#">
                            Separated link
                            </a>
                          </li>
                        </ul>
                      </div>
                      <button type="button" className="btn btn-box-tool" data-widget="remove">
                        <i className="fa fa-times" />
                      </button>*/}
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        
                          <div className="create-email-template-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <form className="newTemplateForm">
                              <div className="row inputrow">
                                {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service For:</label>
                                    <label className="radio-inline" style={{fontSize : '13' + 'px'}}><input value="user" type="radio" name="serviceFor" ref="serviceFor" checked={this.state.serviceFor === 'user'} onChange={this.handleChange} />User</label>
                                    <label className="radio-inline" style={{fontSize : '13' + 'px', marginLeft : '30' + 'px'}}><input value="company" type="radio" name="serviceFor" checked={this.state.serviceFor === 'company'} ref="serviceFor" onChange={this.handleChange}/>Company</label>
                                  </div>
                                </div>*/}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Name<span className="astrick">*</span>:</label>
                                     <input type="text" ref="serviceName" id="serviceName" name="serviceName" value={this.state.serviceName}  onChange={this.handleChange} className="templateName serviceName col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>
                                </div>
                              </div>
                              <div className="row inputrow">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Rate<span className="astrick">*</span>:</label>
                                     <input type="number" ref="serviceRate" id="serviceRate" name="serviceRate" value={this.state.serviceRate}  onChange={this.handleChange} className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Duration<span className="astrick">*</span>:</label>
{/*                                     <input type="text" ref="serviceDuration" id="serviceDuration" name="serviceDuration" value={this.state.serviceDuration}  onChange={this.handleChange} className="templateName serviceDuration col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
*/}                                   <div className="col-lg-12 servicesDays">
                                        <input type="number" className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control inputValid"
                                        ref="serviceDayNumbers" id="serviceDayNumbers" name="serviceDayNumbers" value={this.state.serviceDayNumbers}   onChange={this.handleChange}/>
                                      </div>
                                    {/*  <div className="col-lg-8">
                                        <select className="form-control inputText serviceDuration col-lg-8 " ref="serviceDuration" value={this.state.serviceDuration} onChange={this.handleChange} id="serviceDuration" name="serviceDuration" required>
                                          <option value="Days">Days</option>
                                          <option value="Weeks">Weeks</option>
                                          <option value="Months">Months</option>
                                        </select> 
                                      </div>   */}   
                                  </div>
                                </div>
                              </div>
                              <div className="row inputrow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                      <label className="label-category">Description<span className="astrick">*</span>:</label>
                                      {/*<div id="servicesDescription" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" name="servicesDescription" ref="servicesDescription" value={this.state.servicesDescription} onChange={this.handleChange} ></div>*/}
                                      <textarea name="servicesDescription" ref="servicesDescription" value={this.state.servicesDescription} onChange={this.handleChange} className="form-control servicesDescription col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="10"></textarea>                            
                                   </div>
                                </div>
                              </div>
                            <div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-6 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Image Upload<span className="astrick">*</span>:</label>
                                        <input type="file" ref="serviceImageFile" id="s3file" name="serviceImageFile"  onChange={this.handleUpload.bind(this)}  className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />      
                                      </div>  
                                  </div>
                                  <div className="col-lg-6 uploadedImageFromLocl2">     
                                      <div className="uploadedImageFromLocl3">        
                                          <img src={this.state.image} alt="" className="img-responsive uploadedImageFromLocl"/>    
                                      </div>
                                  </div>
                                
                                </div>
                           </div>
                          {/*  <div className="row inputrow">
                              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                <div className="form-group">
                                  <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Checklist for field expert:</label>
                                  <input type="text" ref="fieldChecklist" id="fieldChecklist" name="fieldChecklist"  onChange={this.handleChange} className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 checkListOuterBlock">
                                <button className="btn btn-primary sendtxtmsgbtn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.addCheckList.bind(this)}>ADD</button>
                              </div>
                            </div>
                            <div className="row inputrow">
                               {this.props.services.fieldChecklist ?
                                this.props.services.fieldChecklist.map((fieldChecklist,index)=> {
                                  return(
                                     <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkListDataOuter" key={index}>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkListDataInner">
                                          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 taskName">
                                            <p>{fieldChecklist}</p> 
                                          </div>
                                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 deleteTask">
                                            <i className="fa fa-times" id={index} data-checklist={fieldChecklist} onClick={this.deletefieldChecklist.bind(this)}></i>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                })
                                :
                                ""
                               }
                                {this.props.checklistFieldExpert ?
                                  this.props.checklistFieldExpert.map((checklistDetails,index)=> {
                                    return(
                                       <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkListDataOuter" key={index}>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkListDataInner">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 taskName">
                                              <p>{checklistDetails.task}</p> 
                                            </div>
                                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 deleteTask">
                                              <i className="fa fa-times" id={checklistDetails._id} onClick={this.deleteTask.bind(this)}></i>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                  })
                                  :
                                  ""
                                }
                            </div>*/}
                            <div className="row inputrow subjectRow">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-12 uploadedImageFromLocl1">
                                   <div className="form-group subjectDiv">
                                     <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Required Information for verification<span className="astrick">*</span>:</label>
                                    </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <input type="radio" name="serviceRequired"  onChange={this.handleChange} ref="serviceRequired" value="ProfileForms" checked={this.state.serviceRequired === 'ProfileForms'}/> Basic Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="StatutoryForm" checked={this.state.serviceRequired === 'StatutoryForm'}/> Identity Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group ">
                                    <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="AddressForm" checked={this.state.serviceRequired === 'AddressForm'}/> Address Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group ">
                                   <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="EducationForm" checked={this.state.serviceRequired === 'EducationForm'}/> Academic Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="WorkForm" checked={this.state.serviceRequired  === 'WorkForm'}/> Employment Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="SkillsCertificate" checked={this.state.serviceRequired  === 'SkillsCertificate'}/> Skills & Certification Information
                                  </div> 
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                   <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="OtherInfoForm" checked={this.state.serviceRequired  === 'OtherInfoForm'}/> Other Information
                                  </div> 
                                </div>
                              </div>
                            </div>
                           
                            <div className="savetemp col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button onClick={this.handleSubmit.bind(this)} type="submit" className="col-lg-2 col-md-3 col-sm-6 col-xs-12 btn btn-primary pull-right sendtxtmsgbtn">UPDATE</button>
                              </div>
                            </form>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </div>
    );
  }
}
EditPageContainer = withTracker(({params}) => {
    var _id = params.id;
    const postHandle = Meteor.subscribe('singleServices',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const services = Services.findOne({"_id":_id})|| {};
    // console.log("services",services);
    const loading = !postHandle.ready();
    // const postHandle1    = Meteor.subscribe("checklistFieldExpert");
    // const loading1       = !postHandle1.ready();
    // const checklistFieldExpert  = ChecklistFieldExpert.find({}).fetch()||[];
    
    if(_id){
      return {
          loading,
          services,
          // loading1,
          // checklistFieldExpert
      };
    }
})(EditService);

export default EditPageContainer;