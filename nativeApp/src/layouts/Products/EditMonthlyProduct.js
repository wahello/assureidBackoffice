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
import { Dropdown } from 'react-native-material-dropdown';
import Loading from '../../components/Loading/Loading.js';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

export default class EditMonthlyProduct extends React.Component {
  constructor(props){
    super(props);
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
    const selectData = [];
    for(var i=1;i<=31;i++){
      selectData.push({'value':i});
    }

    return(

      <View>

        <View style={{flexDirection:'row',marginBottom:20}}>
          <View style={{flex:0.5}}>
            <Text style={{fontSize:16,color:'#444'}}>Buying Rate (INR)*</Text>
          </View>

          <View style={{flex:0.5}}>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0,textAlign:'center'}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.singleBuyingRate}
              onChangeText          = {(singleBuyingRate) => this.props.updateParentState({singleBuyingRate: singleBuyingRate})}
              maxLength             = {5}
            />
          </View>
        </View>

        <View style={{flexDirection:'row',marginBottom:5}}>
          <View style={{flex:0.5}}>
            <Text style={{fontSize:16,color:'#444'}}>Selling Rate (INR)*</Text>
          </View>

          <View style={{flex:0.5}}>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0,textAlign:'center'}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.singleSellingRate}
              onChangeText          = {(singleSellingRate) => this.props.updateParentState({singleSellingRate: singleSellingRate})}
              maxLength             = {5}
            />
          </View>
        </View>

        <View style={{flexDirection:'row',marginBottom:20}}>
          <View style={{flex:1,justifyContent: 'center'}}>
            <Text style={{fontSize:16,color:'#444'}}>Select Day *</Text>
          </View>
          <View style={{width:'50%'}}>
            <Dropdown
              data                  = {selectData}
              label                 = ''
              inputContainerStyle   = {{borderBottomWidth: 1,borderBottomColor:'gray'}}
              labelHeight           = {16}
              style                 = {{textAlign:'center'}}
              value                 = {this.props.typeValues.monthlyDay}
              onChangeText          = {(monthlyDay) => this.props.updateParentState({monthlyDay: monthlyDay})}
            />
          </View>

        </View>

      </View>

  );

  }
}
