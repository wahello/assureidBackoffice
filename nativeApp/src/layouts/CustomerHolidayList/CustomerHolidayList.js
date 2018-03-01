import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View,  BackHandler, Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';


 export default class CustomerHolidayList extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      isOpen: false,
      selectedItem: 'About',
      isModalVisibleOne: false,
      isModalVisibleTwo: false,
      addFromDate:'',
      addToDate:'',
      updateFromDate:'21-10-2017',
      updateToDate:'23-10-2017',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  handleView(){
    this.props.navigation.navigate('ViewCustomer');
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

  updateHoliday = () =>{
    Alert.alert(
      '','Holiday 01 has been updated successfully!'
    )
  }

  addHoliday = () =>{
    Alert.alert(
      '','Holiday has been added successfully!'
    )
  }

  _toggleModal1 = () =>this.setState({ isModalVisibleOne: !this.state.isModalVisibleOne });
  _toggleModal2 = () =>this.setState({ isModalVisibleTwo: !this.state.isModalVisibleTwo });

  render(){
    let subData = [
      {value:'Sakal'},
      {value:'Dainik Bhaskar'},
      {value:'Times of India'},
    ];
    const {navigate,goBack} = this.props.navigation;
    const tableHead = ['Holiday', 'Start Date', 'End Date'];
    const tableData = [
      ['Holiday 01', '21-10-2017', '23-10-2017'],
      ['Holiday 02', '11-11-2017', '21-11-2017'],
      ['Holiday 01', '21-10-2017', '23-10-2017'],
      ['Holiday 02', '11-11-2017', '21-11-2017'],
      ['Holiday 01', '21-10-2017', '23-10-2017'],
      ['Holiday 02', '11-11-2017', '21-11-2017'],
      ['Holiday 01', '21-10-2017', '23-10-2017'],
      ['Holiday 02', '11-11-2017', '21-11-2017'],
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
                centerComponent={{ text: "Customer Holiday", style:{ color: '#fff',alignSelf:'center'} }}
                leftComponent={
                  <TouchableOpacity  onPress={()=>console.log('back pressed!')} >
                    <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
              />

              <View style={{padding:10}}>
                <View style={{flex:1,margin: 10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text>Mr Bakshi</Text>
                    <Text>Line 145, Shakti House</Text>
                    <Text>+91 9876543210</Text>
                    <Text>Cash Mode</Text>
                  </View>

                  <TouchableOpacity style={{alignSelf:'flex-end'}}  onPress={this._toggleModal1}>
                      <Icon size={40} name="plus-box" type="material-community" color="#f7bc79" />
                  </TouchableOpacity>
                </View>
                <View style={{padding: 10,justifyContent:'center'}}>
                  <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
                      {
                        tableData.map((data, i) => (
                          <TouchableOpacity key={i} onPress={this._toggleModal2}>
                            <Row key={i} data={data} style={[styles.row, i%2 && {backgroundColor: '#dbdbdb'}]}  textStyle={styles.text}/>
                          </TouchableOpacity>
                        ))
                      }
                  </Table>
                </View>

                <Modal isVisible={this.state.isModalVisibleOne}>

                  <View style={styles.modalContent}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Text>Add Product</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:40}}>
                      <DatePicker
                        style={{borderBottomWidth:1,borderColor: 'gray'}}
                        date={this.state.addFromDate}
                        mode="date"
                        placeholder="From Date"
                        format="DD-MM-YYYY"
                        minDate="10-01-2018"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0
                          }
                        }}
                        onDateChange={(date) => {this.setState({addFromDate: date})}}
                      />
                      <DatePicker
                        style={{borderBottomWidth:1,borderColor: 'gray'}}
                        date={this.state.addToDate}
                        mode="date"
                        placeholder="To Date"
                        format="DD-MM-YYYY"
                        minDate="10-01-2018"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0
                          }
                        }}
                        onDateChange={(date) => {this.setState({addToDate: date})}}
                      />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      <Button onPress={this._toggleModal1}  textStyle={{textAlign:'center'}} title="CANCEL" buttonStyle={styles.buttonDelete} />
                      <Button onPress={this.addHoliday} textStyle={{textAlign:'center'}} title="ADD HOLIDAY" buttonStyle={styles.buttonClose} />
                    </View>

                  </View>
                </Modal>

                <Modal isVisible={this.state.isModalVisibleTwo}>

                  <View style={styles.modalContent}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Text>Holiday 01</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:40}}>
                      <DatePicker
                        style={{borderBottomWidth:1,borderColor: 'gray'}}
                        date={this.state.updateFromDate}
                        mode="date"
                        placeholder="From Date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0
                          }
                        }}
                        onDateChange={(date) => {this.setState({updateFromDate: date})}}
                      />
                      <DatePicker
                        style={{borderBottomWidth:1,borderColor: 'gray'}}
                        date={this.state.updateToDate}
                        mode="date"
                        placeholder="To Date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0
                          }
                        }}
                        onDateChange={(date) => {this.setState({updateToDate: date})}}
                      />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      <Button onPress={this._toggleModal2}  textStyle={{textAlign:'center'}} title="CANCEL" buttonStyle={styles.buttonDelete} />
                      <Button  onPress={this.updateHoliday} textStyle={{textAlign:'center'}} title="UPDATE" buttonStyle={styles.buttonClose} />
                    </View>

                  </View>
                </Modal>


              </View>
            </ScrollView>
          </View>
          </SideMenu>
        </DrawerLayoutAndroid>
    );
  }
}
