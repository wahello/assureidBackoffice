import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { NewsFeeds } from '../api/NewsFeed.js';
import {TempNewsVideo} from '../api/NewsFeed.js';
import { createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import YoutubeEmbedVideo from "youtube-embed-video";

const getVideoId = require('get-video-id');

export default class ListOfNewsFeed extends TrackerReact(Component) {
	constructor(props) {
    super(props); 
    this.state = {
    	newsFeeds            : [],

      "subscription"  : {
        "NewsFeeds" : Meteor.subscribe("newsFeeds"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempNewsVideo" : Meteor.subscribe("tempNewsVideo"),
        "singleNews"    : Meteor.subscribe("singleNews"),
      }    
    };  
  }
	componentDidMount() {
    $("html,body").scrollTop(0);
    if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }
    this.newsFeedTracker = Tracker.autorun( ()=> {
      Meteor.subscribe("newsFeeds");
      const newsFeeds = NewsFeeds.find().fetch();
      this.setState({newsFeeds: newsFeeds});
    });
    this.tempVideoTracker = Tracker.autorun(()=>{
      Meteor.subscribe('tempNewsVideo');
      const tempNewsVideo = TempNewsVideo.find().fetch();
      this.setState({tempNewsVideo});
    });
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
     if (this.newsFeedTracker) {
      this.newsFeedTracker.stop();
      }
     if (this.tempVideoTracker) { 
        this.tempVideoTracker.stop();
      }
  }
  renderTableRow(){
    return this.state.newsFeeds.map((newsFeeds,index) =>{
      var text= newsFeeds.newsDescription;
      var regex = new RegExp("</p><p>", 'g');
      text = text.replace(regex, '\n');
      var strippedText = $("<div/>").html(text).text();
      var startDate = moment(newsFeeds.startDate).format("DD/MM/YYYY").toString();
      var endDate   = moment(newsFeeds.endDate).format("DD/MM/YYYY").toString();

      return <tr key={index}>
              <td> {newsFeeds.newsFeedTitile} </td>
              <td> {startDate} </td>
              <td> {endDate} </td>
              <td> {strippedText } </td>
              <td>
                { newsFeeds.newsVideoType ==  "YouTubeVideo" ?
                  <YoutubeEmbedVideo suggestions={false}  width={120} height={120} controls videoId={getVideoId(newsFeeds.newsYouTubeVideo).id} suggestions={false} />
                 : 
                  newsFeeds.newsVideoType ==  "LocalImage" ?
                  <img src={newsFeeds.newsImage} className="img-responsive serviceLogo" />

                 : <video width="120" height="120" controls className="">
                     <source src={newsFeeds.newsVideo} type="video/mp4" />
                  </video>   
                }
                
              </td>
              <td>
                <Link to={'/admin/EditNewsFeed/'+newsFeeds._id} className="editButton" title="Edit">
                  <i className = "fa fa-pencil"> </i>
                </Link>
                <a href="#" id={newsFeeds._id} onClick={this.delete.bind(this)} className="deleteButton" title="Delete">
                  <i className="fa fa-trash-o"></i>  
                </a>
              </td>
            </tr>;
      });
    }
    delete(e){
     e.preventDefault();
	    let id = $(e.currentTarget).attr("id");
	    swal({
	      title: "Are you sure?",
	      text: "You want to delete this page!",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonColor: "#DD6B55",
	      confirmButtonText: "Yes, delete it!",
	      closeOnConfirm: false,
	      html: false
	    }, function(){
	      Meteor.call("deleteNews",id,function(error,result){
	          if(error){
	              console.log(error.reason);
	          }else{
	              swal("Done","Your news has been deleted!.", "success");
	          }
	      });

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
              <li className="active">List Of News Feed</li>
            </ol>
          </section>
           <section className="content">
             <div className="row">
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                 <div className="box box-primary">
                    <div className="box-header with-border">
                     <h2 className="box-title">List Of News Feed</h2>  
                    </div>
                    <div className="box-body ">  
                      <div className="dataTable tableBasicPage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table className="display table table-bordered servicesTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Description</th>
                                    <th>Video</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                           
                            <tbody>
                                {this.renderTableRow()}
                            </tbody>
                        </table>
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
