import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text,
TouchableOpacity, TextInput, View,  BackHandler,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import styles from './styles.js';


import Menu from '../../components/Menu/Menu.js';



 export default class BillCollection extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      isOpen: false,
      selectedItem: 'About',
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

  render(){
    const {navigate} = this.props.navigation;
    const tableHead = ['Line Number', 'Total Customers', 'Amount'];
    const tableData = [
      ['145 shakti House', '28', '1500'],
      ['145 shakti House', '28', '1600'],
      ['145 shakti House', '28', '1800'],
      ['145 shakti House', '28', '2000'],
      ['145 shakti House', '28', '4000'],
      ['145 shakti House', '28', '1000'],
    ];
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
                centerComponent={{ text: "Bill Collection", style:{ color: '#fff',alignSelf:'center'} }}
                leftComponent={
                  <TouchableOpacity  onPress={()=>console.log('back pressed!')} >
                    <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                />

              <View style={{padding:10}}>
                <Text style={{marginBottom:0,textAlign:'center',marginTop:10}}>BILL DETAILS</Text>
              </View>
              <View style={{marginBottom:15}}>
                <Text style={{flexDirection:'row',marginLeft:12,marginTop:10,fontSize:30}}> ₹ 400 </Text>
                <Text style={{flexDirection:'row',marginLeft:20,marginTop:10}}>Darshan Bakshi</Text>
                <Text style={{flexDirection:'row',marginLeft:20,marginTop:10}}>Mr. Bakshi</Text>
                <Text style={{flexDirection:'row',marginLeft:20,marginTop:10}}>Line 134,DC</Text>
                <Text style={{flexDirection:'row',marginLeft:20,marginTop:10}}>+918989667785</Text>
              </View>
              <View style={{marginBottom:15}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginLeft:20,marginTop:10}}>Adjust Bill :</Text>
                  <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#aaa"
                    selectionColor="#aaa"
                    keyboardType="phone-pad"/>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginLeft:20,marginTop:10}}>Note/Reason :</Text>
                  <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#aaa"
                    selectionColor="#aaa"
                    keyboardType="phone-pad"/>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginLeft:20,marginTop:10}}>Updated Bill :</Text>
                  <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#aaa"
                    selectionColor="#aaa"
                    keyboardType="phone-pad"/>
                </View>
                 <View style={{flexDirection: 'row'}}>
                  <Text style={{marginLeft:20,marginTop:10}}>Collected Bill :</Text>
                  <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#aaa"
                    selectionColor="#aaa"
                    keyboardType="phone-pad"/>
                </View>
              </View>
              <View style={{padding:10}}>
                <View style={{flexDirection:'row',marginLeft:-4}}>
                  <Button textStyle={{textAlign:'center'}} buttonStyle={styles.button1} title="CANCLE"/>
                  <Button textStyle={{textAlign:'center'}} buttonStyle={styles.button} title="COLLECT"/>
                </View>
              </View>
            </ScrollView>
          </View>
          </SideMenu>
        </DrawerLayoutAndroid>
    );
  }
}
