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
import AddServicePackage from '../../imports/dashboard/reactCMS/components/AddServicePackage.jsx';
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
import AddEditCodeAndReason from '/imports/dashboard/forms/CodeAndReason/AddEditCodeAndReason.jsx';
import AddEditHolidays from '/imports/dashboard/forms/HolidayList/AddEditHolidays.jsx';

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
import Reports from '/imports/dashboard/reports/Reports.jsx';
import SCTicketDistribution from '/imports/dashboard/ticketDistribution/SCTicketDistribution.jsx';

import OrderGeneration from '/imports/dashboard/generation/components/OrderGeneration.jsx';
import ReportHeader from '/imports/dashboard/generation/components/ReportHeader.jsx';
import ReportGeneration from '/imports/dashboard/generation/components/ReportGeneration.jsx';
import DispatchTeamSidebar from '/imports/dashboard/components/DispatchTeamSidebar.js';
import AllOrders from '/imports/dashboard/dispatchteamDashboardComponent/AllOrders.jsx';
import OrderDetails from '/imports/dashboard/dispatchteamDashboardComponent/OrderDetails.jsx';
import OrderAllocatedToDispatchTeam from '/imports/dashboard/dispatchteamDashboardComponent/OrderAllocatedToDispatchTeam.jsx';
import OpenOrdersForDispatchTeam from '/imports/dashboard/dispatchteamDashboardComponent/OpenOrdersForDispatchTeam.jsx';
import CompletedOrdersForDispatchTeam from '/imports/dashboard/dispatchteamDashboardComponent/CompletedOrdersForDispatchTeam.jsx';
import EscalatedOrdersForDispatchTeam from '/imports/dashboard/dispatchteamDashboardComponent/EscalatedOrdersForDispatchTeam.jsx';
import AdminTicketDetails from '/imports/dashboard/dashboardContent/AdminTicketDetails.jsx';
// import ReportGeneration from '/imports/dashboard/ReportGeneration.jsx';
// import ReportGeneration from '/imports/dashboard/ReportGeneration.jsx';
const unauthenticatedPages = ['/', '/signup', '/forgotpassword', '/signup', '/resetpassword/:token','/login'];
const authenticatedPages = ['/admin/dashboard','/admin/managebasicpage','/admin/manageportfolio',
                            '/backoffice/dashboard','/admin/manageaboutuspage','/admin/manageblockspage',
                            '/admin/managecareerpage','/admin/manageeventpage','/admin/managefaq',
                            '/admin/managejobpage','/admin/managecontact','/admin/managephotogallery',
                            '/admin/managevideolibrary','admin/manageproduct',
                            '/admin/manageservice','/admin/manageblogpage',
                            'admin/company-info', '/dashboard','/admin/UMRolesList',
                            '/admin/createUser','/admin/addPackages',
                            '/admin/addVerification','/admin/NewsFeed',
                            '/admin/UMListOfUsers','/admin/ListOfNewsFeed',
                            '/admin/reports','/admin/ticketdistribution',
                            '/admin/alltickets','/admin/assignedtickets',
                            '/admin/opentickets','/admin/approvedtickets',
                            '/admin/rejectedtickets','/admin/escalatedtickets',
                            '/backofficeadmin/company-info','/admin/ticket/:id',
                            '/admin/viewProfile/:id',
                            '/backoffice/dispactteamdashboard',
                            '/admin/allorders',
                            '/admin/orderdetails/:id',
                            '/admin/orderAllocatedToDispatchTeam',
                            '/admin/openOrdersForDispatchTeam',
                            '/admin/completedOrdersForDispatchTeam',
                            '/admin/escalatedOrdersForDispatchTeam'
                          ];

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated && Roles.userIsInRole(Meteor.userId(), ['admin','superAdmin','head'])) {
    browserHistory.replace('/admin/dashboard');
  } else if (isUnauthenticatedPage && isAuthenticated && Roles.userIsInRole(Meteor.userId(),['screening committee','team leader','team member','field expert','quality team member','quality team leader'])){
    browserHistory.replace('/backoffice/dashboard');
  }else if (isUnauthenticatedPage && isAuthenticated && Roles.userIsInRole(Meteor.userId(),['dispatch team'])){
    browserHistory.replace('/backoffice/dispactteamdashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};



const onEnterAdminPage = (nextState, replace, callback) => { 
   // If no user, redirect to login 
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      console.log('I was here!');  
      replace({
        pathname: '/', 
        state: { nextPathname: nextState.location.pathname},
    });
  }


  // If user is admin, redirect to /admin
    Meteor.subscribe("currentUserData", {
      onReady: function () {
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin','superAdmin'])) {
          replace({
            // pathname: '/forbidden',
            // state: { nextPathname: nextState.location.pathname },
          });
        };
        callback();
      },
      onError: function () {
        console.log("error");
      }
    });
}

const onEnterOtherRolePage = (nextState, replace, callback) => { 
  // If no user, redirect to login 
  if (!Meteor.loggingIn() && !Meteor.userId()) {
     console.log('I was here!');  
     replace({     pathname: '/', 
     state: { nextPathname: nextState.location.pathname },
   });
  }
  // If user is admin, redirect to /admin
  Meteor.subscribe("currentUserData", {
    onReady: function () {
      if (!Roles.userIsInRole(Meteor.userId(), ['screening committee','team leader','team member','field expert','quality team member','quality team leader'])) {
        replace({
          // pathname: '/forbidden',
          // state: { nextPathname: nextState.location.pathname },
        });
      };
      callback();
    },
    onError: function () {
      console.log("error");
    }
  });
}

const onEnterDispatchTeamPage = (nextState, replace, callback) => { 
  // If no user, redirect to login 
  if (!Meteor.loggingIn() && !Meteor.userId()) {
     console.log('I was here!');  
     replace({     pathname: '/', 
     state: { nextPathname: nextState.location.pathname },
   });
  }
  // If user is admin, redirect to /admin
  Meteor.subscribe("currentUserData", {
    onReady: function () {
      if (!Roles.userIsInRole(Meteor.userId(),['dispatch team'])) {
        replace({
          // pathname: '/forbidden',
          // state: { nextPathname: nextState.location.pathname },
        });
      };
      callback();
    },
    onError: function () {
      console.log("error");
    }
  });
}





class DashApp extends React.Component {

  render() {
    return (
      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <Header/>
          <div className="container-fluid">
            <div className="row">
                <Sidebar />             
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

class DispatchTeamDashApp extends React.Component {

  render() {
    return (
      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <Header/>
          <div className="container-fluid">
            <div className="row">
                <DispatchTeamSidebar />             
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

class BackofficeDashApp extends React.Component {

  render() {
      return (
        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">
            <Header/>
            <div className="container-fluid">
              <div className="row">
                  <OtherRoleSidebar />             
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

export const routes = (
  <Router history={browserHistory}>

     <Route path="/resetPassword/:token" component={NewPassword}/>
     <Route path="/forgotpassword" component={ResetPwd}/>
     <Route path="/dashboard" component={UserDashboard}/>

     <Route component={DashApp} >
     
       <Route path="/admin/adminticketdetails" component={AdminTicketDetails} onEnter={onEnterAdminPage}/>
       <Route path="/admin/dashboard" component={Content} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managebasicpage" component={CreateBasicPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageaboutuspage" component={AboutUs} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageblockspage" component={BlocksPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managecareerpage" component={CareerPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageblogpage" component={CreateBlogPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ListOfBlogs" component={ListOfBlogs} onEnter={onEnterAdminPage}/>       
       <Route path="/admin/manageeventpage" component={EventPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managejobpage" component={JobAppPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managecontact" component={ManageContact} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managephotogallery" component={ManagePhotoGallery} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managevideolibrary" component={ManageVideoLibrary} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageportfolio" component={PortfolioPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageproduct" component={ProductPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageservice" component={ServicePage} onEnter={onEnterAdminPage}/>
       <Route path="  /admin/manageservicepackage" component={AddServicePackage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managefaq" component={FAQPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managebasicpage/:id" component={CreateBasicPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageaboutuspage/:id" component={AboutUs} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageblockspage/:id" component={BlocksPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managecareerpage/:id" component={CareerPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/EditBlog/:id" component={EditBlog} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageeventpage/:id" component={EventPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managejobpage/:id" component={JobAppPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managecontact/:id" component={ManageContact} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managephotogallery/:id" component={ManagePhotoGallery} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managevideolibrary/:id" component={ManageVideoLibrary} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageportfolio/:id" component={PortfolioPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/manageproduct/:id" component={ProductPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/EditService/:id" component={EditService} onEnter={onEnterAdminPage}/>
       <Route path="/admin/EditNewsFeed/:id" component={EditNewsFeed} onEnter={onEnterAdminPage}/>
       <Route path="/admin/managefaq/:id" component={FAQPage} onEnter={onEnterAdminPage}/>
       <Route path="/admin/company-info" component={CompanySettingTabs} onEnter={onEnterAdminPage}/>
       <Route path="/admin/products/AddNewProduct" component={AddNewProduct} onEnter={onEnterAdminPage}/>
       <Route path="/admin/products/AddNewProduct/:id" component={AddNewProduct} onEnter={onEnterAdminPage}/>
       <Route path="/admin/products/AddNewProductImages/:id" component={AddNewProductImages} onEnter={onEnterAdminPage}/>
       <Route path="/admin/products/ProductList" component={ProductList} onEnter={onEnterAdminPage}/>
       <Route path="/admin/products/BulkProductUpload" component={AddNewBulkProduct} onEnter={onEnterAdminPage}/>
       <Route path="/admin/createUser" component={CreateUser} onEnter={onEnterAdminPage}/>
       <Route path="/admin/addPackages" component={AddPackages} onEnter={onEnterAdminPage}/>
       <Route path="/admin/NewsFeed" component={NewsFeed} onEnter={onEnterAdminPage}/>
       <Route path="/admin/addVerification" component={AddVerification} onEnter={onEnterAdminPage}/>
       <Route path="/admin/UMRolesList" component={UMRolesList} onEnter={onEnterAdminPage}/>
       <Route path="/admin/UMListOfUsers" component={UMListOfUsers} onEnter={onEnterAdminPage}/>
       <Route path="/admin/editProfile/:id" component={EditUserProfile} onEnter={onEnterAdminPage}/>
       <Route path="/ComingSoon" component={ComingSoon} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ListOfNewsFeed" component={ListOfNewsFeed} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ListOfServices" component={ListOfServices} onEnter={onEnterAdminPage}/>
       <Route path="/admin/CreateTemplate" component={CreateTemplate} onEnter={onEnterAdminPage}/>
       <Route path="/admin/CreateTemplate/:id" component={CreateTemplate} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ViewTemplates" component={ViewTemplates} onEnter={onEnterAdminPage}/>     
       <Route path="/admin/Qualification" component={AddQualificationLevel} onEnter={onEnterAdminPage}/>
       <Route path="/admin/Qualification/:id" component={AddQualificationLevel} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ManageLocation" component={ManageLocation} onEnter={onEnterAdminPage}/>
       <Route path="/admin/ManageLocation/:id" component={ManageLocation} onEnter={onEnterAdminPage}/>
       <Route path="/admin/University" component={AddEditUniversity} onEnter={onEnterAdminPage}/>
       <Route path="/admin/University/:id" component={AddEditUniversity} onEnter={onEnterAdminPage}/>
       <Route path="/admin/College" component={AddEditCollege} onEnter={onEnterAdminPage}/>
       <Route path="/admin/College/:id" component={AddEditCollege} onEnter={onEnterAdminPage}/>
       <Route path="/admin/PoliceStation" component={AddEditPoliceData} onEnter={onEnterAdminPage}/>
       <Route path="/admin/PoliceStation/:id" component={AddEditPoliceData} onEnter={onEnterAdminPage}/>
       <Route path="/admin/mytickets" component={MyTickets} onEnter={onEnterAdminPage}/>
       <Route path="/admin/maxnoofticketallocate" component={MaxNoOfTicketAllocate} onEnter={onEnterAdminPage}/>
       {/* <Route path="/admin/ticket/:id" component={Ticket} onEnter={onEnterAdminPage}/> */}
       <Route path="/admin/Checklist" component={AddEditChecklist}  onEnter={onEnterAdminPage}/>
       <Route path="/admin/Checklist/:id" component={AddEditChecklist}  onEnter={onEnterAdminPage}/>       
       <Route path="/admin/reports" component={Reports}  onEnter={onEnterAdminPage}/>       
       <Route path="/admin/ticketdistribution" component={SCTicketDistribution}  onEnter={onEnterAdminPage}/> 
      <Route path="/mainadmin/ticket/:id" component={Ticket} onEnter={onEnterAdminPage}/>  
      <Route path="/admin/CodeAndReason" component={AddEditCodeAndReason} onEnter={onEnterAdminPage}/>     
      <Route path="/admin/CodeAndReason/:id" component={AddEditCodeAndReason} onEnter={onEnterAdminPage}/>  
      <Route path="/admin/HolidayList/:id" component={AddEditHolidays} onEnter={onEnterAdminPage}/>  
      <Route path="/admin/HolidayList" component={AddEditHolidays} onEnter={onEnterAdminPage}/>  
       {/* <Route path="/admin/ticketdocumentdetails" component={TicketDocumentDetail}/> */}
    </Route>

    <Route component={BackofficeDashApp} >
      <Route path="/backoffice/dashboard" component={Content} onEnter={onEnterOtherRolePage}/>
      <Route path="/admin/alltickets" component={AllTickets}  onEnter={onEnterOtherRolePage}/>
       <Route path="/admin/assignedtickets" component={AssignedTickets} onEnter={onEnterOtherRolePage}/>
       <Route path="/admin/opentickets" component={OpenTickets} onEnter={onEnterOtherRolePage}/>
       <Route path="/admin/approvedtickets" component={ApprovedTickets} onEnter={onEnterOtherRolePage}/>
       <Route path="/admin/rejectedtickets" component={RejectedTickets} onEnter={onEnterOtherRolePage}/>
       <Route path="/admin/escalatedtickets" component={EscalatedTickets} onEnter={onEnterOtherRolePage}/>
       <Route path="/backofficeadmin/company-info" component={CompanySettingTabs} onEnter={onEnterOtherRolePage}/>
      <Route path="/admin/ticket/:id" component={Ticket} onEnter={onEnterOtherRolePage}/>       
      <Route path="/admin/viewProfile/:id" component={ProfileView} onEnter={onEnterOtherRolePage}/> 
    </Route>
    <Route path="/reportgeneration/:id" component={ReportGeneration}/>

    <Route component={DispatchTeamDashApp} >
      <Route path="/backoffice/dispactteamdashboard" component={Content} onEnter={onEnterDispatchTeamPage}/>
      <Route path="/admin/allorders" component={AllOrders} onEnter={onEnterDispatchTeamPage}/>
      <Route path="/admin/orderdetails/:id" component={OrderDetails} onEnter={onEnterDispatchTeamPage}/>
      <Route path="/admin/orderAllocatedToDispatchTeam" component={OrderAllocatedToDispatchTeam} onEnter={onEnterDispatchTeamPage}/> 
      <Route path="/admin/openOrdersForDispatchTeam" component={OpenOrdersForDispatchTeam} onEnter={onEnterDispatchTeamPage}/>  
      <Route path="/admin/completedOrdersForDispatchTeam" component={CompletedOrdersForDispatchTeam} onEnter={onEnterDispatchTeamPage}/>
      <Route path="/admin/escalatedOrdersForDispatchTeam" component={EscalatedOrdersForDispatchTeam} onEnter={onEnterDispatchTeamPage}/> 
    </Route>

    {/* <Route path="/" component={CMainLayout} /> */}
    <Route path="/" component={LogIn} />
    
    <Route path="/reportHeader/:id" component={ReportHeader} />
    <Route path="/orderGeneration/:orderid" component={OrderGeneration} />

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
