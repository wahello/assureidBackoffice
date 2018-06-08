import React, { Component } from "react";
import Meteor, { Accounts, createContainer } from "react-native-meteor";
import { Text, View, Image, Modal, Alert, TouchableHighlight, TouchableOpacity, Dimensions} from "react-native";
import styles from "./styles.js";
import { Icon } from "react-native-elements";
var moment = require('moment');

class ShowNotificationChild extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notificationData : []
    };
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
          notificationData : nextProps.notificationData,
      });    
  }

  render() {
    return(
          <View style={{paddingHorizontal:10,paddingVertical:10}}>
                  { this.state.notificationData ?
                    this.state.notificationData.map((data,index)=>{
                      return(
                              <View key={index} style={{flex:1, flexDirection: 'column', borderBottomColor:'#000', paddingVertical:10}}>
                                <View style={{flex:1}}><Text>{data.notifBody}</Text></View>
                                <View style={{flex:1, flexDirection: 'row'}}>
                                  <View style={{flex:0.1}}><Icon size={25} name='clock' type='evilicon' color='#ddd'/></View>
                                  <View style={{flex:0.4}}><Text style={{color:'#ddd'}}>{moment(data.date).startOf('hour').fromNow()}</Text></View>
                                </View>
                              </View>
                      );
                    })

                  :
                   <View><Text></Text></View>
                  }
          </View>
    );
  }
}


ShowNotification = createContainer( (props) => {

      const postHandle       = Meteor.subscribe('userNotification');
      const notificationData = Meteor.collection('notification').find({"toUserId": Meteor.userId()}) || [];

      var result =  {
          notificationData : notificationData,
      };
      console.log('result:',result);
      return result;

}, ShowNotificationChild);
export default ShowNotification;