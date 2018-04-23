import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Services} from '/imports/dashboard/reactCMS/api/Services.js';
import { withTracker } from 'meteor/react-meteor-data';


class CreateUser extends TrackerReact(Component) {

  constructor(props){
    super(props);
    this.state={
      "roleList" :[],
      "service" :[],
      "userList" :[],
      "userUniqueData":[],
      "userSubscribe": Meteor.subscribe('userfunction'),
    }
  }
	createUser(event){
    event.preventDefault();
    var reportrefValue = this.refs.reportToRef.value;      
        if(reportrefValue!=""){
          var splitValue   =  reportrefValue.split("(");
          var reportToRole = splitValue[0];
          var reportToName = splitValue[1].slice(0, -1);
        }else{
          var reportToName = '';
          var reportToRole = '';
        }
        console.log("reportrefValue :"+reportrefValue);
        
        
        var formValues = {
                          'firstname'        : this.refs.firstname.value,
                          'lastname'         : this.refs.lastname.value,
                          'signupEmail'      : this.refs.signupEmail.value,
                          'mobNumber'        : this.refs.mobNumber.value,
                          'servicesName'     : this.refs.servicesRef.value,
                          'reportToRole'     : reportToRole,
                          'reportToName'     : reportToName,
                          'signupPassword'   : "user123",
                        }   
        var assignedrole = this.refs.roleRef.value; 
        var defaultRoleWith = ["backofficestaff"];
        defaultRoleWith.push(assignedrole);
        
        
        Meteor.call('userCreateAccount', formValues ,(error,result) => {
          if(error){ 
            swal(error.reason);
          }else{      

          	// CLEAR ALL FIELDS
            this.refs.firstname.value      = '';
            this.refs.lastname.value       = '';
            this.refs.signupEmail.value    = '';
            this.refs.mobNumber.value      = '';


            // ADD USER ROLE 
            var newID = result;
            Meteor.call('addRoles', newID , defaultRoleWith, function(error,result){
              if(error){
                swal(error);
              }else{              	
				swal('Congratulations!! Account Created...');
              }
            }); // add role
		            
          } //end else
        });

    return 0;  	

	}

	 componentDidMount() {
	 	// $("#signUpUser").validate();
	 	    $("html,body").scrollTop(0);
    if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }

    this.serviceTracker = Tracker.autorun( ()=> {
      var handle = Meteor.subscribe("services");
      if(handle.ready()){
        var services = Services.find({},{field:{'serviceName':1}}).fetch();
       
        this.setState({
          "service": services,
        });
      }
    });

    // this.roleTracker = Tracker.autorun( ()=> {
    //   var handle = Meteor.subscribe("rolefunction");
    
    //   if(handle.ready()){
    //     if(this.state.userSubscribe.ready()){
    //       var allusers = Meteor.users.find({"roles":{$nin:["user","superAdmin","admin"]}}).fetch();
    //       var allRoles = Meteor.roles.find({}).fetch();         
          
    //       if(allusers.length >0 && allRoles.length >0){
    //         var newArr = [];
    //         // console.log("allusers: ",allusers);
    //         for(var i=0;i<allusers.length;i++){
              
    //           var currentText = allusers[i].profile.firstname +" "+ allusers[i].profile.lastname;
    //           var reportName  = allusers[i].profile.firstname +" "+ allusers[i].profile.lastname;
    //           var userLen = allusers[i].roles;
    //           if(userLen.length){
    //             for(k=0;k<userLen.length;k++){
    //               if(userLen[k]!="backofficestaff"){
    //                 currentText = userLen[k] +"("+currentText+")" ;
    //               }
    //             }
    //           }
             
    //           newArr.push(currentText);
    //         }
    //         var roleArray = [];
    //         for(var j=0;j<allRoles.length;j++){
    //           if((allRoles[j].name!="superAdmin") && (allRoles[j].name!= "admin") && (allRoles[j].name!= "user"))  {

    //             var rolevalue = allRoles[j].name;
    //             roleArray.push(rolevalue);
    //           }
    //         }
            

    //         this.setState({
    //           "roles": allRoles,
    //           "userUniqueData":newArr,
    //           "roleList"      : roleArray,
    //           "reporttoName"  : reportName
           
    //       });   

    //       }
         
    //     }
    //   }
   
    // });


	 }
   componentWillMount() {
    // if (!!!$("link[href='/css/dashboard.css']").length > 0) {
    //   var dashboardCss = document.createElement("link");
    //   dashboardCss.type = "text/css"; 
    //   dashboardCss.rel = "stylesheet";
    //   dashboardCss.href = "/css/dashboard.css"; 
    //   document.head.append(dashboardCss);
    // }
  }
   componentWillUnmount(){  
     $("script[src='/js/adminLte.js']").remove(); 
     // $("link[href='/css/dashboard.css']").remove(); 
   }


	render() {
    if(!this.props.loading){      
       return (
       	<section className="content-wrapper">
        <div className="content">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
               <h2 className="box-title">CREATE USER</h2>
              </div>
           
	            <div className="box-body ">
								<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
								  <form id="signUpUser" onSubmit={this.createUser.bind(this)}>
									  <div className="signupBody col-lg-12 col-md-8 col-sm-12 col-xs-12">

									   <div className="form-group col-lg-6 col-md-4 col-xs-6 col-sm-6 inputContent">
									   		<span className="blocking-span">
									   		  <label className="floating-label">First Name</label>
											   	<input type="text" title="Only alphabets are allowed!" className="form-control inputText" ref="firstname" name="firstname" pattern="[a-zA-Z][a-zA-Z ]+" required />

											</span>
									    </div>

									   <div className="form-group col-lg-6 col-md-4 col-xs-6 col-sm-6 inputContent">
									   		<span className="blocking-span">
										   		 <label className="floating-label">Last Name</label>
												   <input type="text" title="Please enter alphabets only!" className="form-control inputText" ref="lastname" name="lastname" pattern="[A-Za-z]+" required />
												</span>
									    </div>

								   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
								   			<span className="blocking-span">
								   			  <label className="floating-label">Email ID</label>
											    <input type="email" title="Please match email format!" className="form-control signupsetting inputText" ref="signupEmail" name="signupEmail" required />
											</span>
									    </div>

								   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
								   			<span className="blocking-span">
								   			  <label className="floating-label">Phone Number</label>
											    <input type="text" pattern="^(0|[1-9][0-9]*)$" title="Please enter numbers only!" className="form-control inputText" ref="mobNumber" name="mobNumber" required />
											</span>
									    </div>

                      <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 inputContent">
								   			<span className="blocking-span">
								   			  <label className="floating-label">Assign Service</label>
                           {/* <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span> */}
                              <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="servicesRef">

                                  { this.state.service.length>0 ?
                                    this.state.service.map( (data, index)=>{
                                      return (
                                          <option key={index}>{data.serviceName}</option>
                                      );
                                  })
                                  :
                                  ""
                                  }
                              </select>
										  	</span>
									    </div>
                      <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 inputContent">
								   			<span className="blocking-span">
								   			  <label className="floating-label">Assign Role</label>
                           <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="roleRef">
                                  { 
                                    !this.props.loading ?
                                    this.props.roleList.length > 0 ?
                                    this.props.roleList.map( (data, index)=>{
                                      return (
                                          <option key={index}>{data}</option>
                                      );
                                  })
                                  :
                                  ""
                                  :
                                  ""
                                  }
                           </select>
											</span>
									    </div>
                      <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 inputContent">
								   			<span className="blocking-span">
								   			  <label className="floating-label">Reporting To</label>
                           {/* <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span> */}
                           
                              <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="reportToRef">
                                  { 
                                    !this.props.loading ?
                                    this.props.userUniqueData.length>0 ?
                                    this.props.userUniqueData.map( (data, index)=>{
                                      return (
                                          <option key={index}>
                                            
                                            {data}
                                          </option>
                                      );
                                    })
                                    : 
                                    ""
                                  :
                                  ""

                                  }
                              </select>
										  	</span>
									    </div>

										<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
									    	<input className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="REGISTER"/>
									   </div>	

									  </div> 
								  </form>
						 	 	</div>	
				 	</div>
			 	</div>
			 </div>
		 </div>
     </section>
      );
    }else{
      return <span>loading</span>
    }

	} 
}export default CreateUserContainer = withTracker(props => {
  var handle = Meteor.subscribe("services");
  var userSubscribehandle = Meteor.subscribe('userfunction');
  var rolehandle = Meteor.subscribe("rolefunction");
  
  
  var loading = !handle.ready() && !userSubscribehandle.ready() && !rolehandle.ready(); 


  var allusers = Meteor.users.find({"roles":{$nin:["user","superAdmin","admin"]}}).fetch();
  var allRoles = Meteor.roles.find({}).fetch();         
  
  if(allusers.length >0 && allRoles.length >0){
    var newArr = [];
    // console.log("allusers: ",allusers);
    for(var i=0;i<allusers.length;i++){
      
      var currentText = allusers[i].profile.firstname +" "+ allusers[i].profile.lastname;
      var reportName  = allusers[i].profile.firstname +" "+ allusers[i].profile.lastname;
      var userLen = allusers[i].roles;
      if(userLen.length){
        for(k=0;k<userLen.length;k++){
          if(userLen[k]!="backofficestaff"){
            currentText = userLen[k] +"("+currentText+")" ;
          }
        }
      }
     
      newArr.push(currentText);
    }
    var roleArray = [];
    for(var j=0;j<allRoles.length;j++){
      if((allRoles[j].name!="superAdmin") && (allRoles[j].name!= "admin") && (allRoles[j].name!= "user"))  {

        var rolevalue = allRoles[j].name;
        roleArray.push(rolevalue);
      }
    }
    
  } 
    var roleList = [];
    var roles =  allRoles;
    var userUniqueData=newArr;
    roleList = roleArray;
    var reporttoName = reportName;

  return{
    loading,
    roles,
    newArr,
    userUniqueData,
    roleList,
    reporttoName
  }
})(CreateUser);