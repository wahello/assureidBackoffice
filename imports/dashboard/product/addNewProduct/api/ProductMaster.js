import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

export const Product = new Mongo.Collection("product");

if(Meteor.isServer){
    // import { ProductImage } from './ProductImage.js';
    import { ProductImage } from '/imports/dashboard/product/addNewProduct/imageUploadServer/ProductImage.js';


    Meteor.publish("productPublish", function(){
        return Product.find({});
    });

    Meteor.publish('productImagePublish', function() {
       return ProductImage.find().cursor;
   });

Meteor.methods({
    'addProductImages': function(id, productId){
        var data = ProductImage.findOne({"_id":id});
        var productData = Product.findOne({"_id":productId});
        if(data && productData){
            var link = data.link();
            // var obj = {
            //     "imageIndex"    : productData.productImage.length,
            //     "imageLink"     : link,
            // }
            Product.update(
                {"_id":productId},
                {$push: {
                            "productImage" : link,
                        }
                },
            );
        }

    },

    'addNewProduct': function(formValues){
        var productInsert = Product.insert({
                                "category"          :   formValues.category,
                                "subCategory"       :   formValues.subCategory,
                                "brand"             :   formValues.brand,
                                "productCode"       :   formValues.productCode,
                                "productName"       :   formValues.productName,
                                "productUrl"        :   formValues.productUrl,
                                "supplierCode"      :   formValues.supplierCode,
                                "productDetails"    :   formValues.productDetails,
                                "materialNCare"     :   formValues.materialNCare,
                                "shortDescription"  :   formValues.shortDescription,
                                "dimensions"        :   formValues.dimensions,
                                "productImage"      :   [],
                                "status"            :   formValues.status,
                                "dateAdded"         :   new Date(),
                                "featured"          :   formValues.featured,
                                "exclusive"         :   formValues.exclusive,
                            },(error,result) => {
                    		    if(error){
                                    return error;
                    	        }
                                if(result){
                                    return result;
                                }
                    		});
        return productInsert;
    },
    'updateOldProduct': function(formValues, productId){
        var productUpdate = Product.update(
            {"_id":productId},
            {$set:  {
                        "category"          :   formValues.category,
                        "subCategory"       :   formValues.subCategory,
                        "brand"             :   formValues.brand,
                        "productCode"       :   formValues.productCode,
                        "productName"       :   formValues.productName,
                        "productUrl"        :   formValues.productUrl,
                        "supplierCode"      :   formValues.supplierCode,
                        "productDetails"    :   formValues.productDetails,
                        "materialNCare"     :   formValues.materialNCare,
                        "shortDescription"  :   formValues.shortDescription,
                        "dimensions"        :   formValues.dimensions,
                        "productImage"      :   formValues.productImage,
                        "status"            :   formValues.status,
                        "featured"          :   formValues.featured,
                        "exclusive"         :   formValues.exclusive,
                    }
            }
        );
        return productUpdate;
    },

    'updateProductFeatured': function(productId, statusVal){
        var productUpdate = Product.update(
            {"_id":productId},
            {$set:  {
                        "featured"          :   statusVal,
                    }
            }
        );
        return productUpdate;
    },


    'updateProductExclusive': function(productId, statusVal){
        var productUpdate = Product.update(
            {"_id":productId},
            {$set:  {
                        "exclusive"         :   statusVal,
                    }
            }
        );
        return productUpdate;
    },

    'updateProductStatus': function(productId, statusVal){
        var productUpdate = Product.update(
            {"_id":productId},
            {$set:  {
                        "status"         :   statusVal,
                    }
            }
        );
        return productUpdate;
    },

    'deleteListProduct': function(id){
        Product.remove(id);
        return id;
    },
    'deleteProductImage': function(productId, ProductImgLink){
       
        Product.update(
            {"_id":productId,"productImage":ProductImgLink},
            {$unset:
                {"productImage.$" : 1,}
            }
        );

        Product.update(
            {"_id":productId},
            {$pull:
                {"productImage" : null,}
            }
        );
    },

    'addNewBulkProduct': function(formValues){
        var productData = Product.findOne({"productCode":formValues.productCode});
        if(productData){
            var arraylen = productData.dimensions.length+1;
            formValues.dimensions.index = arraylen-1;

            var productUpdate = Product.update(
                {"productCode":formValues.productCode},
                {$push: {
                            "dimensions" : formValues.dimensions,
                        }
                },
            );
            return productUpdate;
        }else {
            formValues.dimensions.index = 0;
            var productInsert = Product.insert({
                                    "category"          :   formValues.category,
                                    "subCategory"       :   formValues.subCategory,
                                    "brand"             :   formValues.brand,
                                    "productCode"       :   formValues.productCode,
                                    "productName"       :   formValues.productName,
                                    "productUrl"        :   formValues.productUrl,
                                    "supplierCode"      :   formValues.supplierCode,
                                    "productDetails"    :   formValues.productDetails,
                                    "materialNCare"     :   formValues.materialNCare,
                                    "shortDescription"  :   formValues.shortDescription,
                                    "dimensions"        :   [formValues.dimensions],
                                    "productImage"      :   [],
                                    "status"            :   formValues.status,
                                    "dateAdded"         :   new Date(),
                                    "featured"          :   formValues.featured,
                                    "exclusive"         :   formValues.exclusive,
                                },(error,result) => {
                        		    if(error){
                                        return error;
                        	        }
                                    if(result){
                                        return result;
                                    }
                        		});
            return productInsert;
        }
    },

    'BulkProductCSVUpload': function(csvObject){
        if(csvObject){
            for(i=0;i<csvObject.length;i++){
                var obj = {
                    // "index"     : 0,
                    "color"     : csvObject[i].color,
                    "size"      : csvObject[i].size,
                    "unit"      : csvObject[i].unit,
                    "price"     : csvObject[i].price,
                    "quantity"  : csvObject[i].quantity,
                    "discount"  : csvObject[i].discount,
                    "reorder"   : csvObject[i].reorder,
                    "saftyStock": csvObject[i].saftyStock,
                };

                formValues = {
                    "category"          :   csvObject[i].category,
                    "subCategory"       :   csvObject[i].subCategory,
                    "brand"             :   csvObject[i].brand,
                    "productCode"       :   csvObject[i].productCode,
                    "productName"       :   csvObject[i].productName,
                    "productUrl"        :   csvObject[i].productUrl,
                    "supplierCode"      :   csvObject[i].supplierCode,
                    "productDetails"    :   csvObject[i].productDetails,
                    "materialNCare"     :   csvObject[i].materialNCare,
                    "shortDescription"  :   csvObject[i].shortDescription,
                    "dimensions"        :   obj,
                    "status"            :   'Unpublish',
                    "featured"          :   false,
                    "exclusive"         :   false,
                }

                UserSession.set("allProgressbarSession", csvObject.length, Meteor.userId());
                Meteor.call("addNewBulkProduct",formValues, (error, result)=>{
                    if(error){

                    }else {
                        UserSession.set("progressbarSession", i, Meteor.userId());
                    }
                });
            }
            return true;
        }
    },


});
}
