import React, { Component } from "react";
import Meteor,{ createContainer } from "react-native-meteor";
import { CameraKitCamera, CameraKitCameraScreen, CameraKitGalleryView } from 'react-native-camera-kit';
import { Alert,View, ScrollView } from "react-native";

class CameraChild extends React.Component{

  constructor(props){
    super(props);

    // console.log("this.props.navigation: ",JSON.stringify(this.props.navigation,null,4));
    // if(this.props.navigation.state.params && this.props.navigation.state.params.path){
    //   var path = this.props.navigation.state.params.path;
    // }else{
    //   var path = null;
    // }
    this.state = {
    }
  }


  componentDidMount(){
    // console.log('camera prop : ',this.props.navigate.state.params.ticket);
    this.setState({
                 });
  }

  onBottomButtonPressed(event) {
    // console.log(event.type);
    // console.log("this.refs: ",this.refs);
    // const captureImagesStack = JSON.stringify(event.captureImages,null,4);
    // var s3Data = this.props.s3Data;
    // console.log("s3Data = ",s3Data);

    const captureImagesStack1 = event.captureImages;

    // this.setState({
    //                     "imagesSelected" : captureImagesStack1,
    //              });
    // console.log('captureImagesStack1: ',captureImagesStack1);
    var recentImg = "file://"+captureImagesStack1[0].uri;
    // console.log('recentImg: ',recentImg);

    this.props.navigation.navigate('CameraView', { photoUri: recentImg, ticket: this.props.ticket });
    // event.captureImages = [];

  }


  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ',nextProps);
  }
  

  render() {
    // console.log('-------------------------------------');
    // console.log('this.state.imagesSelected: ',this.state.imagesSelected);
    return (
      <CameraKitCameraScreen
        ref         = {(cam) => {
                                    this.camera = cam; 
                                    // takePicture(this.camera);
                                    // this.takePicture();
                                    // const success = await this.camera.changeCamera();
                                    // console.log("cam:",cam);
                                    // console.log("success:",success);
                                  }
                      }
        actions     = {{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed = {this.onBottomButtonPressed.bind(this)}
        // onBottomButtonPressed = {(event) => this.takePicture()}
        flashImages = {{
          on   : require('../../images/flashOn.png'),
          off  : require('../../images/flashOff.png'),
          auto : require('../../images/flashAuto.png')
        }}
        // cameraOptions={{
        //   flashMode: 'auto',             // on/off/auto(default)
        //   focusMode: 'on',               // off/on(default)
        //   zoomMode: 'on',                // off/on(default)
        //   ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
        //   ratioOverlayColor: '#00000077' // optional
        // }}
        // selectedImages = {this.state.imagesSelected}
        cameraFlipImage    = {require('../../images/cameraFlipIcon.png')}
        captureButtonImage = {require('../../images/cameraButton.png')}
      />
    );
  }



  async onCheckCameraAuthoPressed() {
    const success = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
    if (success) {
      Alert.alert('You have permission 🤗')
    }
    else {
      Alert.alert('No permission 😳')
    }
  }


}

Camera = createContainer( (props) => {

  console.log('ticket : ',props.navigation.state.params.ticket);
  var result =  {
      "ticket" : props.navigation.state.params.ticket,
  };

  return result;

}, CameraChild);
export default Camera;