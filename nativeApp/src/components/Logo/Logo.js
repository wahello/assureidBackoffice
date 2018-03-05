import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "./styles";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ maxWidth:200, maxHeight:50,}}
          // resizeMode="center"
          source={require("./../../images/IDlogoGrey.png")}
        />
      </View>
    );
  }
}
