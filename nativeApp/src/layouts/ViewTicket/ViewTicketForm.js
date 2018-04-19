import React, { Component } from "react";
import Meteor,{ createContainer } from "react-native-meteor";

import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View, BackHandler, Image, Alert, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, Card, Button, Avatar, Icon, SearchBar, CheckBox } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { TextField } from 'react-native-material-textfield';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
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

  componentWillReceiveProps(nextProps) {

    // console.log('-------------%%%%0<---------------------');
    // console.log('nextProps: ',nextProps);
      this.setState({
          parkSpaceFor  : nextProps,
      });
    // console.log('----------------%%%%%0<------------------');
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

  getRole(role) {
      return role != "backofficestaff";
  }

  submit(event) {
    event.preventDefault();

    var checkLists = [];
    var images     = [];
    //Get values for all the check box
    for(var i=0; i<this.props.checkObjs.length;i++){
      var dataChk ={};

      if(this.state[this.props.checkObjs[i].id] === true){
          dataChk.statement = this.props.checkObjs[i].task;
          dataChk.status = true;
      }else{
          dataChk.statement = this.props.checkObjs[i].task;
          dataChk.status = false;
      }
      checkLists.push(dataChk);

    } // EOF i loop

    //Get Values for all the text field
    var textLists = [];
    for(var j=0; j<this.props.textObjs.length;j++){
      var dataChk    = {};
      dataChk.task   = this.props.textObjs[j].task;
      if(this.refs[this.props.textObjs[j].id].value()){
        dataChk.value  = this.refs[this.props.textObjs[j].id].value();
      }else{
        dataChk.value  = '';
      }
      textLists.push(dataChk);
    } // EOF j loop 

    var status      = this.state.status;
    var subStatus   = this.state.subStatus;
    for(var i=0; i<this.props.imgData.length;i++){
      images.push({
                    'userId'    : Meteor.userId(),
                    'imageLink' : this.props.imgData[i].imgs,
                    'createdAt' : new Date(),                  
                });
    }// EOF i loop

    var videos      = [
                        {
                          'userId'    : Meteor.userId(),
                          'videoLink' : 'https://s3.ap-south-1.amazonaws.com/harmonicgroup/ProductVideo/2XAwdwWSg2qfpgKFf.mp4',
                          'createdAt' : new Date(),
                        }
                      ];
    var roleStatus  = "ProofSubmit";
    var msg         = "Submitted Verification Information";
    var remark      = this.state.remark;

    var documents = {
        checkLists : checkLists,
        textLists  : textLists,
        status     : status,
        subStatus  : subStatus,
        images     : images,
        videos     : videos,
        remark     : remark,
    }
        
    // console.log('documents: ',documents);

    if (this.props.tickets) {
        if (this.props.tickets.ticketElement) {
            if (this.props.tickets.ticketElement.length > 0) {
                var ticketElements    = this.props.tickets.ticketElement;
                var teamMemberDetails = ticketElements.find((obj)=> { return obj.roleStatus == 'FEAllocated' });
                // console.log('teamMemberDetails ',teamMemberDetails);
            }
        }

        var role = this.props.userData.roles.find(this.getRole);
        if(role){

            var insertData = {
                "userId"              : Meteor.userId(),
                "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
                "allocatedToUserid"   : teamMemberDetails.userId,
                "allocatedToUserName" : teamMemberDetails.userName,
                "role"                : role,
                "roleStatus"          : roleStatus,
                "msg"                 : msg,
                "submitedDoc"         : documents,
                "createdAt"           : new Date(),
            }
            // console.log('insertData: ',insertData);    

              Meteor.call('genericUpdateTicketMasterElement', this.props.tickets._id, insertData, (error,result)=>{
                  if (error) {
                    console.log(error.reason);
                  }else{
                    console.log("Inserted Successfully!");
                    this.props.navigation.navigate('ViewSubmittedTicket', { ticket: this.props.tickets._id });
                  }
              });

        }

    }


  }


  browseFile(event){
    event.preventDefault();

    let self = this; 
    DocumentPicker.show({ filetype : [DocumentPickerUtil.images()]},(error,res) => {
                          // Android
                          // console.log("----------res-----------------");
                          // console.log("res: ",res);
   
                        });    
  }

  delImg(event, id){
    // console.log('click id: ' ,id);
  }
  render() {
    
    const { navigate, goBack, state } = this.props.navigation;
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
      value: 'Completed',
    }];
    let subStatus = [{
      value: '-- Select --',
    }, {
      value: 'Clear',
    }, {
      value: 'Minor Discrepancy',
    }, {
      value: 'Major Discrepancy',
    }, {
      value: 'Unable to Verify',
    }, {
      value: 'Cancelled',
    }, {
      value: 'Case Drop',
    }];

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
                                  checked={this.state[checkListDefault.id]}
                                  onPress={this.handleOnChange}
                                  textStyle={{ color: "#aaa" }}
                                  title={checkListDefault.task}
                                  value={checkListDefault.task}
                                  onPress={(value) => { 
                                                        if(this.state[checkListDefault.id]){
                                                          // console.log('data: ',this.state[checkListDefault.id]);
                                                          this.setState({ [checkListDefault.id] : !this.state[checkListDefault.id] });
                                                        }else{
                                                          // console.log('no data:',this.state[checkListDefault.id]);
                                                          this.setState({ [checkListDefault.id] : true });
                                                        } 
                                                      }
                                                }
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
                                  label                 = {textListDefault.task}
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
                                  ref                   = {textListDefault.id}
                                  onChangeText          = {(value) => { 
                                                                        this.setState({ [textListDefault.id] : value });
                                                                      }
                                                          }
                                />
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
                      <View style={{flexDirection:'row',flex:1}}>
                        <TouchableOpacity  onPress={()=>navigate('Camera',{ ticket : this.props.ticket })} >
                          <Icon name="camera-enhance" type="MaterialIcons" size={50} color="#aaa"   />
                        </TouchableOpacity>

                        { this.props.imgData.length > 0 ?

                         this.props.imgData.map((data,index)=>{
                            return (
                                    <View key={index} style={{paddingHorizontal:10,paddingVertical:10}}>
                                      <View style={styles.closeBtn}>
                                        <TouchableOpacity  onPress={(e) =>this.delImg(e, data._id)}><Icon name="close" type="MaterialIcons" size={23} color="#aaa"  /></TouchableOpacity>
                                      </View>
                                      <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                                      <Image  
                                      style={{ width:40, height:40, borderRadius:20 }}                    
                                      resizeMode="stretch"
                                      source={{uri: data.imgs}}
                                                     
                                      />
                                      </View>
                                    </View>
                                  );
                          }) 
                        
                        : <Text></Text>}

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
                  </View>

                  <View style = {styles.lineStyle} >
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
                        ref                   = 'remark'
                        value                 = {this.state.remark}
                        onChangeText          = {(value) => { 
                                                              this.setState({ 'remark' : value });
                                                            }
                                                }
                      />
                    </View>
                  </View>

                  <View style = {styles.lineStyle} >
                    <View style={styles.formInputViews}>
                      <Dropdown
                        label                 = 'Status'
                        data                  = {status}
                        inputContainerStyle   = {styles.dropdownStyle}
                        inputContainerPadding = {0}
                        labelHeight           = {16}
                        ref                   = 'status'
                        onChangeText          = {(status) => this.setState({status})}
                      /> 
                    </View>
                  </View>

                  <View style = {styles.lineStyle} >
                    <View style={styles.formInputViews}>
                      <Dropdown
                        label                 = 'Sub-status'
                        data                  = {subStatus}
                        inputContainerStyle   = {styles.dropdownStyle}
                        inputContainerPadding = {0}
                        labelHeight           = {16}
                        ref                   = 'subStatus'
                        onChangeText          = {(subStatus) => this.setState({subStatus})}
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

       // console.log('checkListFrom: ',checkListFrom);
       var checkListObjs = Meteor.collection("checklistFieldExpert").find({"checkListFor" : checkListFrom}) || [];
        if (checkListObjs && checkListObjs.length > 0) {
           // console.log('checkListObjs: ',checkListObjs);
           for (var i = 0; i < checkListObjs.length; i++) {
              if(checkListObjs[i].checkListFrom == 'Database'){
                  checkObjs.push({'id':checkListObjs[i]._id,'task':checkListObjs[i].task}); 
              }else{
                  textObjs.push({'id':checkListObjs[i]._id,'task':checkListObjs[i].task}); 
              }
           }
        }
        
    }
   
      // console.log("checkObjs",checkObjs);
      // console.log("textObjs",textObjs);

      const postHandle4     = Meteor.subscribe('projectSettingsPublish');
      const s3Data          = Meteor.collection('projectSettings').findOne({"_id":"1"}) || {};

      const postHandle5     = Meteor.subscribe('currentUserfunction');
      const userData        = Meteor.collection('users').findOne({"_id":Meteor.userId()}) || {};

      const postHandle6     = Meteor.subscribe('tempFEImgData' ,ticket, 'image');
      const loading6        = !postHandle6.ready();
      const imgData         = Meteor.collection('tempFEUploadData').find({ "ticketId"  : ticket, "type" : "image" }) || [];

      // console.log('imgData: ',imgData);
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
          imgData      : imgData,
          loading6     : loading6,
      };

      // console.log("result",result);
      // console.log("userData",userData);
      return result;

}, ViewTicketFormInfo);
export default ViewTicketForm;