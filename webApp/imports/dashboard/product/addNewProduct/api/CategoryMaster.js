import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';


export const Category = new Mongo.Collection("category");


if(Meteor.isServer){
    console.log('in server');
    // import { CategoryImage } from './CategoryImage.js';
    Meteor.publish("category", function(){
        return Category.find({});
    });

Meteor.methods({
    'addNewCategory': function(formValues){
        var catCodeLength = Category.find({}).count();
        console.log("Collection length: ",catCodeLength);


        var subCategoryCode = catCodeLength + "-" + 0;



        var obj = {
            "subCategoryCode"   : subCategoryCode,
            "subCategoryTitle"  : formValues.subCategory,
        }

        var categoryInsert = Category.insert({
                                "categoryCode"      :   catCodeLength,
                                "category"          :   formValues.category,
                                "subCategory"       :   [obj],
                                "status"            :   "active",
                                "dateAdded"         :   new Date(),
                            },(error,result) => {
                    		    if(error){
                                    return error;
                    	        }
                                if(result){
                                    return result;
                                }
                    		});
        return categoryInsert;
    },

    'addNewSubCategory': function(formValues){
        var catCode = Category.findOne({"category":formValues.category});
        console.log("Collection length: ",catCode);

        if(catCode){
            if(catCode.subCategory.length>0){
                var subCategoryCode = catCode.categoryCode + "-" + catCode.subCategory.length;
            } else {
                var subCategoryCode = catCode + "-" + 0;
            }

        }

        var obj = {
            "subCategoryCode"   : subCategoryCode,
            "subCategoryTitle"  : formValues.subCategory,
        }

        var addSubcategory = Category.update(
                                {"category":formValues.category},
                                {$push:  {
                                        "subCategory" : obj,
                                        }
                                },(error,result) => {
                        		    if(error){
                                        return error;
                        	        }
                                    if(result){
                                        return result;
                                    }
                        		});
        return   addSubcategory;
    },

});

}
