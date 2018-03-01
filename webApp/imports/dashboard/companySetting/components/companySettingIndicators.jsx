import React, {Component} from 'react';

export default class CompanySettingIndicators extends Component{

	divClick(event){
		event.preventDefault();
		$('.csMenuItem').hasClass( 'divActive' );
		$('.csMenuItem').removeClass( 'divActive' );

	    // Use this to add active to div
	    $( event.target ).parent().parent().addClass( "divActive" );

	}

	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 companySettingFooter" onClick={this.divClick.bind(this)}>
				<a href={`/companyInformation`} className="companyFooterDiv ">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 csMenuItem companyInformation divActive"> 
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csMenuIcon"> 
							<i className="fa fa-info-circle"></i>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csTitle">
							Company Information
						</div>
					</div>
				</a>
				<a href={`/companyLocation`} className="companyFooterDiv">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 csMenuItem companyLocation"> 
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csMenuIcon"> 
							<i className="fa fa-address-card"></i>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csTitle">
							Company Address
						</div>
					</div>
				</a>
				<a href={`/companyBankDetails`} className="companyFooterDiv">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 csMenuItem companyBankDetails"> 
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csMenuIcon"> 
							<i className="fa fa-university"></i>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csTitle">
							Bank Details
						</div>
					</div>
				</a>
				<a href={`/companyTaxDetails`} className="companyFooterDiv">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 csMenuItem noBorder companyTaxDetails"> 
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csMenuIcon"> 
							<i className="fa fa-cog"></i>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 csTitle">
							Tax Setting
						</div>
					</div>
				</a>
			</div>
			);
	}
}