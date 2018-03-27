import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router'; 
import { Link } from 'react-router';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js'; 
import AddImagesVideo from './AddImagesVideo.jsx';
import UploadReport from '/imports/dashboard/ticketManagement/UploadReport.jsx';

class RoleTicketStatus extends TrackerReact(Component){   
constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      },
      'radioState':'Field Expert', 
    }
  }
  allocateToTeamMember(event){
      event.preventDefault();
      var allocateTo = this.refs.allocateToName.value;
      var allocateToSplit = allocateTo.split(" ");
      var firstName = allocateToSplit[0];
      var lastName  = allocateToSplit[1];
      var ticketDetails = this.props.getTicket;
      var ticketId = ticketDetails._id;
      var allocateToMemberDetails = ticketDetails.ticketElement[1];
      var empid = $(event.currentTarget).attr('data-empid');
      
    //   console.log(allocateToMemberDetails);
      Meteor.call('allocateToTeamMember',ticketId,firstName,lastName,allocateToMemberDetails,empid,(error,result)=>{
          if(result){
            $('.allteamleader').hide();
          }
            // console.log(result);
      });
  }

  changeTMStatus(event){
      var ticketId = $(event.currentTarget).attr('data-id');
      var status      = $(event.currentTarget).attr('data-status');
      var empid       = $(event.currentTarget).attr('data-empId');      
      Meteor.call('updateTMStatus',ticketId,status,empid,(error,result)=>{
      });
  }

  /*Get radio value and display dropdown and textbox*/
  getRadioValue(event){
    event.preventDefault();
    var radioValue = $(event.currentTarget).val();
    this.setState({
        'radioState':radioValue,
    });
  }

  uploadDocsDiv(event){
    event.preventDefault();
    $('#AddImagesVideo').css({"display" : "block"});
  }

  /*Add BA Details  */
  addBADetails(event){
    
    event.preventDefault();
    var role        = $(event.currentTarget).attr('data-role');
    var ticketId    = $(event.currentTarget).attr('data-id');
    var empid       = $(event.currentTarget).attr('data-empid');
    if(role == "BA"){
        // var baName = this.refs.BAName.value; 
        var id = this.refs.allocateToFEName.value;           
        $('#uploadDocs').css({"display" : "block"});   
        // Meteor.call("addBADetails",baName,(error,result)=>{
        //     if(result){
            var id = this.refs.allocateToFEName.value;  
            // console.log("id :"+id);
            $('.hideteamMemOptio').hide();        
            var FEid = $(event.currentTarget).attr('data-teamMemid');
            Meteor.call('genericTicketUpdate',empid,role,ticketId,id,FEid,(error,result)=>{
                if(result == 1){
                    swal({
                                    title: "Assing Ticket!",
                                    text: "Successfully Assign",
                                    icon: "success",
                    });
        
                }
            });
        //     }
        // })
    }else if(role == "Field Expert"){              
        var id = this.refs.allocateToFEName.value;  
        $('.hideteamMemOptio').hide();        
        var FEid = $(event.currentTarget).attr('data-teamMemid');
        Meteor.call('genericTicketUpdate',empid,role,ticketId,id,FEid,(error,result)=>{
            if(result == 1){
                swal({
                                title: "Assing Ticket!",
                                text: "Successfully Assign",
                                icon: "success",
                });
    
            }
        });
        
    }else{
        // $('.hideteamMemOptio').hide();     
        $("#uploadDocs").css({"display" : "block"});
        var FEid = $(event.currentTarget).attr('data-teamMemid');
        // console.log("empid,role,ticketId,id,FEid :"+empid,role,ticketId,id,FEid);   
        
        Meteor.call('genericTicketUpdate',empid,role,ticketId,id,FEid,(error,result)=>{
            if(result == 1){
                swal({
                                title: "Assing Ticket!",
                                text: "Successfully Assign",
                                icon: "success",
                });
    
            }
        });
    }
    
  }
/*======================================= Hide Team List ================================================== */
 hideList(status,teammemberDetails,empid,length,index1){
      
    var reportUserArr = [];
    if(teammemberDetails){
        for(k=0;k<teammemberDetails.length;k++){
            var newStr = teammemberDetails[k].profile.firstname+" "+teammemberDetails[k].profile.lastname;
            reportUserArr.push(newStr);
        }

    }

    if((status=="New" && ( length == 1) )){
        return(
            <div id="hidelist" className="col-lg-12 displayTeamList">
                <div className="col-lg-8 allteamleader">
                <lable>Allocate To Team Member</lable>
                <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="allocateToName">
                    { 
                        reportUserArr.map( (data, index)=>{
                            return (
                                <option key={index}>
                                    {data}
                                </option>
                            );
                        })
                    } 
                </select>
                </div>
                <div className="col-lg-4 fesubmitouter noLRPad">
                    <button type="button" className="fesubmitbtn col-lg-12 teammember" role-status={this.props.role_status} data-empid={empid} onClick={this.allocateToTeamMember.bind(this)}>Ok</button>
                </div>
            </div>
        );
    }else if(status == "Allocated"){
        return(<div></div>);
    }
}

/*======================================== Hide Team Member Button ==================================================*/
 hideTeamMemButton(status,teammemberDetails,empid,ticketId,length,index1){
    var reportUserArr = [];
    var reportBAArr   = [];
    $('#uploadDocs').css({"display" : "block"});     
    if(teammemberDetails){
        for(k=0;k<teammemberDetails.length;k++){
            for(var j=0;j<teammemberDetails[k].roles.length;j++){
                if(teammemberDetails[k].roles.length>0){
                    if(teammemberDetails[k].roles[j]=="field expert"){
                        var newStr = teammemberDetails[k].profile.firstname+" "+teammemberDetails[k].profile.lastname;
                        var teamMemid  = teammemberDetails[k]._id;
                        reportUserArr.push(newStr);
                    }    
                }  
            }
        }
        for(k=0;k<teammemberDetails.length;k++){
            for(var j=0;j<teammemberDetails[k].roles.length;j++){
                if(teammemberDetails[k].roles.length>0){                
                    if(teammemberDetails[k].roles[j]=="BA"){
                        var newStr = teammemberDetails[k].profile.firstname+" "+teammemberDetails[k].profile.lastname;
                        var teamMemid  = teammemberDetails[k]._id;
                        reportBAArr.push(newStr);
                    }   
                }   
            }
        }
    }
    var ticketElement = this.props.getTicket.ticketElement;
    if(ticketElement.length>0){
        var allocatedTo = "";
        
        for(var i=0;i<ticketElement.length;i++){
            if(ticketElement[i].allocatedTo =="Self"){
                allocatedTo = "Self";
                break;
            }
        }
    }

    

    if((status == "New") && ( length == 1)){
        return(
               <div className="hideacceptreject" id="hideacceptreject">
                   <button type="button" className="bg-primary col-lg-5 teammember" data-status="Accepted" data-empId = {empid}  data-id={this.props.ticketId}  onClick={this.changeTMStatus.bind(this)}>Accept</button>
                   <button type="button" className="btn-danger col-lg-5 teammember" data-status="Rejected" data-empId = {empid}  data-id={this.props.ticketId}  onClick={this.changeTMStatus.bind(this)}>Reject</button>
               </div>
       );
    }else if((status == "Accepted") && (length ==2)){
        return(
            <div className="col-lg-12 fesubmitouter">
                <div className="hideteamMemOptio">
                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <div className="radio radiobtn col-lg-3 noLRPad">
                            <label className="noLRPad"><input type="radio" name="optradio" value="Self" className="optradio" checked={this.state.radioState ==="Self"} onChange={this.getRadioValue.bind(this)}/>Self</label>
                            </div>
                            <div className="radio col-lg-6 radiobtn noLRPad">
                            <label className="noLRPad"><input type="radio" name="optradio" value="Field Expert" className="optradio" checked={this.state.radioState ==="Field Expert"} onChange={this.getRadioValue.bind(this)}/>Field Expert</label>
                            </div>
                            <div className="radio radiobtn col-lg-3 noLRPad">
                            <label className="noLRPad"><input type="radio" name="optradio" value="BA" className="optradio" checked={this.state.radioState ==="BA"} onChange={this.getRadioValue.bind(this)}/>BA</label>
                            </div>
                    </div>
                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad hideFieldexpert">                            
                        {
                            this.state.radioState == 'Field Expert'?
                                
                                    <div>
                                        <div className="col-lg-7 teamMemOuter">
                                        <lable>Allocate To Field Expert</lable>
                                        <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="allocateToFEName">
                                            { 
                                                reportUserArr.map( (data, index)=>{
                                                    return (
                                                        <option key={index}>
                                                            
                                                        {data}
                                                        </option>
                                                    );
                                                })
                                            } 
                                        </select>
                                        </div>
                                        <div className="col-lg-4 fesubmitouter noLRPad">
                                                <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-teamMemid= {teamMemid} data-empId = {empid} onClick={this.addBADetails.bind(this)} data-id={this.props.ticketId} data-role={this.state.radioState}>Submit</button>                                       
                                        </div>
                                    </div>
                            : 
                            this.state.radioState == 'BA'?
                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                            
                                {/* <div className="col-lg-8 noLRPad">
                                    <input type="text" name="baName" className="fesubmitbtn banametext" ref="BAName"/>
                                </div>
                            
                                <div className="col-lg-3 noLRPad">                                        
                                    <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-empId = {empid} onClick={this.addBADetails.bind(this)} data-addressType = {this.props.getTicket.addressType} data-id={this.props.ticketId} data-role={this.state.radioState}>Submit</button>
                                </div> */}

                                <div>
                                    <div className="col-lg-7 teamMemOuter">
                                    <lable>Allocate To BA</lable>
                                    <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="allocateToFEName">
                                        { 
                                            reportBAArr.map( (data, index)=>{
                                                return (
                                                    <option key={index}>
                                                        
                                                    {data}
                                                    </option>
                                                );
                                            })
                                        } 
                                    </select>
                                    </div>
                                    <div className="col-lg-4 fesubmitouter noLRPad">
                                            <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-teamMemid= {teamMemid} data-empId = {empid} onClick={this.addBADetails.bind(this)} data-id={this.props.ticketId} data-role={this.state.radioState}>Submit</button>                                       
                                    </div>
                                </div>
                                    

                            </div>
                            :
                            this.state.radioState == 'Self'?
                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                

                                <h5><strong>You are going to handle this ticket</strong></h5>
                                {/* <button type="submit" value="Submit"  className="col-lg-12 noLRPad" onClick={this.addBADetails.bind(this)}>OK</button> */}
                                <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-teamMemid= {teamMemid} data-empId = {empid} onClick={this.addBADetails.bind(this)} data-id={this.props.ticketId} data-role={this.state.radioState}>Ok</button>                                       
                                {/* <div className="col-lg-4 uploadDocs noLRPad" id="uploadDocs" style={{"display" : "none"}}>                                        
                                    <button type="submit" value="Submit"  className="col-lg-12 noLRPad" onClick={this.uploadDocsDiv.bind(this)}>Upload Docs</button>
                                </div> */}
                                

                            </div>
                            :
                            ""
                        }
                    </div>   
                </div>
            </div>
        );
    }else if((status =="Allocated" && allocatedTo == "Self")){
        // return(
        //     <div className="col-lg-12 fesubmitouter showup noLRPad" id="uploadDocs" style={{"display":"block"}}>                                        
        //         <button type="submit" value="Submit"  className="col-lg-12 noLRPad" onClick={this.uploadDocsDiv.bind(this)}>Upload Docs</button>
        //     </div>
        // );
    }
        
} 

   
userData(){
    var getTicket = TicketMaster.findOne({"_id" : this.props.ticketId});
    var userId = Meteor.userId();
    var getUserData = Meteor.users.findOne({"_id":userId});
    var finalarray      = [];

  if (getTicket){
      var newCommeeteeArr = [];
      var data            = {};
      var status          = [];
      var date            = [];
      var status_temp     = [];
      var count           = 1;
      for(var i=0;i<getTicket.ticketElement.length;i++){
          
              if((i > 0 ) && ((getTicket.ticketElement[i].role == getTicket.ticketElement[i-1].role) && (getTicket.ticketElement[i].empid == getTicket.ticketElement[i-1].empid))){
                  if(getTicket.ticketElement[i].allocatedTo!=""){
                      data.allocatedToName = getTicket.ticketElement[i].allocatedTo;
                      data.allocatedToRole = getTicket.ticketElement[i].allocatedToRole;
                  }
                  
                  newCommeeteeArr[i-count].status.push(getTicket.ticketElement[i].role_status + ' - '+moment(getTicket.ticketElement[i].createdAt).format("DD/MM/YYYY"));
                  count++;
              }else{
                  
                  if(getTicket.ticketElement[i].allocatedTo!=""){
                      data.allocatedToName = getTicket.ticketElement[i].allocatedTo;
                      data.allocatedToRole = getTicket.ticketElement[i].allocatedToRole;
                  }else{
                    data.allocatedToName = getTicket.ticketElement[i].allocatedTo;
                    data.allocatedToRole = false;
                  }
                  var roleDetails = Meteor.users.findOne({"_id":getTicket.ticketElement[i].empid});
                  
                  data = {
                      index  : i,
                      empid  : getTicket.ticketElement[i].empid,
                      role   : getTicket.ticketElement[i].role,
                      name   : roleDetails.profile.firstname + ' ' +roleDetails.profile.lastname,
                      status : [getTicket.ticketElement[i].role_status + ' - '+moment(getTicket.ticketElement[i].createdAt).format("DD/MM/YYYY")],
                     
                  };

                  newCommeeteeArr.push(data);
      
              }
      }
      for(var i=0;i<newCommeeteeArr.length;i++){
          finalarray.push(
              <div key ={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomBlock noLRPad">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">
                      {newCommeeteeArr[i].role}
                      </h5>
                      <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Name <span className="pull-right">:</span>
                              </div>  
                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                  <p>{newCommeeteeArr[i].name}</p>
                              </div> 
                          </div>
                          
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                          Status/Date <span className="pull-right">:</span>
                          </div>  
                          
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-4 text-left noLRPad userLabel">
                          
                          {
                                newCommeeteeArr[i].status.map((data1,index1)=>{
                                      var length = newCommeeteeArr[i].status.length;
                                      return(  
                                          <div key={index1}>                                        
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">   
                                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                                  <p className="statusStyle">{data1}</p>
                                              </div> 
                                          </div>      
                                          <div>
                                              {this.roleSwitch(data1,newCommeeteeArr[i].role,newCommeeteeArr[i].empid,length,index1 )}
                                          </div>
                                          </div>
                                      );
                                  })
                                      
                          }                                        
                          </div>
                          {
                              newCommeeteeArr[i].allocatedToName!="" && newCommeeteeArr[i].allocatedToName!=undefined ?
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                              
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                          Allocated To <span className="pull-right">:</span>
                                      </div>  
                                      <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                          <p>{newCommeeteeArr[i].allocatedToName} &nbsp;
                                          { 
                                              newCommeeteeArr[i].allocatedToRole!=""? 
                                              (newCommeeteeArr[i].allocatedToRole)
                                                :
                                                ""
                                            }</p>
                                      </div> 
                                  </div>
                                    {newCommeeteeArr[i].allocatedToName == "Self" ?

                                    <div className="col-lg-3 col-lg-offset-4 showup noLRPad" id="uploadDocs" style={{"display":"block"}}>                                        
                                        <button type="submit" value="Submit"  className="col-lg-12 noLRPad fesubmitbtn" onClick={this.uploadDocsDiv.bind(this)}>Upload Docs</button>
                                    </div>
                                    : 
                                    ""
                                    }
                                    
                              </div>
                              :
                              ""
                          }
                      </div>
                  </div>
          </div>
          );
                  // break;
          }
      // }
  }
    return finalarray;
  
  }

roleSwitch(roleStatus,role,empid,length,index1 ){
    
    var splitroleStatus = roleStatus.split('-');    
    var status = splitroleStatus[0].trim();
    if (!this.props.loading && role != "BA") {
        var userDetails = Meteor.users.findOne({"_id":empid});
        if (userDetails) {
          var name = userDetails.profile.firstname +" "+userDetails.profile.lastname;
          var teammemberDetails = Meteor.users.find({"profile.reportToName":name}).fetch();
          var reportUserArr = [];
        }
        
        switch(role){
            case 'team leader':            
            
                    return this.hideList(status,teammemberDetails,empid,length,index1);
                    break;
            case 'team member':
                     
                    return this.hideTeamMemButton(status,teammemberDetails,empid,this.props.ticketId,length,index1);
                    break;
            
            case 'field expert':
                    //Show upload document button for ba abd field expert pass role
                  break;
                    

            }
        }
}

 
	render(){
    return(
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
            {this.userData()}
        </div> 
      
      </div>
   
    );
   }
}
ticketContainer = withTracker(props => {

    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const userfunction = Meteor.subscribe('userfunction');
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
    const loading = !postHandle.ready() && !userfunction.ready();
      return {
          loading  : loading,
          getTicket : getTicket,
          ticketId  : _id
      };
})(RoleTicketStatus);
export default ticketContainer;
