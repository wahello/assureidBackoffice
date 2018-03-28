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
import { TempTicketImages } from './api/TempUpload.js';
import { TempTicketVideo } from './api/TempUpload.js';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import { ChecklistFieldExpert } from '../reactCMS/api/Services.js';

// const getDuration = require('get-video-duration');
class AddImagesVideo extends TrackerReact(Component){
constructor(props){
    super(props);
    this.state = {
      "remark" : '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleUpload(event){
    event.preventDefault();
    let self = this;
     // this.setState({isUploading: true});
     // console.log(event.currentTarget.files.length);
    if (this.props.ticketImages.length >= 0 && this.props.ticketImages.length < 5 ) {
      if (event.currentTarget.files.length < 5) {
        for (var i = 0; i < event.currentTarget.files.length; i++) {
          if (event.currentTarget.files[i]) {
            var dataImg = event.currentTarget.files[i]; 
            console.log("dataImg",dataImg);
             if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){     
               var reader = new FileReader();       
               reader.onload = function (e) {         
                 // $('.uploadedImageFromLocl').attr('src', e.target.result);     
               };      
               reader.readAsDataURL(event.currentTarget.files[i]);     
               var file = event.currentTarget.files[i];     
                if (file) {        
                  addImgsToS3Function(file,self);      
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
       }else if (event.currentTarget.files.length >= 5 ) {
          swal({   
             position: 'top-right',    
             type: 'error',   
             title: 'You can not add more than 5 images',      
             showConfirmButton: false,     
             timer: 3000     
           }); 
        }
    }else if (this.props.ticketImages.length >= 5 ){
       swal({   
         position: 'top-right',    
         type: 'error',   
         title: 'You can not add more than 5 images',      
         showConfirmButton: false,     
         timer: 3000     
       }); 
    }
  }
  handleChange(event){
   event.preventDefault();
   const target = event.target;
   const name   = target.name;
   this.setState({
    [name]: event.target.value,
   });
  }
  handleVideoUpload(event){
    event.preventDefault();
    let self = this;
    if (this.props.ticketVideo.length >= 0 && this.props.ticketVideo.length < 1) {
      if (event.currentTarget.files.length > 1) {
        swal({   
         position: 'top-right',    
         type: 'error',   
         title: 'You can not add more than one video',      
         showConfirmButton: false,     
         timer: 3000     
       }); 
      }else{
       if (event.currentTarget.files && event.currentTarget.files[0]) { 
        var dataImg =event.currentTarget.files[0];
         if(dataImg.type == "video/mp4"){      
           var reader = new FileReader();       
            reader.onload = function (e) {          
             // $('.uploadedImageFromLocl').attr('src', e.target.result);      
           };       
           var vid = document.createElement('video');
           reader.readAsDataURL(event.currentTarget.files[0]);      
           var file = event.currentTarget.files[0]; 
           // var fileURL = URL.createObjectURL(event.currentTarget.files[0]);
           // vid.src = fileURL;
           // console.log(vid.duration);
           // getDuration(event.currentTarget.files[0]).then((duration) => {
           //    console.log(duration);
           // });
           if (file) {         
             var fileURL = URL.createObjectURL(event.currentTarget.files[0]);
              vid.src = fileURL;
              // wait for duration to change from NaN to the actual duration
              vid.ondurationchange = function() {
                 var duration = this.duration;
                 console.log("duration",duration);
              if (duration <= 10) {
                 addTicketVideoS3Function(file,self);       
              }else{
                  swal({    
                   position: 'top-right',     
                   type: 'error',    
                   title: 'You are not allowed to add video Beyond 10Sec!',       
                   showConfirmButton: false,      
                   timer: 1500      
                 });  
               }   
              }
            };
         } else { 
          swal({    
             position: 'top-right',     
             type: 'error',    
             title: 'Please select Video',       
             showConfirmButton: false,      
             timer: 1500      
           });   
        }
      }

      }
   
    }else if (this.props.ticketVideo.length >= 1 ){
       swal({   
         position: 'top-right',    
         type: 'error',   
         title: 'You can not add more than one video',      
         showConfirmButton: false,     
         timer: 3000     
       }); 
    }

  }
  submitImageVideo(event){
    event.preventDefault();
    var id     = this.props.tickets._id;
    var userId = this.props.tickets.userId;
    // var baId   = this.state.baid;
    var checkLists = [];

    // if ($('input:checkbox[id="Checklist"]:checked')) {
    //   var n = $('input:checkbox[id="Checklist"]:checked').length;
    //   console.log(n);
    //   for (var i = 0; i < $('input:checkbox[id="Checklist"]:checked').length; i++) {
    //       checkLists.push({"statement" : $(this).val(), ""})
    //   }
    // }

    $('input[name="Checklist"]').each(function(i){
      var dataChk ={};
      if($(this).is(":checked")){
          dataChk.statement = $(this).val();
          dataChk.status = true;
          console.log("In if");
      }else{
        dataChk.statement = $(this).val();
        dataChk.status = false;
          console.log("In else");
      }
      checkLists.push(dataChk);
    });
    
    // console.log("checkLists",checkLists);
    var documents ={
       checkLists : checkLists,
       images : this.props.ticketImages,
       videos : this.props.ticketVideo,
       remark : this.refs.remark.value,
    }
   
    var ticketElementObj = {};
    if (this.props.tickets) {
      if (this.props.tickets.ticketElement) {
        if (this.props.tickets.ticketElement.length > 0) {
            ticketElementObj  = this.props.tickets.ticketElement[this.props.tickets.ticketElement.length-1];
                
        }
      }
      // console.log("ticketElementObj",ticketElementObj);
      // if(ticketElementObj.role == "team member"){
      //   var role_status = "SelfSubmit";
      // }else if(ticketElementObj.role == "Field Expert"){
      //   var role_status = "FieldSubmit";
      // }else{
      //   var role_status = "BASubmit";
      // }
      var ticketBAElement ={
          empid             : ticketElementObj.empid,
          role              : ticketElementObj.role,
          role_status       : "ProofSubmit",
          createdAt         : new Date(),
          submitedDoc       : documents,
          submitedRemark    : "Approved",
      }
      console.log("ticketBAElement",ticketBAElement);
      Meteor.call('addticketBAElement',id,userId,ticketBAElement,function (error,result) {
        if (error) {
          console.log(error.reason);
        }else{
          console.log("Inserted Successfully!");
          $("#AddImagesVideo").css({"display" : "none"});
          $("#uploadDocs").css({"display" : "none"});
        }
      });
    }
  }
render(){
    // console.log("ticket");
     return(
      <div>
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 choosefilebox">
        <form>
        <div className="col-lg-12 wholeborder ">
             {this.props.checkList ?
                this.props.checkList.map((checkListDefault,index)=>{
                  return(
                    <div className="col-lg-6 noLRPad" key={index}>  
                       <input type="checkbox" ref="Checklist" id="Checklist" name="Checklist" className={"checkList-"+index} value={checkListDefault} />&nbsp;{checkListDefault}
                    </div>
                  );
                })
                :
               ""
             }
          </div>
        <div className="col-lg-12 wholeborder ">
          <div className="imgtitile col-lg-12 noLRPad">
          <div className="col-lg-12  noLRPad Selectimg"> Select images:</div>
          <input type="file" ref="ticketImageFile" id="s3file" name="ticketImageFile"  onChange={this.handleUpload.bind(this)} className="col-lg-7 noLRPad" name="img" multiple />
        </div>
            {!this.props.loading ?
            <div className="col-lg-12 imgbox">
               {this.props.ticketImages ?
               this.props.ticketImages.map((ticketImages,index) =>{
               return(
                 <div className="col-lg-3 imgbrPre" key={index}>
        <div className="imgbr">
          <img src={ticketImages.imageLink} className="img1 img-responsive" />
{/*         <i className="fa fa-times-circle"></i>
*/}       </div>
        </div>
               );
               })
               :
               ""
               }
        </div>
        :
              ""
            }
         
       </div>
      <div className="col-lg-12 wholeborder">
        <div className="imgtitile col-lg-12  noLRPad">
          <div className="col-lg-12 noLRPad Selectimg"> Select Video:</div>
      <input type="file" ref="ticketVideoFile" id="s3file" name="ticketVideoFile"  onChange={this.handleVideoUpload.bind(this)} className="col-lg-7 noLRPad" name="img" multiple />
          {/*<input type="submit" className="col-lg-1 btn btn-primary" />*/}
          </div>

         {!this.props.loading1 ?
            <div className="col-lg-12 imgbox">
               {this.props.ticketVideo ?
               this.props.ticketVideo.map((ticketVideo,index) =>{
               return(
                 <div className="col-lg-4 imgbrvid" key={index}>
          <video width="200" height="200"  controls>
          <source src={ticketVideo.videoLink} type="video/mp4" />
        </video>
        </div>
               );
               })
               :
               ""
               }
       
        </div>
        :
              ""
            }

      </div>
      <div className="col-lg-12 wholeborder">
          <div className="imgtitile col-lg-12  noLRPad">
            <div className="col-lg-12 noLRPad Selectimg">Remark:</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noLRPad">
               <textarea className="form-control col-lg-12 col-sm-12 col-md-12 col-xs-12" name="remark" ref="remark" id="remark" onChange={this.handleChange} rows="5" id="remark"></textarea>          
            </div>
      </div>
      <div className="col-lg-12 wholeborder text-center">
         <button type="submit" onClick={this.submitImageVideo.bind(this)} className="btn btn-primary">Submit</button>
      </div>

       </form>
      </div>

     </div>
     );
   }       
}
AddImagesVideoContainer = withTracker(props => { 
    const postHandle   = Meteor.subscribe('allTicketImages');
    const postHandle1  = Meteor.subscribe('allTicketVideo');
    const postHandle2  = Meteor.subscribe('checklistFieldExpert');
    const ticketImages = TempTicketImages.find({}).fetch() || []; 
    const ticketVideo  = TempTicketVideo.find({}).fetch() || []; 
    // console.log("ticketVideo",ticketVideo);
    const loading     = !postHandle.ready();
    const loading1    = !postHandle1.ready();
    const ticket      = props.ticket;
    var checkList = [];
    if (ticket) {
       var tickets =  TicketMaster.findOne({"_id" : ticket});
       // console.log("tickets",tickets)
       if (tickets) {
          var verificationType = tickets.verificationType;
       // console.log("verificationType",verificationType);
         if (verificationType == "professionalEducation") {
          var checkListFrom = "Academic Information";
         }else if (verificationType == "professionalEducation") {
          var checkListFrom = "Academic Information";
         }else if (verificationType == "permanentAddress") {
          var checkListFrom = "Address Information";
         }else if (verificationType == "currentAddress") {
          var checkListFrom = "Address Information";
         }else if (verificationType == "employement") {
          var checkListFrom = "Employment Information";
         }else if (verificationType == "education") {
          var checkListFrom = "Academic Information";
         }else  if (verificationType == "certificates") {
          var checkListFrom = "Skills And CertificationInformation";
         }
       }

       var checkListObj = ChecklistFieldExpert.find({"checkListFor" : checkListFrom , "checkListFrom" : "Database"}).fetch();
        if (checkListObj) {
           for (var i = 0; i < checkListObj.length; i++) {
            checkList.push(checkListObj[i].task);
           }
        }
        // console.log("checkList",checkList);
    }
   
      return {
          loading : loading,
          loading1 : loading1,
          ticketImages : ticketImages,
          ticketVideo  : ticketVideo,
          ticket   : ticket,
          tickets  : tickets,
          checkList  : checkList,
      };
})(AddImagesVideo);
export default AddImagesVideoContainer;