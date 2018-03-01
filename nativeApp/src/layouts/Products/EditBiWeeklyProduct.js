import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text, Alert,
TouchableOpacity, TextInput, View,  BackHandler,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import Loading from '../../components/Loading/Loading.js';
import CheckBox from 'react-native-check-box'

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

export default class EditBiWeeklyProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      biWeeklyMon: this.props.typeValues.biWeeklyMon,
      checkedCount    : 2, 
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

  handleOnClick(value){
    this.props.updateParentState({[value]: !this.props.typeValues[value]});
  }

  render(){
    console.log("typeValues = ",this.props.typeValues);
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
            <Text style={{fontSize:16,color:'#444'}}>Select Days *</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:20}}>
          <CheckBox
            style={{flex:1}}
            onClick={() => this.handleOnClick("biWeeklyMon")}
            isChecked={this.props.typeValues.biWeeklyMon}
            rightText="Mo"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={()=> this.handleOnClick("biWeeklyTue")}
            isChecked={this.props.typeValues.biWeeklyTue}
            rightText="Tu"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={()=> this.handleOnClick("biWeeklyWed")}
            isChecked={this.props.typeValues.biWeeklyWed}
            rightText="We"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={() => this.handleOnClick("biWeeklyThu")}
            isChecked={this.props.typeValues.biWeeklyThu}
            rightText="Th"  
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={() => this.handleOnClick("biWeeklyFri")}
            isChecked={this.props.typeValues.biWeeklyFri}
            rightText="Fr"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={() => this.handleOnClick("biWeeklySat")}
            isChecked={this.props.typeValues.biWeeklySat}
            rightText="Sa"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          <CheckBox
            style={{flex:1}}
            onClick={() => this.handleOnClick("biWeeklySun")}
            isChecked={this.props.typeValues.biWeeklySun}
            rightText="Su"
            rightTextStyle={{marginLeft:0}}
            checkBoxColor="#f7bc79"
          />
          
        </View>

      </View>

  );

  }
}
