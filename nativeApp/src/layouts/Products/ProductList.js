import React,{Component } from 'react';
import PropTypes from 'prop-types';
import {Platform, ScrollView, StyleSheet, Text,
TouchableOpacity, TextInput, View,  BackHandler, Alert,
 Image, BackAndroid, findNodeHandle, DrawerLayoutAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Card, Button, Icon, SearchBar  } from 'react-native-elements';
import Meteor, {createContainer} from 'react-native-meteor';
import SideMenu from 'react-native-side-menu';
import RNExitApp from 'react-native-exit-app';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import SearchInput, { createFilter } from 'react-native-search-filter';

import styles from './styles.js';
import Menu from '../../components/Menu/Menu.js';
import Loading from '../../components/Loading/Loading.js';

class ProductList extends React.Component {
  constructor(props){
    super(props);
    let name ="";
    if(this.props.userName)
      name = "Welcome " + this.props.userName;
    this.state={
      name:name,
      isOpen: false,
      selectedItem: 'About',
      isModalVisible: false,
      typeData: [],
      subData: [],
      languageValue: '',
      typeValue: '',
      productValue:'',
      searchProductText: '',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
  }
  handleView(){
    Actions.ViewCustomer();
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this.androidBackHandler.bind(this));
  }
  androidBackHandler(){
    console.log(this.props.navigation.state.routeName );
    if(this.props.navigation.state.routeName != 'ServiceList'){
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
  }
  toggle() {
    console.log('is open ' + this.state.isOpen);
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
    console.log('Logout function!');
    Meteor.logout();
    Actions.LogIn();
  }
  openDrawer(){
    console.log('opening drawer!');
          this.drawer.openDrawer();
  }
  closeDrawer(){
    console.log('opening drawer!');
          this.drawer.closeDrawer();
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  handleLangChange(langValue,productData) {

    console.log("langValue = ",langValue);
    // console.log("productData = ",productData);

    var result = productData.filter(x=> {
      return x.newspaperLanguage === langValue;
    }).map(x=> {
      return ({'value': x.newspaperType});
    });

    // var typeData = result.map(x=> {
    //   return ({'value': x.newspaperType});
    // });

    result = result.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
          t.value === obj.value
        ));
    });

    // this.setState({typeData: []});
    this.setState({typeData: result, languageValue: langValue});
    // console.log("result = ",result);
    // console.log("lang: typeValue = ",this.state.typeValue);
    // this.typeDropdown.clear();
    // console.log("typeData = ",typeData);
  }

  handleTypeChange(typeValue,productData) {
    var langValue = this.state.languageValue;
    // console.log("typeValue = ",typeValue);
    // console.log("productData = ",productData);
    // console.log("langValue = ",langValue);

    // console.log("product data = ",productData);

    var result = productData.filter(x=> {
      return ((x.newspaperLanguage === langValue) && (x.newspaperType === typeValue ));
    }).map(x=> {
      return ({'value': x.prodTitle});
    });

    this.setState({subData: result, typeValue: typeValue});
    // console.log("prod result = ",result);
  }

  addProduct = () => {
    var formValues = {
      'language'      : this.state.languageValue,
      'type'          : this.state.typeValue,
      'productTitle'  : this.state.productValue,
    }
    // console.log("formValues = ",formValues);

    Meteor.call('insertVendorProduct',formValues,(error,result) =>{
      if(error){
        // console.log("ERROR....................");

        Alert.alert(
          'Something went wrong !!',
        )
      }else{
        // console.log("modal state :::: ",this.state.isModalVisible);
        // Alert.alert(
        //   '','Product has been added successfully!',
        // )
        if(result){
          // console.log("SUCCESS....................");

          console.log("product id =::::: ",result);
          this.props.navigation.navigate('EditProduct',{productId:result});
        }else{
          console.log('no id');
        }

      }
    });
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this._toggleModal();
  }

  searchUpdated(text){
    this.setState({ searchProductText: text })
  }

  displayProductList = () => {
    const { vendorProducts }  = this.props;
    const KEYS_TO_FILTERS = ['productTitle','productLanguage','productType'];

    const filteredProducts = vendorProducts.filter(createFilter(this.state.searchProductText, KEYS_TO_FILTERS))
    // console.log("filteredProducts => ",filteredProducts);

    if(!this.props.loading){
      return(<Loading />);
    }

    if(filteredProducts.length === 0){
      return(
        <Text style={{textAlign:'center'}}>No Products Found !!</Text>
      );
    }

    return (
      filteredProducts.map((item,i) =>
        <TouchableOpacity key={i} onPress={()=> this.props.navigation.navigate('ViewProduct',{productId:item._id})}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>

              <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                <Image
                  style={{width:40, height:40, borderRadius:20 }}
                  resizeMode="stretch"
                  source={{uri: item.productLogo }}
                />
              </View>
              <View style={{flex:0.7,justifyContent:'center'}}>
                <Text style={{fontSize:18}}>{item.productTitle}</Text>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'row', backgroundColor:'#ddd'}}>
              <View style={styles.productInfo}>
                <Text>{item.productType}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text>{item.productLanguage}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )
    );

  }

  render(){
    const { productData }     = this.props;
    const { vendorProducts }  = this.props;
    const KEYS_TO_FILTERS = ['productTitle'];

    // console.log("vendorProducts = ",vendorProducts);
    // console.log("search text = ",this.state.searchProductText);

    const filteredProducts = vendorProducts.filter(createFilter(this.state.searchProductText, KEYS_TO_FILTERS))
    // console.log("filteredProducts = ",filteredProducts);

    let langData = [];
    for(i=0;i<productData.length;i++){
      langData.push({
        'value':  productData[i].newspaperLanguage
      });
    }

    langData = langData.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
          t.value === obj.value
        ));
    });

    const {navigate} = this.props.navigation;
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
              centerComponent={{ text: "Pamtap", style: { color: '#fff' } }}
              leftComponent={
                <TouchableOpacity  onPress={this.toggle} >
                  <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                </TouchableOpacity>
              }
              outerContainerStyles={{borderBottomWidth:0, backgroundColor: '#f7ac57',height:60,paddingTop:0,margin:0}}
              innerContainerStyles={{marginTop:0,paddingTop:0}}
              rightComponent={<View style={{flex:1, flexDirection:'row',alignItems:'flex-end', minHeight:20, minWidth:20}}>
                      <TouchableOpacity onPress={this.openDrawer}>
                          <Icon name="bell-outline" type="material-community" size={30}  color="#fff" style={styles.bellIcon}/>
                          <Text style={styles.notificationText}>9</Text>
                    </TouchableOpacity>
                  </View>
                  }
              />

              <Header
                centerComponent={{ text: 'My Products', style: { color: '#fff', fontSize: 20 } }}

                rightComponent={
                  <TouchableOpacity onPress={this._toggleModal}>
                      <Icon size={35} name="plus-box" type="material-community" color="#fff" />
                  </TouchableOpacity>
                }
                outerContainerStyles={{ backgroundColor: '#f7bc79',height:60}}
                innerContainerStyles={{ alignItems: 'center'}}
              />

            <View style={{flex:1,margin: 10,flexDirection:'row',borderWidth:1,borderColor:'#bbb'}}>
              <SearchBar
                round
                containerStyle={{flex:9,borderWidth:0,borderTopWidth:0,borderBottomWidth:0}}
                inputStyle={{margin:0,backgroundColor:'#fff',borderRadius:0,color:'#000'}}
                noIcon
                placeholder='Search Here...'
                onChangeText = {(text) => this.searchUpdated(text)}
              />
              <Icon containerStyle={{flex:1}} name="search" type="font-awesome" size={16} color="#6d6e70" />
            </View>

            {this.displayProductList()}


            <Modal isVisible={this.state.isModalVisible}
              backdropColor={'black'}
              backdropOpacity={.9}
            >
              <View style={styles.modalContent}>
                <View style={{justifyContent:'center',alignItems:'center',}}>
                  <Text>Add Product</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
                  <Dropdown baseColor="#aaa"
                        containerStyle={styles.halfDropdown}
                        inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:'#aaa'}}
                        label='Language'
                        labelHeight={20}
                        rippleInsets={{bottom:-25,top:0}}
                        labelTextStyle={{textAlign:'center'}}
                        data={langData}
                        onChangeText  = {(value) => this.handleLangChange(value,productData)}
                        value={this.state.languageValue}
                      />
                  <Dropdown baseColor="#aaa"
                        containerStyle={styles.halfDropdown}
                        inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:'#aaa'}}
                        label='Type'
                        labelHeight={20}
                        rippleInsets={{bottom:-25,top:0}}
                        labelTextStyle={{textAlign:'center'}}
                        data={this.state.typeData}
                        onChangeText  = {(value) => this.handleTypeChange(value,productData)}
                        defaultValue={this.state.typeValue}
                        ref={(_type) => this.typeDropdown = _type}
                      />
                </View>
                <View style={{marginBottom:25}}>
                  <Dropdown baseColor="#aaa"
                        inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:'#aaa'}}
                        label='Subsription name'
                        labelHeight={20}
                        rippleInsets={{bottom:-25,top:0}}
                        labelTextStyle={{textAlign:'center'}}
                        data={this.state.subData}
                        onChangeText = {(productValue) => this.setState({productValue})}

                      />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                  <Button onPress={this._toggleModal}  textStyle={{textAlign:'center'}} title="CANCEL" buttonStyle={styles.buttonDelete} />
                  <Button
                    onPress     = {this.addProduct}
                    textStyle   = {{textAlign:'center'}}
                    title       = "ADD PRODUCT"
                    buttonStyle = {styles.buttonClose}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </SideMenu>
    </DrawerLayoutAndroid>

    );
  }
}

export default createContainer(props => {
  const handle         = Meteor.subscribe('adminProductDetails');
  const vendorProducts = Meteor.subscribe('vendorProductDetails');
  var businessId       = Meteor.user().profile.activeServiceId;


  return{
    handle          : handle,
    subReady        : handle.ready(),
    productData     : Meteor.collection('productMaster').find({}) || [],
    vendorProducts  : Meteor.collection('VendorProduct').find({'businessId':businessId}) || [],
    loading         : vendorProducts.ready(),
  }
},ProductList);
