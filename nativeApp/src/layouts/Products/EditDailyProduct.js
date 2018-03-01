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

export default class EditDailyProduct extends React.Component {
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

    return(

      <View>

        <View style={{flex:1,marginBottom:5}}>
          <Text style={{fontSize:16,color:'#444'}}>Buying Rate (INR)*</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
          <View style={{alignItems:'center'}}>
            <Text>Mon</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateMon}
              onChangeText          = {(buyingRateMon) => this.props.updateParentState({buyingRateMon: buyingRateMon})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Tue</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateTue}
              onChangeText          = {(buyingRateTue) => this.props.updateParentState({buyingRateTue: buyingRateTue})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Wed</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateWed}
              onChangeText          = {(buyingRateWed) => this.props.updateParentState({buyingRateWed: buyingRateWed})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Thu</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateThu}
              onChangeText          = {(buyingRateThu) => this.props.updateParentState({buyingRateThu: buyingRateThu})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Fri</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateFri}
              onChangeText          = {(buyingRateFri) => this.props.updateParentState({buyingRateFri: buyingRateFri})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sat</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateSat}
              onChangeText          = {(buyingRateSat) => this.props.updateParentState({buyingRateSat: buyingRateSat})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sun</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.buyingRateSun}
              onChangeText          = {(buyingRateSun) => this.props.updateParentState({buyingRateSun: buyingRateSun})}
              maxLength             = {5}
            />
          </View>
        </View>
        <View style={{flex:1,marginBottom:5}}>
          <Text style={{fontSize:16,color:'#444'}}>Selling Rate (INR)*</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
          <View style={{alignItems:'center'}}>
            <Text>Mon</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateMon}
              onChangeText          = {(sellingRateMon) => this.props.updateParentState({sellingRateMon: sellingRateMon})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Tue</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateTue}
              onChangeText          = {(sellingRateTue) => this.props.updateParentState({sellingRateTue: sellingRateTue})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Wed</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateWed}
              onChangeText          = {(sellingRateWed) => this.props.updateParentState({sellingRateWed: sellingRateWed})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Thu</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateThu}
              onChangeText          = {(sellingRateThu) => this.props.updateParentState({sellingRateThu: sellingRateThu})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Fri</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateFri}
              onChangeText          = {(sellingRateFri) => this.props.updateParentState({sellingRateFri: sellingRateFri})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sat</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateSat}
              onChangeText          = {(sellingRateSat) => this.props.updateParentState({sellingRateSat: sellingRateSat})}
              maxLength             = {5}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Sun</Text>
            <TextInput
              style                 = {{borderColor: 'gray', borderBottomWidth: 1,padding:0}}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              placeholderTextColor  = "#999"
              selectionColor        = "#aaa"
              keyboardType          = "phone-pad"
              defaultValue          = {this.props.typeValues.sellingRateSun}
              onChangeText          = {(sellingRateSun) => this.props.updateParentState({sellingRateSun: sellingRateSun})}
              maxLength             = {5}
            />
          </View>
        </View>
      </View>

  );

  }
}
