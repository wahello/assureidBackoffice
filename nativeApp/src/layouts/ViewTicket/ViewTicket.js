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
  DrawerLayoutAndroid,
  Modal,
  TouchableHighlight,
  Dimensions
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
// import Modal from "react-native-modal";
import { TextField } from 'react-native-material-textfield';
import Pdf from 'react-native-pdf';

const window = Dimensions.get('window');
import styles from "./styles.js";
import Menu from "../../components/Menu/Menu.js";
import HeaderDy from "../../components/HeaderDy/HeaderDy.js";

import Loading from '../../components/Loading/Loading.js';

class ViewTicket extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;

    this.state = {
      name              : name,
      isOpen            : false,
      selectedItem      : "About",
      inputFocusColor   : '#f7ac57',
      Remark            : '',
      modalVisible      : false,
      
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
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
      isOpen: false,
      selectedItem: item
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  displayAttachments =()=>{
    var data = [];
    var verificationDocuments = this.props.verificationDocument;
    if(verificationDocuments){
       verificationDocuments.map((item,i)=>{

        var fileName = "https://s3.ap-south-1.amazonaws.com/assureidportal/ProofDocuments/"+item.proofOfDocument.split('original/')[1]+'.'+item.fileExt;
        data.push(
                  <View key={i} style={{paddingHorizontal:10,paddingVertical:10}}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    {item.fileExt == 'pdf' ? 
                      <Image
                        onPress={() => {this.setModalVisible(true);}}
                        style={{ width: 50, height: 50, borderRadius: 15}}
                        resizeMode="stretch"
                        source={require("../../images/pdf-icon.png")}
                      />
                    :
                      <Image
                        onPress={() => {this.setModalVisible(true);}}
                        style={{ width: 50, height: 50, borderRadius: 15}}
                        resizeMode="stretch"
                        source={require("../../images/imgIcon.png")}
                      />
                    }
                    </TouchableHighlight>
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                      }}>
                      <View>
                        <View>
                        <View style={{zIndex : 1, position : 'absolute',backgroundColor:'rgba(52, 52, 52, 0.6)'}}>
                          <TouchableOpacity>
                          <Button
                            large
                            title="Close"
                            onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}
                            buttonStyle={{ width : window.width, backgroundColor : 'transparent'}}
                            />  
                          </TouchableOpacity>  
                        </View>
                        {item.fileExt == 'pdf' ? 

                          <View style = {[styles.lineStyle,{height: window.height, width: window.width}]}>
                              <Pdf
                                  // source={source}
                                  source={{uri:fileName}}
                                  onLoadComplete={(numberOfPages,filePath)=>{
                                      console.log(`number of pages: ${numberOfPages}`);
                                  }}
                                  onPageChanged={(page,numberOfPages)=>{
                                      console.log(`current page: ${page}`);
                                  }}
                                  onError={(error)=>{
                                      console.log('error: ',error);
                                  }}
                                  style={styles.pdf}
                                  fitWidth={true}/>
                          </View>

                          :

                          <Image
                            onPress={() => {this.setModalVisible(true);}}
                            style={{ height: window.height, width: window.width}}
                            resizeMode="stretch"
                            source={{uri:fileName}}
                          />
                        }
                        </View>
                      </View>
                    </Modal>
                  </View>
                  )
        })       
    }

    return data;    
  }


  render() {

    var userData  = Meteor.user().profile;
    // console.log('view ticket:',userData);
    const { navigate, goBack, state } = this.props.navigation;
    if(this.props.viewTicketUserData){
      var userViewTicketData = this.props.viewTicketUserData;
      // console.log(this.props.viewTicketUserData,'this.props.viewTicketUserData');
    }

    var viewTicketData =this.props.viewTicketData;

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
                  <View style = {styles.formInputView}>
                    <View style= {{flex:1,flexDirection:'row',}}>
                      <View  style= {{flex:.5}}>
                        <Text style={{fontWeight: 'bold'}}>Assigned By</Text>
                      </View>
                      <View  style= {{flex:.5}}>
                        <Text style={{flexWrap:'wrap'}} >{this.props.assignedByName}</Text>
                      </View>
                    </View> 
                  </View>
                  <View style = {styles.lineStyle} />
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Profile</Text>
                    </View>
                  </View>
                  <View style={{flex:1,flexDirection:'row',paddingVertical:10}}>
                    <View style={{ flex:.5,marginLeft:15}}>
                     {this.props.viewTicketData &&  this.props.viewTicketData.userProfile
                      ?
                        <Avatar
                          width={80}
                          height={80}
                          rounded
                          source={{ uri : this.props.viewTicketData.userProfile }}
                          avatarStyle={{borderWidth:1,borderColor:'#000'}}
                          containerStyle={{marginBottom:5}}
                        />
                      :
                          <Avatar
                            width={90}
                            height={90}
                            rounded
                            source={require('../../images/userIcon.jpg')}
                            activeOpacity={0.7}
                          />  
                      }
                    </View>
                    {this.props.viewTicketData?
                      <View style= {{flex:.5,marginRight:15}}>
                        <View style= {{flex:1,flexDirection:'row'}}>
                          <Text style= {{}}>{viewTicketData.firstName} </Text>
                          <Text>{viewTicketData.lastName}</Text>
                        </View>
                        <View style= {{flex:1,flexDirection:'row'}}>
                          <Text style= {{flex:.4,flexDirection:'row'}}>{viewTicketData.gender}</Text>
                          {viewTicketData.age <= 0 ? <Text></Text> : <Text style= {{flex:.5,flexDirection:'row'}}>{viewTicketData.age} Years</Text>}
                        </View>
                        <View style= {{flex:1,flexDirection:'row'}}>
                          <Text>{viewTicketData.serviceName}</Text>
                        </View>
                      </View>
                    :<Loading />}
                  </View>
                  <View style = {styles.lineStyle} />

                  {this.props.viewTicketData?
                    <View style = {styles.formInputView}>
                      <View style={{flex:.5,paddingVertical:15}}>
                        <Text style={{fontWeight: 'bold'}}>Permanent Address</Text>
                      </View>
                      <View style={{flex:.5,paddingVertical:15}}>
                        <Text style={{flexWrap:'wrap'}}>{viewTicketData.verificationData.line1}{viewTicketData.verificationData.line2}, {viewTicketData.verificationData.line3}, {viewTicketData.verificationData.landmark}, {viewTicketData.verificationData.city}, {viewTicketData.verificationData.state}, {viewTicketData.verificationData.country}, {viewTicketData.verificationData.pincode} </Text>
                      </View>
                    </View>
                  :<Loading />}
                  <View style = {styles.lineStyle} />
                  <View style={styles.formInputView}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Attachments</Text>
                    </View>
                  </View>
                  <View style = {styles.formInputView}>
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'row'}}>
                        { this.displayAttachments()}
                      </View>
                    </View>
                  </View>
                <View style = {styles.lineStyle} />
              </View>
              <View style={{ alignItems: "center",paddingVertical:15}}>
                <Button
                  onPress={()=> this.props.navigation.navigate('ViewTicketForm',{'ticket': this.props.navigation.state.params.ticketid})}
                  buttonStyle={styles.buttonLarge}
                  title="START"
                />
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}

export default createContainer((props) => {

  var ticketId  = '';
  var assignedByName = '';
  var viewTicketUserData, handle1, loadingUser,verificationDocument = '';

  const { state } = props.navigation;
  // console.log("state = ",state);

  if(state.params.ticketid){
    ticketId = state.params.ticketid;
  }
  // console.log('ticketId: ',ticketId);

  const handle             = Meteor.subscribe('singleTicket',ticketId);
  const viewTicketData     = Meteor.collection('ticketMaster').findOne({'_id':ticketId});
  // console.log('viewTicketData', viewTicketData);

  if(viewTicketData){
    handle1              = Meteor.subscribe('userprofile',viewTicketData.userId);
    viewTicketUserData   = Meteor.collection('userProfile').findOne({'userId': viewTicketData.userId});
    loadingUser          = handle1.ready() ; 
    verificationDocument = viewTicketData.verificationDocument;
    // console.log('-------------------------------');
    // console.log('verificationDocument ',verificationDocument);
    // console.log('-------------------------------');
    // console.log('viewTicketUserData',viewTicketUserData);
  }

  if(viewTicketData && viewTicketUserData){
    viewTicketData.firstName   = viewTicketUserData.firstName;
    viewTicketData.lastName    = viewTicketUserData.lastName;
    viewTicketData.gender      = viewTicketUserData.gender;
    viewTicketData.dateOfBirth = viewTicketUserData.dateOfBirth;
    viewTicketData.userProfile = "https://s3.ap-south-1.amazonaws.com/assureidportal/UserImage/"+viewTicketUserData.userProfile.split('original/')[1]+'.'+viewTicketUserData.userFileExt;
    console.log('viewTicketData.userProfile: ',viewTicketData.userProfile);
    var ticketElements    = viewTicketData.ticketElement;
    var FEDetails         = ticketElements.find((obj)=> { return obj.roleStatus == 'FEAllocated' });
    var handle2           = Meteor.subscribe('userData',FEDetails.userId);
    var assignedBy        = Meteor.collection('users').findOne({'_id': FEDetails.userId});
    
    if(assignedBy){
      assignedByName = assignedBy.profile.firstname+' '+assignedBy.profile.lastname
    }
    // console.log('FEDetails: ',FEDetails);
    
    var today     = new Date();    
    var birthDate = new Date(viewTicketUserData.dateOfBirth);    
    var age       = today.getFullYear() - birthDate.getFullYear();    
    var m         = today.getMonth() - birthDate.getMonth();    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){age--;}    
    viewTicketData.age = age;
  } 
  // console.log('viewTicketData', viewTicketData);

  const loading = handle.ready() ;

  var result = {
    viewTicketData       : viewTicketData ,
    verificationDocument : verificationDocument,
    // viewTicketUserData:viewTicketUserData ,
    handle               : handle,
    handle1              : handle1,
    loading              : loading,
    loadingUser          : loadingUser,
    assignedByName       : assignedByName,
  };

  // console.log(JSON.stringify(result,null,4));
  return result;

}, ViewTicket);
