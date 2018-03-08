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

export default class ViewTicket extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;
    // let lineName ="";
    // if(this.props.navigation.state.params.lineName)
    //   lineName = this.props.navigation.state.params.lineName;
    // console.log("line constructor ", lineName);
    this.state = {
      name              : name,
      isOpen            : false,
      selectedItem      : "About",
      // lineName          : lineName,
      customerIdModal   : '',
      isModalVisible    : false,
      isModalVisibleOne : false,
      inputFocusColor   : '#f7ac57',
      Remark            : '',
      
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
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
  // handleEdit() {
  //   this._toggleModal();
  //   this.props.navigation.navigate("EditCustomer",{'customerId':this.state.customerIdModal});
  // }

  // _dyToggleModal = (_id) =>{
  //   console.log("id : ",_id);
  //   this.setState({ isModalVisible: !this.state.isModalVisible });
  //   this.setState({ customerIdModal: _id });
  // }
  // _toggleModal = () =>
  //   this.setState({ isModalVisible: !this.state.isModalVisible });

  // _editLineModal = () =>
  //   this.setState({ isModalVisibleOne: !this.state.isModalVisibleOne});

  // updateLine = () => {
  //   let index = this.props.navigation.state.params.index;
  //   // console.log("index : ", index);
  //   // let lineName = this.state.lineName;
  //   // console.log('lineName : ', lineName);
  //   Meteor.call('updateLine',index,lineName,(error,result) =>{
  //     if(error){
  //       Alert.alert(
  //         'Error',
  //       )
  //     }else{
  //       Alert.alert(
  //         '','Line has been edited Successfully!',
  //       );
  //     }
  //   });
  //   this._editLineModal();
  // }

  render() {
    const { navigate, goBack, state } = this.props.navigation;
    // const tableHead = [
    //   "Customer Name",
    //   "Subscription",
    //   "Building/House",
    //   "Notes"
    // ];
    // const modalTableHead = ["Type", "Language", "Name", "Quantity"];
    // const modalTableData = [
    //   ["Daily", "Marathi", "Sakal", "2"],
    //   ["Daily", "Marathi", "Sakal", "2"]
    // ];
    // const tableData = [
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"],
    //   ["Darshan Bakshi", "2", "John Deer", "some note"]
    // ];
    const menu = <Menu navigate={navigate} userName={this.props.userName} />;
    var navigationView = (
      <ScrollView
        style={{ backgroundColor: "#fbae16" }}
        createContainerstyle={{ flex: 1, backgroundColor: "#fbae16" }}
        keyboardShouldPersistTaps="always"
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
              <HeaderDy headerTitle="Ticket Tool" goBack={goBack} />
                 <View style={styles.formContainer}>
                  <View style={{flex:1,flexDirection:'row',paddingVertical:10}}>
                    <View style={{ flex:.5,marginLeft:15}}>
                      <Avatar
                        width={90}
                        height={90}
                        rounded
                        source={{
                          uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
                        }}
                      />
                    </View>
                    <View style= {{flex:.5,marginRight:15}}>
                      <View style= {{flex:1,flexDirection:'row'}}>
                        <Text style= {{}}>Garima kumari </Text>
                        <Text>Billore</Text>
                      </View>
                      <View style= {{flex:1,flexDirection:'row'}}>
                        <Text style= {{}}>F </Text>
                        <Text>21Years</Text>
                      </View>
                      <View style= {{flex:1,flexDirection:'row'}}>
                        <Text>Address Verification</Text>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.lineStyle} />
                  <View style = {styles.formInputView}>
                    <View style={{flex:.5,paddingVertical:15}}>
                      <Text style={{fontWeight: 'bold'}}>Permanent Address</Text>
                    </View>
                    <View style={{flex:.5,paddingVertical:15}}>
                      <Text style={{flexWrap:'wrap'}}>A-103 Adarsh Nagar,Khandwa Road, Khargone</Text>
                    </View>
                  </View>
                  <View style = {styles.lineStyle} />
                  <View style = {styles.formInputView}>
                    <View style={{flex:1}}>
                      <View style={{borderWidth:1, borderColor:'#aaa',height:150,flexDirection:'row'}}>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/sakal.jpg")}
                          />
                        </View>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/sakal.jpg")}
                          />
                        </View>
                        <View style={{paddingHorizontal:5,paddingVertical:10}}>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15, }}
                            resizeMode="stretch"
                            source={require("../../images/sakal.jpg")}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.lineStyle} />

                  <View style={{ flex: 1,flexDirection: "row"}}>
                    <View style={{flex:.46,paddingVertical:5,paddingHorizontal: 15}}>
                      <Text style={{ textAlign: "center" }}>
                        Priyanka Kajulkar
                      </Text>
                    </View>
                    <View style={{flex:.34,paddingVertical:5,paddingHorizontal: 15}}>
                      <Text style={{ textAlign: "center" }}>
                        15/03/2018
                      </Text>
                    </View>
                    <View style={{flex:.23,paddingVertical:5,paddingHorizontal: 15}}>
                      <Text style={{ textAlign: "center" }}>
                        4:20 AM
                      </Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Remark</Text>
                    </View>
                  </View>
                  
   
                  <View style = {styles.lineStyle} />

                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Upload Photos/Videos</Text>
                    </View>
                  </View>
                  <View style={styles.formInputView}>
                    <View style={{flex:1}}>
                       <View style={{borderWidth:1, borderColor:'#aaa',height:150}}></View>
                    </View>
                  </View>
                  <View style={styles.formInputViews}>
                    <View style={{flex:1,borderWidth:1,height:45,borderColor:'#aaa'}}>
                     <TextField
                        label                 = "Remark"
                        onChangeText          = {user => this.setState({ user })}
                        value                 = {this.state.user}
                        lineWidth             = {1}
                        tintColor             = "#00b8FF"
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = "default"
                        lineHeight            = {15}
                        multiline             = {true}
                        numberOfLines         = {4}
                      />
                    </View> 
                  </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 0, paddingVertical:20 }}>
                  <Button
                    buttonStyle={styles.buttonLarge}
                    title="SAVE"
                  />
                </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}
