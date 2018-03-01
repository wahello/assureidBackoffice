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
import Loading from '../../components/Loading/Loading.js';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

export default class ViewDailyProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

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


  render(){
   
    return(

      <View>
        <View style={{flex:1,marginBottom:5}}>
          <Text style={{fontSize:16,color:'#444'}}>Buying Rate (INR)*</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
          <View style={{alignItems:'center'}}>
            <Text>Mon</Text>
            <Text>{this.props.productData.buyingRateMon}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Tue</Text>
            <Text>{this.props.productData.buyingRateTue}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Wed</Text>
            <Text>{this.props.productData.buyingRateWed}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Thu</Text>
            <Text>{this.props.productData.buyingRateThu}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Fri</Text>
            <Text>{this.props.productData.buyingRateFri}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sat</Text>
            <Text>{this.props.productData.buyingRateSat}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sun</Text>
            <Text>{this.props.productData.buyingRateSun}</Text>
          </View>
        </View>

        <View style={{flex:1,marginBottom:5}}>
          <Text style={{fontSize:16,color:'#444'}}>Selling Rate (INR)*</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
          <View style={{alignItems:'center'}}>
            <Text>Mon</Text>
            <Text>{this.props.productData.sellingRateMon}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Tue</Text>
            <Text>{this.props.productData.sellingRateTue}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Wed</Text>
            <Text>{this.props.productData.sellingRateWed}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Thu</Text>
            <Text>{this.props.productData.sellingRateThu}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Fri</Text>
            <Text>{this.props.productData.sellingRateFri}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sat</Text>
            <Text>{this.props.productData.sellingRateSat}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sun</Text>
            <Text>{this.props.productData.sellingRateSun}</Text>
          </View>
        </View>
      </View>

  );

  }
}
