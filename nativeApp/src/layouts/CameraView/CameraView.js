import React, { Component } from "react";
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';
import { ScrollView, Text, TouchableOpacity, Image, View} from "react-native";


export default class CameraView extends React.Component{

  render(){

    return(

        <View>
            <Text> Show image </Text>
            console.log(this.props.img);
            <Image
            source={{ uri: this.props.img }}
            />
        </View>
    );
  }
}
