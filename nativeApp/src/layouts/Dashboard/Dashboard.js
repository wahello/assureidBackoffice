import React, { Component } from "react";
import Meteor, { Accounts, createContainer } from "react-native-meteor";

import { StyleSheet,Text,View,TextInput,BackHandler,TouchableOpacity, ScrollView, DrawerLayoutAndroid, Image} from "react-native";
import { Header, Button, Icon,Avatar} from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { robotoWeights } from 'react-native-typography';

import SideMenu from 'react-native-side-menu';
import PropTypes from "prop-types";

import styles from "./styles.js";
import Menu from '../../components/Menu/Menu.js';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;

    this.state = {
      name         : name,
      isOpen       : false,
      selectedItem : 'About',
      userData     : Meteor.user().profile,
    };

    this.openDrawer  = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle      = this.toggle.bind(this);
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  androidBackHandler= ()=>{
    // console.log(this.props.navigation.state.routeName );
    if(this.props.navigation.state.routeName != 'ServiceList'){
      this.props.navigation.goBack(null);
      return true;
    }
    return true;
  }
  toggle() {
    // console.log('is open ' + this.state.isOpen);
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
      selectedItem: item,
  });

  handleLogout(){
    // console.log('Logout function!');
    Meteor.logout();
    Actions.LogIn();
  }
  openDrawer(){
    // console.log('opening drawer!');
          this.drawer.openDrawer();
  }
  closeDrawer(){
    // console.log('opening drawer!');
          this.drawer.closeDrawer();
  }

  render(){
    const { navigate,goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} userName={this.props.userName}/>;
    
    var navigationView = (
      <ScrollView style={{backgroundColor: '#fbae16'}} createContainerstyle={{flex: 1,backgroundColor: '#fbae16'}}>
        <View style={{borderBottomWidth: 1, padding:10, borderColor: '#fff'}}>
          <View style={{maxHeight: 30, flexDirection:'row', justifyContent: 'flex-start'}} >
            <TouchableOpacity onPress={this.closeDrawer} >
              <View>
                <Icon size={25} name='close' type='evilicon' color='#000' />
              </View>
            </TouchableOpacity>
            <Text style={{textAlign:'center',flex: 1, lineHeight: 30, fontSize: 30, color: '#fff'}}>
              NOTIFICATION
            </Text>
          </View>
        </View>
        <View>
          <Text style={{textAlign:'center',fontWeight:'bold', fontSize: 20,paddingTop: 10}}>Newly Added</Text>
        </View>
      </ScrollView>
    );
    return(
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(_drawer) => this.drawer = _drawer}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => navigationView}>
        <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
          <View style={{ flex: 1, backgroundColor: '#FFF',borderWidth:0,padding:0}}>
            <ScrollView createContainerStyle={{marginBottom: 25,borderWidth:0,margin:0}}>
              <Header
                centerComponent={{ text: "ASSUREID", style: { color: '#fff',fontWeight:'bold' } }}
                leftComponent={
                  <TouchableOpacity  onPress={this.toggle} >
                    <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                  </TouchableOpacity>
                }
                outerContainerStyles={{borderBottomWidth:0, backgroundColor: '#367fa9',height:60,paddingTop:0,margin:0}}
                innerContainerStyles={{marginTop:0,paddingTop:0}}
                rightComponent={
                  <View style={{flex:1, flexDirection:'row',alignItems:'flex-end', minHeight:20, minWidth:20}}>
                    <TouchableOpacity onPress={this.openDrawer}>
                      <Icon name="bell-outline" type="material-community" size={30}  color="#fff" style={styles.bellIcon}/>
                      <Text style={styles.notificationText}>9</Text>
                    </TouchableOpacity>
                  </View>
                    }
              />
              <View  style={{backgroundColor:'#fff',height:175,borderBottomWidth:1,borderColor:'#f2f2f2', shadowOffset: {
                width: 0,
                height: 3
                },
                elevation:3,
                shadowRadius: 5,
                shadowOpacity: 2.0}}>
                <View style={{flex:1,flexDirection:'row',padding:10}}>
                  <View style={{flex:0.4}}>
                    { this.state.userData.userProfile ?
                      <Avatar
                       width={90}
                       height={90}
                       rounded
                       source={{uri:this.state.userData.userProfile}}
                       activeOpacity={0.7}
                      /> 
                    : 
                      <Avatar
                       width={90}
                       height={90}
                       rounded
                       source={require("../../images/Vinod.png")}
                       activeOpacity={0.7}
                      /> 
                    }
                  </View> 
                  <View style={{flex:0.7,flexDirection:'row',marginTop:10}}>
                    <View style={{flex:.3}}>
                      <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                        <Text style={{flexDirection:'row',padding:3,borderWidth:2,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,paddingTop:1,backgroundColor:'#f2f2f2'}}>2</Text>
                        <Text style={{flexDirection:'row',padding:3,borderWidth:2,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',paddingTop:1,backgroundColor:'#f2f2f2'}}>1</Text>
                      </View>
                      <View style={{flex:1}}>
                        <Text style={[(robotoWeights.regular),{fontSize:10,color:'#333333',textAlign:'center'}]}>DATE</Text>
                      </View>
                    </View>
                    <View style={{flex:.3}}>
                      <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,paddingTop:1,backgroundColor:'#f2f2f2'}}>0</Text>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',paddingTop:1,backgroundColor:'#f2f2f2'}}>5</Text>
                      </View>
                      <View style={{flex:1}}>
                        <Text style={[(robotoWeights.regular),{fontSize:10,color:'#333333',textAlign:'center'}]}>MONTH</Text>
                      </View>
                    </View>
                    <View style={{flex:.4,paddingRight:10}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,marginLeft:15,paddingTop:1,backgroundColor:'#f2f2f2'}}>2</Text>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,paddingTop:1,backgroundColor:'#f2f2f2'}}>0</Text>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,paddingTop:1,backgroundColor:'#f2f2f2'}}>1</Text>
                        <Text style={{flexDirection:'row',borderWidth:2,padding:3,borderColor:'#ccc',height:25,borderRadius:5,fontWeight:'bold',fontSize:15,textAlign:'center',marginRight:3,paddingTop:1,backgroundColor:'#f2f2f2'}}>8</Text>
                      </View>
                      <View style={{flex:1}}>
                        <Text style={[(robotoWeights.regular),{fontSize:10,color:'#333333',textAlign:'center'}]}>YEAR</Text>
                      </View>
                    </View> 
                  </View>
                </View>
                <View style={{padding:10,marginBottom:10}}>
                  <Text style={[(robotoWeights.bold),{fontSize:18,color:'#3c8dbc',textAlign:'left',paddingVertical:2}]}>Hello {this.state.userData ? this.state.userData.firstname : 'User'} {this.state.userData ? this.state.userData.lastname : null},</Text>
                  <Text style={[(robotoWeights.regular),{fontSize:15,color:'#666666',textAlign:'left',}]}>You have 20 Tickets Pending</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',flex:1,marginTop:5}}>
                <View style={{flex:.5}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('NewTickets')}>
                    <View style={{flex:.5,paddingHorizontal:10,paddingVertical:10}}>   
                      <View style={{flex:.5, backgroundColor:'#33b5e5',}}>
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#333333',textAlign:'center',paddingVertical:15}]}>New</Text>
                          <Image
                            style={{ width:45, height:45, marginVertical: 2,alignSelf:"center" }}
                            source={require("../../images/New_40px_X_40px.png")}
                          />
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#fff',textAlign:'center',paddingVertical:15}]}>10 Since 21 April 18</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:.5}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('AllocatedTickets')}>
                    <View style={{flex:.5,paddingHorizontal:10,paddingVertical:10}}>
                      <View style={{flex:.5, backgroundColor:'#00c851',}}>
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#333333',textAlign:'center',paddingVertical:15}]}>Allocated</Text>
                           <Image
                          style={{ width:45, height:45, marginVertical: 2,alignSelf:"center" }}
                          source={require("../../images/Allocated_40px_X_40px.png")}
                        />
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#fff',textAlign:'center',paddingVertical:15}]}>10 Since 21 April 18</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:.5}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('CompletedRejectedTickets')}>
                    <View style={{flex:.5,paddingHorizontal:10,marginBottom:15}}>
                      <View style={{flex:.5, backgroundColor:'#ff4444',paddingHorizontal:10,}}>
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#333333',textAlign:'center',paddingVertical:15}]}>Esclated</Text>
                           <Image
                          style={{ width:45, height:45, marginVertical: 2,alignSelf:"center"}}
                          source={require("../../images/Esclated_40px_X_40px.png")}
                        />
                         <Text style={[(robotoWeights.bold),{fontSize:15,color:'#fff',textAlign:'center',paddingVertical:15}]}>10 Since 21 April 18</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:.5}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('ReopenedTickets')}>
                    <View style={{flex:.5,paddingHorizontal:10}}>
                      <View style={{flex:.5, backgroundColor:'#33b5e5',paddingHorizontal:10,}}>
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#333333',textAlign:'center',paddingVertical:15}]}>Re-Open</Text>
                           <Image
                          style={{ width:45, height:45, marginVertical:2,alignSelf:"center"}}
                          source={require("../../images/Re-Open_40px_X_40px.png")}
                        />
                        <Text style={[(robotoWeights.bold),{fontSize:15,color:'#fff',textAlign:'center',paddingVertical:15}]}>10 Since 21 April 18</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center",marginTop: 0}}>
                <Button
                  onPress={this.handleSignIn}
                  buttonStyle={styles.buttonLarge}
                  title="Completed Tickets (20)"
                  titleStyle={{fontWeight: "800"}}
                />
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      </DrawerLayoutAndroid>
    );
  }
}

