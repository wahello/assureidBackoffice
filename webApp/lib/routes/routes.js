import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import Dashboard from '../../imports/dashboard/components/Dashboard';
import NotFound from '../../imports/common/NotFound';
import ResetPwd from '../../imports/common/ResetPwd';
import NewPassword from '../../imports/common/NotFound';
import UserDashboard from '../../imports/common/UserDashboard';
import Header from '../../imports/dashboard/components/Header';
import Footer from '../../imports/dashboard/components/Footer';
import Sidebar from '../../imports/dashboard/components/Sidebar';
import OtherRoleSidebar from '../../imports/dashboard/components/OtherRoleSidebar';
import Content from '../../imports/dashboard/components/content/Content';
import CompanySettingTabs from '../../imports/dashboard/companySetting/components/CompanySettingTabs.jsx';
import CreateBasicPage from '../../imports/dashboard/reactCMS/components/CreateBasicPage.jsx';
import AboutUs from '../../imports/dashboard/reactCMS/components/AboutUs.jsx';
import BlocksPage from '../../imports/dashboard/reactCMS/components/BlocksPage.jsx';
import CareerPage from '../../imports/dashboard/reactCMS/components/CareerPage.jsx';
import CreateBlogPage from '../../imports/dashboard/reactCMS/components/CreateBlogPage.jsx';
import EventPage from '../../imports/dashboard/reactCMS/components/EventPage.jsx';
import FAQPage from '../../imports/dashboard/reactCMS/components/FAQPage.jsx';
import JobAppPage from '../../imports/dashboard/reactCMS/components/JobAppPage.jsx';
import ManageContact from '../../imports/dashboard/reactCMS/components/ManageContact.jsx';
import ManageVideoLibrary from '../../imports/dashboard/reactCMS/components/ManageVideoLibrary.jsx';
import ManagePhotoGallery from '../../imports/dashboard/reactCMS/components/ManagePhotoGallery.jsx';
import PortfolioPage from '../../imports/dashboard/reactCMS/components/PortfolioPage.jsx';
import ProductPage from '../../imports/dashboard/reactCMS/components/PortfolioPage.jsx';
import ServicePage from '../../imports/dashboard/reactCMS/components/ServicePage.jsx';
import EditService from '../../imports/dashboard/reactCMS/components/EditService.jsx';
import EditBlog from '../../imports/dashboard/reactCMS/components/EditBlog.jsx';

import ListOfServices from '../../imports/dashboard/reactCMS/components/ListOfServices.jsx';
import ListOfBlogs from '../../imports/dashboard/reactCMS/components/ListOfBlogs.jsx';

// import CMainLayout from '../../imports/website/common/CMainLayout';
// import Profile from '../../imports/website/profile/Profile.jsx';
import ComingSoon from '../../imports/dashboard/components/ComingSoon.jsx';
import AddNewProduct from '/imports/dashboard/product/addNewProduct/component/AddNewProduct.jsx';
import AddNewProductImages from '/imports/dashboard/product/addNewProduct/component/AddNewProductImages.jsx';
import CreateTemplate from '/imports/dashboard/notification/components/CreateTemplate.jsx';
import ViewTemplates from '/imports/dashboard/notification/components/ViewTemplates.jsx';

import ProductList from '/imports/dashboard/product/productList/component/productList.jsx';
import AddNewBulkProduct from '/imports/dashboard/product/productBulkUpload/component/ProductBulkUpload.jsx';

import CreateUser from '/imports/dashboard/userManagement/CreateUser.jsx';
import UMRolesList from '/imports/dashboard/userManagement/roles/UMRolesList.jsx';
import UMListOfUsers from '/imports/dashboard/userManagement/UMListOfUsers.jsx';
import EditUserProfile from '/imports/dashboard/userManagement/EditUserProfile.jsx';
import AddPackages from '/imports/dashboard/forms/AddPackages.jsx';
import AddVerification from '/imports/dashboard/forms/AddVerification.jsx';
import NewsFeed from '/imports/dashboard/forms/newsFeed/NewsFeed.jsx';
import ListOfNewsFeed from '/imports/dashboard/forms/newsFeed/ListOfNewsFeed.jsx';
import EditNewsFeed from '/imports/dashboard/forms/newsFeed/EditNewsFeed.jsx';
import ManageLocation from '/imports/dashboard/forms/manageLocation/ManageLocation.jsx';
import AddEditCollege from '/imports/dashboard/forms/college/AddEditCollege.jsx';
import AddEditPoliceData from '/imports/dashboard/forms/policeManagement/AddEditPoliceData.jsx';

import LogIn from '/imports/website/forms/LogIn.jsx';
import MyTickets from '/imports/dashboard/ticketManagement/myTickets/MyTickets.jsx';
import MaxNoOfTicketAllocate from '/imports/dashboard/ticketManagement/MaxNoOfTicketAllocate.jsx';
import Ticket from '/imports/dashboard/ticketManagement/Ticket.jsx';

import TicketDocumentDetails from '/imports/dashboard/ticketManagement/TicketDocumentDetail.jsx';
import AllTickets from '/imports/dashboard/ticketManagement/myTickets/AllTickets.jsx';
import AssignedTickets from '/imports/dashboard/ticketManagement/myTickets/AssignedTickets.jsx';
import OpenTickets from '/imports/dashboard/ticketManagement/myTickets/OpenTickets.jsx';
import ApprovedTickets from '/imports/dashboard/ticketManagement/myTickets/ApprovedTickets.jsx';
import RejectedTickets from '/imports/dashboard/ticketManagement/myTickets/RejectedTickets.jsx';
import EscalatedTickets from '/imports/dashboard/ticketManagement/myTickets/EscalatedTickets.jsx';
import ProfileView from '/imports/website/views/ProfileView.jsx';
import AddEditChecklist from '../../imports/dashboard/forms/CheckList/AddEditChecklist.jsx';
import AddQualificationLevel from '../../imports/dashboard/forms/Qualification/AddQualificationLevel.jsx';
import ListOfQualificationLevel from '../../imports/dashboard/forms/Qualification/ListOfQualificationLevel.jsx';

import AddEditUniversity from '../../imports/dashboard/forms/University/AddEditUniversity.jsx';
import ListOfUniversity from '../../imports/dashboard/forms/University/ListOfUniversity.jsx';

import TicketDocumentDetail from '/imports/dashboard/ticketManagement/TicketDocumentDetail.jsx';

const unauthenticatedPages = ['/', '/signup', '/forgotpassword', '/signup', '/resetpassword/:token','/login'];
const authenticatedPages = ['/admin/dashboard','/admin/managebasicpage','/admin/manageportfolio','/admin/manageaboutuspage','/admin/manageblockspage','/admin/managecareerpage','/admin/manageeventpage','/admin/managefaq','/admin/managejobpage','/admin/managecontact','/admin/managephotogallery','/admin/managevideolibrary','admin/manageproduct','/admin/manageservice','/admin/manageblogpage', 'admin/company-info', '/dashboard','/admin/UMRolesList','/admin/createUser','/admin/addPackages','/admin/addVerification','/admin/NewsFeed','/admin/UMListOfUsers','/admin/ListOfNewsFeed'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated && Roles.userIsInRole(Meteor.userId(), ['admin','superAdmin'])) {
    browserHistory.replace('/admin/dashboard');
  } else if (isUnauthenticatedPage && isAuthenticated && Roles.userIsInRole(Meteor.userId(), 'Recruiter')) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

class DashApp extends React.Component {
  renderSidebar=()=>{
      console.log(Roles.userIsInRole(Meteor.userId(), ['superAdmin','admin','Admin']));
      if (Roles.userIsInRole(Meteor.userId(), ['superAdmin','admin','Admin'])) { 
          return(
              <Sidebar/>
          );
        }else{  
          return(
              <OtherRoleSidebar />
          );
        }
  }

  render() {
    return (
      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <Header/>
          <div className="container-fluid">
            <div className="row">
                {this.renderSidebar()}                
              <div className="container-fluid main-container">
                <div className="row">
                  {this.props.children}
                  <Footer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// class Website extends React.Component{
//   render(){
//     return(
//       <div className="hold-transition skin-blue sidebar-mini">
//         <div className="wrapper">
//           <HeaderSec />
//           {this.props.children}
//           <FooterSec />
//         </div>
//       </div>
//     );
//   }
// }

// class WebsiteForms extends React.Component{
//   render(){
//     return(
//       <div className="hold-transition skin-blue sidebar-mini">
//         <div className="wrapper">
//           <HeaderThrd />
//           {this.props.children}
//           <FooterSec />
//         </div>
//       </div>
//     );
//   }
// }

export const routes = (
  <Router history={browserHistory}>

     <Route path="/resetPassword/:token" component={NewPassword}/>
     <Route path="/forgotpassword" component={ResetPwd}/>
     <Route path="/dashboard" component={UserDashboard}/>

     <Route component={DashApp} >
       <Route path="/admin/dashboard" component={Content}/>
       <Route path="/admin/managebasicpage" component={CreateBasicPage}/>
       <Route path="/admin/manageaboutuspage" component={AboutUs}/>
       <Route path="/admin/manageblockspage" component={BlocksPage}/>
       <Route path="/admin/managecareerpage" component={CareerPage}/>
       <Route path="/admin/manageblogpage" component={CreateBlogPage}/>
       <Route path="/admin/ListOfBlogs" component={ListOfBlogs}/>       
       <Route path="/admin/manageeventpage" component={EventPage}/>
       <Route path="/admin/managejobpage" component={JobAppPage}/>
       <Route path="/admin/managecontact" component={ManageContact}/>
       <Route path="/admin/managephotogallery" component={ManagePhotoGallery}/>
       <Route path="/admin/managevideolibrary" component={ManageVideoLibrary}/>
       <Route path="/admin/manageportfolio" component={PortfolioPage}/>
       <Route path="/admin/manageproduct" component={ProductPage}/>
       <Route path="/admin/manageservice" component={ServicePage}/>
       <Route path="/admin/managefaq" component={FAQPage}/>
       <Route path="/admin/managebasicpage/:id" component={CreateBasicPage}/>
       <Route path="/admin/manageaboutuspage/:id" component={AboutUs}/>
       <Route path="/admin/manageblockspage/:id" component={BlocksPage}/>
       <Route path="/admin/managecareerpage/:id" component={CareerPage}/>
       <Route path="/admin/EditBlog/:id" component={EditBlog}/>
       <Route path="/admin/manageeventpage/:id" component={EventPage}/>
       <Route path="/admin/managejobpage/:id" component={JobAppPage}/>
       <Route path="/admin/managecontact/:id" component={ManageContact}/>
       <Route path="/admin/managephotogallery/:id" component={ManagePhotoGallery}/>
       <Route path="/admin/managevideolibrary/:id" component={ManageVideoLibrary}/>
       <Route path="/admin/manageportfolio/:id" component={PortfolioPage}/>
       <Route path="/admin/manageproduct/:id" component={ProductPage}/>
       <Route path="/admin/EditService/:id" component={EditService}/>
       <Route path="/admin/EditNewsFeed/:id" component={EditNewsFeed}/>
       <Route path="/admin/managefaq/:id" component={FAQPage}/>
       <Route path="/admin/company-info" component={CompanySettingTabs}/>
       <Route path="/admin/products/AddNewProduct" component={AddNewProduct}/>
       <Route path="/admin/products/AddNewProduct/:id" component={AddNewProduct}/>
       <Route path="/admin/products/AddNewProductImages/:id" component={AddNewProductImages}/>
       <Route path="/admin/products/ProductList" component={ProductList}/>
       <Route path="/admin/products/BulkProductUpload" component={AddNewBulkProduct}/>
       <Route path="/admin/createUser" component={CreateUser}/>
       <Route path="/admin/addPackages" component={AddPackages}/>
       <Route path="/admin/NewsFeed" component={NewsFeed}/>
       <Route path="/admin/addVerification" component={AddVerification}/>
       <Route path="/admin/UMRolesList" component={UMRolesList}/>
       <Route path="/admin/UMListOfUsers" component={UMListOfUsers}/>
       <Route path="/admin/editProfile/:id" component={EditUserProfile}/>
       <Route path="/ComingSoon" component={ComingSoon}/>
       <Route path="/admin/ListOfNewsFeed" component={ListOfNewsFeed}/>
       <Route path="/admin/ListOfServices" component={ListOfServices}/>
       <Route path="/admin/CreateTemplate" component={CreateTemplate}/>
       <Route path="/admin/CreateTemplate/:id" component={CreateTemplate}/>
       <Route path="/admin/ViewTemplates" component={ViewTemplates}/>     
       <Route path="/admin/Qualification" component={AddQualificationLevel}/>
       <Route path="/admin/Qualification/:id" component={AddQualificationLevel}/>
       <Route path="/admin/ManageLocation" component={ManageLocation}/>
       <Route path="/admin/ManageLocation/:id" component={ManageLocation}/>
       <Route path="/admin/University" component={AddEditUniversity}/>
       <Route path="/admin/University/:id" component={AddEditUniversity}/>
       <Route path="/admin/College" component={AddEditCollege}/>
       <Route path="/admin/College/:id" component={AddEditCollege}/>
       <Route path="/admin/PoliceStation" component={AddEditPoliceData}/>
       <Route path="/admin/PoliceStation/:id" component={AddEditPoliceData}/>
       <Route path="/admin/mytickets" component={MyTickets}/>
       <Route path="/admin/maxnoofticketallocate" component={MaxNoOfTicketAllocate}/>
       <Route path="/admin/ticket/:id" component={Ticket}/>
       {/* <Route path="/admin/ticket/:id" component={TicketDocumentDetails}/> */} 
       <Route path="/admin/alltickets" component={AllTickets}/>
       <Route path="/admin/assignedtickets" component={AssignedTickets}/>
       <Route path="/admin/opentickets" component={OpenTickets}/>
       <Route path="/admin/approvedtickets" component={ApprovedTickets}/>
       <Route path="/admin/rejectedtickets" component={RejectedTickets}/>
       <Route path="/admin/escalatedtickets" component={EscalatedTickets}/>
       <Route path="/admin/viewProfile/:id" component={ProfileView}/>
       <Route path="/admin/Checklist" component={AddEditChecklist} />
       <Route path="/admin/Checklist/:id" component={AddEditChecklist} />       
       {/* <Route path="/admin/ticketdocumentdetails" component={TicketDocumentDetail}/> */}
    </Route>

    {/* <Route path="/" component={CMainLayout} /> */}
    <Route path="/" component={LogIn} />

    {/* <Route component={Website}>
      <Route path="/Clients"  component={Clients}/>
      <Route path="/contactus"  component={ContactUs}/>
      <Route path="/About"  component={AboutUsIntro}/>
      <Route path="/privacypolicy"  component={Privacy}/>
      <Route path="/termsandcondition"  component={Terms}/>
      <Route path="/News"  component={News}/>
      <Route path="/Services" component={AssureServices}/>
      <Route path="/Demopage" component={DemoPage}/>
      <Route path="/allBlogs" component={AllBlogs}/>
      
    </Route> */}

    {/* <Route component={WebsiteForms}>
      <Route path="/profileForms" component={ProfileForms}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/ServiceInfo/:id" component={ServiceInfo}/>
      <Route path="/ServiceRequiredData/:id" component={ServiceRequiredData}/>
      <Route path="/ServiceInvoice" component={ServiceInvoice}/>
      <Route path="/PaymentGateway" component={PaymentGateway}/>
    </Route> */}

    <Route path="*" component={NotFound}/>
  </Router>
);
