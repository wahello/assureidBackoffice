import React, { Component } from "react";
import {StyleSheet, Text, View, Image } from "react-native";
import styles from "./styles";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imgStyle}
          // resizeMode="center"
          source={require("./../../images/IDlogoGrey.png")}
        />
      </View>
    );
  }
}
