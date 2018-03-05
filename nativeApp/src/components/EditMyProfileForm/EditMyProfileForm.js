import React, {Component} from 'react';
import Meteor,{createContainer} from 'react-native-meteor';

import {Platform, ScrollView, StyleSheet, Text,TouchableOpacity, TextInput, View,  BackHandler, Alert,Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon,Avatar} from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

import PropTypes from 'prop-types';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import ValidationComponent from "react-native-form-validator";

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';

export default class EditMyProfileForm extends ValidationComponent {
  constructor(props){
    super(props);
    if(Meteor.user().emails[0].address){
      var email = Meteor.user().emails[0].address;
    }else{
      var email = '';
    }
    console.log("email = ",email);
    this.state={
      isOpen          : false,
      selectedItem    : 'About',
      inputFocusColor : '#f7ac57',
      firstName       : Meteor.user().profile.firstName,
      lastName        : Meteor.user().profile.lastName,
      emailId         : email,
      firstNameError  : "",
      lastNameError   : "",
      emailError      : "",
      error           : null,
    
    };
    
  }
  // componentWillReceiveProps(nextProps){
  //   console.log("loading => ",nextProps.loading);
  //   if(nextProps.loading){
  //     if(nextProps.post){
  //       console.log("nextProps post => ",nextProps.post);
  //       this.setState({
  //         firstName   : nextProps.post.firstName,
  //         lastName    : nextProps.post.lastName,
  //         email       : nextProps.post.emailId,

  //       });
  //     }
  //   }
  // }

  handleError = error => {
    if (this.mounted) {
      this.setState({ error });
    }
  };

  validInput = () => {
    const {
      firstName,
      lastName,
      emailId,
    } = this.state;
    let valid = true;

      this.validate({
        firstName: {
          minlength: 3,
          maxlength: 12,
          required: true,
        },
        lastName: {
          minlength: 3,
          maxlength: 12,
          required: true,

        },
        emailId: { emailId: true, required: true }, 
      });

    if (this.isFieldInError("firstName")) {
      let firstNameError = this.getErrorsInField('firstName');
      console.log('firstNameError ',firstNameError);
      this.setState({ firstNameError });
      valid = false;
    }else{
      this.setState({firstNameError:""})
    }

    if (this.isFieldInError("lastName")) {
      this.setState({ lastNameError: this.getErrorsInField('lastName') });
      valid = false;
    }else{
      this.setState({lastNameError:""})
    }

    if (this.isFieldInError("emailId")) {
      this.setState({ emailError: this.getErrorsInField('emailId') });
      valid = false;
    }else{
      this.setState({emailError:""})
    }

    console.log(this.state.firstNameError);
   
    if (valid) {
      this.handleError(null);
    }
    console.log('valid : ',valid);
    console.log('error ',this.getErrorMessages('\n'));
    return valid;
  };

  updateProfile = () => {

    // console.log(this.state.firstName,'this.state.firstName');
    // console.log(this.state.lastName,'this.state.lastName');
    // console.log(this.state.emailId,'this.state.emailId');

    var formValues = {

      'firstName'   : this.state.firstName,
      'lastName'    : this.state.lastName,
      'email'       : this.state.emailId,
    }
    if(this.validInput()){
      console.log(formValues,'formValues');
      Meteor.call('userCustom',formValues,(error,result) =>{
        if(error){
          Alert.alert(
            error.reason,
          )
        }else{
          Alert.alert(
            '','Profile Updated successfully!',
          );
          this.props.navigate('MyProfile');
        }
      });
    }
  };

  render(){

    var userData = Meteor.user();
 
    return(
        <View>
          <View style={styles.formContainer}>
            <View style={{ flex: 3, paddingTop: 15 }}>
              <Avatar
                width={90}
                height={90}
                rounded
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
                }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.formInputView}>
              <TextField
                label                 = 'First Name'
                value                 = {this.state.firstName}
                onChangeText          = {(firstName) => this.setState({firstName})}
                lineWidth             = {1}
                tintColor             = {this.state.inputFocusColor}
                inputContainerPadding = {4}
                labelHeight           = {16}
                keyboardType          = 'default'
                ref={input => (this.firstName = input)}
                onSubmitEditing={() => this.lastName.focus()}

              />
            </View>
            {this.state.firstNameError? (
              <View style={styles.error}>
                 <Text style={[styles.errorText,{textAlign:'left'}]} >{this.state.firstNameError}</Text>
              </View>
               ): null }
            <View style={styles.formInputView}>
              <TextField
                label                 = 'Last Name'
                value                 = {this.state.lastName}
                onChangeText          = {(lastName) => this.setState({lastName})}
                lineWidth             = {1}
                tintColor             = {this.state.inputFocusColor}
                inputContainerPadding = {4}
                labelHeight           = {16}
                keyboardType          = 'default'
                ref={input => (this.lastName = input)}
                onSubmitEditing={() => this.email.focus()}
              />
            </View>
            {this.state.lastNameError ? (
              <View style={styles.error}>
                <Text style={styles.errorText}>{this.state.lastNameError}</Text>
              </View>
            ) : null}
            <View style={styles.formInputView}>
              <TextField
                label                 = 'Email Id'
                onChangeText          = {(emailId) => this.setState({emailId:emailId})}
                value                 = {this.state.emailId}
                lineWidth             = {1}
                tintColor             = {this.state.inputFocusColor}
                inputContainerPadding = {4}
                labelHeight           = {16}
                keyboardType          = 'default'
                ref={input => (this.emailId = input)}
              />
            </View>
            {this.state.emailError ? (
              <View style={styles.error}>
                <Text style={styles.errorText}>{this.state.emailError}</Text>
              </View>
            ) : null}
             <View style={styles.formInputView}>
              <TextField
                label                 = 'Alternate Email Id'
                onChangeText          = {(emailId) => this.setState({emailId:emailId})}
                value                 = {this.state.emailId}
                lineWidth             = {1}
                tintColor             = {this.state.inputFocusColor}
                inputContainerPadding = {4}
                labelHeight           = {16}
                keyboardType          = 'default'
                ref={input => (this.emailId = input)}
              />
            </View>
            {this.state.emailError ? (
              <View style={styles.error}>
                <Text style={styles.errorText}>{this.state.emailError}</Text>
              </View>
            ) : null}
            <View style={styles.formInputView}>
              <View>
                <Text style={{fontSize:12,color:'#aaa'}}>Mobile Number *</Text>
              </View>
              <View>
                <Text style={{fontSize:15,color:'#000'}} >{userData.username}</Text>
              </View>
            </View>
            <View style={styles.formInputView}>
              <View>
                <Text style={{fontSize:12,color:'#aaa'}}>Alternate Mobile Number *</Text>
              </View>
              <View>
                <Text style={{fontSize:15,color:'#000'}} >{userData.username}</Text>
              </View>
            </View>
            <View style={styles.formInputView}>
              <TextField
                label                 = 'Address'
                onChangeText          = {(Address) => this.setState({Address})}
                value                 = {this.state.Address}
                lineWidth             = {1}
                tintColor             = {this.state.inputFocusColor}
                inputContainerPadding = {4}
                labelHeight           = {16}
                keyboardType          = 'default'
              />
            </View>
            <View style={{
                alignItems: 'center',
                marginTop: 15
              }}>
              <Button onPress = {this.updateProfile}
              buttonStyle     = {styles.buttonLarge}
              title           = "UPDATE" />
            </View>
            <View style={styles.formInputViews}>
              <TouchableOpacity onPress={()=> this.props.navigate('ChangePassword')}>
                  <Text style={{fontSize:15,color:'#aaa'}}>Change Password</Text>
              </TouchableOpacity>
              <Icon name="chevrons-right" type="feather" color="#aaa" />
            </View>
          </View>
    </View>
         
    );
  }
}
