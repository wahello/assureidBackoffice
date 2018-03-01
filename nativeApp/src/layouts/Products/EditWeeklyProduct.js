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
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Loading from '../../components/Loading/Loading.js';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

export default class EditWeeklyProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0
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

  handleOnPress(value){
    this.setState({value:value})
  }

  onSelect(index, value){
    
    // console.log("value =",value," index = ",index);
    this.props.updateParentState({weeklyDay: value})
  }

  render(){
    const days = {
      'Monday':0, 'Tuesday':1, 'Wednesday':2, 'Thursday':3,
      'Friday':4, 'Saturday':5, 'Sunday':6,
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

        <View style={{flexDirection:'row',marginBottom:20}}>
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

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Text style={{fontSize:16,color:'#444'}}>Select Day *</Text>
          </View>
        </View>

          <RadioGroup
            size={20}
            color='#f7bc79'
            thickness={2}
            selectedIndex={days[this.props.typeValues.weeklyDay]}
            onSelect = {(index, value) => this.onSelect(index, value)}
            style={{flexDirection:'row',justifyContent:"space-around",marginBottom:20}}
          >
            <RadioButton style={{paddingHorizontal:0}} value={'Monday'} >
              <Text>Mo</Text>
            </RadioButton>
     
            <RadioButton style={{paddingHorizontal:0}} value={'Tuesday'}>
              <Text>Tu</Text>
            </RadioButton>
     
            <RadioButton style={{paddingHorizontal:0}} value={'Wednesday'}>
              <Text>We</Text>
            </RadioButton>

            <RadioButton style={{paddingHorizontal:0}} value={'Thursday'}>
              <Text>Th</Text>
            </RadioButton>
            
            <RadioButton style={{paddingHorizontal:0}} value={'Friday'}>
              <Text>Fr</Text>
            </RadioButton>
            
            <RadioButton style={{paddingHorizontal:0}} value={'Saturday'}>
              <Text>Sa</Text>
            </RadioButton>
            
            <RadioButton style={{paddingHorizontal:0}} value={'Sunday'}>
              <Text>Su</Text>
            </RadioButton>

          </RadioGroup>

      </View>

  );

  }
}
