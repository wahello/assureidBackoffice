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
      path : 'path',
      imagesSelected : [],
    }
  }


  componentDidMount(){
    // console.log('camera prop : ',this.props.navigate.state.params.ticket);
    this.setState({
                        "path" : "abc",
                 });
  }

  onBottomButtonPressed(event) {
    // console.log(event.type);
    // console.log("this.refs: ",this.refs);
    // const captureImagesStack = JSON.stringify(event.captureImages,null,4);
    // var s3Data = this.props.s3Data;
    // console.log("s3Data = ",s3Data);

    const captureImagesStack1 = event.captureImages;

    this.setState({
                        "imagesSelected" : captureImagesStack1,
                 });
    // console.log(captureImagesStack1);
    var recentImg = "file://"+captureImagesStack1[0].uri;
    console.log('recentImg: ',recentImg);

    this.props.navigation.navigate('CameraView', { photoUri: recentImg, ticket: this.props.ticket });
    // event.captureImages = [];

  }


  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ',nextProps);
  }

// browseFile(event){
//     event.preventDefault();
//     var id = Meteor.userId();
//     console.log("id => ",id);
//     var s3Data = this.props.s3Data;

//     console.log("s3Data = ",s3Data);

//     DocumentPicker.show({ filetype : [DocumentPickerUtil.images()]},(error,res) => {
//                           // Android
//                           console.log("Result:: ",res);
//                           var fileName = id+'_'+res.fileName;
//                           var fileExt = fileName.split('.').pop();  

//                           var file = {
//                             uri   : res.uri,
//                             name  : fileName,
//                             type  : res.type,
//                           }
                          
//                           // var prooftype    = "employement";
//                           // var proofSubtype = "editEmployementDetails";
//                           const options = {
//                             keyPrefix           : "uploads/",
//                             bucket              : s3Data.bucket,
//                             region              : s3Data.region,
//                             accessKey           : s3Data.key,
//                             secretKey           : s3Data.secret,
//                           }

//                           RNS3.put(file, options).then((response) => {
//                             console.log("------------response---------------");
//                             console.log('response: ',response);
//                             if (response.status !== 201)
//                               throw new Error("Failed to upload image to S3");
//                             console.log("=========  response.body  ==================");
//                             console.log(response.body);
//                             console.log("---------  response.body  ------------------");
                            
//                             var fileLocation = response.body.postResponse.location;
//                             var fileDetails = {
//                               fileName      : fileName,
//                               fileExt       : fileExt,
//                               fileLocation  : fileLocation,
//                             }
//                             console.log("fileDetails = ",fileDetails);
//                             /**
//                              * {
//                              *   postResponse: {
//                              *     bucket: "your-bucket",
//                              *     etag : "9f620878e06d28774406017480a59fd4",
//                              *     key: "uploads/image.png",
//                              *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
//                              *   }
//                              * }
//                              */
//                           }).catch((error) => console.log("Handled Exceptions image ",error));

//                         });    
//   }

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
        onBottomButtonPressed = {(event) => this.onBottomButtonPressed(event)}
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
        selectedImages = {this.state.imagesSelected}
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

  console.log(props.navigation.state.params.ticket);
  var result =  {
      "ticket"       : props.navigation.state.params.ticket,
  };

  return result;

}, CameraChild);
export default Camera;