
import {StackNavigator, TabNavigator} from 'react-navigation';

import LogIn from '../layouts/LogIn/LogIn.js';
import SignUp from '../layouts/SignUp/SignUp.js';
import SubmitOTP from '../layouts/SubmitOTP/SubmitOTP.js';
import ForgotPassword from '../layouts/ForgotPassword/ForgotPassword.js';
import ReceivedOTP from '../layouts/ReceivedOTP/ReceivedOTP.js';
import ResetPassword from '../layouts/ResetPassword/ResetPassword.js';



import EditCustomer from '../layouts/EditCustomer/EditCustomer.js';
import AddCustomer from '../layouts/AddCustomer/AddCustomer.js';


import ViewBill from '../layouts/ViewBill/ViewBill.js';
import ViewCustomerBill from '../layouts/ViewBill/ViewCustomerBill';
import ViewBillLine from '../layouts/ViewBillLine/ViewBillLine.js';
import ViewCollectionLine from '../layouts/ViewCollectionLine/ViewCollectionLine.js';
// import ServiceList from '../layouts/Services/ServiceList.js';
import AdditionalSetting from '../layouts/BusinessSetting/AdditionalSetting.js';
import BusinessDetails from '../layouts/BusinessSetting/BusinessDetails.js';
import ProductList from '../layouts/Products/ProductList.js';
import ViewCollection from '../layouts/ViewCollection/ViewCollection.js';
import ViewProduct from '../layouts/Products/ViewProduct.js';
import EditProduct from '../layouts/Products/EditProduct.js';

import EditCustomerMoreDetails from '../layouts/EditCustomer/EditCustomerMoreDetails.js';

import BillCollection from '../layouts/ViewCollection/BillCollection.js';
import CustomerHoliday from '../layouts/CustomerHoliday/CustomerHoliday.js';

// import Deliveries from '../layouts/Deliveries/Deliveries.js';
// import Deliveries2 from '../layouts/Deliveries2/Deliveries2.js';
// import Deliveries3 from '../layouts/Deliveries3/Deliveries3.js';

import DeliveriesQuantity from '../layouts/DeliveriesQuantity/DeliveriesQuantity.js';
import DeliveriesQuantity2 from '../layouts/DeliveriesQuantity2/DeliveriesQuantity2.js';
import CustomerHolidayList from '../layouts/CustomerHolidayList/CustomerHolidayList.js';
import ExtraReducedSelect from '../layouts/ExtraReducedSelect/ExtraReducedSelect.js';
// import DeliveriesDate from '../layouts/DeliveriesDate/DeliveriesDate.js';
// import DeliveriesDate2 from '../layouts/DeliveriesDate2/DeliveriesDate2.js';

import DeliveriesLine from '../layouts/DeliveriesLine/DeliveriesLine.js';
import DeliveriesProduct from '../layouts/DeliveriesProduct/DeliveriesProduct.js';
import NonDelivery from '../layouts/NonDelivery/NonDelivery.js';
import ResumeDelivery from '../layouts/ResumeDelivery/ResumeDelivery.js';
import ExtraDelivery from '../layouts/ExtraDelivery/ExtraDelivery.js';
import ReducedDelivery from'../layouts/ReducedDelivery/ReducedDelivery.js';
import ExtraReduced from '../layouts/ExtraReduced/ExtraReduced.js';
import ExtraReducedDetails from '../layouts/ExtraReducedDetails/ExtraReducedDetails.js';
import ViewCustomerBillUpd from '../layouts/ViewCustomerBillUpd/ViewCustomerBillUpd.js';
import ViewCustomerBillHistory from '../layouts/ViewCustomerBillHistory/ViewCustomerBillHistory.js';
import ViewCustomerBillDetails from '../layouts/ViewCustomerBillDetails/ViewCustomerBillDetails.js';


import ListOfTickets from '../layouts/ListOfTickets/ListOfTickets.js';
import ViewTicket from '../layouts/ViewTicket/ViewTicket.js';
import ViewTicketForm from '../layouts/ViewTicket/ViewTicketForm.js';
import Camera from '../layouts/Camera/Camera.js';
import CameraView from '../layouts/CameraView/CameraView.js';
import CameraGallery from '../layouts/CameraGallery/CameraGallery.js';

import Dashboard from '../layouts/Dashboard/Dashboard.js';
import MyProfile from '../layouts/MyProfile/MyProfile.js';
import EditMyProfile from '../layouts/EditMyProfile/EditMyProfile.js';
import ChangePassword from '../layouts/ChangePassword/ChangePassword.js';


import NotificationLayout from '../layouts/NotificationLayout/NotificationLayout.js';

export const AuthStack = StackNavigator({

   Dashboard:{
     screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
    ListOfTickets: {
    screen: ListOfTickets,
    navigationOptions: {
      header: null
    }
  },
  ViewTicket: {
    screen: ViewTicket,
    navigationOptions: {
      header: null
    }
  },
  ViewTicketForm:{
    screen:ViewTicketForm,
    navigationOptions:{
      header:null
    }
  },
  Camera:{
    screen:Camera,
    navigationOptions:{
      header:null
    }
  },
   CameraView:{
    screen:CameraView,
    navigationOptions:{
      header:null
    }
  },
     CameraGallery:{
    screen:CameraGallery,
    navigationOptions:{
      header:null
    }
  },

   NotificationLayout:{
     screen: NotificationLayout,
    navigationOptions: {
      header: null
    }
  },
  //  ServiceList: {
  //   screen: ServiceList,
  //   navigationOptions: {
  //     header: null
  //   }
  // },

  EditMyProfile:{
    screen:EditMyProfile,
    navigationOptions:{
      header:null
    }
  },
   MyProfile: {
    screen: MyProfile,
    navigationOptions:{
      header: null
    }
  },

  ChangePassword:{
    screen:ChangePassword,
    navigationOptions:{
      header:null
    }
  },
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      header: null
    }
  },
  EditProduct: {
    screen: EditProduct,
    navigationOptions: {
      header: null
    }
  },
   ExtraReducedSelect: {
    screen: ExtraReducedSelect,
    navigationOptions: {
      header: null
    }
  },
  EditCustomerMoreDetails:{
    screen: EditCustomerMoreDetails,
    navigationOptions:{
      header:null
    }
  },

  ViewCollection: {
    screen: ViewCollection,
    navigationOptions: {
      header: null
    }
  },
  ViewCustomerBillUpd: {
    screen: ViewCustomerBillUpd,
    navigationOptions: {
      header: null
    }
  },
    ViewCustomerBillDetails: {
    screen: ViewCustomerBillDetails,
    navigationOptions: {
      header: null
    }
  },
  DeliveriesQuantity: {
    screen: DeliveriesQuantity,
    navigationOptions: {
      header: null
    }
  },
  DeliveriesQuantity2: {
    screen: DeliveriesQuantity2,
    navigationOptions: {
      header: null
    }
  },
  // DeliveriesDate: {
  //   screen: DeliveriesDate,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  //  Deliveries2: {
  //   screen: Deliveries2,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  //  Deliveries3: {
  //   screen: Deliveries3,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  // DeliveriesDate2: {
  //   screen: DeliveriesDate2,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  ViewCustomerBillHistory: {
    screen: ViewCustomerBillHistory,
    navigationOptions: {
      header: null
    }
  },

  ViewBill: {
    screen: ViewBill,
    navigationOptions: {
      header: null
    }
  },

  ViewBillLine: {
    screen: ViewBillLine,
    navigationOptions: {
      header: null
    }
  },

  AddCustomer: {
    screen: AddCustomer,
    navigationOptions: {
      header: null
    }
  },
    ViewProduct: {
    screen: ViewProduct,
    navigationOptions: {
      header: null
    }
  },
  ExtraReducedDetails: {
    screen: ExtraReducedDetails,
    navigationOptions: {
      header: null
    }
  },

  CustomerHolidayList: {
    screen: CustomerHolidayList,
    navigationOptions: {
      header: null
    }
  },
  CustomerHoliday: {
    screen: CustomerHoliday,
    navigationOptions: {
      header: null
    }
  },
   ExtraReduced: {
    screen: ExtraReduced,
    navigationOptions: {
      header: null
    }
  },
   DeliveriesLine: {
    screen: DeliveriesLine,
    navigationOptions: {
      header: null
    }
  },
  DeliveriesProduct: {
    screen: DeliveriesProduct,
    navigationOptions: {
      header: null
    }
  },

  NonDelivery: {
    screen: NonDelivery,
    navigationOptions: {
      header: null
    }
  },
   ResumeDelivery: {
    screen: ResumeDelivery,
    navigationOptions: {
      header: null
    }
  },
   ExtraDelivery: {
      screen: ExtraDelivery,
      navigationOptions: {
        header: null
      }
    },

  ReducedDelivery:{
    screen:ReducedDelivery,
    navigationOptions:{
      header:null
    }
  },

  // Deliveries: {
  //   screen: Deliveries,
  //   navigationOptions: {
  //     header: null
  //   }
  // },

  ExtraReduced: {
    screen: ExtraReduced,
    navigationOptions: {
      header: null
    }
  },

  BillCollection: {
    screen: BillCollection,
    navigationOptions: {
      header: null
    }
  },

  EditCustomer: {
    screen: EditCustomer,
    navigationOptions: {
      header: null
    }
  },

  ViewCollectionLine: {
    screen: ViewCollectionLine,
    navigationOptions: {
      header: null
    }
  },

  AdditionalSetting: {
    screen: AdditionalSetting,
    navigationOptions: {
      header: null
    }
  },
  BusinessDetails: {
    screen: BusinessDetails,
    navigationOptions: {
      header: null
    }
  },
  //  LogIn: {
  //   screen: LogIn,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
});


export const HomeStack = StackNavigator({

  LogIn: {
    screen: LogIn,
    navigationOptions: {
      header: null
    }
  },
  SubmitOTP:{
    screen: SubmitOTP,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },

  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null
    }
  },
  ReceivedOTP: {
    screen: ReceivedOTP,
    navigationOptions: {
      header: null
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null
    }
  },
});
