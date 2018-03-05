import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text,
TouchableOpacity, TextInput, View,  BackHandler,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';

import styles from './styles.js';

import Menu from '../../components/Menu/Menu.js';



 export default class ViewBillLine extends React.Component {
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
    this.props.navigation.navigate('ViewCustomerBill');
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
    const tableHead = ['Customer Name', 'Nick Name', 'Building/House','Notes'];
    const tableData = [
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ['Darshan Bakshi','Mr. Darshan','John Deere','450'],
      ];
      let data = [
        {value:'Payment Mode'},
        {value:'Payment Mode'},
        {value:'Payment Mode'},
        {value:'Payment Mode'},
      ];
    const {navigate} = this.props.navigation;
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
                centerComponent={{ text: "View Bills", style:{ color: '#fff',alignSelf:'center'} }}
                leftComponent={
                  <TouchableOpacity  onPress={()=>console.log('back pressed!')} >
                    <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                />
              <View style={{padding:10}}>
              <Dropdown baseColor="#fff"
                    containerStyle={[styles.button,{alignSelf:'flex-end',
                      backgroundColor:'#f7bc79',paddingHorizontal:10,marginRight:10, height:60
                    }]}
                    inputContainerStyle={{ borderBottomColor: 'transparent'}}
                    label='Payment Mode'
                    labelHeight={20}
                    rippleInsets={{bottom:-20,top:0}}
                    labelTextStyle={{textAlign:'center'}}
                    data={data}
                  />
                <View style={{flex:1,margin: 10,flexDirection:'row',borderWidth:1,borderColor:'#6d6e70'}}>
                  <SearchBar containerStyle={{flex:9,borderWidth:0,borderTopWidth:0,borderBottomWidth:0}} inputStyle={{margin:0,backgroundColor:'#fff',borderRadius:0}} noIcon lightTheme   placeholder='Type Here...' />
                  <Icon containerStyle={{flex:1}} name="search" type="font-awesome" size={16} color="#6d6e70" />
                </View>
                <View style={{padding: 10,justifyContent:'center'}}>
                    <Table>
                      <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
                        {
                          tableData.map((data, i) => (
                            <TouchableOpacity key={i}  onPress={this.handleView}>
                              <Row data={data} style={[styles.row, i%2 && {backgroundColor: '#dbdbdb'}]}  textStyle={styles.text}/>
                            </TouchableOpacity>

                          ))
                        }
                    </Table>
                </View>
              </View>
            </ScrollView>
          </View>
          </SideMenu>
        </DrawerLayoutAndroid>
    );
  }
}
