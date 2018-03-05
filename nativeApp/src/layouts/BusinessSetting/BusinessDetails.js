import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text,
TouchableOpacity, TextInput, View,  BackHandler, Alert,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { TextField } from 'react-native-material-textfield';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

class BusinessDetails extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name            :name,
      isOpen          : false,
      selectedItem    : 'About',
      bankName        : '',
      accountType     : '',
      accountName     : '',
      accountNumber   : '',
      ifscCode        : '',
      panNumber       : '',
      tanNumber       : '',
      gstNumber       : '',
      inputFocusColor : '#f7ac57',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleView(){
    Actions.ViewCustomer();
  }
  componentDidMount(){
    console.log("In componentDidMount..............................");
    console.log("businessData => ",this.props.businessData);
    console.log("loading => ",this.props.loading);
    BackHandler.addEventListener('hardwareBackPress',this.androidBackHandler.bind(this));

    if(this.props.loading){
      if(this.props.businessData){
        this.setState({
          bankName      : this.props.businessData.bankName,
          accountType   : this.props.businessData.accountType,
          accountName   : this.props.businessData.accountName,
          accountNumber : this.props.businessData.accountNumber,
          ifscCode      : this.props.businessData.ifscCode,
          panNumber     : this.props.businessData.panNumber,
          gstNumber     : this.props.businessData.gstNumber,
          bankName      : this.props.businessData.bankName,
        });
      }
    }
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

  handleSubmit = () => {
    const { state } = this.props.navigation;
    var businessId  = state.params.businessId;

    var formValues = {
      'businessId'    : businessId,
      'bankName'      : this.state.bankName,
      'accountType'   : this.state.accountType,
      'accountName'   : this.state.accountName,
      'accountNumber' : this.state.accountNumber,
      'ifscCode'      : this.state.ifscCode,
      'panNumber'     : this.state.panNumber,
      'tanNumber'     : this.state.tanNumber,
      'gstNumber'     : this.state.gstNumber,
    }

    console.log("BusinessDetails = ",formValues);
    // console.log("BusinessDetails status = ",this.props.navigation);
    console.log("Business Id = ",businessId);

    Meteor.call('insertBusinessDetails',formValues,(error,result) =>{
      if(error){
        Alert.alert(
          'Error',
        )
        // swal(error.reason);
      }else{
        // console.log("business id = ",result);
        Alert.alert(
          '','Business Details has been saved successfully!',
        )
        // Actions.BusinessDetails({businessId: result});
        this.props.navigation.navigate('ServiceList');
        // swal(message);
      }
    });
  }

  render(){
    const {navigate}  = this.props.navigation;

    const { state }   = this.props.navigation;
    var businessId    = state.params.businessId;
    console.log("businessId = ",businessId);

    const menu = <Menu navigate={navigate} userName={this.props.userName}/>;
    var navigationView = (
      <ScrollView style={{backgroundColor: '#fbae16'}} createContainerstyle={{flex: 1,backgroundColor: '#fbae16'}}>
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
                  centerComponent={{ text: "Business Details", style:{ color: '#fff',alignSelf:'center'} }}
                  leftComponent={
                    <TouchableOpacity  onPress={()=>navigate('AdditionalSetting',{'businessId':businessId})} >
                      <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                    </TouchableOpacity>
                  }
                  outerContainerStyles={{borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                  innerContainerStyles={{marginTop:0,paddingTop:0}}
                />


                  <View style={styles.formContainer}>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'Bank Name *'
                        onChangeText          = {(bankName) => this.setState({bankName})}
                        value                 = {this.state.bankName}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'default'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'Account Type *'
                        onChangeText          = {(accountType) => this.setState({accountType})}
                        value                 = {this.state.accountType}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'default'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'Account Name *'
                        onChangeText          = {(accountName) => this.setState({accountName})}
                        value                 = {this.state.accountName}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'default'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'Account No. *'
                        onChangeText          = {(accountNumber) => this.setState({accountNumber})}
                        value                 = {this.state.accountNumber}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'phone-pad'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'IFSC Code *'
                        onChangeText          = {(ifscCode) => this.setState({ifscCode})}
                        value                 = {this.state.ifscCode}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'phone-pad'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'PAN No.'
                        onChangeText          = {(panNumber) => this.setState({panNumber})}
                        value                 = {this.state.panNumber}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'phone-pad'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'TAN No.'
                        onChangeText          = {(tanNumber) => this.setState({tanNumber})}
                        value                 = {this.state.tanNumber}
                        lineWidth             = {1}
                        tintColor             = {this.state.inputFocusColor}
                        inputContainerPadding = {4}
                        labelHeight           = {16}
                        keyboardType          = 'phone-pad'
                      />
                    </View>
                    <View style={styles.formInputView}>
                      <TextField
                        label                 = 'GST No.'
                        onChangeText          = {(gstNumber) => this.setState({gstNumber})}
                        value                 = {this.state.gstNumber}
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
                      <Button onPress = {this.handleSubmit}
                      buttonStyle     = {styles.buttonLarge}
                      title           = "SUBMIT" />
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
  console.log("state = ",state);

  if(state.params.businessId){
    businessId    = state.params.businessId;
  }

  const handle = Meteor.subscribe('activeBusinessDetails',businessId);
  const loading = handle.ready();
  console.log("form2 businessId => ",businessId);

  var businessData  = Meteor.collection('BusinessMaster').findOne({'_id':businessId});
  console.log("form2 businessData => ",businessData);

  return{
    loading,
    businessData
    // businessData  : Meteor.collection('BusinessMaster').findOne('_id':businessId) || {},
  }
}, BusinessDetails);
