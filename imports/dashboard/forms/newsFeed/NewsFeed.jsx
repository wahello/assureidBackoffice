import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { NewsFeeds } from '../api/NewsFeed.js';
import {TempNewsVideo} from '../api/NewsFeed.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';


export default class NewsFeed extends TrackerReact(Component) {
  constructor(props) {
    super(props); 
   
    this.state = {
      newsFeedTitile       : '',
      startDate            : '', 
      endDate              : '', 
      newsDescription      : '', 
      id                   : '',
      newsFeeds            : [],
      newsVideoType        : 'LocalVideo',
      newsVideo            : '',
      newsYouTubeVideo     : '',
      newsImage            : '',
      "subscription"  : {
        "NewsFeeds" : Meteor.subscribe("newsFeeds"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempNewsVideo" : Meteor.subscribe("tempNewsVideo"),
        "singleNews"    : Meteor.subscribe("singleNews"), 
      }  
    }; 
     this.handleChange = this.handleChange.bind(this);
  }
 
	componentDidMount() {
    $("html,body").scrollTop(0);
   if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }
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

  tomorrowDate() {
   var today = moment();
   var tomorrow = today.add('days', 1);
   console.log("tomorrow",moment(tomorrow).format("YYYY-MM-DD"));
   return moment(tomorrow).format("YYYY-MM-DD");
    // this.setState({
    //     'startDate': moment(tomorrow).format("YYYY-MM-DD"),
    //   });
  }
  oneMonthLater(){
    var today = moment();
    var oneMonthLater = moment().add(1, 'months');
    return moment(oneMonthLater).format("YYYY-MM-DD");
  }
  handleImageUpload(event){ 
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
         var reader = new FileReader();        
         reader.onload = function (e) {    
           console.log("img", e.target.result);       
           $('.uploadedImageFromLocl').attr('src', e.target.result);       
         };        
         reader.readAsDataURL(event.currentTarget.files[0]);       
         var file = event.currentTarget.files[0];       
          if (file) {          
            addNewsVideoS3Function(file,self,"image");        
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
 
  handleUpload(event){
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
            addNewsVideoS3Function(file,self,"video");        
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
   
  handleSubmit(e){
    e.preventDefault();

    var newsFeedTitile         = this.refs.newsFeedTitile.value;
    var startDate              = this.refs.startDate.value;
    var endDate                = this.refs.endDate.value;
    var newsDescription        = this.refs.newsDescription.value;   
    var newsVideoType          = this.state.newsVideoType;
    var youTubevideo           = this.refs.newsYouTubeVideo.value;
    var userId                 = Meteor.userId();
    var pageNameExist          = NewsFeeds.findOne({'newsFeedTitile': newsFeedTitile});
    var lastModified           = "";

       if(pageNameExist){
        swal("Oops...!","This News name is already taken!","error");
        }else{
            Meteor.call('createNewsFeed',newsFeedTitile,startDate,endDate,newsDescription,newsVideoType,youTubevideo,userId,lastModified,(error,result)=>{
                if(error){
                    console.log(error.reason);
                }else{                      
                   swal("Done","Your news has been Created!.","success");   
                    $('.uploadedImageFromLocl').attr('src', "");
                    $(".newsFeedTitile").val("");
                    $(".startDate").val("");
                    $(".endDate").val("");
                    $(".newsDescription").val("");
                    $(".videoCheck").val("");
               }            
            });
        }
    
  }
   handleChange(event){
     const target = event.target;
     const name   = target.name;
     this.setState({
      [name]: event.target.value,
     });
   }
  videoCheck(event){
    event.preventDefault();
    var getVideoType = $(event.currentTarget).attr('data-videoType');
    this.setState({
      "newsVideoType" : getVideoType,
    });
  }
  
		render() {
       return (
        <div className="content-wrapper">
          <section className="content-header">
            <h1> News Feed Management </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#"><i className="fa fa-newspaper-o" />News Feed Management</a></li>
              <li className="active">Add News Feed</li>
            </ol>
          </section>
           <section className="content">
             <div className="row">
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                 <div className="box box-primary">
                    <div className="box-header with-border">
                     <h2 className="box-title">Add News Feed</h2>  
                    </div>
                    <div className="box-body ">
                      <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                        <form id="">
                          <div className="notifWrapper col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                              <span className="blocking-span">
                                  <label className="floating-label">Title</label>
                                  <input type="text" title="Only alphabets are allowed!" className="form-control inputText newsFeedTitile" ref="newsFeedTitile" id="newsFeedTitile" name="newsFeedTitile" onChange={this.handleChange} pattern="[a-zA-Z][a-zA-Z ]+" required />
                              </span>
                            </div>
                             <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                              <span className="blocking-span">
                                  <label className="floating-label">Start Date</label>
                                  <input type="date"  className="form-control inputText startDate" ref="startDate" id="startDate" value={this.tomorrowDate()} name="startDate" onChange={this.handleChange} required />
                              </span>
                            </div> <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 "> 
                              <span className="blocking-span">
                                  <label className="floating-label">End Date</label>
                                  <input type="date" className="form-control inputText endDate" ref="endDate" id="endDate" name="endDate" value={this.oneMonthLater()} onChange={this.handleChange} required />
                              </span>
                            </div>
                            <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 "> 
                              <span className="blocking-span">
                                  <label className="floating-label">Description</label>
                                  {/*<div id="descriptionContent" name="" ref=""></div>*/}  
                                  <textarea name="newsDescription" ref="newsDescription" id="newsDescription" className="form-control newsDescription col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="10" onChange={this.handleChange}></textarea>                            
                              </span> 
                            </div> 
                            
                           
                            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <label className=" floating-label">Video Upload</label>
                              <div className="input-group">
                                <input type="file" ref="newsVideo" id="s3file" name="newsVideo"  onChange={this.handleUpload.bind(this)}  className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                <span className={this.state.newsVideoType=="LocalVideo" ? "input-group-addon selectedVideoType videoCheck" : "input-group-addon unSelectedVideoType videoCheck"} onClick={this.videoCheck.bind(this)} data-videoType="LocalVideo"><i className="fa fa-check" aria-hidden="true"></i></span>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                              <p>OR</p>
                            </div>
                            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <label className="floating-label">YouTube Video Link</label>
                              <div className="input-group">
                                <input type="text" ref="newsYouTubeVideo" name="newsYouTubeVideo" className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                <span className={this.state.newsVideoType=="YouTubeVideo" ? "input-group-addon selectedVideoType videoCheck" : "input-group-addon unSelectedVideoType videoCheck"} onClick={this.videoCheck.bind(this)} data-videoType="YouTubeVideo"><i className="fa fa-check" aria-hidden="true"></i></span>
                              </div>
                           </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                              <p>OR</p>
                            </div> 
                           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 uploadedImageFromLocl1">
                                <label className=" floating-label">Image Upload</label>          
                                <div className="input-group">
                                  <input type="file" ref="newsImage" id="s3file" name="newsImage"  onChange={this.handleImageUpload.bind(this)}  className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  <span className={this.state.newsVideoType=="LocalImage" ? "input-group-addon selectedVideoType videoCheck" : "input-group-addon unSelectedVideoType videoCheck"} onClick={this.videoCheck.bind(this)} data-videoType="LocalImage"><i className="fa fa-check" aria-hidden="true"></i></span>
                                </div>
                               </div>
                               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 uploadedImageFromLocl2">    
                                 <div className="uploadedImageFromLocl3">        
                                   <img src="" alt="" className="img-responsive uploadedImageFromLocl"/>    
                                  </div>
                               </div>
                            </div>
                          <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="" onClick={this.handleSubmit.bind(this)}>ADD</button>
                           </div> 

                          </div> 
                        </form>
                      </div>  
                      
                    </div>
                 </div>
                </div>
             </div>
           </section>
        </div>
        );
  } 

}







