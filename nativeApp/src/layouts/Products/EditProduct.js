import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text, Alert,
TouchableOpacity, TextInput, View,  BackHandler,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import Loading from '../../components/Loading/Loading.js';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';
import EditDailyProduct from './EditDailyProduct.js';
import EditWeeklyProduct from './EditWeeklyProduct.js';
import EditBiWeeklyProduct from './EditBiWeeklyProduct.js';
import EditMonthlyProduct from './EditMonthlyProduct.js';
import EditFortnightlyProduct from './EditFortnightlyProduct.js';

class EditProduct extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name          :name,
      isOpen        : false,
      selectedItem  : 'About',

      productLogo       : '../../images/noImage.png',
      productTitle      : '',
      productType       : '',
      productLanguage   : '',
      buyingRateMon     : '',
      buyingRateTue     : '',
      buyingRateWed     : '',
      buyingRateThu     : '',
      buyingRateFri     : '',
      buyingRateSat     : '',
      buyingRateSun     : '',
      sellingRateMon    : '',
      sellingRateTue    : '',
      sellingRateWed    : '',
      sellingRateThu    : '',
      sellingRateFri    : '',
      sellingRateSat    : '',
      sellingRateSun    : '',
      singleBuyingRate  : '',
      singleSellingRate : '',
      weeklyDay         : '',
      biWeeklyMon       : '',
      biWeeklyTue       : '',
      biWeeklyWed       : '',
      biWeeklyThu       : '',
      biWeeklyFri       : '',
      biWeeklySat       : '',
      biWeeklySun       : '',
      fortnightlyDay1   : '',
      fortnightlyDay2   : '',
      monthlyDay        : '',
      deliveryCharge    : '',
      effectiveDate     : '',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  componentWillReceiveProps(nextProps){
    // console.log("loading => ",nextProps.loading);
    if(nextProps.loading){
      if(nextProps.post){
        // console.log("nextProps post => ",nextProps.post);
        this.setState({
          productLogo       : nextProps.post.productLogo,
          productTitle      : nextProps.post.productTitle,
          productType       : nextProps.post.productType,
          productLanguage   : nextProps.post.productLanguage,
          buyingRateMon     : nextProps.post.buyingRateMon,
          buyingRateTue     : nextProps.post.buyingRateTue,
          buyingRateWed     : nextProps.post.buyingRateWed,
          buyingRateThu     : nextProps.post.buyingRateThu,
          buyingRateFri     : nextProps.post.buyingRateFri,
          buyingRateSat     : nextProps.post.buyingRateSat,
          buyingRateSun     : nextProps.post.buyingRateSun,
          sellingRateMon    : nextProps.post.sellingRateMon,
          sellingRateTue    : nextProps.post.sellingRateTue,
          sellingRateWed    : nextProps.post.sellingRateWed,
          sellingRateThu    : nextProps.post.sellingRateThu,
          sellingRateFri    : nextProps.post.sellingRateFri,
          sellingRateSat    : nextProps.post.sellingRateSat,
          sellingRateSun    : nextProps.post.sellingRateSun,
          singleBuyingRate  : nextProps.post.singleBuyingRate,
          singleSellingRate : nextProps.post.singleSellingRate,
          weeklyDay         : nextProps.post.weeklyDay,
          biWeeklyMon       : nextProps.post.biWeeklyMon,
          biWeeklyTue       : nextProps.post.biWeeklyTue,
          biWeeklyWed       : nextProps.post.biWeeklyWed,
          biWeeklyThu       : nextProps.post.biWeeklyThu,
          biWeeklyFri       : nextProps.post.biWeeklyFri,
          biWeeklySat       : nextProps.post.biWeeklySat,
          biWeeklySun       : nextProps.post.biWeeklySun,
          fortnightlyDay1   : nextProps.post.fortnightlyDay1,
          fortnightlyDay2   : nextProps.post.fortnightlyDay2,
          monthlyDay        : nextProps.post.monthlyDay,
          deliveryCharge    : nextProps.post.deliveryCharge,
          effectiveDate     : nextProps.post.effectiveDate,
        });
      }
    }
  }

  updateProduct = () => {
    const { state } = this.props.navigation;
    var productId   = state.params.productId;

    if(this.state.productType == 'Bi-Weekly'){
      var biWeeklyValues = [this.state.biWeeklyMon,this.state.biWeeklyTue,this.state.biWeeklyWed,this.state.biWeeklyThu,this.state.biWeeklyFri,this.state.biWeeklySat,this.state.biWeeklySun];
      // console.log("biWeeklyValues = ",biWeeklyValues);
      var checkedCount = biWeeklyValues.reduce(function(cnt,val){
        return val?cnt+1:cnt;
      },0);

      if(checkedCount>2 || checkedCount<2){
        Alert.alert(
          'Error','Please select strictly 2 Days!',
        );
        return;
      }
    }
    var formValues = {
      'productId'         : productId,
      'buyingRateMon'     : this.state.buyingRateMon,
      'buyingRateTue'     : this.state.buyingRateTue,
      'buyingRateWed'     : this.state.buyingRateWed,
      'buyingRateThu'     : this.state.buyingRateThu,
      'buyingRateFri'     : this.state.buyingRateFri,
      'buyingRateSat'     : this.state.buyingRateSat,
      'buyingRateSun'     : this.state.buyingRateSun,
      'sellingRateMon'    : this.state.sellingRateMon,
      'sellingRateTue'    : this.state.sellingRateTue,
      'sellingRateWed'    : this.state.sellingRateWed,
      'sellingRateThu'    : this.state.sellingRateThu,
      'sellingRateFri'    : this.state.sellingRateFri,
      'sellingRateSat'    : this.state.sellingRateSat,
      'sellingRateSun'    : this.state.sellingRateSun,
      'singleBuyingRate'  : this.state.singleBuyingRate,
      'singleSellingRate' : this.state.singleSellingRate,
      'weeklyDay'         : this.state.weeklyDay,
      'biWeeklyMon'       : this.state.biWeeklyMon,
      'biWeeklyTue'       : this.state.biWeeklyTue,
      'biWeeklyWed'       : this.state.biWeeklyWed,
      'biWeeklyThu'       : this.state.biWeeklyThu,
      'biWeeklyFri'       : this.state.biWeeklyFri,
      'biWeeklySat'       : this.state.biWeeklySat,
      'biWeeklySun'       : this.state.biWeeklySun,
      'monthlyDay'        : this.state.monthlyDay,
      'fortnightlyDay1'   : this.state.fortnightlyDay1,
      'fortnightlyDay2'   : this.state.fortnightlyDay2,
      'deliveryCharge'    : this.state.deliveryCharge,
      'effectiveDate'     : this.state.effectiveDate,
    }
    // console.log("formValues = ",formValues);

    Meteor.call('updateVendorProduct',formValues,(error,result) =>{
      if(error){
        Alert.alert(
          'Error',
        )
      }else{
        Alert.alert(
          '','Product Details has been saved successfully!',
        );
        this.props.navigation.navigate('ViewProduct',{productId:productId});
      }
    });
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

  showRatesInput(){
    var productType = this.state.productType;
    console.log("productType = ",productType);

    if(productType === "Daily"){
      return(
        <View style={{flex:1,marginBottom:5}}>
          <Text style={{fontSize:16,color:'#444'}}>Buying Rate (INR)*</Text>
        </View>
      );
    }
  }

  updateState(data) {
    this.setState(data);
    console.log("update state data = ",data);
  }

  render(){
    const { state } = this.props.navigation;
    var productId   = state.params.productId;

    const {navigate,goBack} = this.props.navigation;
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

    if(this.props.loading && this.props.post){
      var productType = this.state.productType;
      // console.log("productType = ",productType);
      if(productType === "Daily"){
        var typeValues = {
          'buyingRateMon' :this.state.buyingRateMon,  'buyingRateTue' :this.state.buyingRateTue,
          'buyingRateWed' :this.state.buyingRateWed,  'buyingRateThu' :this.state.buyingRateThu,
          'buyingRateFri' :this.state.buyingRateFri,  'buyingRateSat' :this.state.buyingRateSat,
          'buyingRateSun' :this.state.buyingRateSun,  'sellingRateMon':this.state.sellingRateMon,
          'sellingRateTue':this.state.sellingRateTue, 'sellingRateWed':this.state.sellingRateWed,
          'sellingRateThu':this.state.sellingRateThu, 'sellingRateFri':this.state.sellingRateFri,
          'sellingRateSat':this.state.sellingRateSat, 'sellingRateSun':this.state.sellingRateSun,
        };
      } else if(productType === "Weekly"){
        var typeValues = {
          'singleBuyingRate'  : this.state.singleBuyingRate,
          'singleSellingRate' : this.state.singleSellingRate,
          'weeklyDay'         : this.state.weeklyDay,
        }
      } else if(productType === "Bi-Weekly"){
        var typeValues = {
          'singleBuyingRate'  : this.state.singleBuyingRate,
          'singleSellingRate' : this.state.singleSellingRate,
          'biWeeklyMon'       : this.state.biWeeklyMon,
          'biWeeklyTue'       : this.state.biWeeklyTue,
          'biWeeklyWed'       : this.state.biWeeklyWed,
          'biWeeklyThu'       : this.state.biWeeklyThu,
          'biWeeklyFri'       : this.state.biWeeklyFri,
          'biWeeklySat'       : this.state.biWeeklySat,
          'biWeeklySun'       : this.state.biWeeklySun,
        }
      } else if(productType === "Monthly"){
        var typeValues = {
          'singleBuyingRate'  : this.state.singleBuyingRate,
          'singleSellingRate' : this.state.singleSellingRate,
          'monthlyDay'        : this.state.monthlyDay,
        }
      } else if(productType === "Fortnightly"){
        var typeValues = {
          'singleBuyingRate'  : this.state.singleBuyingRate,
          'singleSellingRate' : this.state.singleSellingRate,
          'fortnightlyDay1'   : this.state.fortnightlyDay1, 
          'fortnightlyDay2'   : this.state.fortnightlyDay2, 
        }
      }

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
                  centerComponent={{ text: "My Products", style:{ color: '#fff',alignSelf:'center'} }}
                  leftComponent={
                    <TouchableOpacity  onPress={()=>goBack()} >
                      <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                    </TouchableOpacity>
                  }
                  outerContainerStyles={{borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                  innerContainerStyles={{marginTop:0,paddingTop:0}}
                  />

                <View style={{flex:1,paddingVertical:12,paddingHorizontal:18}}>

                  <View style={{flexDirection:'row',marginBottom:10}}>
                    <View style={{flex:0.4,alignItems:'center',justifyContent:'center'}}>
                      <Image style={{width:60, height:60, borderRadius:20 }} resizeMode="stretch"
                        source={{uri: this.state.productLogo }}/>
                    </View>

                    <View style={{flex:0.6,justifyContent:'center'}}>
                      <Text
                        style={{fontSize:20,color:'#444'}}>{this.state.productTitle}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection:'row',marginBottom:20}}>
                    <View style={{flex:0.5}}>
                      <Text style={{fontSize:16,color:'#444'}}>Type</Text>
                      <Text style={{fontSize:16}}>{this.state.productType}</Text>
                    </View>

                    <View style={{flex:0.5}}>
                      <Text style={{fontSize:16,color:'#444'}}>Language</Text>
                      <Text style={{fontSize:16}}>{this.state.productLanguage}</Text>
                    </View>
                  </View>
                  {/*
                  {this.showRatesInput()}
                  */}
                  {this.state.productType=="Daily"?<EditDailyProduct updateParentState={this.updateState.bind(this)} typeValues={typeValues}/>:null}
                  {this.state.productType=="Weekly"?<EditWeeklyProduct updateParentState={this.updateState.bind(this)} typeValues={typeValues}/>:null}
                  {this.state.productType=="Bi-Weekly"?<EditBiWeeklyProduct updateParentState={this.updateState.bind(this)} typeValues={typeValues}/>:null}
                  {this.state.productType=="Fortnightly"?<EditFortnightlyProduct updateParentState={this.updateState.bind(this)} typeValues={typeValues}/>:null}
                  {this.state.productType=="Monthly"?<EditMonthlyProduct updateParentState={this.updateState.bind(this)} typeValues={typeValues}/>:null}

                  <View style={{flexDirection:'row',marginBottom:20}}>
                    <View style={{flex:0.8}}>
                      <Text style={{fontSize:16,color:'#444'}}>Delivery Charges-Monthly (INR)*</Text>
                    </View>

                    <View style={{flex:0.2}}>
                      <TextInput
                        style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0,textAlign:'center'}}
                        underlineColorAndroid = 'rgba(0,0,0,0)'
                        placeholderTextColor  = "#999"
                        selectionColor        = "#aaa"
                        keyboardType          = "phone-pad"
                        defaultValue          = {this.state.deliveryCharge}
                        onChangeText          = {(deliveryCharge) => this.setState({deliveryCharge})}
                        maxLength             = {2}
                      />
                    </View>
                  </View>

                  <View style={{flexDirection:'row',marginBottom:20}}>
                    <View style={{flex:0.4}}>
                      <Text style={{fontSize:16,color:'#444'}}>Effective Date*</Text>
                    </View>

                    <View style={{flex:0.6}}>
                      <DatePicker
                        style                 = {{borderBottomWidth:1,borderColor: 'gray',width:'100%'}}
                        date                  = {this.state.effectiveDate}
                        mode                  = "date"
                        placeholder           = "Select Date"
                        format                = "dddd, Do MMM YYYY"
                        minDate               = "01-10-2018"
                        confirmBtnText        = "Confirm"
                        cancelBtnText         = "Cancel"
                        customStyles          = {{
                                                 dateInput: {
                                                  borderWidth: 0
                                                 }
                                                }}
                        onDateChange          = {(date) => {this.setState({effectiveDate: date})}}
                      />
                    </View>
                  </View>

                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity>
                      <Button
                        textStyle   = {{textAlign:'center'}}
                        title       = "CANCEL"
                        buttonStyle = {styles.buttonDelete}
                        onPress     = {()=>navigate('ViewProduct',{productId:productId})}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigate('ProductList')}>
                      <Button
                        textStyle   = {{textAlign:'center'}}
                        title       = "SAVE"
                        buttonStyle = {styles.buttonClose}
                        onPress     = {this.updateProduct}
                      />
                    </TouchableOpacity>

                  </View>

                </View>

            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
    }//if
    else{
      return(<Loading />);
    }
  }
}

export default createContainer((props) => {
  // let {p} = props;
  // console.log("props1 => ",props);
  // console.log("props params =>",{props});
  // console.log("props2 => ",this.props);

  const { state } = props.navigation;

  productId   = state.params.productId;

  const postHandle  = Meteor.subscribe('vendorProductDetails');
  const post        = Meteor.collection('VendorProduct').findOne({'_id':productId}) || {};
  const loading     = postHandle.ready();

  console.log("post data => ",post);

  return{
    loading,
    post,
  }
}, EditProduct);
