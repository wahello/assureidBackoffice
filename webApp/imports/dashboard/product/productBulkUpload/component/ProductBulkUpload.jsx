import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';



export default class AddNewBulkProduct extends TrackerReact (Component){
    constructor(props) {
        super(props);

        this.state = {
            "currentProducts": [],
        }

        // this.setState({
        //     "currentProducts": results.data,
        // });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
          var adminLte = document.createElement("script");
          adminLte.type = "text/javascript";
          adminLte.src = "/js/adminLte.js";
          adminLte.setAttribute('id','adminLte');
          $("body").append(adminLte);
        }

    }

    componentWillUnmount() {

    }



    showProgressBar() {
        var getPercernt = UserSession.get("progressbarSession",Meteor.userId());
        var allPercernt = UserSession.get("allProgressbarSession",Meteor.userId());

        if(getPercernt && allPercernt){
            var total = getPercernt/allPercernt*100;
            total = parseInt(total);
            var styleC = {
                width:total + "%",
                display:"block",
            }
            var styleCBar = {
                display:"block",
            }
        }
        if(!getPercernt){
            var total = 0;

            var styleC = {
                width:0 + "%",
                display:"none",
            }
            var styleCBar = {
                display:"none",
            }
        }

        return (
            <div>
                {/* <div className="showProgressBar"  style= {styleCBar}>
                    <span className="showProgressPercent" style= {styleC} >
                        {total} %
                    </span>
                </div> */}

                {/* <div id="showProgressBarDone" >
                </div> */}

                <div className="progress"  style= {styleCBar}>
                    <div className="progress-bar progress-bar-striped active" role="progressbar"
                  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
                    {total} %
                    </div>
                </div>
            </div>

        );

    }

    uploadBulkProduct(event){
        event.preventDefault();

        Papa.parse( event.target.files[0], {
		    header: true,
		    complete( results, file ) {
		    	Meteor.call( 'BulkProductCSVUpload', results.data, ( error, result ) => {
                	if ( error ) {

         			} else {
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Products Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        $(".adminBlkUpldBkg").val('');

         			}
      			});

		    }
        });


    }

    render(){



        return(
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>Dashboard
                        <small>Version 3.0</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                            <li className="active">Add Bulk Products</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            Add Bulk Products
                                        </h3>
                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool btn-minus" data-widget="collapse">
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
                                                <button type="button" className="btn btn-box-tool btn-minus" data-widget="remove">
                                                    <i className="fa fa-times" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* /.box-header */}
                                        <div className="box-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="adminBlkUploadBtnDiv">
                                                        <div className="input-group">
                                                            <span className="adminBlkUpldIcon input-group-addon" id="basic-addon1"><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                                            <input onChange={this.uploadBulkProduct.bind(this)} className="adminBlkUpldBkg form-control adminBlkUploadBtn" type="file" name="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    {this.showProgressBar(this)}
                                                </div>
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
