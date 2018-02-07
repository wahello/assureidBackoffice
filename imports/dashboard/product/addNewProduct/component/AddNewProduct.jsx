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


import AddNewProductTableRow from '/imports/dashboard/product/addNewProduct/component/addNewTableRow.jsx';
import { Category } from '/imports/dashboard/product/addNewProduct/api/CategoryMaster.js';
import { TempCategoryImage } from '/imports/dashboard/product/addNewProduct/api/CategoryMaster.js';
import { Product } from '/imports/dashboard/product/addNewProduct/api/ProductMaster.js';

class AddNewProduct extends TrackerReact (Component){
    constructor(props) {
        super(props);



        if(!this.props.loading){
            this.state = {
                subcategory:[],
                category:[],
                addrows : [1],
                productMode:'',
                productPhoto:[],
                productFeatured:false,
                productExclusive:false,
                // productTempPhoto:'',
            };
        } else{
            this.state = {
                subcategory:[],
                category:[],
                addrows : [1],
                productMode:'',
                productPhoto:[],
                productFeatured:false,
                productExclusive:false,
                // productTempPhoto:'',

            };
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        var getProductId = this.props.params.id;
        if(getProductId){
            var changeState = "AddMode";
        }else {
            var changeState = "EditMode";
        }

        if(!nextProps.loading){
            this.setState({
                category    : nextProps.category,
                subcategory : nextProps.subcategory,
                addrows    : nextProps.addrows,
                productMode:changeState,
                // productPhoto:nextProps.productPhoto,
                productFeatured:nextProps.productFeatured,
                productExclusive:nextProps.productExclusive,
                // productTempPhoto: nextProps.productTempPhoto,
            });
        } else{
            this.setState ({
                category : nextProps.category,
                subcategory : nextProps.subcategory,
                addrows    : nextProps.addrows,
                productMode:changeState,
                // productPhoto:nextProps.productPhoto,
                productFeatured:nextProps.productFeatured,
                productExclusive:nextProps.productExclusive,
                // productTempPhoto: nextProps.productTempPhoto,

            });
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
    }


    handleChange(event){
        const target = event.target;
        const name   = target.name;
        this.setState({
            [name]: event.target.value,
        });
    }


    componentDidMount() {

        var getProductId = this.props.params.id;
        if(getProductId){
            this.setState({
                "productMode": "EditMode"
            });
        }



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
            let handle = Meteor.subscribe("category");
            // Meteor.subscribe("categoryImagePublish");
            // Meteor.subscribe("tempcategoryimage");
            let handleProduct = Meteor.subscribe("productPublish");
            if(handle.ready() && handleProduct.ready()){
                const category = Category.find().fetch();
                this.setState({category: category});
                // if(category){
                //     this.setState({subcategory: category[0].subCategory});
                // }


                // If in Edit Mode Assign Values to field
                var productId   = this.props.params.id;
                var uniqueProductData = Product.findOne({"_id":productId});
                if(uniqueProductData){
                    $(".allProductCategories").val(uniqueProductData.category);
                    $(".productBrandName").val(uniqueProductData.brand);
                    $(".newProductCode").val(uniqueProductData.productCode);
                    $(".newProductName").val(uniqueProductData.productName);
                    $(".productUrl").val(uniqueProductData.productUrl);
                    $(".newProductSuppierCode").val(uniqueProductData.supplierCode);
                    $(".newProductDetails").val(uniqueProductData.productDetails);
                    $(".newProductMateNCare").val(uniqueProductData.materialNCare);
                    $(".newProductShortDesc").val(uniqueProductData.shortDescription);
                    $(".newProductStatus").val(uniqueProductData.status);

                    var catgData = Category.findOne({"category":uniqueProductData.category});
                    if(catgData){
                        this.setState({subcategory: catgData.subCategory});
                    }
                    if(uniqueProductData.productImage){
                        this.setState({
                            "productPhoto": uniqueProductData.productImage,
                        });
                    }

                    this.setState({
                        "productExclusive": uniqueProductData.exclusive,
                        "productFeatured": uniqueProductData.featured,
                        "addrows": uniqueProductData.dimensions,
                    });

                    $(".allProductSubCategories").val(uniqueProductData.subCategory);
                    var addArrowLength = uniqueProductData.dimensions.length;

                    if(addArrowLength){
                        for(i=0;i<addArrowLength;i++){
                            $(".colorRefs"+i).val(uniqueProductData.dimensions[i].color);
                            $(".sizeRefs"+i).val(uniqueProductData.dimensions[i].size);
                            $(".unitRefs"+i).val(uniqueProductData.dimensions[i].unit);
                            $(".priceRefs"+i).val(uniqueProductData.dimensions[i].price);
                            $(".quantityRefs"+i).val(uniqueProductData.dimensions[i].quantity);
                            $(".discountRefs"+i).val(uniqueProductData.dimensions[i].discount);
                            $(".reorderRefs"+i).val(uniqueProductData.dimensions[i].reorder);
                            $(".saftyStockRefs"+i).val(uniqueProductData.dimensions[i].saftyStock)
                        }
                    }
                } else {
                    $(".allProductCategories").val('');
                    $(".allProductSubCategories").val('');
                    $(".productBrandName").val('');
                    $(".newProductCode").val('');
                    $(".newProductName").val('');
                    $(".productUrl").val('');
                    $(".newProductSuppierCode").val('');
                    $(".newProductDetails").val('');
                    $(".newProductMateNCare").val('');
                    $(".newProductShortDesc").val('');
                    $(".newProductStatus").val('');

                    // this.setState({
                    //     addrows: [1],
                    // });
                }

            }
        });

    }


    componentWillUnmount() {
        $("body").find("script[src='/js/adminLte.js']").remove();
        if(this.basicPageTracker)
          this.basicPageTracker.stop();
    }

    addNewRow(event) {
        event.preventDefault();
        var newArr = this.state.addrows;

        if(newArr){
            newArr.push(newArr.length + 1);
            this.setState({
                "addrows": newArr,
            });
        }

    }

    addSubCategoryWithProduct(event){
        event.preventDefault();
        var formValues = {
            "category"          :   this.refs.categoryRef.value,
            "subCategory"       :   this.refs.modalAddSubCategoryRef.value,
        }

        Meteor.call('addNewSubCategory', formValues, (error, result) => {
            if(error){
                swal({
                    position: 'top-right',
                    type: 'error',
                    title: 'Sub Category Not Added',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Sub Category Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.refs.modalAddSubCategoryRef.value    = "";
            }
        });
    }

    addCategoryWithProduct(event){
        event.preventDefault();
        var formValues = {
            "category"          :   this.refs.modalCategoryRef.value,
            "subCategory"       :   this.refs.modalSubCategoryRef.value,
        }

        Meteor.call('addNewCategory', formValues, (error, result) => {
            if(error){
                swal({
                    position: 'top-right',
                    type: 'error',
                    title: 'Category Not Added',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Category Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.refs.modalCategoryRef.value    = "";
                this.refs.modalSubCategoryRef.value = "";
            }
        });
    }

    showRelevantSubCategories(event){
        event.preventDefault();
        var category = this.refs.categoryRef.value;

        var catgData = Category.findOne({"category":category});
        if(catgData){
            this.setState({subcategory: catgData.subCategory});
        }
    }

    // uploadCategoryImage(event){
    //     event.preventDefault();
    //     let self = this;
    //     if (event.currentTarget.files && event.currentTarget.files[0]) {
    //         var file = event.currentTarget.files[0];
    //         if (file) {
    //             addCategoryImgsToS3Function(file,self);
    //         }
    //     }
    // }

    addNewProduct(event){
        event.preventDefault();

        // Add Product Image For New Product
        var productImage = [];
        // var imageUrl = TempCategoryImage.findOne({"userId":Meteor.userId()},{sort:{createdAt:-1}});
        // if(imageUrl){
        //     categoryImage = imageUrl.link;
        // }
        var productPhoto = this.state.productPhoto;
        // console.log("productPhoto: ",productPhoto);
        if(productPhoto){
            productImage = productPhoto;
        } else {
            productImage = [];
        }

        if(this.state.productFeatured){
            var productFeatured = this.state.productFeatured;
        }else {
            var productFeatured = false;
        }
        if(this.state.productExclusive){
            var productExclusive = this.state.productExclusive;
        }else {
            var productExclusive = false;
        }

        // To add All Rows in FormValues Object as a Array
        var addRowLength = (this.state.addrows).length;
        console.log("addRowLength: ",addRowLength);
        if(addRowLength){
            var productDimentionArray = [];
            var productArr = [];
            for(i=0;i<addRowLength;i++){
                var obj = {
                    "index"     : i,
                    "color"     : $(".colorRefs"+i).val(),
                    "size"      : $(".sizeRefs"+i).val(),
                    "unit"      : $(".unitRefs"+i).val(),
                    "price"     : $(".priceRefs"+i).val(),
                    "quantity"  : $(".quantityRefs"+i).val(),
                    "discount"  : $(".discountRefs"+i).val(),
                    "reorder"   : $(".reorderRefs"+i).val(),
                    "saftyStock": $(".saftyStockRefs"+i).val(),
                }
                productDimentionArray.push(obj);
            }
        }

        var formValues = {
            "category"          :   this.refs.categoryRef.value,
            "subCategory"       :   this.refs.subCategoryRef.value,
            "brand"             :   this.refs.brandRef.value,
            "productCode"       :   this.refs.productCodeRef.value,
            "productName"       :   this.refs.productNameRef.value,
            "productUrl"        :   this.refs.productURLRef.value,
            "supplierCode"      :   this.refs.supplierCodeRef.value,
            "productDetails"    :   this.refs.productDetailsRef.value,
            "materialNCare"     :   this.refs.materialNCareRef.value,
            "shortDescription"  :   this.refs.shortDescriptionRef.value,
            "dimensions"        :   productDimentionArray,
            "productImage"      :   productImage,
            "status"            :   this.refs.statusRef.value,
            "featured"          :   productFeatured,
            "exclusive"         :   productExclusive,
        }

        if(this.state.productMode == "EditMode"){
            var productId = this.props.params.id;
            Meteor.call('updateOldProduct',formValues, productId, (error,result) => {
                if(error){
                    swal({
                        position: 'top-right',
                        type: 'error',
                        title: 'Product Not Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else {
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Product Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.refs.categoryRef.value         = "" ;
                    this.refs.subCategoryRef.value      = "" ;
                    this.refs.brandRef.value            = "" ;
                    this.refs.productCodeRef.value      = "" ;
                    this.refs.productNameRef.value      = "" ;
                    this.refs.productURLRef.value       = "" ;
                    this.refs.supplierCodeRef.value     = "" ;
                    this.refs.productDetailsRef.value   = "" ;
                    this.refs.materialNCareRef.value    = "" ;
                    this.refs.shortDescriptionRef.value = "" ;
                    this.refs.statusRef.value           = "" ;
                    Session.set("temporaryImageId","");

                    var path =  "/admin/products/AddNewProductImages/"+productId;
                    browserHistory.replace(path);

                    window.scrollTo(0,0);


                }
            });
        } else {
            Meteor.call('addNewProduct',formValues, (error,result) => {
                if(error){
                    swal({
                        position: 'top-right',
                        type: 'error',
                        title: 'Product Not Added',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else {
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Product Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.refs.categoryRef.value         = "" ;
                    this.refs.subCategoryRef.value      = "" ;
                    this.refs.brandRef.value            = "" ;
                    this.refs.productCodeRef.value      = "" ;
                    this.refs.productNameRef.value      = "" ;
                    this.refs.productURLRef.value       = "" ;
                    this.refs.supplierCodeRef.value     = "" ;
                    this.refs.productDetailsRef.value   = "" ;
                    this.refs.materialNCareRef.value    = "" ;
                    this.refs.shortDescriptionRef.value = "" ;
                    this.refs.statusRef.value           = "" ;
                    Session.set("temporaryImageId","");

                    var path = "/admin/products/AddNewProductImages/"+result;
                    browserHistory.replace(path);

                    window.scrollTo(0,0);
                }
            });
        }
    }

    createProductUrl(event){
        var url = $(event.currentTarget).val();
        if(url){
            url = url.replace(/\s+/g, '-').toLowerCase();
            $(".productUrl").val(url);
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
                                                Add New Product
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
                                                            <h1 className="reportTitleName">Add New Product</h1>
                                                            <hr/>
                                                            <div className="create-new-product col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <form className="newTemplateForm" onSubmit={this.addNewProduct.bind(this)}>
                                                                    <div className="row">
                                                                        <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">

                                                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                                                    <label>Category</label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                        <select onChange={this.showRelevantSubCategories.bind(this)} className="form-control allProductCategories" aria-describedby="basic-addon1" ref="categoryRef">
                                                                                            <option defaultValue="--Select--">--Select--</option>
                                                                                            { this.state.category.map( (data, index)=>{
                                                                                                return (
                                                                                                    <option key={index}>{data.category}</option>
                                                                                                );
                                                                                            })
                                                                                            }
                                                                                        </select>
                                                                                        <span className="input-group-addon addNewCategoryInProduct" title="Add New Category" id="basic-addon1"   aria-hidden="true" data-toggle="modal" data-target="#openCatgModal"><i className="fa fa-plus" aria-hidden="true"></i></span>

                                                                                        <div className="modal fade" id="openCatgModal" role="dialog">
                                                                                            <div className="modal-dialog">
                                                                                                <div className="modal-content">
                                                                                                    <div className="modal-header delete-close">
                                                                                                        <a href="#" data-dismiss="modal" aria-hidden="true" className="close pull-right"><i className="fa fa-times-circle-o fa-lg venClosePadd" aria-hidden="true"></i></a>
                                                                                                    </div>
                                                                                                    <div className="modal-body">
                                                                                                        <div className="row">

                                                                                                                <div className="col-lg-12 addNewProductCatg">
                                                                                                                    <h3>Add New Category</h3>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 addNewProductCatg">
                                                                                                                    <label>Category</label>
                                                                                                                    <div className="input-group">
                                                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                                                        <input type="text" className="form-control" placeholder="Category" aria-label="Brand" aria-describedby="basic-addon1" ref="modalCategoryRef"  />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 addNewProductCatg">
                                                                                                                    <label>Sub Category</label>
                                                                                                                    <div className="input-group">
                                                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                                                        <input type="text" className="form-control" placeholder="Sub Category" aria-label="Brand" aria-describedby="basic-addon1" ref="modalSubCategoryRef"  />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-12 addNewProductCatg">
                                                                                                                    <button type="button" data-dismiss="modal" className="btn btn-success"  onClick={this.addCategoryWithProduct.bind(this)}>Add Category</button>
                                                                                                                </div>

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                                                    <label>Sub Category</label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                        {/* <input type="text" className="form-control link-subcategory" placeholder="Sub Category" aria-label="Username" aria-describedby="basic-addon1" ref="subCategoryRef"  /> */}


                                                                                        <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" ref="subCategoryRef">
                                                                                            { this.state.subcategory.map( (data, index)=>{
                                                                                                return (
                                                                                                    <option key={index}>{data.subCategoryTitle}</option>
                                                                                                );
                                                                                            })
                                                                                            }
                                                                                        </select>
                                                                                        <span className="input-group-addon addNewSubCategoryInProduct" title="Add New Sub-Category" id="basic-addon1"   aria-hidden="true" data-toggle="modal" data-target="#openSubCatgModal"><i className="fa fa-plus" aria-hidden="true"></i></span>

                                                                                        <div className="modal fade" id="openSubCatgModal" role="dialog">
                                                                                            <div className="modal-dialog">
                                                                                                <div className="modal-content">
                                                                                                    <div className="modal-header delete-close">
                                                                                                        <a href="#" data-dismiss="modal" aria-hidden="true" className="close pull-right"><i className="fa fa-times-circle-o fa-lg venClosePadd" aria-hidden="true"></i></a>
                                                                                                    </div>
                                                                                                    <div className="modal-body">
                                                                                                        <div className="row">
                                                                                                            <div className="col-lg-12 addNewProductCatg">
                                                                                                                <h3>Add New Sub Category</h3>
                                                                                                            </div>

                                                                                                            <div className="col-lg-12 addNewProductCatg">
                                                                                                                <label>Sub Category</label>
                                                                                                                <div className="input-group">
                                                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                                                    <input type="text" className="form-control" placeholder="Sub Category" aria-label="Brand" aria-describedby="basic-addon1" ref="modalAddSubCategoryRef"  />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-lg-12 addNewProductCatg">
                                                                                                                <button type="button" data-dismiss="modal" className="btn btn-success" onClick={this.addSubCategoryWithProduct.bind(this)}>Add Sub Category</button>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                                                    <label>Brand</label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-sellsy" aria-hidden="true"></i></span>
                                                                                        <input type="text" className="form-control productBrandName" placeholder="Brand Name" aria-label="Brand" aria-describedby="basic-addon1" ref="brandRef"  />
                                                                                    </div>
                                                                                </div>
                                                                        </div>

                                                                        <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                                                                <label>Product Code</label>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                                                                    <input type="text" className="form-control link-category newProductCode" placeholder="Product Code" aria-label="Username" aria-describedby="basic-addon1" ref="productCodeRef"  />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                                <label>Product Name*</label>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                                                                    <input onChange={this.createProductUrl.bind(this)} type="text" className="form-control link-subcategory newProductName" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" ref="productNameRef"  />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                                                                <label>Supplier Code</label>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-bars" aria-hidden="true"></i></span>
                                                                                    <input type="text" className="form-control newProductSuppierCode" placeholder="Supplier Code" aria-label="Username" aria-describedby="basic-addon1" ref="supplierCodeRef"  />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <label>Product URL</label>
                                                                            <div className="input-group">
                                                                                <span className="input-group-addon" id="basic-addon1"><i className="fa fa-chain-broken" aria-hidden="true"></i></span>
                                                                                <input type="text" className="form-control productUrl" placeholder="Product URL" aria-describedby="basic-addon1" ref="productURLRef"  />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol table-responsive">
                                                                            <table className="add-new-product-table table table-bordered">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Color</th>
                                                                                        <th>Size</th>
                                                                                        <th>Unit</th>
                                                                                        <th>Price</th>
                                                                                        <th>Quantity</th>
                                                                                        <th>Discount</th>
                                                                                        <th>Reorder</th>
                                                                                        <th>Safty Stock</th>
                                                                                        <th>Delete</th>
                                                                                    </tr>
                                                                                </thead>

                                                                                <tbody className="tableBodyClass">


                                                                                    {
                                                                                        this.state.addrows.map((data,index)=>{
                                                                                            return (
                                                                                                <AddNewProductTableRow index={index}  key={index} />
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </tbody>

                                                                            </table>
                                                                            <div className="add-product-table-row">
                                                                                <button className="btn btn-success" onClick={this.addNewRow}>Add Row</button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <label>Product Detail</label>
                                                                            <div className="input-group">
                                                                                <span className="input-group-addon" id="basic-addon1"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                                                                <textarea className="form-control newProductDetails" placeholder="Product Detail..." rows="4" aria-describedby="basic-addon1" ref="productDetailsRef" ></textarea>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <label>Material & Care</label>
                                                                            <div className="input-group">
                                                                                <span className="input-group-addon" id="basic-addon1"><i className="fa fa-life-ring" aria-hidden="true"></i></span>
                                                                                <textarea className="form-control newProductMateNCare" rows="4" placeholder="Material & Care..." aria-describedby="basic-addon1" ref="materialNCareRef" ></textarea>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <label>Short Description</label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-braille" aria-hidden="true"></i></span>
                                                                                        <input type="text" className="form-control newProductShortDesc" placeholder="Short Description" aria-label="Username" aria-describedby="basic-addon1" ref="shortDescriptionRef"  />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <label>Status</label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-circle-o-notch" aria-hidden="true"></i></span>
                                                                                        {/* <input type="text" className="form-control" placeholder="Status" aria-label="Username" aria-describedby="basic-addon1" ref="statusRef"  /> */}
                                                                                        <select className="form-control newProductStatus" aria-describedby="basic-addon1" ref="statusRef" >
                                                                                            <option>Draft</option>
                                                                                            <option>Publish</option>
                                                                                            <option>Unpublish</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                                                            <div className="add-new-product-submit">
                                                                                <input type="submit" className="btn btn-primary" value={(this.state.productMode == "EditMode" ? "Update Product":"Add Product")} />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </form>
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


//
// EditUniqueProductContainer = createContainer( props => {
//     // const postHandle = Meteor.subscribe('about');
//     var productId   = this.props.match.params.id;
//     // this.props.match.params.id
//     console.log("Param" +productId);
//     const productData = Product.findOne({"_id":productId})|| {};
//     console.log(productData);
//     const loading = !postHandle.ready();
//
//     return {
//         loading,
//         productData,
//     };
// }, AddNewProduct);
//
export default AddNewProduct;
