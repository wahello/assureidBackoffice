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
  Alert,
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
import { TextField } from 'react-native-material-textfield';


import styles from "./styles.js";
import Menu from "../../components/Menu/Menu.js";
import HeaderDy from "../../components/HeaderDy/HeaderDy.js";
import ViewCustomerTable from "../../components/tableComponent/ViewCustomerTable.js";
import ViewCustomerModal from "../../components/modalComponent/ViewCustomerModal.js";

export default class ViewCustomer extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;
    let lineName ="";
    if(this.props.navigation.state.params.lineName)
      lineName = this.props.navigation.state.params.lineName;
    console.log("line constructor ", lineName);
    this.state = {
      name              : name,
      isOpen            : false,
      selectedItem      : "About",
      lineName          : lineName,
      customerIdModal   : '',
      isModalVisible    : false,
      isModalVisibleOne : false,
      inputFocusColor   : '#f7ac57',
      
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

  _editLineModal = () =>
    this.setState({ isModalVisibleOne: !this.state.isModalVisibleOne});

  updateLine = () => {
    let index = this.props.navigation.state.params.index;
    // console.log("index : ", index);
    let lineName = this.state.lineName;
    console.log('lineName : ', lineName);
    Meteor.call('updateLine',index,lineName,(error,result) =>{
      if(error){
        Alert.alert(
          'Error',
        )
      }else{
        Alert.alert(
          '','Line has been edited Successfully!',
        );
      }
    });
    this._editLineModal();
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation;
    const tableHead = [
      "Customer Name",
      "Subscription",
      "Building/House",
      "Notes"
    ];
    const modalTableHead = ["Type", "Language", "Name", "Quantity"];
    const modalTableData = [
      ["Daily", "Marathi", "Sakal", "2"],
      ["Daily", "Marathi", "Sakal", "2"]
    ];
    const tableData = [
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"],
      ["Darshan Bakshi", "2", "John Deer", "some note"]
    ];
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
                centerComponent={{ text: "AssureID", style: { color: "#fff" } }}
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
                  backgroundColor: "#367fa9",
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
                 <View style={styles.formContainer}>
                  <View style={{ flex: 3}}>
                    <Avatar
                      width={90}
                      height={90}
                      rounded
                      source={{
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
                      }}
                      activeOpacity={0.7}
                    />
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:60}}>First Name</Text>
                    </View>
                    <View>
                      <Text>Garima</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:60}}>Last Name</Text>
                    </View>
                    <View>
                      <Text>Billore</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:77}}>Ticket#</Text>
                    </View>
                    <View>
                      <Text>AA000001</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:77}}>Service Name</Text>
                    </View>
                    <View>
                      <Text>Employment Name</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:20}}>TAT(Date)</Text>
                    </View>
                    <View>
                      <Text>15/03/2018</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold',paddingRight:20}}>Permanent Address</Text>
                    </View>
                    <View>
                      <Text>A-103 Adarsh Nagar,Khandwa Road, Khargone</Text>
                    </View>
                  </View>
                </View>

             {/* <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Text
                    style={{
                      flex: 1,
                      paddingHorizontal: 15,
                      alignItems: "center",
                      paddingTop: 15
                    }}
                  >
                    {this.state.lineName}
                  </Text>
                  <TouchableOpacity onPress={this._editLineModal}>
                    <View style={{alignSelf:'flex-end',paddingTop:15,marginRight:15}}>
                      <Icon size={20} name="edit" type="font-awesome" color="#6d6e70" />
                    </View>
                  </TouchableOpacity>      
                  <Modal isVisible={this.state.isModalVisibleOne} backdropColor={"black"} backdropOpacity={0.9} >
                   <View style={styles.modalContent}>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }} >
                      <Text style={{fontSize: 15 }}>
                        Edit Line
                      </Text>
                    </View>
                    <View style={styles.formContainer}>
                      <View style={styles.formInputView}>
                        <TextField
                          onChangeText={UpdatelineName => this.setState({ lineName:UpdatelineName })}
                          label="Line Number / Name *"
                          value={this.state.lineName}
                          lineWidth={1}
                          tintColor={this.state.inputFocusColor}
                          inputContainerPadding={4}
                          labelHeight={16}
                          keyboardType="default"
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around",paddingBottom:15 }} >
                      <Button
                        onPress={this._editLineModal}
                        textStyle={{ textAlign: "center" }}
                        title="CANCEL"
                        buttonStyle={styles.buttonDelete}
                      />
                      <Button
                        textStyle={{ textAlign: "center" }}
                        title="SUBMIT"
                        buttonStyle={styles.buttonClose}
                        onPress={this.updateLine}
                      />
                    </View>
                  </View>
                </Modal>
                <Button
                  onPress={() => navigate("AddCustomer")}
                  textStyle={{ textAlign: "center" }}
                  buttonStyle={styles.button}
                  title="ADD CUSTOMER"
                />
                </View>
                <View
                  style={{
                    flex: 1,
                    margin: 10,
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#6d6e70"
                  }}
                >
                  <SearchBar
                    containerStyle={{
                      flex: 9,
                      borderWidth: 0,
                      borderTopWidth: 0,
                      borderBottomWidth: 0
                    }}
                    inputStyle={{
                      margin: 0,
                      backgroundColor: "#fff",
                      borderRadius: 0
                    }}
                    noIcon
                    lightTheme
                    placeholder="Type Here..."
                  />
                <Icon
                    containerStyle={{ flex: 1 }}
                    name="search"
                    type="font-awesome"
                    size={16}
                    color="#6d6e70"
                  />
                </View>
                <View style={{ padding: 10, justifyContent: "center" }}>
                  <ViewCustomerTable _toggleModal={this._dyToggleModal.bind(this)} lineName={this.state.lineName} navigate={navigate} goBack={goBack} state={state}/>
                  <ViewCustomerModal isModalVisible={this.state.isModalVisible} _toggleModal={this._toggleModal.bind(this)} handleEdit={this.handleEdit.bind(this)} customerId={this.state.customerIdModal} />
                </View>
              </View>*/}
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}
