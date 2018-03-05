import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View,  BackHandler,Alert, Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar,Avatar } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { TextField } from 'react-native-material-textfield';

 export default class ExtraReducedDetails extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      isOpen: false,
      selectedItem: 'About',
      isModalVisible: false,
      fromDate:'',
      toDate:'',
      quantity:0,
      inputFocusColor   : '#f7ac57',

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

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  increment = () => {
    this.setState({
      quantity:this.state.quantity+1
    });

  }

  decrement = () => {
    if(this.state.quantity >=1){
      this.setState({
        quantity:this.state.quantity-1
      });
    }
  }

   ExtraReducedUpdateMsg = () =>{
    Alert.alert(
      '','Sakal has been update from 23-01-2018 to 24-01-2018 successfully!'
    )
  }

  render(){
    let subData = [
      {value:'Sakal'},
      {value:'Dainik Bhaskar'},
      {value:'Times of India'},
    ];
    const {navigate,goBack} = this.props.navigation;
    const tableHead = ['Subscriptions', 'Quantity','Start Date','End Date'];
    const tableData = [
      ['Sakal', '3','23-01-2018','24-01-2018'],
      ['Sakal', '3','23-01-2018','24-01-2018'],
      ['Sakal', '3','23-01-2018','24-01-2018'],
      ['Sakal', '3','23-01-2018','24-01-2018'],
      ['Sakal', '3','23-01-2018','24-01-2018'],
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
                centerComponent={{ text: "Add Extra / Reduced Product", style:{ color: '#fff',alignSelf:'center'} }}
                leftComponent={
                  <TouchableOpacity  onPress={()=>console.log('back pressed!')} >
                    <Icon size={25} name='arrow-left' type='feather' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ borderColor:'transparent', backgroundColor: '#f7bc79',height:50,padding:10,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                />
              <View style={{padding:10}}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    paddingVertical: 10
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text>Mr. Bakshi</Text>
                    <Text>145, Shakti House</Text>
                    <Text>+91 7387383275</Text>
                    <Text>Cash Mode</Text>
                  </View>
                  <Avatar
                    overlayContainerStyle={{ flex: 1 }}
                    width={90}
                    height={90}
                    rounded
                    source={{
                      uri:
                        "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
                    }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{padding:10,justifyContent:'center'}}>
                  <Text style={{paddingBottom:10,marginLeft:12}}>Details</Text>
                  <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
                      {
                        tableData.map((data, i) => (
                          <TouchableOpacity  key={i} onPress={this._toggleModal}>
                            <Row  data={data}  style={[styles.row, i%2 && {backgroundColor: '#dbdbdb'}]}  textStyle={styles.text}/>
                          </TouchableOpacity>
                        ))
                      }
                  </Table>
                </View>
                <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:15}}>
                  <View>
                      <TouchableOpacity onPress={()=>navigate('ExtraReducedSelect')}>
                          <Icon size={40} name="plus-box" type="material-community" color="#f7bc79" />
                      </TouchableOpacity>
                  </View>
                  <View >
                      <TouchableOpacity  onPress={()=>navigate('ExtraReducedSelect')}>
                          <Icon size={40} name="minus-box" type="material-community" color="#f7bc79" />
                      </TouchableOpacity>
                  </View>
                </View>

              <Modal isVisible={this.state.isModalVisible}backdropColor={'black'} backdropOpacity={.9}>
                <View style={styles.modalContent}>

                  <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                      <Text>Add Extra / Reduced Paper</Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',paddingBottom:30}}>
                    <Text>Sakal</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:15,marginBottom:20}}>
                    <Text style={{flex:1}}>Quantity</Text>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                      <TouchableOpacity onPress={this.increment}>
                          <Icon size={40} name="plus-box" type="material-community" color="#f7bc79" />
                      </TouchableOpacity>
                      <Text style={{paddingHorizontal:10}}>{this.state.quantity}</Text>
                      <TouchableOpacity onPress={this.decrement}>
                          <Icon size={40} name="minus-box" type="material-community" color="#f7bc79" />
                      </TouchableOpacity>
                    </View>
                    <Text style={{flex:1,textAlign:'right'}}>/3</Text>
                  </View>

                  <View style={{flexDirection:'row',paddingBottom:30}}>
                   <DatePicker
                      style={{borderBottomWidth:1,borderColor: 'gray',width:140,marginLeft:5}}
                      date={this.state.fromDate}
                      mode="date"
                      placeholder="From Date"
                      format="MM-DD-YYYY"
                      minDate="01-10-2018"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderWidth: 0
                        }
                      }}
                      onDateChange={(date) => {this.setState({date: fromDate})}}
                    />

                     <DatePicker
                      style={{borderBottomWidth:1,borderColor: 'gray',width:140,marginLeft:10}}
                      date={this.state.toDate}
                      mode="date"
                      placeholder="To Date"
                      format="MM-DD-YYYY"
                      minDate="01-10-2018"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderWidth: 0
                        }
                      }}
                      onDateChange={(date) => {this.setState({date: toDate})}}
                    />
                  </View>

                  <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Button onPress={this._toggleModal}  textStyle={{textAlign:'center'}} title="DELETE" buttonStyle={styles.buttonDelete} />
                    <Button onPress={this.ExtraReducedUpdateMsg}  textStyle={{textAlign:'center'}} title="UPDATE" buttonStyle={styles.buttonClose} />
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
