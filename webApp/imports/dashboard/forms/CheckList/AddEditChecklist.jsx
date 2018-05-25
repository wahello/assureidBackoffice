import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import ListOfCheckList from './ListOfCheckList.jsx';
import { ChecklistFieldExpert } from '../../reactCMS/api/Services.js';
class AddEditChecklist extends TrackerReact(Component) {
	constructor(props) {
    super(props); 
    this.state = {
      checkListFrom : '',
      task : '',
      checkListFor : '',
      button : 'ADD',
      "subscription"  : {
        // "university" : Meteor.subscribe("university"),
        // "singleuniversity" : Meteor.subscribe("singleuniversity"),
      }  
    }; 
     this.handleChange = this.handleChange.bind(this);
     // this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
  }
  componentDidMount(){
     
      $('#fieldSelect').multipleSelect();
    
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.checkList){
         this.setState({
             checkListFor      : nextProps.checkList.checkListFor,
             task              : nextProps.checkList.task,
             checkListFrom     : nextProps.checkList.checkListFrom,
             id                : nextProps.checkList._id,
             button            : nextProps.button,
         });
      }
    }else{
      this.setState({
           checkListFrom : '',
           task : '',
            checkListFor : '',
             id              : '',
             button          : '',
      });
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
  }
  handleChange(event){
     const target = event.target;
     const name   = target.name;
     this.setState({
      [name]: event.target.value,
     });
  }
  // handleChangeForSelect(event){
  //   const target = event.target;
  //    const name  = target.name;
  //   console.log("name",name);
      
  //    this.setState({
  //     [name]: event.target.value,
  //    });
  //    console.log("checkListFor",this.state.checkListFor);
  // }
  handleSubmit(e){
    e.preventDefault();
    var relatedFieldArr = [];
   if($("#checklistValid").valid()){ 
      var checkListFor    = this.refs.checkListFor.value;
      var task            = this.refs.task.value;
      var checkListFrom   = this.refs.checkListFrom.value;
      var id              = this.props.params.id;
      var checkListForField = $('#fieldSelect').val();
    
      var option_all = $("select#fieldSelect option:selected").map(function () {
          var optionText= $(this).text();
          var optionValue= $(this).val();
         
          relatedFieldArr.push({
            "selectedField":optionText,
            "dbField" :optionValue
          });
          
      }).get().join(',');
      
    //   "relatedFields" : [ 
    //     {
    //         "selectedField" : "AddressLine1",
    //         "dbField" : "line1"
    //     }, 
    //     {
    //         "selectedField" : "AddressLine2",
    //         "dbField" : "line2"
    //     }
    // ]

    console.log("relatedFieldArr");
    console.log(relatedFieldArr);

      if(id){ 
        Meteor.call('updateChecklist',id,checkListFor,task,checkListFrom,relatedFieldArr,(error,result)=>{
          if(error){
              console.log(error.reason);
          }else{                      
            swal("Done","Your Check List Name has been Updated!.","success");  
            var path = "/admin/Checklist";
            browserHistory.replace(path);
            $(".task").val("");
            $(".checkListFor").val("");
            $(".checkListFrom").val("");
          }            
        });
      }else{
        Meteor.call('createChecklist',checkListFor,task,checkListFrom,relatedFieldArr,(error,result)=>{
          if(error){
              console.log(error.reason);
          }else{                      
            swal("Done","Your Check List has been Created!.","success"); 
            // $(".UniversityName").val("");
            $(".task").val("");
            $(".checkListFor").val("");
            $(".checkListFrom").val("");
          }            
        });  
      }
    }
  }

	render() {
     return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1> Check List </h1>
          <ol className="breadcrumb">
            <li>
              <a href="#"><i className="fa fa-check-square" /> Check List</a></li>
            <li className="active">Add Check List</li>
          </ol>
        </section>
         <section className="content">
           <div className="row">
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <div className="box box-primary">
                  <div className="box-header with-border">
                   <h2 className="box-title">Check List For Field Expert</h2>  
                  </div>
                  <div className="box-body">
                    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                      <form id="checklistValid">

                     <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                        <span className="blocking-span col-lg-12 col-md-6 col-xs-12 col-sm-12 NOleftPad">
                            <label className="floating-label">Checklist For</label>
                            <select className="form-control inputText checkListFor" ref="checkListFor" id="checkListFor" value={this.state.checkListFor} name="checkListFor" onChange={this.handleChange}>
                              <option value="Basic Information">Basic Information</option>
                              <option value="Identity Information">Identity Information</option>
                              <option value="Address Information">Address Information</option>
                              <option value="Academic Information">Academic Information</option>
                              <option value="Employment Information">Employment Information</option>
                              <option value="Skills And CertificationInformation">Skills & Certification Information</option>
                              <option value="Other Information">Other Information</option>
                            </select>
                        </span>
                      </div>
                       <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                        <span className="blocking-span">
                            <label className="floating-label">Checklist</label>
                            <input type="text" className="form-control inputText task" ref="task" id="task" value={this.state.task} name="task" onChange={this.handleChange}/>
                        </span> 
                      </div>
                      <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                        <span className="blocking-span">
                          <label className="floating-label">Checklist From</label>
	                        <select className="form-control inputText  checkListFrom" ref="checkListFrom" id="checkListFrom" value={this.state.checkListFrom} name="checkListFrom" onChange={this.handleChange}>
                            <option selected disabled value>-- Select --</option>
	                          <option value="Database">Database</option>
	                          <option value="User Upload">User Upload</option>
	                        </select>
	                       </span> 
                      </div>
                      <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                        <span className="blocking-span col-lg-12 col-md-6 col-xs-12 col-sm-12 NOleftPad">
                            <label className="floating-label col-lg-12">Checklist For Field Value</label>
                            {/*this.state.checkListFor == "Address Information" ?
                               <select className="w300" multiple="multiple" id="fieldSelect" ref="checkListForField">
                                <option value="line1">Address Line 1 </option>
                                <option value="line2 ">Address Line 2 </option>
                                <option value="line3 ">Address Line 3 </option>
                                <option value="landmark ">Landmark </option>
                                <option value="city">City </option>
                                <option value="state">State </option>
                                <option value="country">Country </option>
                                <option value="pincode">Pincode </option>
                                <option value="residingFrom">residingFrom</option>
                                <option value="residingTo">residingTo</option>
                                <option value="proofType">proofType</option>
                             </select>  
                              :
                              this.state.checkListFor == "Employment Information" ?*/}
                                <select className="w300" multiple="multiple" id="fieldSelect" ref="checkListForField">
                                  <option value="Employer Name">Employer Name </option>
                                  <option value="Company Address">Company Address </option>
                                  <option value="Company contact number">Company contact number  </option>
                                  <option value="Employee ID / Employee code">Employee ID / Employee code </option>
                                  <option value="Employee designation">Employee designation </option>
                                  <option value="Employee department">Employee department </option>
                                  <option value="Employee period from">Employee period from </option>
                                  <option value="Employee period to">Employee period to </option>
                                  <option value="Type of Employment">Type of Employment</option>
                                  <option value="Detail of Agency">Detail of Agency</option>
                                  <option value="Reporting manager name">Reporting manager name</option>
                                  <option value="Reporting manager designation">Reporting manager designation</option>
                                  <option value="Reporting manager contact number">Reporting manager contact number</option>                              
                               </select>  
                             {/*:
                              <select className="w300" multiple="multiple" id="fieldSelect" ref="checkListForField">
                                  <option value="line1">Select </option>
                               </select>  

                            */}
                             
                        </span>
                      </div>
                       <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                          <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="" onClick={this.handleSubmit.bind(this)}>{this.state.button}</button>
                        </div> 
                      </form>
                     </div>
                     <ListOfCheckList />
                  </div>
               </div>
              </div>
           </div>
         </section>
      </div> 
      );
  } 
}
EditChecklistContainer = withTracker(({params}) => {
    var _id          = params.id;
    const postHandle = Meteor.subscribe('singleChecklistFieldExpert',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const checkList  = ChecklistFieldExpert.findOne({"_id":_id})|| {};
    const loading    = !postHandle.ready();
    
    if(_id){
      var button = "UPDATE";
      return {
          loading,
          checkList,
          button,
      };
    }else{
       var button = "ADD";
      return {
          loading,
          checkList,
          button
      };
    }
})(AddEditChecklist);

export default EditChecklistContainer;
