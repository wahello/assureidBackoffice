import React from 'react';
import PropTypes from 'prop-types';
import {
  LayoutAnimation,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Meteor from 'react-native-meteor';
import { Icon, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#fff',
  },
  avatarContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
    padding: 40,
    backgroundColor:'gray'
  },
  avatar: {
    height: 70,
    width: 150,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '600',
    padding: 20,
    color:'#666'
  },
  menuView: {
    paddingLeft: 20,
    paddingRight:20
  },
  menuRow:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth:1,
    borderColor: '#444'
  },
  subMenuRow:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth:1,
    marginLeft: 20,
    borderColor: '#444'
  },
  linearGradient:{
    padding:20,
    paddingTop:50,
  }
});

export default class Menu extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      expandHome:false,
      expandDashboard:false,
      expandSetup:false,
      expandProduct:false,
      expandDelivery:false,
      expandIcon:'plus',
      expandSetupIcon:'plus',
      expandDeliveryIcon:'plus',
      expandProductIcon:'plus',
      expandDashboardIcon:'plus'
    };

  }
  handleLogout(){
    console.log('Logout function!');
    Meteor.logout();
  }
  handleExpandHome=()=>{
    let expandHome = !this.state.expandHome;
    this.setState({expandHome});
    if(expandHome)
      this.setState({expandIcon:'minus'});
    else
      this.setState({expandIcon:'plus'});
  }
  handleExpandSetup=()=>{
    let expandSetup = !this.state.expandSetup;
    this.setState({expandSetup});
    if(expandSetup)
      this.setState({expandSetupIcon:'minus'});
    else
      this.setState({expandSetupIcon:'plus'});
  }
  handleExpandProduct=()=>{
    let expandProduct = !this.state.expandProduct;
    this.setState({expandProduct});
    if(expandProduct)
      this.setState({expandProductIcon:'minus'});
    else
      this.setState({expandProductIcon:'plus'});
  }
  handleExpandDashboard=()=>{
    let expandDashboard = !this.state.expandDashboard;
    this.setState({expandDashboard});
    if(expandDashboard)
      this.setState({expandDashboardIcon:'minus'});
    else
      this.setState({expandDashboardIcon:'plus'});
  }
  handleExpandDelivery=()=>{
    let expandDelivery = !this.state.expandDelivery;
    this.setState({expandDelivery});
    if(expandDelivery)
      this.setState({expandDeliveryIcon:'minus'});
    else
      this.setState({expandDeliveryIcon:'plus'});
  }
  render(){
    var userData  = Meteor.user().profile;

    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <LinearGradient colors={['(rgb(30, 87, 153) 0%', 'rgb(41, 137, 216) 50%', 'rgb(32, 124, 202) 51%', 'rgb(125, 185, 232) 100%)']} style={styles.linearGradient}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Avatar
                overlayContainerStyle={{flex:1}}
                width={50}
                height={40}
                rounded
                source={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <View style={{flex:3, height:50,left:0,right:0,paddingLeft:15,justifyContent:'flex-start', alignItems:'flex-start'}}>
                <Text style={{flex:1,color:'#fff'}}>
                  {userData.firstName} {userData.lastName}
                </Text>
               {/* <Text style={{flex:1,color:'#fff'}}>
                  {userData.activeServiceName}
                </Text>
                <Text style={{flex:1,color:'#fff'}}>
                  {userData.activeServiceType} Service
                </Text>*/}
              </View>
            </View>
        </LinearGradient>
        <View style={styles.menuView}>
        {/*  <View >
            <TouchableOpacity style={styles.menuRow} onPress={ ()=> this.props.navigate('ServiceList')}>
              <Icon size={25} name='home' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                My Services
              </Text>
            </TouchableOpacity>
          </View>*/}
          <View style={styles.menuRow}>
            <TouchableOpacity onPress={()=> this.props.navigate('Dashboard')} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='dashboard' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                Home
              </Text>
            </TouchableOpacity>
           {/* <Icon size={15} onPress={this.handleExpandDashboard} name={this.state.expandDashboardIcon} type='font-awesome' color='#666' />*/}
          </View>
         {/* { this.state.expandDashboard ?
            <View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={ ()=> this.props.navigate('DeliveriesLine')}>
                  <Icon size={25} name='dashboard' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Delivery
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('LogIn')}>
                  <Icon size={25} name='dashboard' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Reports
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }*/}
          <View style={styles.menuRow}>
            <TouchableOpacity  onPress={()=> this.props.navigate('ListOfTickets')}  style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='credit-card' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                All Tickets
              </Text>
            </TouchableOpacity>
          {/*  <Icon size={15} onPress={this.handleExpandHome} name={this.state.expandIcon} type='font-awesome' color='#666' />*/}
          </View>
         {/* { this.state.expandHome ?
            <View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('ViewBill')}>
                  <Icon size={25} name='credit-card' type='material-community' color='#666' />
                  <Text style={styles.item}  >
                    View Bill
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('ViewCollection')}>
                  <Icon size={25} name='credit-card' type='material-community' color='#666' />
                  <Text style={styles.item}  >
                    Collection
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }*/}
          <View style={styles.menuRow}>
            <TouchableOpacity onPress={this.handleExpandDelivery} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='truck' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                New Tickets
              </Text>
            </TouchableOpacity>
            {/*<Icon size={15} onPress={this.handleExpandDelivery} name={this.state.expandDeliveryIcon} type='font-awesome' color='#666' />*/}
          </View>
         {/* { this.state.expandDelivery ?
            <View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={ ()=> this.props.navigate('CustomerHoliday')}>
                  <Icon size={25} name='truck' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Customer Holiday
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('LogIn')}>
                  <Icon size={25} name='truck' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Newspaper Holiday
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('ExtraReduced')}>
                  <Icon size={25} name='truck' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Add Extra / Reduce Paper
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }*/}
          <View style={styles.menuRow}>
            <TouchableOpacity onPress={this.handleExpandProduct} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='gears' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                Completed Tickets
              </Text>
            </TouchableOpacity>
            <Icon size={15} onPress={this.handleExpandProduct} name={this.state.expandProductIcon} type='font-awesome' color='#666' />
          </View>
          { this.state.expandProduct ?
            <View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={ ()=> this.props.navigate('CustomerArea')}>
                  <Icon size={25} name='gears' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Accepted
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>this.props.navigate('ProductList')}>
                  <Icon size={25} name='gears' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Rejected
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }

          <View style={styles.menuRow}>
            <TouchableOpacity onPress={this.handleExpandSetup} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='gears' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                Reopened Tickets
              </Text>
            </TouchableOpacity>
           {/* <Icon size={15} onPress={this.handleExpandSetup} name={this.state.expandSetupIcon} type='font-awesome' color='#666' />*/}
          </View>
         {/* { this.state.expandSetup ?
            <View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=> this.props.navigate('MyProfile')}>
                  <Icon size={25} name='gears' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    My Profile
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subMenuRow} >
                <TouchableOpacity style={{flexDirection:'row',flex:1}}
                  onPress={()=>this.props.navigate('AdditionalSetting',{'businessId':userData.activeServiceId})}>
                  <Icon size={25} name='gears' type='font-awesome' color='#666' />
                  <Text style={styles.item}  >
                    Additional Setting
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }
*/}
          <View style={styles.menuRow}>
            <TouchableOpacity onPress={this.handleExpandSetup} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='gears' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                Escalated Tickets
              </Text>
            </TouchableOpacity>
           {/* <Icon size={15} onPress={this.handleExpandSetup} name={this.state.expandSetupIcon} type='font-awesome' color='#666' />*/}
          </View>
          <View style={styles.menuRow}>
            <TouchableOpacity onPress={()=> this.props.navigate('MyProfile')} style={{flexDirection:'row',flex:1}} >
              <Icon size={25} name='gears' type='font-awesome' color='#666' />
              <Text style={styles.item}>
                Profile
              </Text>
            </TouchableOpacity>
           {/* <Icon size={15} onPress={this.handleExpandSetup} name={this.state.expandSetupIcon} type='font-awesome' color='#666' />*/}
          </View>
          <View >
            <TouchableOpacity style={[styles.menuRow,{borderBottomWidth:0}]} onPress={this.handleLogout}>
              <Icon size={25} name='logout' type='material-community' color='#666' />
              <Text style={styles.item}  >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
