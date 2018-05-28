import React, { Component } from "react";
import Meteor,{ createContainer } from "react-native-meteor";

import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View, BackHandler, Image, Alert, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, Card, Button, Avatar, Icon, SearchBar, CheckBox } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { TextField } from 'react-native-material-textfield';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
// import CheckBox from 'react-native-check-box';

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
import { Dropdown } from 'react-native-material-dropdown';
import RenderVideo from './RenderVideo.js';


class ViewSubmittedTicket extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;

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
      "fontSize"        : 14,
      "userUpload"      : {},
      "status"          : '',
      "subStatus"       : '',
      "remark"          : '',
      "images"          : [],
      "videos"          : [],
      
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
    // console.log(this.props.navigation.state.routeName);
    if (this.props.navigation.state.routeName != "ServiceList") {
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  toggle() {
    // console.log("is open " + this.state.isOpen);
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
      isOpen       : false,
      selectedItem : item
    });

  handleLogout() {
    // console.log("Logout function!");
    Meteor.logout();
  }
  openDrawer() {
    // console.log("opening drawer!");
    this.drawer.openDrawer();
  }
  closeDrawer() {
    // console.log("opening drawer!");
    this.drawer.closeDrawer();
  }

  handleOnPress(value) {
    this.setState({ value });
  }

  displayAttachments =()=>{
    var data = [];
    var verificationDocuments = this.props.selectFEData.documents.images;
    if(verificationDocuments){
       verificationDocuments.map((item, index)=>{
        var fileName = item.imageLink;
        // console.log('fileName:',fileName);
        data.push(
                  <View key={index} style={{ flex:0.3 }}>
                    <View style={{ flex:0.2, alignItems:'center', justifyContent:'center' }}>
                      <Image  
                      style      = {{ width:50, height:50}}                    
                      resizeMode = "stretch"             
                      // source     = {{ uri : item.imageLink }} 
                      source     = {require("../../images/pdf-icon.png")}             
                      />
                    </View>
                    
                  </View>
                  )
        })       
    }

    return data;    
  }

  render() {
    
    const { navigate, goBack, state } = this.props.navigation;
    
    // console.log('this.props.navigation: ',this.props.navigation);
    // console.log('goBack: ',goBack);
    // console.log('state: ',state);
    // console.log('navigate: ',navigate);

    let status = [{
      value: '-- Select --',
    }, {
      value: 'Initiated',
    }, {
      value: 'WIP',
    }, {
      value: 'Insufficiency',
    }, {
      value: 'Insufficiency Cleared',
    }, {
      value: 'Completed-Clear',
    },{
      value: 'Completed-Minor Discrepancy',
    },{
      value: 'Completed-Major Discrepancy',
    },{
      value: 'Completed-Inaccessible',
    },{
      value: 'Completed-Unable to Verify',
    },{
      value: 'Completed-Cancelled',
    },{
      value: 'Completed-Case Drop',
    }];
    // let subStatus = [{
    //   value: '-- Select --',
    // }, {
    //   value: 'Clear',
    // }, {
    //   value: 'Minor Discrepancy',
    // }, {
    //   value: 'Major Discrepancy',
    // }, {
    //   value: 'Unable to Verify',
    // }, {
    //   value: 'Cancelled',
    // }, {
    //   value: 'Case Drop',
    // }];
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
              textAlign  : "center",
              fontWeight : "bold",
              fontSize   : 20,
              paddingTop : 10
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

              <HeaderDy headerTitle="Verified Information" goBack={goBack} />
                <View style={styles.formContainer}>

                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Verified Information</Text>
                    </View>
                  </View>

                  
{/*                  {this.props.selectFEData ?
                    this.props.selectFEData.documents.checkLists.map((checkListDefault,index)=>{
                      return(
                              <View style={styles.container} key={index}>
                                <CheckBox
                                  center
                                  containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                  checkedColor="green"
                                  checked={checkListDefault.status}
                                  textStyle={{ color: "#aaa" }}
                                  title={checkListDefault.statement}
                                  value={checkListDefault.statement}
                                />     
                              </View>
                            );
                          })
                          :
                         ""
                  }*/}


                  <View style={{width:'100%',padding:10}}>
                  {this.props.checkObjs ?
                    this.props.checkObjs.map((checkListDefault,index)=>{
                      return(
                              <View key={index} style={{flex:1, flexDirection: 'row', borderBottomColor: '#ddd'}}>

                                <View style={{flex:1}}>
                                  <View style={{flex:1}}>
                                    <Text>{index+1}. {checkListDefault.titleVal}</Text>
                                  </View>

                                  { checkListDefault.textVal ? checkListDefault.textVal.map((data,ind)=>{
                                    return(
                                      <View style={{flex:1}} key={ind}>
                                        <Text>{data.value}</Text>
                                      </View>
                                    );
                                 })
                                  :
                                  <Text></Text>
                                }
                                </View>

                                <View style={{flex:1}}>
                                  <View style={{flex:1}}>
                                    <Text>Correct/Incorrect</Text>

                                    <ToggleSwitch
                                        isOn = {checkListDefault.correctVal == 'Correct' ? true : false}
                                        onColor='#33b5e5'
                                        offColor='#ddd'
                                        label=''
                                        labelStyle={{color: 'black', fontWeight: '900', flex:1}}
                                        size='small'
                                        onToggle={ (isOn) => {}}
                                    />


                                  </View>
                                <TextField
                                  label                 = {'Remark'}
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
                                  ref                   = {checkListDefault.id+'-Remark'}
                                  value                 = {checkListDefault.remarkVal}
                                />
                                </View>
                              </View>
                      );
                    })
                  :
                  null
                  }
                  </View>


                <View style={[styles.lineStyle, {width:'100%',padding:10}]}>
                {this.props.selectFEData ?
                  this.props.selectFEData.documents.textLists.map((textListDefault,index)=>{
                    return(
                            <View style={styles.lineStyle} key={index}>
                              <View style={styles.formInputView1}>
                                <View>
                                  <Text style={{fontWeight: 'bold'}}>{textListDefault.task}</Text>
                                </View>
                              </View>
                              <View style={styles.formInputView1}>
                                <Text>{textListDefault.value}</Text>
                              </View>
                            </View>
                          );
                        })
                        :
                       ""
                }
                </View>

                  <View style = {styles.lineStyle} >
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Upload Photos</Text>
                    </View>
                  </View>

                  <View style = {styles.formInputView}> 
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.2}}>
                          <TouchableOpacity >
                            <Icon name="camera-enhance" type="MaterialIcons" size={50} color="#aaa"   />
                          </TouchableOpacity>
                        </View>

                        {this.displayAttachments()}


                      </View>
                    </View>
                  </View>
                  </View>

                  <View style = {styles.lineStyle} >

                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Upload Videos</Text>
                    </View>
                  </View>


                  <View style = {styles.formInputView}> 
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'row'}}>
                        <Icon name="videocam" type="MaterialIcons" size={50} color="#aaa"/>

                        { this.props.selectFEData.documents.videos.length > 0 ?
                          this.props.selectFEData.documents.videos.map((videoData,index)=>{
                            return(<RenderVideo key={index} videoData={videoData}/>);
                          })
                          :
                          null
                        }
                      </View>
                    </View>
                  </View>
                  

                  </View>

                  <View style = {styles.lineStyle} >
                    <View style={styles.formInputView}>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Remark</Text>
                      </View>
                    </View>
                    <View style={styles.formInputViews}>
                      <Text>{this.props.selectFEData.documents.remark}</Text>

                    </View>
                  </View>

                  <View style = {styles.lineStyle} >
                    <View style={styles.formInputView}>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Status</Text>
                      </View>
                    </View>
                    <View style={styles.formInputViews}>
                    <Text>{this.props.selectFEData.documents.status}</Text>
 
                    </View>
                  </View>

{/*                  <View style = {styles.lineStyle} >
                    <View style={styles.formInputView}>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Sub-status</Text>
                      </View>
                    </View>
                    <View style={styles.formInputViews}>
                      <Text>{this.props.selectFEData.documents.subStatus}</Text>

                    </View>
                  </View>*/}

              </View>

            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}


ViewSubmittedTicketContainer = createContainer( (props) => {

    const ticket       = props.navigation.state.params.ticket;
    const postHandle   = Meteor.subscribe('allTicketImages');
    const postHandle1  = Meteor.subscribe('allTicketVideo');
    // const postHandle2  = Meteor.subscribe('checklistFieldExpert');
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
       var tickets =  Meteor.collection('ticketMaster').findOne({"_id" : ticket}) || {};
       
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

      // var selectFEData = tickets.ticketElement.find(( obj ) =>{
      //   if( (obj.role === 'field expert') && (obj.roleStatus == "ProofSubmit" || obj.roleStatus == "ProofResubmitted") ) return obj;
      // });

      var selectFEData = tickets.submitedDoc;

      // console.log('selectFEData: ',selectFEData);

      if(selectFEData && selectFEData.documents){
        checkObjs = selectFEData.documents.checkLists;
        if (checkObjs) {
            for (var i = 0; i < checkObjs.length; i++) {
                checkObjs[i].id = i;
                checkObjs[i].task = checkObjs[i].titleVal;
                checkObjs[i].relatedFields = checkObjs[i].textVal;
            }
        }
      }

       // console.log('checkListFrom: ',checkListFrom);
/*       var checkListObjs = Meteor.collection("checklistFieldExpert").find({"checkListFor" : checkListFrom}) || [];
        if (checkListObjs && checkListObjs.length > 0) {
           // console.log('checkListObjs: ',checkListObjs);
           for (var i = 0; i < checkListObjs.length; i++) {
              if(checkListObjs[i].checkListFrom == 'Database'){
                  checkObjs.push({'id':checkListObjs[i]._id,'task':checkListObjs[i].task, "relatedFields":checkListObjs[i].relatedFields}); 
              }else{
                  textObjs.push({'id':checkListObjs[i]._id,'task':checkListObjs[i].task, "relatedFields":checkListObjs[i].relatedFields}); 
              }
           }
        } */
        
    }// if ticket id
   
      console.log("checkObjs",checkObjs);
      // console.log("textObjs",textObjs);

      const postHandle4     = Meteor.subscribe('projectSettingsPublish');
      const s3Data          = Meteor.collection('projectSettings').findOne({"_id":"1"}) || {};

      const postHandle5     = Meteor.subscribe('currentUserfunction');
      const userData        = Meteor.collection('users').findOne({"_id":Meteor.userId()}) || {};

      var result =  {
          loading      : loading,
          loading1     : loading1,
          ticketImages : ticketImages,
          ticketVideo  : ticketVideo,
          ticket       : ticket,
          tickets      : tickets,
          checkObjs    : checkObjs,
          textObjs     : textObjs,
          s3Data       : s3Data,
          userData     : userData,
          selectFEData : selectFEData,
      };

      // console.log("result",result);
      // console.log("userData",userData);
      return result;

}, ViewSubmittedTicket);
export default ViewSubmittedTicketContainer;