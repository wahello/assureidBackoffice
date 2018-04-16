import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { University } from '../api/University.js';
import  ListOfUniversity  from './ListOfUniversity.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';


class AddEditUniversity extends TrackerReact(Component) {
  constructor(props) {
    super(props); 
   
    this.state = {
      UniversityName : '',
      UniversityStatus : '',
      button : 'ADD',
      "subscription"  : {
        "university" : Meteor.subscribe("university"),
        "singleuniversity" : Meteor.subscribe("singleuniversity"),
      }  
    }; 
     this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.university){
         this.setState({
             UniversityName      : nextProps.university.UniversityName,
             UniversityStatus    : nextProps.university.UniversityStatus,
             id                  : nextProps.university._id,
             button              : nextProps.button,
         });
      }
    }else{
      this.setState({
             UniversityName  : '',
             UniversityStatus: '',
             id              : '',
             button          : '',
      });
    }

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
    $("#universityValid").validate({
        rules: {
          UniversityName: {
            required: true,
          },
          UniversityStatus: {
            required: true,
          },
        },
        messages: {
          UniversityName: {
            required: "Please enter University Name!",
          },
          UniversityStatus: {
            required: "Please select University Status!",
          },
      }
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
  }

 uppercase(str)
  {
    var array1 = str.split(' ');
    var newarray1 = [];
      
    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
  return newarray1.join(' ');
} 
  handleSubmit(e){
    e.preventDefault();
    if($("#universityValid").valid()){ 
      var UniversityName    = this.uppercase(this.refs.UniversityName.value);
      var UniversityStatus  = this.refs.UniversityStatus.value;
      var id = this.props.params.id;
      if(id){
          Meteor.call('updateUniversity',id,UniversityName,UniversityStatus,(error,result)=>{
            if(error){
                console.log(error.reason);
            }else{                      
              swal("Done","Your University Name has been Updated!.","success");  
              var path = "/admin/University";
              browserHistory.replace(path);
              $(".UniversityName").val("");
              $(".UniversityStatus").val("");
            }            
          });
      }else{
        var dataMatch = University.findOne({'UniversityName' : UniversityName});
        if (!dataMatch) {
           Meteor.call('createUniversity',UniversityName,UniversityStatus,(error,result)=>{
            if(error){
                console.log(error.reason);
            }else{                      
              swal("Done","Your University Name has been Created!.","success"); 
              this.refs.UniversityName.value  = "";
              // $(".UniversityName").val("");
              $(".UniversityStatus").val("");
            }            
          });  
         }else{
            swal("Duplicate entry occurs!");
         }
       
      }
    }      
  }
  handleChange(event){
     const target = event.target;
     const name   = target.name;
     this.setState({
      [name]: event.target.value,
     });
   }

    render() {
       return (
        <div className="content-wrapper">
          <section className="content-header">
            <h1> Master Data </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#"><i className="fa fa-newspaper-o" />Master Data</a></li>
              <li className="active">Manage University</li>
            </ol>
          </section>
           <section className="content">
             <div className="row">
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                 <div className="box box-primary">
                    <div className="box-header with-border">
                     <h2 className="box-title">University Name</h2>  
                    </div>
                    <div className="box-body ">
                      <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                        <form id="universityValid">
                          <div className="notifWrapper col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                              <span className="blocking-span">
                                  <label className="floating-label">Title</label>
                                  <input type="text" className="form-control inputText UniversityName" ref="UniversityName" id="UniversityName" value={this.state.UniversityName} name="UniversityName" onChange={this.handleChange}/>
                              </span> 
                            </div>
                            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                              <span className="blocking-span">
                                  <label className="floating-label">Status</label>
                                  <select className="form-control inputText UniversityStatus" ref="UniversityStatus" id="UniversityStatus" value={this.state.UniversityStatus} name="UniversityStatus" onChange={this.handleChange}>
                                    <option selected disabled value>-- Select Status --</option>
                                    <option value="Functioning">Functioning</option>
                                    <option value="Fake">Fake</option>
                                    <option value="Disfunctioning">Disfunctioning</option>
                                  </select>
                              </span>
                            </div>
                            <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="" onClick={this.handleSubmit.bind(this)}>{this.state.button}</button>
                            </div> 
                          </div> 
                        </form>
                      </div>  
                      <ListOfUniversity />
                    </div>
                 </div>
                </div>
             </div>
           </section>
        </div> 
        );
  } 

}

EditPageContainer = withTracker(({params}) => {
    var _id          = params.id;
    const postHandle = Meteor.subscribe('singleuniversity',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const university  = University.findOne({"_id":_id})|| {};
    const loading    = !postHandle.ready();
    
    if(_id){
      var button = "UPDATE";
      return {
          loading,
          university,
          button,
      };
    }else{
       var button = "ADD";
      return {
          loading,
          university,
          button
      };
    }
})(AddEditUniversity);

export default EditPageContainer;