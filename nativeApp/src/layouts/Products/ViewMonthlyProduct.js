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

export default class ViewMonthlyProduct extends React.Component {
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
        <View style={{flexDirection:'row',marginBottom:20}}>
          <View style={{flex:0.8}}>
            <Text style={{fontSize:16,color:'#444'}}>Buying Rate (INR)</Text>
          </View>

          <View style={{flex:0.2}}>
            <Text style={{fontSize:16}}>{this.props.productData.singleBuyingRate}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',marginBottom:20}}>
          <View style={{flex:0.8}}>
            <Text style={{fontSize:16,color:'#444'}}>Selling Rate (INR)</Text>
          </View>

          <View style={{flex:0.2}}>
            <Text style={{fontSize:16}}>{this.props.productData.singleSellingRate}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',marginBottom:20}}>
          <View style={{flex:0.7}}>
            <Text style={{fontSize:16,color:'#444'}}>Day of Service</Text>
          </View>

          <View style={{flex:0.3}}>
            <Text style={{fontSize:16}}>Day {this.props.productData.monthlyDay}</Text>
          </View>
        </View>

      </View>

  );

  }
}
