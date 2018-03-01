import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  BackHandler,
  Image,
  BackAndroid,
  findNodeHandle,
  DrawerLayoutAndroid
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Header,
  Card,
  Button,
  Icon,
  SearchBar,
  Avatar
} from "react-native-elements";
import Meteor, { createContainer } from "react-native-meteor";
import SideMenu from "react-native-side-menu";
import RNExitApp from "react-native-exit-app";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import styles from "./styles.js";
import Menu from "../../components/Menu/Menu.js";

export default class ViewCustomerBillUpd extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    if (this.props.userName) name = "Welcome " + this.props.userName;
    this.state = {
      name: name,
      isOpen: false,
      selectedItem: "About"
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  handleView() {
    Actions.ViewCustomer();
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
  androidBackHandler() {
    console.log(this.props.navigation.state.routeName);
    if (this.props.navigation.state.routeName != "ServiceList") {
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  toggle() {
    console.log("is open " + this.state.isOpen);
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
      selectedItem: item
    });

  handleLogout() {
    console.log("Logout function!");
    Meteor.logout();
    Actions.LogIn();
  }
  openDrawer() {
    console.log("opening drawer!");
    this.drawer.openDrawer();
  }
  closeDrawer() {
    console.log("opening drawer!");
    this.drawer.closeDrawer();
  }

  render() {
    const { navigate } = this.props.navigation;
    const tableHead = ["Perticulars", "Quantity", "Amount"];
    const tableData = [["Previous Dues", "-", "1500"]];
    const itemData = [
      ["Sakal", "29", "500"],
      ["Times of India", "29", "500"],
      ["Sakal", "29", "500"],
      ["Times of India", "29", "500"]
    ];
    const totalRow = [["840"], ["40"], ["840"]];
    const columnTitle = ["Sub Total", "Delivery Charges", "Total"];
    const totalColumn = ["840", "40", "840"];
    const menu = <Menu navigate={navigate} userName={this.props.userName} />;
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
                centerComponent={{ text: "Pamtap", style: { color: "#fff" } }}
                leftComponent={
                  <TouchableOpacity onPress={this.toggle}>
                    <Icon
                      size={25}
                      name="bars"
                      type="font-awesome"
                      color="#fff"
                    />
                  </TouchableOpacity>
                }
                outerContainerStyles={{
                  borderBottomWidth: 0,
                  backgroundColor: "#f7ac57",
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
              <Header
                centerComponent={{
                  text: "View Customer Bill",
                  style: { color: "#fff", alignSelf: "center" }
                }}
                leftComponent={
                  <TouchableOpacity
                    onPress={() => console.log("back pressed!")}
                  >
                    <Icon
                      size={25}
                      name="arrow-left"
                      type="feather"
                      color="#fff"
                    />
                  </TouchableOpacity>
                }
                outerContainerStyles={{
                  borderColor: "transparent",
                  backgroundColor: "#f7bc79",
                  height: 50,
                  padding: 10,
                  margin: 0
                }}
                innerContainerStyles={{ marginTop: 0, paddingTop: 0 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  paddingVertical: 10
                }}
              >
                <Text style={{ flex: 1 }}>Bill for December 2017</Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  Bill number 4365
                </Text>
              </View>
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
              <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                  Bill Details
                </Text>
                <Table>
                  <Row
                    data={tableHead}
                    flexArr={[5, 3, 2]}
                    style={styles.head}
                    textStyle={styles.headText}
                  />
                  {tableData.map((data, i) => (
                    <Row
                      key={i}
                      data={data}
                      flexArr={[5, 3, 2]}
                      style={[
                        styles.row,
                        i % 2 && { backgroundColor: "#dbdbdb" }
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                  <Row
                    data={["Items"]}
                    flexArr={[5, 3, 2]}
                    textStyle={styles.text}
                  />
                  {itemData.map((data, i) => (
                    <Row
                      key={i}
                      data={data}
                      flexArr={[5, 3, 2]}
                      style={[
                        styles.row,
                        i % 2 && { backgroundColor: "#dbdbdb" }
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                  <TableWrapper style={{ flexDirection: "row" }}>
                    <Col
                      style={{ flex: 8 }}
                      data={columnTitle}
                      textStyle={styles.text}
                    />
                    <Col
                      style={{ flex: 2 }}
                      data={totalColumn}
                      textStyle={styles.text}
                    />
                  </TableWrapper>
                </Table>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingHorizontal: 10,
                  paddingVertical: 10
                }}
              >
                <Button
                  onPress={() =>navigate('ViewCustomerBillHistory')}
                  textStyle={{ textAlign: "center",color:'#6d6e70' }}
                  buttonStyle={[styles.button1, { marginVertical: 10 }]}
                  title="VIEW HISTORY"
                />
                <Button
                  textStyle={{ textAlign: "center" }}
                  buttonStyle={[styles.button, { marginVertical: 10 }]}
                  title="CANCEL"
                />
                <Button
                  onPress={() =>navigate('ViewCustomerBillDetails')}
                  textStyle={{ textAlign: "center",color:'#6d6e70' }}
                  buttonStyle={[styles.button1, { marginVertical: 10 }]}
                  title="CLOSE ACCOUNT"
                />
                <Button
                  textStyle={{ textAlign: "center",color:'#6d6e70'}}
                  buttonStyle={[styles.button1, { marginVertical: 10 }]}
                  title="HELP WITH BILL"
                />
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}
