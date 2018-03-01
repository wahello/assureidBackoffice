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

export default class ProductList extends TrackerReact (Component){
    constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {

            };
        } else{
            this.state = {

            };
        }
        // this.handleChange = this.handleChange.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if(!nextProps.loading){
            this.setState({

            });
        } else{
            this.setState ({

            });
        }
        // this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        const target = event.target;
        const name   = target.name;
        this.setState({
            [name]: event.target.value,
        });
    }


    componentDidMount() {

        if(!$("link[href='/css/dashboard.css']").length > 0){
            var dashboardCss = document.createElement("link");
            dashboardCss.type="text/css";
            dashboardCss.rel ="stylesheet";
            dashboardCss.href="/css/dashboard.css";
            document.head.append(dashboardCss);
        }



        if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
          var adminLte = document.createElement("script");
          adminLte.type = "text/javascript";
          adminLte.src = "/js/adminLte.js";
          adminLte.setAttribute('id','adminLte');
          $("body").append(adminLte);
        }

        this.basicPageTracker = Tracker.autorun( ()=> {
            let handle = Meteor.subscribe("productPublish");
        });


    }


    componentWillUnmount() {
        $("body").find("script[src='/js/adminLte.js']").remove();
        if(this.basicPageTracker)
          this.basicPageTracker.stop();
    }

    productTableList(){
        var productData = Product.find({}).fetch();
        var productKey = Session.get("inputProductSearch");
        console.log("productKey: ",productKey);

        if(productKey){
            productKey = (productKey).toUpperCase();
            var productDataSearched = [];
            for(i=0;i<productData.length;i++){
                var searchTextString1 = false;
                var searchTextString2 = false;
                var searchTextString3 = false;
                var searchTextString4 = false;


                if(productData[i].productName && ((productData[i].productName.toUpperCase()).indexOf(productKey) != -1)){
					searchTextString1 = true;
				}
                if(productData[i].productCode && ((productData[i].productCode.toUpperCase()).indexOf(productKey) != -1)){
					searchTextString2 = true;
				}
                if(productData[i].productDetails && ((productData[i].productDetails.toUpperCase()).indexOf(productKey) != -1)){
					searchTextString3 = true;
				}
                if(productData[i].shortDescription && ((productData[i].shortDescription.toUpperCase()).indexOf(productKey) != -1)){
					searchTextString4 = true;
				}

                if(searchTextString1 || searchTextString2 || searchTextString3 || searchTextString4){
                    productDataSearched.push(productData[i]);
                }
            }
            console.log("productDataSearched: ",productDataSearched);
            if(productDataSearched.length > 0){
                return productDataSearched;
            } else {
                return [];
            }


        } else {
            return productData;
        }


    }

    changeProductList(event){
        var inputText = $(event.currentTarget).val();

        if(inputText){
            Session.set("inputProductSearch",inputText);
        } else {
            Session.set("inputProductSearch","");
        }
    }

    // deleteProduct.bind(this)} data-productId
    deleteProduct(event){
        var id = $(event.currentTarget).attr("data-productId");
        if(id){
            Meteor.call("deleteListProduct",id, (error, result)=> {
                if(error){

                } else {
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Product Deleted Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('.modal-backdrop').hide();

                }
            });
        }
    }

    editUniqueProduct(event) {
        var prodId = $(event.currentTarget).attr('data-prodId');
        var path = "/admin/products/AddNewProduct/" + prodId;
        browserHistory.replace(path);
    }

    changeFeatured(event){
        event.preventDefault();
        var statusVal = $(event.currentTarget).attr('data-status');
        var prodVal  = $(event.currentTarget).attr('data-prodVal');


        if(prodVal){
            if(statusVal=="true"){
                statusVal = false;
                Meteor.call('updateProductFeatured', prodVal, statusVal);
            } else {
                statusVal = true;
                Meteor.call('updateProductFeatured', prodVal,statusVal);
            }
        }
    }

    changeExclusive(event){
        event.preventDefault();
        var statusVal = $(event.currentTarget).attr('data-status');
        var prodVal  = $(event.currentTarget).attr('data-prodVal');
        if(prodVal){
            if(statusVal=="true"){
                statusVal = false;
                Meteor.call('updateProductExclusive', prodVal, statusVal);
            } else {
                statusVal = true;
                Meteor.call('updateProductExclusive', prodVal, statusVal);
            }
        }
    }

    changeStatusOfProd(event){
        var status = $(event.currentTarget).attr('data-pubVal');
        var prodId = $(event.currentTarget).attr('data-prodId');
        if(status == "prodStatPublish" && prodId){
            var changingStat = "Unpublish";
            Meteor.call("updateProductStatus", prodId, changingStat, (error, result)=> {
                if(result){
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Product Unpublished Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }else {
            var changingStat = "Publish";
            Meteor.call("updateProductStatus", prodId, changingStat, (error, result)=> {
                if(result){
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Product Published Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
    }

    render(){
        return(
            <div>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>Dashboard
                            <small>Version 3.0</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li>
                                <a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                                <li className="active">Add New Product</li>
                            </ol>
                        </section>
                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">
                                                All Product List
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

                                                        <div className="addNewProductWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <h1 className="reportTitleName">Product List</h1>
                                                            <hr/>
                                                            <div className="searchProductFromList">
                                                                <input type="text" className="form-control" placeholder="Search" onChange={this.changeProductList.bind(this)} />
                                                            </div>
                                                            <div className="all-product-list">
                                                                <table className="table table-bordered table-striped table-condensed admin-product-list-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product Code</th>
                                                                            <th>Product Name</th>
                                                                            <th>Color</th>
                                                                            <th>Size</th>
                                                                            <th>Discount</th>
                                                                            <th>Quantity</th>
                                                                            <th>Price</th>
                                                                            <th>Featured</th>
                                                                            <th>Exclusive</th>
                                                                            <th>Status</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.productTableList().map((listData, index)=>{
                                                                                return(
                                                                                    <tr key={index}>
                                                                                        <td>{listData.productCode}</td>
                                                                                        <td>
                                                                                            <div>
                                                                                                {listData.productName}
                                                                                                {/* <span className="viewMore-pruduct-desc"  aria-hidden="true" data-toggle="modal" data-target={"#openViewMoreModal"+listData._id} title="view More..." > View More...</span> */}
                                                                                            </div>

                                                                                            {/* <div className="modal fade" id={"openViewMoreModal"+listData._id} role="dialog">
                                                                                				<div className="modal-dialog">
                                                                                					<div className="modal-content">
                                                                                						<div className="modal-header delete-close">
                                                                                			        		<a href="#" data-dismiss="modal" aria-hidden="true" className="close pull-right"><i className="fa fa-times-circle-o fa-lg venClosePadd" aria-hidden="true"></i></a>
                                                                                			   			 </div>
                                                                                			            <div className="modal-body">
                                                                                                            <div className="row">
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div><span className="productListModalTitle">Brand: </span>{listData.brand}</div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div><span className="productListModalTitle">Supplier Code: </span>{listData.supplierCode}</div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div className="productListModalTitle">Product Details</div>
                                                                                                                    <div>{listData.productDetails}</div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div className="productListModalTitle">Material and Care</div>
                                                                                                                    <div>{listData.materialNCare}</div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div className="productListModalTitle">Short Description</div>
                                                                                                                    <div>{listData.shortDescription}</div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 text-left productListModalMarginBtm">
                                                                                                                    <div className="productListModalTitle">Product Images</div>
                                                                                                                    <div className="row prodListRow">
                                                                                                                        {
                                                                                                                            listData.productImage.map((imgData, index)=>{
                                                                                                                                return (
                                                                                                                                    <div key={index} className="col-lg-4 col-xs-12 prodListOfImages">
                                                                                                                                        <div className="prodListOfImagesImg">
                                                                                                                                            <img src={imgData} alt="Product Image" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                );
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                			            </div>
                                                                                			        </div>
                                                                                				</div>
                                                                                			</div> */}
                                                                                        </td>
                                                                                        <td>
                                                                                            { listData.dimensions.map((dimensions)=>{
                                                                                                    return(
                                                                                                            <div key={dimensions.index} >{dimensions.color}</div>
                                                                                                        );
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            { listData.dimensions.map((dimensions, index)=>{
                                                                                                    return(
                                                                                                            <div key={dimensions.index} >{dimensions.size}</div>
                                                                                                        );
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            { listData.dimensions.map((dimensions, index)=>{
                                                                                                    return(
                                                                                                            <div key={dimensions.index} >{dimensions.discount}</div>
                                                                                                        );
                                                                                                })
                                                                                            }
                                                                                        </td>

                                                                                        <td>
                                                                                            { listData.dimensions.map((dimensions, index)=>{
                                                                                                    return(
                                                                                                            <div key={dimensions.index} >{dimensions.quantity}</div>
                                                                                                        );
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            { listData.dimensions.map((dimensions, index)=>{
                                                                                                    return(
                                                                                                            <div key={dimensions.index} >{dimensions.price}</div>
                                                                                                        );
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>


                                                                                            <i onClick={this.changeFeatured.bind(this)} data-prodVal={listData._id} data-status={listData.featured} title={( listData.featured ? "Disable It" : "Enable It" )} className={'fa fa-check-circle prodCheckboxDim ' + ( listData.featured ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                                                                        </td>
                                                                                        <td>
                                                                                            <i onClick={this.changeExclusive.bind(this)} data-prodVal={listData._id} data-status={listData.exclusive} title={( listData.exclusive ? "Disable It" : "Enable It" )}  className={'fa fa-check-circle prodCheckboxDim ' + ( listData.exclusive ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div onClick={this.changeStatusOfProd.bind(this)} data-prodId={listData._id} className={( listData.status == ("Unpublish") ? ("prodStatUnpublish") : (listData.status == ("Publish") ? ("prodStatPublish") : ("prodStatDraft")) )} data-pubVal={( listData.status == ("Unpublish") ? ("prodStatUnpublish") : (listData.status == ("Publish") ? ("prodStatPublish") : ("prodStatDraft")) )} title={( listData.status == ("Unpublish") ? ("Click To Publish") : (listData.status == ("Publish") ? ("Click To Unpublish") : ("Click To Publish")) )} >
                                                                                                {(listData.status == ("Unpublish") ? ("Unpublished") : (listData.status == ("Draft") ? ("Draft") : ("Publish")))}
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>

                                                                                            <div className="view-pruduct-list-prod" title="View" data-prodId={listData._id}>
                                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                                            </div>
                                                                                            <div className="edit-pruduct-list-prod" title="Edit" onClick={this.editUniqueProduct.bind(this)} data-prodId={listData._id}>
                                                                                                <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                                                                            </div>

                                                                                            <div className="delete-pruduct-list-prod" title="Delete"  aria-hidden="true" data-toggle="modal" data-target={"#openDeleteModal"+listData._id} >
                                                                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                            </div>
                                                                                            <div className="modal fade" id={"openDeleteModal"+listData._id} role="dialog">
                                                                                				<div className="modal-dialog">
                                                                                					<div className="modal-content">
                                                                                						<div className="modal-header delete-close">
                                                                                			        		<a href="#" data-dismiss="modal" aria-hidden="true" className="close pull-right"><i className="fa fa-times-circle-o fa-lg venClosePadd" aria-hidden="true"></i></a>
                                                                                			   			 </div>
                                                                                			            <div className="modal-body">
                                                                                			            	<p className="text-center">Are you sure you want to delete this Product?</p>
                                                                                			         		<div className="body-close">
                                                                                			                	<button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                                                                				            	<button type="button" className="btn btn-danger deleteListBtn"  data-dismiss="modal"  onClick={this.deleteProduct.bind(this)} data-productId={listData._id} >Delete</button>
                                                                                			                </div>
                                                                                			            </div>
                                                                                			        </div>
                                                                                				</div>
                                                                                			</div>

                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* /.content-wrapper */}
                    </div>

                );
            }
        }
