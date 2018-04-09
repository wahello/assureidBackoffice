import React, { Component } from "react";
import Meteor,{ createContainer } from "react-native-meteor";

import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View, BackHandler, Image, Alert, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, Card, Button, Avatar, Icon, SearchBar, CheckBox } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { TextField } from 'react-native-material-textfield';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';


import PropTypes from "prop-types";
import RadioButton from "radio-button-react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import Modal from "react-native-modal";
import SideMenu from "react-native-side-menu";
import RNExitApp from "react-native-exit-app";


import styles from "./styles.js";
import Menu from "../../components/Menu/Menu.js";
import HeaderDy from "../../components/HeaderDy/HeaderDy.js";
import ViewCustomerTable from "../../components/tableComponent/ViewCustomerTable.js";
import ViewCustomerModal from "../../components/modalComponent/ViewCustomerModal.js";

class ViewTicketFormInfo extends React.Component {
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
      customerIdModal   : '',
      isModalVisible    : false,
      isModalVisibleOne : false,
      inputFocusColor   : '#54Aff3',
      Remark            : '',
      value             : 0,
      fontSize          : 14,
      userUpload        : {},
      
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

  handleOnPress(value) {
    this.setState({ value });
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

  submit(event) {
    event.preventDefault();
    var submitObj = this.state;
    // console.log('submitObj: ',submitObj);
    // Or, using array extras
    var valuesArray = Object.entries(this.state).forEach(([key, value]) => {
      console.log('key: ',key);
      console.log('value: ',value);
      if(key.split('-')[0] == 'text'){
          console.log('match: ',key);
          return key;
      }
      console.log('-------------------');
    });
    console.log('valuesArray: ',valuesArray);

  }

  render() {
    
    const { navigate, goBack, state } = this.props.navigation;

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

                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Checklist</Text>
                    </View>
                  </View>

                  
                  {this.props.checkObjs ?
                    this.props.checkObjs.map((checkListDefault,index)=>{
                      return(
                              <View style={styles.container} key={index}>
                                <CheckBox
                                  center
                                  containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                  checkedColor="green"
                                  checked={this.state.isChecked}
                                  onPress={this.handleOnChange}
                                  textStyle={{ color: "#aaa" }}
                                  title={checkListDefault}
                                />
                              </View>
                            );
                          })
                          :
                         ""
                  }

                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>User Upload</Text>
                    </View>
                  </View>


                <View style={{width:'100%',padding:10}}>
                {this.props.textObjs ?
                  this.props.textObjs.map((textListDefault,index)=>{
                    return(
                            <View style={styles.inputWrapper} key={index}>
                              <View style={styles.formInputView1}>
                                <TextField
                                  label                 = {textListDefault}
                                  lineWidth             = {0}
                                  tintColor             = {this.state.inputFocusColor}
                                  inputContainerPadding = {4}
                                  labelHeight           = {16}
                                  keyboardType          = 'default'
                                  inputContainerStyle   = {{height:60}}
                                  style                 = {styles.inputTextNew}
                                  labelTextStyle        = {styles.labelTextNew}
                                  activeLineWidth       = {0}
                                  fontSize              = {this.state.fontSize}
                                  labelFontSize         = {this.state.fontSize}
                                  // value                 = {this.state.userUpload}
                                  value                 = { this.state[index] }
                                  onChangeText          = {(value) => { 
                                                                        console.log('event.target.value: ',value);
                                                                        console.log('[index]: ',[index]);
                                                                        this.setState({ ['text-'+index] : value });
                                                                      }
                                                          }
                                  // onChangeText          = {this.testfunc.bind(this)}
                                />
                              </View>
                            </View>
                          );
                        })
                        :
                       ""
                }
                </View>

                  <View style = {styles.lineStyle} />
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Upload Photos</Text>
                    </View>
                  </View>
                  <View style = {styles.formInputView}> 
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>navigate('Camera')} >
                          <Icon name="camera-enhance" type="MaterialIcons" size={50} color="#aaa"   />
                        </TouchableOpacity>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15, }}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.lineStyle} />
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Upload Videos</Text>
                    </View>
                  </View>
                  <View style = {styles.formInputView}> 
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'row'}}>
                        <Icon name="videocam" type="MaterialIcons" size={50} color="#aaa"  />
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15,}}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                        <View style={{paddingHorizontal:10,paddingVertical:10}}>
                          <View style={styles.closeBtn}>
                            <Icon name="close" type="MaterialIcons" size={20} color="#aaa"  />
                          </View>
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 15, }}
                            resizeMode="stretch"
                            source={require("../../images/pdf-icon.png")}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.lineStyle} />
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Remark</Text>
                    </View>
                  </View>
                  <View style={styles.formInputViews}>
                    <TextField
                      label                 = ''
                      lineWidth             = {0}
                      tintColor             = {this.state.inputFocusColor}
                      inputContainerPadding = {4}
                      labelHeight           = {16}
                      keyboardType          = 'default'
                      inputContainerStyle   = {{height:200}}
                      style                 = {styles.inputText}
                      labelTextStyle        = {styles.labelText}
                      activeLineWidth       = {0}
                      fontSize              = {this.state.fontSize}
                      labelFontSize         = {this.state.fontSize}
                      multiline             = {true}
                      numberOfLines         = {4}
                    />
                  </View>
                </View>
              <View style={{ alignItems: "center"}}>
                <Button
                  buttonStyle={styles.buttonLarge}
                  title="SAVE"
                  onPress={this.submit.bind(this)}
                />
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}


ViewTicketForm = createContainer( (props) => {

    // console.log('ticket: ',props.navigation.state.params.ticket);
    const ticket       = props.navigation.state.params.ticket;
    const postHandle   = Meteor.subscribe('allTicketImages');
    const postHandle1  = Meteor.subscribe('allTicketVideo');
    const postHandle2  = Meteor.subscribe('checklistFieldExpert');
    const postHandle3  = Meteor.subscribe('singleTicket',ticket);

    const ticketImages = Meteor.collection("tempTicketImages").find({}) || []; 
    const ticketVideo  = Meteor.collection("tempTicketVideo").find({}) || [];  
    // console.log("ticketImages",ticketImages);    
    // console.log("ticketVideo",ticketVideo);
    const loading     = !postHandle.ready();
    const loading1    = !postHandle1.ready();
    const loading3    = !postHandle3.ready();
    var checkObjs     = [];
    var textObjs      = [];
    var checkListFrom = '';

    if (ticket) {
       var tickets =  Meteor.collection('ticketMaster').findOne({"_id" : ticket});
       
       if (tickets) {
          var verificationType = tickets.verificationType;
       // console.log("verificationType",verificationType);
         if (verificationType == "professionalEducation") {
               checkListFrom = "Academic Information";
         }else if (verificationType == "permanentAddress") {
               checkListFrom = "Address Information";
         }else if (verificationType == "currentAddress") {
               checkListFrom = "Address Information";
         }else if (verificationType == "employement") {
                checkListFrom = "Employment Information";
         }else if (verificationType == "education") {
                checkListFrom = "Academic Information";
         }else  if (verificationType == "certificates") {
                checkListFrom = "Skills And CertificationInformation";
         }
       }

       // console.log('checkListFrom: ',checkListFrom);
       var checkListObjs = Meteor.collection("checklistFieldExpert").find({"checkListFor" : checkListFrom});
        if (checkListObjs && checkListObjs.length > 0) {
           console.log('checkListObjs: ',checkListObjs);
           for (var i = 0; i < checkListObjs.length; i++) {
              if(checkListObjs[i].checkListFrom == 'Database'){
                  checkObjs.push(checkListObjs[i].task); 
              }else{
                  textObjs.push(checkListObjs[i].task); 
              }
           }
        }
        
    }
   
      // console.log("checkObjs",checkObjs);
      // console.log("textObjs",textObjs);

      var result =  {
          loading      : loading,
          loading1     : loading1,
          ticketImages : ticketImages,
          ticketVideo  : ticketVideo,
          ticket       : ticket,
          tickets      : tickets,
          checkObjs    : checkObjs,
          textObjs     : textObjs,
      };

      // console.log("result",result);
      return result;

}, ViewTicketFormInfo);
export default ViewTicketForm;