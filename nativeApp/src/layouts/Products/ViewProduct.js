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
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';
import ViewDailyProduct from './ViewDailyProduct.js';
import ViewWeeklyProduct from './ViewWeeklyProduct.js';
import ViewBiWeeklyProduct from './ViewBiWeeklyProduct.js';
import ViewMonthlyProduct from './ViewMonthlyProduct.js';
import ViewFortnightlyProduct from './ViewFortnightlyProduct.js';
import Loading from '../../components/Loading/Loading.js';

class ViewProduct extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      isOpen: false,
      selectedItem: 'About',

      productTitle    : '',
      productType     : '',
      productLanguage : '',
      buyingRateMon   : '',
      buyingRateTue   : '',
      buyingRateWed   : '',
      buyingRateThu   : '',
      buyingRateFri   : '',
      buyingRateSat   : '',
      buyingRateSun   : '',
      sellingRateMon  : '',
      sellingRateTue  : '',
      sellingRateWed  : '',
      sellingRateThu  : '',
      sellingRateFri  : '',
      sellingRateSat  : '',
      sellingRateSun  : '',
      deliveryCharge  : '',
      effectiveDate   : '',
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

  confirmDelete = () => {
    Alert.alert(
      '','Are you sure you want to delete this Product ?',
      [
        {text: 'Delete',onPress: () => {this.deleteProduct()}},
        {text: 'Cancel'}
      ]
    );
  }

  deleteProduct = () => {
    const { state } = this.props.navigation;
    productId       = state.params.productId;

    Meteor.call('deleteVendorProduct',productId,(error,result) =>{
      if(error){
        Alert.alert(
          'Error',
        )
      }else{
        Alert.alert(
          '','Product has been Deleted!',
        );
        this.props.navigation.navigate('ProductList');
      }
    });
  }

  render(){
    const { state }     = this.props.navigation;
    productId           = state.params.productId;
    const {productData} = this.props;
    
    // console.log("In view, productData = ",productData);

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

    if(this.props.loading){
      
    return(
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
                <TouchableOpacity onPress={()=> navigate('EditProduct',{productId:productId})}>
                  <View style={{alignSelf:'flex-end'}}>
                    <Icon size={20} name="edit" type="font-awesome" color="#6d6e70" />
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection:'row',marginBottom:10}}>
                  <View style={{flex:0.4,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width:60, height:60, borderRadius:20 }} resizeMode="stretch"
                      source={{uri: productData.productLogo }} />
                  </View>

                  <View style={{flex:0.6,justifyContent:'center'}}>
                    <Text style={{fontSize:20,color:'#444'}}>{productData.productTitle}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:16,color:'#444'}}>Type</Text>
                    <Text style={{fontSize:16}}>{productData.productType}</Text>
                  </View>

                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:16,color:'#444'}}>Language</Text>
                    <Text style={{fontSize:16}}>{productData.productLanguage}</Text>
                  </View>
                </View>

                {productData.productType=="Daily"?<ViewDailyProduct productData={productData}/>:null}
                {productData.productType=="Weekly"?<ViewWeeklyProduct productData={productData}/>:null}
                {productData.productType=="Bi-Weekly"?<ViewBiWeeklyProduct productData={productData}/>:null}
                {productData.productType=="Monthly"?<ViewMonthlyProduct productData={productData}/>:null}
                {productData.productType=="Fortnightly"?<ViewFortnightlyProduct productData={productData}/>:null}

                <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{flex:0.8}}>
                    <Text style={{fontSize:16,color:'#444'}}>Delivery Charges-Monthly (INR)</Text>
                  </View>

                  <View style={{flex:0.2}}>
                    <Text style={{fontSize:16}}>{productData.deliveryCharge}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{flex:0.6}}>
                    <Text style={{fontSize:16,color:'#444'}}>Effective Date</Text>
                  </View>

                  <View style={{flex:0.4}}>
                    <Text style={{fontSize:16}}>{productData.effectiveDate}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <TouchableOpacity>
                    <Button
                      textStyle   = {{textAlign:'center'}}
                      title       = "DELETE PRODUCT"
                      buttonStyle = {styles.buttonDelete}
                      onPress     = {this.confirmDelete}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Button
                      textStyle   = {{textAlign:'center'}}
                      title       = "PRODUCT LIST"
                      buttonStyle = {styles.buttonClose}
                      onPress     = {()=>navigate('ProductList')}
                    />
                  </TouchableOpacity>

                </View>

              </View>

          </ScrollView>
        </View>
      </SideMenu>
    </DrawerLayoutAndroid>

    );
    } else {
      return(<Loading />);
    } 
    
  }

}
export default createContainer((props) => {

  // console.log("view.... props = ",props);
  const { state } = props.navigation;
  productId       = state.params.productId;

  const postHandle  = Meteor.subscribe('vendorProductDetails');
  const productData = Meteor.collection('VendorProduct').findOne({'_id':productId}) || {};
  const loading     = postHandle.ready();

  // console.log("post data => ",productData);

  return{
    loading,
    productData,
  }
}, ViewProduct);
