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

import { Product } from '/imports/dashboard/product/addNewProduct/api/ProductMaster.js';
import { ProjectSettings } from '/imports/dashboard/product/addNewProduct/api/projectSettings.js';



export default class AddNewProductImages extends TrackerReact (Component){
    constructor(props) {
        super(props);

        this.state = {
            "allProductIamges": [],
        }

    }


    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        Meteor.subscribe("productImagePublish");
        Meteor.subscribe("productPublish");
        Meteor.subscribe("projectSettingsPublish");


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

    uploadCategoryImage(event){
        event.preventDefault();
        let self = this;
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            var file = event.currentTarget.files[0];
            if (file) {
                var productId = this.props.params.id;
                addCategoryImgsToS3Function(file,self, productId);
            }
        }
    }

    getProductImages(){
        var productId = this.props.params.id;

        var imageData = Product.findOne({"_id":productId});
        console.log("productId: ",productId);

        console.log("imageData: ",imageData);
        if(imageData){
            if(imageData.productImage){
                return imageData.productImage;
            }
        }else {
            return [];
        }
    }


    saveProductImages(event){
        event.preventDefault();
        var path = "/admin/products/ProductList/";
        browserHistory.replace(path);
        window.scrollTo(0,0);

    }


    deleteProductImage(event){
        var productid = this.props.params.id;
        var imageUrl = $(event.currentTarget).attr("data-imageUrl");
        // var imageIndex = $(event.currentTarget).attr("data-imageIndex");
        // console.log("imageUrl: ",imageUrl);
        // console.log("imageIndex: ",imageIndex);
        console.log("productid: ",productid);
        if(productid && imageUrl){
            Meteor.call('deleteProductImage', productid, imageUrl);
        }

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
                            <li className="active">Add Product Images</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            Add Product Images
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
                                                    <label>Product Image</label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-file-image-o" aria-hidden="true"></i></span>
                                                        <div aria-describedby="basic-addon1">
                                                            <input type="file" className="form-control" onChange={this.uploadCategoryImage.bind(this)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="row productImgWrapper">
                                                    {
                                                        this.getProductImages().map((imageData, index)=>{
                                                            return(
                                                                <div className="col-lg-4 productImgCol" key={index}>
                                                                    <div className="prodImage">
                                                                        <div className="prodImageInner">
                                                                            <span className="prodImageCross" title="Delete" data-imageUrl={imageData} onClick={this.deleteProductImage.bind(this)}>x</span>
                                                                        </div>
                                                                        <img src={imageData} alt="Product Image" className="img-responsive" />
                                                                        {/* {data.imageLink} */}

                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="saveProductImages" onClick={this.saveProductImages.bind(this)} >
                                                        SAVE
                                                    </div>
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
