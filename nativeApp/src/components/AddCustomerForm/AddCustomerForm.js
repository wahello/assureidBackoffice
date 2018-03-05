import React, { Component } from "react";
import PropTypes from "prop-types";
import Meteor, { Accounts, createContainer } from "react-native-meteor";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Button, Icon, Avatar, CheckBox } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import { TextField } from "react-native-material-textfield";

import styles from "./styles.js";
import Loading from "../Loading";
import AddSubscriptionModal from '../modalComponent/AddSubscriptionModal.js';
import EditSubscriptionModal from '../modalComponent/EditSubscriptionModal.js';
import AddSubscriptionTable from '../tableComponent/AddSubscriptionTable.js';

class AddCustomerForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      nickName: "",
      lineName: "",
      mobileNum: "",
      firstName: "",
      lastName: "",
      deposit: "",
      previousDue: "",
      previousAdv: "",
      deliveryCharges: "",
      extraInfo: "",
      sunday: true ,
      monday:true,
      tuesday:true,
      wednesday:true,
      thursday:true,
      friday:true,
      saturday:true,
      cashCustomer: false,
      isModalVisible: false,
      subscriptionModalId:"",
      isEditModalVisible: false,
      dateFrom: "01/10/2018",
      dateTo: "11/10/2018",
      error: null,
      sucscriptions: []
    };
  }
  _closeModal = () =>
    this.setState({ isEditModalVisible: false });
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  _editModal = (subscriptionModalId) => {
    this.setState({subscriptionModalId});
    this.setState({ isEditModalVisible: true });

  }
  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleOnChange = () => {
    let cashCustomer = !this.state.cashCustomer;
    this.setState({ cashCustomer });
  };
  sundayToggle = () =>{
    let sunday = !this.state.sunday;
    this.setState({sunday});
  }
  mondayToggle = () =>{
    let monday = !this.state.monday;
    this.setState({monday});
  }
  tuesdayToggle = () =>{
    let tuesday = !this.state.tuesday;
    this.setState({tuesday});
  }
  wednesdayToggle = () =>{
    let wednesday = !this.state.wednesday;
    this.setState({wednesday});
  }
  thursdayToggle = () =>{
    let thursday = !this.state.thursday;
    this.setState({thursday});
  }
  fridayToggle = () =>{
    let friday = !this.state.friday;
    this.setState({friday});
  }
  saturdayToggle = () =>{
    let saturday = !this.state.saturday;
    this.setState({saturday});
  }
_goBack = () =>{
  this.props.goBack();
}

  insertCustomerData = () => {
    var formValues = {
      nickName: this.state.nickName,
      lineName: this.state.lineName,
      mobileNum: this.state.mobileNum,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      deposit: this.state.deposit,
      previousDue: this.state.previousDue,
      previousAdv: this.state.previousAdv,
      deliveryCharges: this.state.deliveryCharges,
      extraInfo: this.state.extraInfo,
      cashCustomer: this.state.cashCustomer,
      sucscriptions: []
    };

    Meteor.call("insertCustomer", formValues, (error, result) => {
      if (error) {
        Alert.alert("Some error occurred while Adding Customer!");
        console.log(error.reason);
      } else {
        Alert.alert(
          "Success!",
          "Customer Added Successfully",
          [{ text: "OK", onPress:this._goBack}],
          { cancelable: false }
        );
        console.log("Customer Added Successfully!");
      }

    });
  };

  render() {
    let linedata = this.props.lineData;
    let languageData = [
      { value: "English" },
      { value: "Hindi" },
      { value: "Marathi" }
    ];
    let typeData = [
      { value: "Daily" },
      { value: "Weekly" },
      { value: "Monthly" }
    ];
    let subscriptionData = [{ value: "Sakal" }, { value: "Times of India" }];
    let quantityData = [
      { value: "0" },
      { value: "1" },
      { value: "2" },
      { value: "3" }
    ];
    var {subscriptionTableData} = this.props;

    const modalTableHead = ["Type", "Language", "Name", "Quantity"];
    const modalTableData = [
      ["Daily", "Marathi", "Sakal", "2"],
      ["Daily", "Marathi", "Sakal", "2"]
    ];
    const modalContent = (
      <ScrollView contentContainerStyle={styles.modalContent}>

      </ScrollView>
    );
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 6, paddingRight: 15 }}>
            <View style={styles.formInputView}>
              <TextField
                label="Nickname"
                onChangeText={nickName => this.setState({ nickName })}
                lineWidth={1}
                tintColor="#f7ac57"
                inputContainerPadding={4}
                labelHeight={16}
                inputContainerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#aaa"
                }}
                labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
                keyboardType="default"
              />
            </View>
            <Dropdown
              baseColor="#aaa"
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#aaa"
              }}
              label="Select Line Name"
              labelHeight={20}
              rippleInsets={{ bottom: -25, top: 0 }}
              labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
              data={linedata}
              onChangeText={lineName => this.setState({ lineName })}
            />
          </View>
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
        </View>
        <View style={styles.formInputView}>
          <TextField
            label="Mobile Number"
            onChangeText={mobileNum => this.setState({ mobileNum })}
            lineWidth={1}
            tintColor="#f7ac57"
            inputContainerPadding={4}
            labelHeight={16}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#aaa"
            }}
            labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
            keyboardType="default"
          />
        </View>
        <View style={styles.formInputView}>
          <TextField
            label="First Name"
            onChangeText={firstName => this.setState({ firstName })}
            lineWidth={1}
            tintColor="#f7ac57"
            inputContainerPadding={4}
            labelHeight={16}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#aaa"
            }}
            labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
            keyboardType="default"
          />
        </View>
        <View style={styles.formInputView}>
          <TextField
            label="Last Name"
            onChangeText={lastName => this.setState({ lastName })}
            lineWidth={1}
            tintColor="#f7ac57"
            inputContainerPadding={4}
            labelHeight={16}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#aaa"
            }}
            labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
            keyboardType="default"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <View style={styles.formInputViewHalf}>
            <TextField
              label="Deposit"
              onChangeText={deposit => this.setState({ deposit })}
              lineWidth={1}
              tintColor="#f7ac57"
              inputContainerPadding={4}
              labelHeight={16}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#aaa"
              }}
              labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
              keyboardType="default"
            />
          </View>
          <View style={styles.formInputViewHalf}>
            <TextField
              label="Previous Due"
              onChangeText={previousDue => this.setState({ previousDue })}
              lineWidth={1}
              tintColor="#f7ac57"
              inputContainerPadding={4}
              labelHeight={16}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#aaa"
              }}
              labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
              keyboardType="default"
            />
          </View>
          <View style={styles.formInputViewHalf}>
            <TextField
              label="Previous Advance"
              onChangeText={previousAdv => this.setState({ previousAdv })}
              lineWidth={1}
              tintColor="#f7ac57"
              inputContainerPadding={4}
              labelHeight={16}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#aaa"
              }}
              labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
              keyboardType="default"
            />
          </View>
          <View style={styles.formInputViewHalf}>
            <TextField
              label="Delivery Charges"
              onChangeText={deliveryCharges =>
                this.setState({ deliveryCharges })
              }
              lineWidth={1}
              tintColor="#f7ac57"
              inputContainerPadding={4}
              labelHeight={16}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#aaa"
              }}
              labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
              keyboardType="default"
            />
          </View>
        </View>
        <View style={styles.formInputView}>
          <TextField
            label="Extra Information"
            onChangeText={extraInfo => this.setState({ extraInfo })}
            lineWidth={1}
            tintColor="#f7ac57"
            inputContainerPadding={4}
            labelHeight={16}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#aaa"
            }}
            labelTextStyle={{ textAlign: "center", paddingLeft: 15 }}
            keyboardType="default"
          />
        </View>
        <View>
          <CheckBox
            containerStyle={{
              borderColor: "transparent",
              backgroundColor: "transparent"
            }}
            checkedColor="green"
            title="Cash Customer (If paying in cash only)"
            checked={this.state.cashCustomer}
            onPress={this.handleOnChange}
            textStyle={{ color: "#aaa" }}
          />
        </View>
        {this.state.error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
        ) : null}
        <View
          style={{
            paddingHorizontal: 10,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ lineHeight: 28, flex: 1 }}>Subscription</Text>
          <TouchableOpacity onPress={this._toggleModal}>
            <View
              style={{
                alignSelf: "flex-end",
                marginLeft: 10,
                backgroundColor: "#fbae16",
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6
              }}
            >
              <Icon name="plus" type="font-awesome" size={14} />
            </View>
            <AddSubscriptionModal _toggleModal={this._toggleModal.bind(this)} mobileNumber={this.state.mobileNum} lineName={this.state.lineName} isModalVisible={this.state.isModalVisible} navigate={this.props.navigate} goBack={this.props.goBack} />
          </TouchableOpacity>
        </View>
        { this.state.mobileNum ?
          <AddSubscriptionTable _closeModal={this._closeModal.bind(this)} _editModal={this._editModal.bind(this)} isModalVisible={this.state.isEditModalVisible} tableHead={modalTableHead} customerNumber={this.state.mobileNum} navigate={this.props.navigate} goBack={this.props.goBack}/>
          : null
        }
        <EditSubscriptionModal _closeModal={this._closeModal.bind(this)} _editModal={this._editModal.bind(this)} mobileNumber={this.state.mobileNum} lineName={this.state.lineName} isModalVisible={this.state.isEditModalVisible} navigate={this.props.navigate} goBack={this.props.goBack} subscriptionId={this.state.subscriptionModalId} />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            onPress={() => this.props.navigate("AddCustomerMoreDetails",{mobileNum:this.state.mobileNum})}
            textStyle={{ textAlign: "center" }}
            title="MORE DETAILS"
            buttonStyle={styles.buttonClose}
          />
          <Button
            onPress={this.insertCustomerData}
            textStyle={{ textAlign: "center" }}
            title="SAVE"
            buttonStyle={styles.buttonClose}
          />
        </View>
      </View>
    );
  }
}

export default createContainer(props => {
  var businessId = Meteor.user().profile.activeServiceId;
  const handle = Meteor.subscribe("activeBusinessDetails", businessId);
  const businessData = Meteor.collection("BusinessMaster").findOne({
    _id: businessId
  });
  const loading = !handle.ready() ;

  var lineData = [];
  if (businessData) {
    var lines = businessData.myLines;
    if (lines.length > 0) {
      for (i = 0; i < lines.length; i++) {
        lineData[i] = {
          value: lines[i].lineName
        };
      }
    }
  }

  return {
    loading,
    lineData
  };
}, AddCustomerForm);
