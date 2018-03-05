import React,{Component } from 'react';
import Meteor, {createContainer} from 'react-native-meteor';

import {Platform, ScrollView, StyleSheet, Text,TouchableOpacity, TextInput, View,BackHandler,Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid ,Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { TextField } from 'react-native-material-textfield';

import PropTypes from 'prop-types';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

 class EditCustomerMoreDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isOpen         : false,
      selectedItem   : 'About',
      inputFocusColor: '#f7ac57',
      addressLineOne : '',
      addressLineTwo : '',
      country        : '',
      state          : '',
      city           : '',
      area           : '',
      pincode        : '',

    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
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
  }
  openDrawer(){
    console.log('opening drawer!');
          this.drawer.openDrawer();
  }
  closeDrawer(){
    console.log('opening drawer!');
          this.drawer.closeDrawer();
  }

  AddCustomerDetails = () =>{

    var formValues = {

      "addressLineOne": this.state.addressLineOne,
      "addressLineTwo": this.state.addressLineTwo,
      "country"       : this.state.country,
      "state"         : this.state.state,
      "city"          : this.state.city,
      "area"          : this.state.area,
      "pincode"       : this.state.pincode,
    }
    const { mobileNum } = this.props.navigation.state.params;
    console.log(this.props.navigation.state);
    Meteor.call('addDetails',formValues, mobileNum,(error,res)=>{
      if (error) {
        Alert.alert("Sorry!, Some error occurred while updating Customer details");
        console.log(error.reason);
      } else {
        Alert.alert(
          "Success!",
          "Customer Details Updated Successfully",
          [{ text: "OK", onPress: this._goBack}],
          { cancelable: false }
        );
        console.log("Customer Details Updated Successfully!");
      }

    });
  }
  _goBack = () =>{
    this.props.navigation.goBack();
  }
  componentWillReceiveProps(nextProps){
    console.log("loading nextProps: ",nextProps.loading);
    console.log("customerData nextProps: ",nextProps.customerData);
    if(nextProps.loading){
      if(nextProps.customerData){
        this.setState({
          addressLineOne : nextProps.customerData.addressLineOne,
          addressLineTwo : nextProps.customerData.addressLineTwo,
          country        : nextProps.customerData.country,
          state          : nextProps.customerData.state,
          city           : nextProps.customerData.city,
          area           : nextProps.customerData.area,
          pincode        : nextProps.customerData.pincode,
        });
      }
    }
  }

  render(){
    const {navigate,goBack } = this.props.navigation;

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
    return (
      <DrawerLayoutAndroid
       drawerWidth={300}
        ref={(_drawer) => this.drawer = _drawer}
       drawerPosition={DrawerLayoutAndroid.positions.Right}
       renderNavigationView={() => navigationView}>
        <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
         <View style={{ flex: 1, backgroundColor: '#FFF',borderWidth:0,padding:0}}>
          <ScrollView createContainerStyle={{marginBottom: 25,borderWidth:0,margin:0}}>
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
                centerComponent={{ text: "Edit Customer", style:{ color: '#fff',alignSelf:'center'} }}
                leftComponent={
                  <TouchableOpacity  onPress={()=>console.log('back pressed!')} >
                    <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                />

                <Text style={{alignSelf:'center',paddingTop:15}}>More Details</Text>


                <View style={styles.formContainer}>
                  <View style={styles.formInputView}>
                    <TextField
                      label                 = 'Address Line 01 *'
                      defaultValue          = {this.state.addressLineOne}
                      onChangeText          = {(addressLineOne) => this.setState({addressLineOne})}
                      lineWidth             = {1}
                      tintColor             = {this.state.inputFocusColor}
                      inputContainerPadding = {4}
                      labelHeight           = {16}
                      keyboardType          = 'default'
                    />
                  </View>
                  <View style={styles.formInputView}>
                    <TextField
                      label                 = 'Address Line 02 *'
                      defaultValue          = {this.state.addressLineTwo}
                      onChangeText          = {(addressLineTwo) => this.setState({addressLineTwo})}
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
                      value                 = 'India'
                      defaultValue          = {this.state.country}
                      onChangeText          = {(country) => this.setState({country})}
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
                      defaultValue          = {this.state.state}
                      onChangeText          = {(state) => this.setState({state})}
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
                      defaultValue          = {this.state.city}
                      onChangeText          = {(city) => this.setState({city})}
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
                      defaultValue          = {this.state.area}
                      onChangeText          = {(area) => this.setState({area})}
                      lineWidth             = {1}
                      tintColor             = {this.state.inputFocusColor}
                      inputContainerPadding = {4}
                      labelHeight           = {16}
                      keyboardType          = 'default'
                    />
                  </View>
                  <View style={styles.formInputView}>
                    <TextField
                      label                 = 'PinCode *'
                      defaultValue          = {this.state.pincode}
                      onChangeText          = {(pincode) => this.setState({pincode})}
                      lineWidth             = {1}
                      tintColor             = {this.state.inputFocusColor}
                      inputContainerPadding = {4}
                      labelHeight           = {16}
                      keyboardType          = 'default'
                    />
                  </View>

                </View>

              <View style={{padding:10}}>
                <View style={{flexDirection:'row',marginLeft:-4}}>
                  <Button onPress={()=>goBack(null)} textStyle={{textAlign:'center'}} buttonStyle={styles.button} title="CANCEL"/>
                  <Button onPress={this.AddCustomerDetails} textStyle={{textAlign:'center'}} buttonStyle={styles.button1} title="SUBMIT"/>
                </View>
              </View>
            </ScrollView>
          </View>
          </SideMenu>
        </DrawerLayoutAndroid>
    );
  }
}
export default createContainer(props=>{
  const { customerId } = props.navigation.state.params;
  console.log('customerId',customerId);
  var customerHandle = Meteor.subscribe('customer');
  var customerData = Meteor.collection('customer').findOne({'_id': customerId},{fields:{'_id':1,'addressLineOne':1,'addressLineTwo':1,'state':1,'city':1,'pincode':1,'country':1,'area':1}})||[];

  const loading =customerHandle.ready();
  return {loading,customerData};
},EditCustomerMoreDetails);
