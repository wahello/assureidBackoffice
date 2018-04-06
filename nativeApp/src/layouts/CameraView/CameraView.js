import React, { Component } from "react";
// import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';
// import { ScrollView, Text, TouchableOpacity, Image, View} from "react-native";
import { Text, View, Image, Dimensions} from "react-native";
import { Button } from 'react-native-elements';
const window = Dimensions.get('window');


// require the module
var RNFS = require('react-native-fs');

export default class CameraView extends React.Component{

  backToCamera(event){
    event.preventDefault();
    
    const file = this.props.navigation.state.params.photoUri;
    console.log('file14: ',file);

    const dirPicutures = `${RNFS.ExternalStorageDirectoryPath}/Pictures`;
    var filename = file.split('Pictures/')[1];
    const filePath = `${dirPicutures}/${filename}`;
    console.log('filePath: ',filePath);

    RNFS.exists(filePath)
    .then( (result) => {
        console.log("file exists: ", result);

        if(result){
          return RNFS.unlink(filePath)
            .then(() => {
              console.log('FILE DELETED');
              this.props.navigation.navigate('Camera', { path: "xyz" });
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              console.log('file del error: ',err.message);
            });
        }

      })
      .catch((err) => {
        console.log("file does not exist: ",err.message);
      });
  }

  render(){

    return(

        <View style = {{}}>
            {/*<Text> image: {JSON.stringify(this.props.navigation.state.params.photoUri)} </Text>*/}

            <View style={{zIndex : 1, position : 'absolute',backgroundColor:'rgba(52, 52, 52, 0.6)'}}> 
              <Button
                large
                icon = {{name: 'arrow-long-left', type: 'entypo' }}
                onPress = {this.backToCamera.bind(this)}
                buttonStyle={{ width : window.width, backgroundColor : 'transparent'}}
                />  
            </View>     
            <View>
                <Image
                      key = {this.props.navigation.state.params.photoUri }
                      style = {{ height: window.height, width: window.width, alignSelf: "center" }}
                      source = {{ uri: this.props.navigation.state.params.photoUri }}
                      resizeMode = "stretch"
                    />
            </View>
        </View>
    );
  }
}
