import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  BackHandler,
  Image,
  BackAndroid,
  findNodeHandle,
  DrawerLayoutAndroid
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Header,
  Card,
  Button,
  Avatar,
  Icon,
  SearchBar
} from "react-native-elements";
import Meteor, { createContainer } from "react-native-meteor";
import SideMenu from "react-native-side-menu";
import RNExitApp from "react-native-exit-app";
import { TextField } from "react-native-material-textfield";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import Modal from "react-native-modal";

import styles from "./styles.js";
import Menu from "../../components/Menu/Menu.js";
import HeaderDy from "../../components/HeaderDy/HeaderDy.js";
import ViewCustomerTable from "../../components/tableComponent/ViewCustomerTable.js";
import AddSubscriptionModal from '../../components/modalComponent/AddSubscriptionModal.js';
import EditSubscriptionModal from '../../components/modalComponent/EditSubscriptionModal.js';
import AddSubscriptionTable from '../../components/tableComponent/AddSubscriptionTable.js';


 class ViewCustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;
    let lineName ="";

    this.state = {
      name: name,
      isOpen: false,
      selectedItem: "About",
      lineName: lineName,
      nickName: "",
      lineName: "",
      mobileNum: "",
      firstName: "",
      lastName: "",
      deposit: "",
      previousDue: "",
      previousAdv: "",
      deliveryCharges: "",
      extraInfo: "",
      sunday: true ,
      monday:true,
      tuesday:true,
      wednesday:true,
      thursday:true,
      friday:true,
      saturday:true,
      cashCustomer: false,
      isModalVisible: false,
      subscriptionModalId:"",
      isEditModalVisible: false,
      dateFrom: "01/10/2018",
      dateTo: "11/10/2018",
      error: null,
      sucscriptions: [],
      customerIdModal:'',
      isModalVisible: false,

    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.androidBackHandler.bind(this)
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.androidBackHandler.bind(this)
    );
  }
  androidBackHandler() {
    console.log(this.props.navigation.state.routeName);
    if (this.props.navigation.state.routeName != "ServiceList") {
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  _closeModal = () =>
    this.setState({ isEditModalVisible: false });
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  _editModal = (subscriptionModalId) => {
    this.setState({subscriptionModalId});
    this.setState({ isEditModalVisible: true });

  }
  toggle() {
    console.log("is open " + this.state.isOpen);
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item
    });

  handleLogout() {
    console.log("Logout function!");
    Meteor.logout();
  }
  openDrawer() {
    console.log("opening drawer!");
    this.drawer.openDrawer();
  }
  closeDrawer() {
    console.log("opening drawer!");
    this.drawer.closeDrawer();
  }
  handleEdit() {
    this._toggleModal();
    this.props.navigation.navigate("EditCustomer",{'customerId':this.state.customerIdModal});
  }
  _dyToggleModal = (_id) =>{
    console.log("id : ",_id);
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.setState({ customerIdModal: _id });
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  render() {
    const { customerData } = this.props;
    const { navigate, goBack, state } = this.props.navigation;
    const tableHead = [
      "Customer Name",
      "Subscription",
      "Building/House",
      "Notes"
    ];
    const modalTableHead = ["Type", "Language", "Name", "Quantity"];

    const menu = <Menu navigate={navigate} userName={this.props.userName} />;
    var navigationView = (
      <ScrollView
        style={{ backgroundColor: "#fbae16" }}
        createContainerstyle={{ flex: 1, backgroundColor: "#fbae16" }}
      >
        <View
          style={{ borderBottomWidth: 1, padding: 10, borderColor: "#fff" }}
        >
          <View
            style={{
              maxHeight: 30,
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <TouchableOpacity onPress={this.closeDrawer}>
              <View>
                <Icon size={25} name="close" type="evilicon" color="#000" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                lineHeight: 30,
                fontSize: 30,
                color: "#fff"
              }}
            >
              NOTIFICATION
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 10
            }}
          >
            Newly Added
          </Text>
        </View>
      </ScrollView>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={_drawer => (this.drawer = _drawer)}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => navigationView}
      >
        <SideMenu
          disableGestures={true}
          openMenuOffset={300}
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              borderWidth: 0,
              padding: 0
            }}
          >
            <ScrollView
              createContainerStyle={{
                marginBottom: 25,
                borderWidth: 0,
                margin: 0
              }}
            >
              <Header
                centerComponent={{ text: "Pamtap", style: { color: "#fff" } }}
                leftComponent={
                  <TouchableOpacity onPress={this.toggle}>
                    <Icon
                      size={25}
                      name="bars"
                      type="font-awesome"
                      color="#fff"
                    />
                  </TouchableOpacity>
                }
                outerContainerStyles={{
                  borderBottomWidth: 0,
                  backgroundColor: "#f7ac57",
                  height: 60,
                  paddingTop: 0,
                  margin: 0
                }}
                innerContainerStyles={{ marginTop: 0, paddingTop: 0 }}
                rightComponent={
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      minHeight: 20,
                      minWidth: 20
                    }}
                  >
                    <TouchableOpacity onPress={this.openDrawer}>
                      <Icon
                        name="bell-outline"
                        type="material-community"
                        size={30}
                        color="#fff"
                        style={styles.bellIcon}
                      />
                      <Text style={styles.notificationText}>9</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
              <HeaderDy headerTitle="View Customer" goBack={goBack} />
              <View>
                <View style={{ padding: 10, justifyContent: "center" }}>
                  <View
                    style={{
                      alignSelf: "flex-end"
                    }}
                  >
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("EditCustomer",{'customerId':this.props.navigation.state.params.customerId})}>
                      <Icon
                        name="edit"
                        type="font-awesome"
                        color="#6d6e70"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingHorizontal: 20
                    }}
                  >
                    <View style={{flex:1,paddingRight:10}}>
                      <TextField
                        label="Nickname"
                        editable={false}
                        maxLength={20}
                        value={customerData.nickName|| "Not Available"}
                        onChangeText={nickName => this.setState({ nickName })}
                        lineWidth={1}
                        tintColor="#f7ac57"
                        labelHeight={12}
                        inputContainerStyle={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#aaa"
                        }}
                        labelTextStyle={{ textAlign: "center"}}
                        keyboardType="default"
                      />
                      <TextField
                        label="Mobile Number"
                        maxLength={13}
                        editable={false}
                        value={customerData.mobileNum || "Not Available"}
                        onChangeText={mobileNum => this.setState({ mobileNum })}
                        lineWidth={1}
                        tintColor="#f7ac57"
                        labelHeight={12}
                        inputContainerStyle={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#aaa"
                        }}
                        labelTextStyle={{ textAlign: "center"}}
                        keyboardType="default"
                      />

                    </View>
                    <Avatar
                      overlayContainerStyle={{ flex: 1 }}
                      width={100}
                      height={100}
                      rounded
                      source={{
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
                      }}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                  </View>
                  <View style={{flex:1, paddingHorizontal: 20}}>
                    <TextField
                      label="Address Line One"
                      editable={false}
                      maxLength={20}
                      value={customerData.addressLineOne || "Not Available"}
                      onChangeText={addressLineOne => this.setState({ addressLineOne })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa"
                      }}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                    <TextField
                      label="Customer Name"
                      maxLength={30}
                      editable={false}
                      value={(customerData.firstName || "Not" )+ ' ' + (customerData.lastName || "Available") }
                      onChangeText={fullName => this.setState({ fullName })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa"
                      }}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                    <TextField
                      label="Address Line Two"
                      maxLength={30}
                      editable={false}
                      value={customerData.addressLineTwo || "Not Available"}
                      onChangeText={addressLineTwo => this.setState({ addressLineTwo })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa"
                      }}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                  </View>
                  <View style={{paddingHorizontal:10,flexDirection:'row',flexWrap:'wrap'}}>
                    <TextField
                      label="Area"
                      maxLength={12}
                      editable={false}
                      value={customerData.area || " ---- "}
                      onChangeText={area => this.setState({ area })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
                      }}
                      containerStyle={{flex:1,paddingHorizontal:5}}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                    <TextField
                      label="City"
                      maxLength={12}
                      editable={false}
                      value={customerData.city || " ---- "}
                      onChangeText={city => this.setState({ city })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
                      }}
                      containerStyle={{flex:1,paddingHorizontal:5}}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                    <TextField
                      label="State"
                      maxLength={12}
                      editable={false}
                      value={customerData.state || " ---- "}
                      onChangeText={state => this.setState({ state })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
                      }}
                      containerStyle={{flex:1,paddingHorizontal:5}}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />

                  </View>
                  <View style={{paddingHorizontal:10,flexDirection:'row',flexWrap:'wrap'}}>
                    <TextField
                      label="Country"
                      maxLength={12}
                      editable={false}
                      value={customerData.country || " ---- "}
                      onChangeText={addressLineOne => this.setState({ addressLineOne })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
                      }}
                      containerStyle={{flex:1,paddingHorizontal:5}}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                    <TextField
                      label="Pincode"
                      maxLength={12}
                      editable={false}
                      value={customerData.pincode || " ---- "}
                      onChangeText={addressLineOne => this.setState({ addressLineOne })}
                      lineWidth={1}
                      tintColor="#f7ac57"
                      labelHeight={12}
                      inputContainerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
                      }}
                      containerStyle={{flex:1,paddingHorizontal:5}}
                      labelTextStyle={{ textAlign: "center"}}
                      keyboardType="default"
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <Text style={{ lineHeight: 28, flex: 1 }}>Subscription</Text>
                    <TouchableOpacity onPress={this._toggleModal}>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          marginLeft: 10,
                          backgroundColor: "#fbae16",
                          width: 28,
                          height: 28,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6
                        }}
                      >
                        <Icon name="plus" type="font-awesome" size={14} />
                      </View>
                      <AddSubscriptionModal _toggleModal={this._toggleModal.bind(this)} mobileNumber={customerData.mobileNum} lineName={this.state.lineName} isModalVisible={this.state.isModalVisible} navigate={this.props.navigate} goBack={this.props.goBack} />
                    </TouchableOpacity>
                  </View>
                    { customerData.mobileNum ?
                      <AddSubscriptionTable _closeModal={this._closeModal.bind(this)} _editModal={this._editModal.bind(this)} isModalVisible={this.state.isEditModalVisible} tableHead={modalTableHead} customerNumber={customerData.mobileNum} navigate={this.props.navigate} goBack={this.props.goBack}/>
                      : null
                    }
                    <EditSubscriptionModal _closeModal={this._closeModal.bind(this)} _editModal={this._editModal.bind(this)} mobileNumber={customerData.mobileNum} lineName={this.state.lineName} isModalVisible={this.state.isEditModalVisible} navigate={this.props.navigate} goBack={this.props.goBack} subscriptionId={this.state.subscriptionModalId} />
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingHorizontal: 10,
                      paddingBottom: 10
                    }}
                  >
                    <Text style={{ width: "50%", paddingBottom: 5 }}>
                      Deposit: $ 200
                    </Text>
                    <Text style={{ width: "50%", paddingBottom: 5 }}>
                      Previous Due: $ 200
                    </Text>
                    <Text style={{ width: "50%", paddingBottom: 5 }}>
                      Previous Advance: $ 200
                    </Text>
                    <Text style={{ width: "50%", paddingBottom: 5 }}>
                      Delivery Charges: $ 200
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <Button
                      onPress={this.confirmDeleteCustomer}
                      textStyle={{ textAlign: "center" }}
                      title="DELETE CUSTOMER"
                      buttonStyle={styles.buttonDelete}
                    />
                    <Button
                      onPress={() =>
                        this.props._toggleModal()
                      }
                      textStyle={{ textAlign: "center" }}
                      title="CANCEL"
                      buttonStyle={styles.buttonClose}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}
export default createContainer(props => {
 const {customerId} = props.navigation.state.params||{};
 console.log(customerId);
 console.log(props.navigation);
 const customerHandle = Meteor.subscribe('customer');
 const customerData = Meteor.collection("customer").findOne({'_id':customerId})||[];
 const loading     = !customerHandle.ready();

 console.log('customerData : ', customerData);
  return{
    loading,
    customerData
  }
},ViewCustomerDetails);
