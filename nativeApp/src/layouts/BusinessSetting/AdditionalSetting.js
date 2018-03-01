import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text,
TouchableOpacity, TextInput, View,  BackHandler, Picker,Alert,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';


class AdditionalSetting extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name                  :name,
      isOpen                : false,
      selectedItem          : 'About',
      businessType          : '',
      businessName          : '',
      businessAddress       : '',
      businessCountry       : 'India',
      businessState         : '',
      businessCity          : '',
      businessArea          : '',
      businessPincode       : '',
      alternateMobileNumber : '',
      inputFocusColor       : '#f7ac57',
    };
    this.openDrawer     = this.openDrawer.bind(this);
    this.closeDrawer    = this.closeDrawer.bind(this);
    this.toggle         = this.toggle.bind(this);
    this.handleView     = this.handleView.bind(this);
    this.handleProceed  = this.handleProceed.bind(this);
  }
  componentWillReceiveProps(nextProps){
    // console.log("In componentWillReceiveProps..");
    // console.log("businessData => ",nextProps.businessData);
    // console.log("loading => ",nextProps.loading);
    if(nextProps.loading){
      if(nextProps.businessData){
        this.setState({
          businessType          : nextProps.businessData.businessType,
          businessName          : nextProps.businessData.businessName,
          businessAddress       : nextProps.businessData.businessAddress,
          businessCountry       : nextProps.businessData.businessCountry,
          businessState         : nextProps.businessData.businessState,
          businessCity          : nextProps.businessData.businessCity,
          businessArea          : nextProps.businessData.businessArea,
          businessPincode       : nextProps.businessData.businessPincode,
          alternateMobileNumber : nextProps.businessData.alternateMobileNumber,
        });
      }
    }
  }
  handleView(){
    Actions.ViewCustomer();
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  androidBackHandler(){
    console.log(this.props.navigation.state.routeName );
    if(this.props.navigation.state.routeName != 'ServiceList'){
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  toggle() {
    console.log('is open ' + this.state.isOpen);
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
      selectedItem: item,
  });

  handleLogout(){
    console.log('Logout function!');
    Meteor.logout();
    Actions.LogIn();
  }
  openDrawer(){
    console.log('opening drawer!');
          this.drawer.openDrawer();
  }
  closeDrawer(){
    console.log('opening drawer!');
          this.drawer.closeDrawer();
  }

  handleProceed = () => {

    // var businessId = (this.props.isEdit) ? Meteor.user().profile.activeServiceId : '';
    // if(this.props.isEdit){
    //   var businessId  = Meteor.user().profile.activeServiceId;
    //   var isEdit      = true;
    // }else{
    //   var businessId  = '';
    //   var isEdit      = false;
    // }

    console.log("handleProceed => ",this.props.businessId);

    var formValues = {
      'businessType'          : this.state.businessType,
      'businessName'          : this.state.businessName,
      'businessAddress'       : this.state.businessAddress,
      'businessCountry'       : this.state.businessCountry,
      'businessState'         : this.state.businessState,
      'businessCity'          : this.state.businessCity,
      'businessArea'          : this.state.businessArea,
      'businessPincode'       : this.state.businessPincode,
      'alternateMobileNumber' : this.state.alternateMobileNumber,
      'businessId'            : this.props.businessId,
    }

    Meteor.call('insertAdditionalDetails',formValues,(error,result) =>{
      if(error){
        Alert.alert(
          'Error',
        )
        // swal(error.reason);
      }else{
        console.log("business id = ",result);
        // Alert.alert(
        //   'Success',
        // )
        // Actions.BusinessDetails({businessId: result});
        this.props.navigation.navigate('BusinessDetails',{businessId:result});
        // swal(message);
      }
    });
    console.log("formValues = ",formValues);
  }


  render(){
      const { serviceData } = this.props;
      let BusinessData =[];
      // console.log("serviceData = ",serviceData.map((data)=>data.serviceName));

      for(i=0;i<serviceData.length;i++){
        BusinessData.push({
          'value':  serviceData[i].serviceName
        });
      }

    const {navigate} = this.props.navigation;
    const menu = <Menu navigate={navigate} userName={this.props.userName}/>;
    var navigationView = (
      <ScrollView
        style={{backgroundColor: '#fbae16'}}
        createContainerstyle={{flex: 1,backgroundColor: '#fbae16'}}
        keyboardShouldPersistTaps="always"
      >
        <View style={{borderBottomWidth: 1, padding:10, borderColor: '#fff'}}>
          <View style={{maxHeight: 30, flexDirection:'row', justifyContent: 'flex-start'}} >
            <TouchableOpacity onPress={this.closeDrawer} >
              <View>
                <Icon size={25} name='close' type='evilicon' color='#000' />
              </View>
            </TouchableOpacity>
            <Text style={{textAlign:'center',flex: 1, lineHeight: 30, fontSize: 30, color: '#fff'}}>
              NOTIFICATION
            </Text>
          </View>
        </View>
        <View>
          <Text style={{textAlign:'center',fontWeight:'bold', fontSize: 20,paddingTop: 10}}>Newly Added</Text>
        </View>
      </ScrollView>
    );
    return(
      <DrawerLayoutAndroid
       drawerWidth={300}
        ref={(_drawer) => this.drawer = _drawer}
       drawerPosition={DrawerLayoutAndroid.positions.Right}
       renderNavigationView={() => navigationView}>
        <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
         <View style={{ flex: 1, backgroundColor: '#FFF',borderWidth:0,padding:0}}>
            <ScrollView
              createContainerStyle={{marginBottom: 25,borderWidth:0,margin:0}}
              keyboardShouldPersistTaps="always"
            >
            
              <Header
                centerComponent={{ text: "Pamtap", style: { color: '#fff' } }}
                leftComponent={
                  <TouchableOpacity  onPress={this.toggle} >
                    <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{borderBottomWidth:0, backgroundColor: '#f7ac57',height:60,paddingTop:0,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                rightComponent={<View style={{flex:1, flexDirection:'row',alignItems:'flex-end', minHeight:20, minWidth:20}}>
                        <TouchableOpacity onPress={this.openDrawer}>
                            <Icon name="bell-outline" type="material-community" size={30}  color="#fff" style={styles.bellIcon}/>
                            <Text style={styles.notificationText}>9</Text>
                      </TouchableOpacity>
                    </View>
                    }
                />

                <Header
                  centerComponent={{ text: "Additional Settings", style:{ color: '#fff',alignSelf:'center'} }}
                  leftComponent={
                    <TouchableOpacity  onPress={()=>navigate('ServiceList')} >
                      <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                    </TouchableOpacity>
                  }
                  outerContainerStyles={{borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                  innerContainerStyles={{marginTop:0,paddingTop:0}}
                />

              <View style={styles.formContainer}>

                <View style={styles.formInputView}>
                  <Dropdown
                    label                 = 'Select Your Business'
                    data                  = {BusinessData}
                    onChangeText          = {(businessType) => this.setState({businessType})}
                    value                 = {this.state.businessType}
                    inputContainerStyle   = {{ borderBottomWidth: 1}}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Business Name *'
                    onChangeText          = {(businessName) => this.setState({businessName})}
                    value                 = {this.state.businessName}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Business Address *'
                    onChangeText          = {(businessAddress) => this.setState({businessAddress})}
                    value                 = {this.state.businessAddress}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Country *'
                    onChangeText          = {(businessCountry) => this.setState({businessCountry})}
                    value                 = {this.state.businessCountry}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'State *'
                    onChangeText          = {(businessState) => this.setState({businessState})}
                    value                 = {this.state.businessState}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'City *'
                    onChangeText          = {(businessCity) => this.setState({businessCity})}
                    value                 = {this.state.businessCity}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Area *'
                    onChangeText          = {(businessArea) => this.setState({businessArea})}
                    value                 = {this.state.businessArea}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'default'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Pincode *'
                    onChangeText          = {(businessPincode) => this.setState({businessPincode})}
                    value                 = {this.state.businessPincode}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'phone-pad'
                  />
                </View>

                <View style={styles.formInputView}>
                  <TextField
                    label                 = 'Alternate Mobile No.'
                    onChangeText          = {(alternateMobileNumber) => this.setState({alternateMobileNumber})}
                    value                 = {this.state.alternateMobileNumber}
                    lineWidth             = {1}
                    tintColor             = {this.state.inputFocusColor}
                    inputContainerPadding = {4}
                    labelHeight           = {16}
                    keyboardType          = 'phone-pad'
                  />
                </View>

                  <View style={{
                      alignItems: 'center',
                      marginTop: 15
                    }}>
                    <Button
                      onPress     = {this.handleProceed}
                      buttonStyle = {styles.buttonLarge}
                      title       = "PROCEED"
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

export default createContainer(props => {
  var businessId    = '';

  const { state } = props.navigation;
  // console.log("state = ",state);
  if(state.params != undefined){
    // var isEdit      = state.params.isEdit;
    // businessId  = Meteor.user().profile.activeServiceId;
    businessId = state.params.businessId;
  }

  // var businessId = (state.params !== undefined) ? state.params.businessId : '';
  // console.log("isEdit = ",isEdit);

  const handle      = Meteor.subscribe('adminServiceDetails');
  var serviceData   = Meteor.collection('ServiceMaster').find({}) || [];
  // console.log("serviceData ====> ",serviceData);

  // const handle2 = Meteor.subscribe('businessDetails');
  const handle2 = Meteor.subscribe('activeBusinessDetails',businessId);
  const loading = handle2.ready();
  // console.log("form1 businessId = ",businessId);
  var businessData  = Meteor.collection('BusinessMaster').findOne({'_id':businessId});
  // console.log("form1 businessData ===> ",businessData);

  return{
    businessId,
    loading,
    serviceData,
    businessData
    // businessData  : Meteor.collection('BusinessMaster').findOne('_id':businessId) || {},
  }
}, AdditionalSetting);
