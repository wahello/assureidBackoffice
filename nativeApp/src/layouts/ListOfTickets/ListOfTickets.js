import React,{Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import PropTypes      from 'prop-types';
import SideMenu       from 'react-native-side-menu';
import RNExitApp      from 'react-native-exit-app';
import Modal          from "react-native-modal";

import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View,  BackHandler, Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid,Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

import HeaderDy from '../../components/HeaderDy/HeaderDy.js';
import styles from './styles.js';
import Menu   from '../../components/Menu/Menu.js';

export default class ListOfTickets extends React.Component {
  constructor(props){
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;
    this.state = {
      name              : name,
      isOpen: false,
      selectedItem: "About",
      isModalVisibleOne: false,
      isModalVisibleTwo: false,
      inputFocusColor   : '#f7ac57',
      lineName:'',
      deleteLineName : '',
    };
    this.openDrawer   = this.openDrawer.bind(this);
    this.closeDrawer  = this.closeDrawer.bind(this);
    this.toggle       = this.toggle.bind(this);
    this.handleView   = this.handleView.bind(this);
  }
  handleView (lineName,index) {
    console.log("lineName : ", lineName);
    this.props.navigation.navigate("ViewCustomer",{lineName:lineName,index:index});
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.androidBackHandler.bind(this)
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.androidBackHandler.bind(this)
    );
  }
  androidBackHandler(){
    if(this.props.navigation.state.routeName != 'ServiceList'){
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }

  // InsertLineDataToServer = () => {
  //   // const { lineName }  = this.state ;

  //   var lineName = this.state.lineName;
  //   Meteor.call("insertLines", lineName, (error, result) => {
  //     if (error) {
  //       Alert.alert("Some error occurred during Add Line!");
  //       console.log(error.reason);
  //     } else {
  //       Alert.alert(
  //         "Success!",
  //         "Line added Successfully",
  //         [{ text: "OK", onPress: this._toggleModal1 }],
  //         { cancelable: false }
  //       );
  //       console.log("Line Added Successfully!");
  //     }
  //   });
  // }

  // confirmDelete = () => {
  //   Alert.alert(
  //     '','Are you sure you want to delete this Line ?',
  //     [
  //       {text: 'Delete',onPress: () => {this.deleteLine()}},
  //       {text: 'Cencel'}
  //     ]
  //   );
  // }

  // deleteLine = () => {
  //   console.log("deleteLineName = ",this.state.deleteLineName);
  //   Meteor.call('deleteLine',this.state.deleteLineName,(error,result) =>{
  //     if(error){
  //       Alert.alert(
  //         'Error',
  //       )
  //     }else{
  //       Alert.alert(
  //         '','Line has been Deleted Successfully!',
  //       );
  //     }
  //   });
  //   this._toggleModal2();
  // }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item
    });

  handleLogout(){
    Meteor.logout();
  }
  openDrawer(){
    this.drawer.openDrawer();
  }
  closeDrawer(){
    this.drawer.closeDrawer();
  }

  // _toggleModal1 = () =>
  //   this.setState({ isModalVisibleOne: !this.state.isModalVisibleOne });

  // _toggleModal2 = () =>
  //   this.setState({ isModalVisibleTwo: !this.state.isModalVisibleTwo });

  render(){
    var {lineData} = this.props;
    var {deleteLineData} = this.props;
    // console.log("lineData => ",deleteLineData);

    const {navigate,goBack} = this.props.navigation;
    const tableHead = ['Ticket#', 'Service Name', 'TAT(Date)'];

    const tableData = [
      ["AA000001", "Employment Name", "15/03/2018" ],
      ["AA000002", "Employment Name", "15/03/2018" ],
      ["AA000003", "Employment Name", "15/03/2018" ],
      ["AA000004", "Employment Name", "15/03/2018" ],
      ["AA000005", "Employment Name", "15/03/2018" ],
      ["AA000006", "Employment Name", "15/03/2018" ],
    ];

    const menu = <Menu navigate={navigate} userName={this.props.userName}/>;
    var navigationView = (
      <ScrollView
        style={{ backgroundColor: "#fbae16" }}
        createContainerstyle={{ flex: 1, backgroundColor: "#fbae16" }}
      >
        <View
          style={{ borderBottomWidth: 1, padding: 10, borderColor: "#fff" }}
        >
          <View
            style={{
              maxHeight: 30,
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <TouchableOpacity onPress={this.closeDrawer}>
              <View>
                <Icon size={25} name="close" type="evilicon" color="#000" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                lineHeight: 30,
                fontSize: 30,
                color: "#fff"
              }}
            >
              NOTIFICATION
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 10
            }}
          >
            Newly Added
          </Text>
        </View>
      </ScrollView>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={_drawer => (this.drawer = _drawer)}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => navigationView}
      >
        <SideMenu
          disableGestures={true}
          openMenuOffset={300}
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              borderWidth: 0,
              padding: 0
            }}
          >
            <ScrollView
              createContainerStyle={{
                marginBottom: 25,
                borderWidth: 0,
                margin: 0
              }}
            >
              <Header
                centerComponent={{ text: "AssureID", style: { color: "#fff" } }}
                leftComponent={
                  <TouchableOpacity onPress={this.toggle}>
                    <Icon
                      containerStyle={{paddingHorizontal:10,paddingVertical:5}}
                      size={25}
                      name="bars"
                      type="font-awesome"
                      color="#fff"
                    />
                  </TouchableOpacity>
                }
                outerContainerStyles={{
                  borderBottomWidth: 0,
                  backgroundColor: "#367fa9",
                  height: 60,
                  paddingTop: 0,
                  margin: 0
                }}
                innerContainerStyles={{ marginTop: 0, paddingTop: 0 }}
                rightComponent={
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      minHeight: 20,
                      minWidth: 20
                    }}
                  >
                    <TouchableOpacity onPress={this.openDrawer}>
                      <Icon
                        name="bell-outline"
                        type="material-community"
                        size={30}
                        color="#fff"
                        style={styles.bellIcon}
                      />
                      <Text style={styles.notificationText}>9</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            <HeaderDy headerTitle="View Line" goBack={goBack} />
              <View style={{ padding: 10 }}>
                {/*<View style={{ flexDirection: "row",justifyContent:'space-around' }}>
                  <Button
                    onPress={this._toggleModal2}
                    textStyle={{ textAlign: "center" }}
                    buttonStyle={styles.button}
                    title="DELETE LINE"
                  />
                  <Button
                    onPress={this._toggleModal1}
                    textStyle={{ textAlign: "center" }}
                    buttonStyle={styles.button1}
                    title="ADD LINE"
                  />
                </View>*/}
                {/* <View
                  style={{
                    flex: 1,
                    margin: 10,
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#6d6e70"
                  }}
                >
                  <SearchBar
                    containerStyle={{
                      flex: 9,
                      borderWidth: 0,
                      borderTopWidth: 0,
                      borderBottomWidth: 0
                    }}
                    inputStyle={{
                      margin: 0,
                      backgroundColor: "#fff",
                      borderRadius: 0
                    }}
                    noIcon
                    lightTheme
                    placeholder="Type Here..."
                  />
                  <Icon
                    containerStyle={{ flex: 1 }}
                    name="search"
                    type="font-awesome"
                    size={16}
                    color="#6d6e70"
                  />
                </View>*/}
                <View style={{padding: 10,justifyContent:'center'}}>
                    <Table>
                      <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
                        {
                          tableData.map((data, i) => (
                            <TouchableOpacity key={i} onPress={()=>this.handleView(data[0], i)}>
                                  <Row data={data} style={[styles.row, i%2 && {backgroundColor: '#dbdbdb'}]}  textStyle={styles.text}/>
                            </TouchableOpacity>
                          ))
                        }
                    </Table>
                </View>
              </View>

            {/*  <Modal
                isVisible={this.state.isModalVisibleOne}
                backdropColor={"black"}
                backdropOpacity={0.9}
              >
                <View style={styles.modalContent}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{fontSize: 15 }}>
                      Add Line
                    </Text>
                  </View>

                  <View style={styles.formContainer}>
                    <View style={styles.formInputView}>
                      <TextField
                        label="Line Number / Name *"
                        onChangeText={lineName => this.setState({ lineName })}
                        lineWidth={1}
                        tintColor={this.state.inputFocusColor}
                        inputContainerPadding={4}
                        labelHeight={16}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <Button
                      onPress={this._toggleModal1}
                      textStyle={{ textAlign: "center" }}
                      title="CANCEL"
                      buttonStyle={styles.buttonDelete}
                    />
                    <Button
                      onPress={this.InsertLineDataToServer}
                      textStyle={{ textAlign: "center" }}
                      title="ADD LINE"
                      buttonStyle={styles.buttonClose}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                isVisible={this.state.isModalVisibleTwo}
                backdropColor={"black"}
                backdropOpacity={0.9}
              >
                <View style={styles.modalContent}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ paddingBottom: 20 }}>Delete Line</Text>
                  </View>

                  <Dropdown baseColor="#aaa"
                      inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:'#aaa'}}
                      label='Delete Line'
                      labelHeight={20}
                      rippleInsets={{bottom:-25,top:0}}
                      labelTextStyle={{textAlign:'center',paddingLeft:15}}
                      data={deleteLineData}
                      onChangeText = {(deleteLineName) => this.setState({deleteLineName})}
                    />

                  <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Button onPress={this._toggleModal2}  textStyle={{textAlign:'center'}} title="CANCEL" buttonStyle={styles.buttonDelete} />
                    <Button onPress     = {this.confirmDelete} textStyle={{textAlign:'center'}} title="DELETE LINE" buttonStyle={styles.buttonClose} />
                  </View>
                </View>
              </Modal>*/}
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}

// export default createContainer((props) => {

//     var businessId     = Meteor.user().profile.activeServiceId;
//     const handle       = Meteor.subscribe('activeBusinessDetails', businessId);
//     const businessData = Meteor.collection('BusinessMaster').findOne({'_id':businessId}) || [];
//     const customerHandle = Meteor.subscribe('customer');
//     const loading      = !handle.ready();

//     var lineData = [];
//     let deleteLineData = [];

//     if(businessData.myLines){
//       console.log("businessData = ",businessData);
//       var lines = businessData.myLines;
//       let count = 0;
//       for(var i=0;i<lines.length;i++){
//         count = Meteor.collection('customer').find({'lineName':lines[i].lineName,'vendorId':Meteor.userId()},{fields:{'_id':1}}).length;
//         lineData.push([lines[i].lineName,count]);
//       }
//       for(i=0;i<businessData.myLines.length;i++){
//         deleteLineData.push(
//         {'value': businessData.myLines[i].lineName}
//         );
//       }
//       console.log('deleteLineData = ', deleteLineData);
//       deleteLineData = deleteLineData.filter((obj,index,array)=>{
//         return index === array.findIndex((t)=>(
//             t.value === obj.value
//           ));
//       });
//     }
//     return {
//       loading,
//       lineData,
//       deleteLineData,
//     }

// }, ListOfTickets);
