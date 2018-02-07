import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';

export default class AddNewProductTableRow extends TrackerReact (Component){

    deleteProductTableRow(event){
        event.preventDefault();
        $(event.currentTarget).parent().parent().remove();
    }

    render(){
        return(
            <tr>
               <td>
                   <input type="text" className={"colorRefs"+this.props.index + " form-control"} ref={"colorRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"sizeRefs"+this.props.index + " form-control"} ref={"sizeRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"unitRefs"+this.props.index + " form-control"} ref={"unitRefs"+this.props.index}  />
               </td>
               <td>
                   <input type="text" className={"priceRefs"+this.props.index + " form-control"} ref={"priceRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"quantityRefs"+this.props.index + " form-control"} ref={"quantityRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"discountRefs"+this.props.index + " form-control"} ref={"discountRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"reorderRefs"+this.props.index + " form-control"} ref={"reorderRefs"+this.props.index} />
               </td>
               <td>
                   <input type="text" className={"saftyStockRefs"+this.props.index + " form-control"} ref={"saftyStockRefs"+this.props.index} />
               </td>
               <td>
                   <div className="delete-product-table-row" onClick={this.deleteProductTableRow.bind(this)} >
                       <i className="fa fa-trash" aria-hidden="true"></i>
                   </div>
               </td>

           </tr>
        );
    }
}
