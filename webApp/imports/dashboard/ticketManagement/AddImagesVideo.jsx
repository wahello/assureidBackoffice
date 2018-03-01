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
    if (event.currentTarget.files && event.currentTarget.files[0]) { 
      var dataImg =event.currentTarget.files[0];  
       if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){      
         var reader = new FileReader();        reader.onload = function (e) {          
           // $('.uploadedImageFromLocl').attr('src', e.target.result);      
         };       
         reader.readAsDataURL(event.currentTarget.files[0]);      
         var file = event.currentTarget.files[0];      
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
    if (event.currentTarget.files && event.currentTarget.files[0]) {  
      var dataImg =event.currentTarget.files[0];   
       if(dataImg.type == "video/mp4"){       
         var reader = new FileReader();        
          reader.onload = function (e) {           
           // $('.uploadedImageFromLocl').attr('src', e.target.result);       
         };        
         reader.readAsDataURL(event.currentTarget.files[0]);       
         var file = event.currentTarget.files[0];       
          if (file) {          
            addTicketVideoS3Function(file,self);        
          }    
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
  submitImageVideo(event){
    event.preventDefault();
    var userId = this.props.ticket.userId;
    var documents ={
       images : this.props.ticketImages,
       videos : this.props.ticketVideo,
       remark : this.refs.remark.value,
    }
    console.log("documents",documents);
    var ticketElementObj = {};
   if (this.props.ticket) {
      if (this.props.ticket.ticketElement) {
        if (this.props.ticket.ticketElement.length > 0) {
            ticketElementObj  = this.props.ticket.ticketElement[this.props.ticket.ticketElement.length-1];
            console.log("ticketElementObj = ",ticketElementObj);      
        }
      }
      if (this.props.ticket.addressType == "permanentAddress") {   
         var permanentAddressId = ticketElementObj.permanentAddress.permanentAddressId;
         console.log("permanentAddressId",permanentAddressId);
         Meteor.call('addPermanentDocuments',userId,documents,permanentAddressId,function(error,result) {
           if (error) {
            console.log(error.reason);
           }else{
             swal("Done","Documents added successfully!","success");   
             $("#remark").val('');
             $("#AddImagesVideo").css({"display" : "none"});
           }
         });
        
     }else if (this.props.ticket.addressType == "currentAddress") {
         var currentAddressId = ticketElementObj.currentAddress.currentAddressId;
         console.log("currentAddressId",currentAddressId);
         Meteor.call('addCurrentDocuments',userId,documents,currentAddressId,function(error,result) {
           if (error) {
            console.log(error.reason);
           }else{
             swal("Done","Documents added successfully!","success");   
             $("#remark").val('');
             $("#AddImagesVideo").css({"display" : "none"});
           }
         });
        
      }
    }
  }
	render(){
    // console.log("ticket",this.props.ticket);
     return( 
      <div>
       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 choosefilebox">
        <form>
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
				{/*				        <i className="fa fa-times-circle"></i>
				*/}				      </div>
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
    const ticketImages = TempTicketImages.find({}).fetch() || [];  
    console.log("ticketImages",ticketImages);
    const ticketVideo = TempTicketVideo.find({}).fetch() || [];  
    console.log("ticketVideo",ticketVideo);
    const loading     = !postHandle.ready();
    const loading1    = !postHandle1.ready();
    const ticket      = props.ticket;
    console.log("ticket",ticket);

    // if(_id){
      return {
          loading : loading,
          loading1 : loading1,
          ticketImages : ticketImages,
          ticketVideo  : ticketVideo,
          ticket   : ticket,
      };
})(AddImagesVideo);
export default AddImagesVideoContainer;