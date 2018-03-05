import {StyleSheet,Dimensions} from 'react-native';
const window = Dimensions.get('window');

export default StyleSheet.create({
	bellIcon: {
    right: 0,
    top: 25,
    fontWeight: "100"
  },
  notificationText: {
    position: 'absolute',
    right: 0,
    top: 3,
    borderRadius: 9,
    width: 18,
    height: 18,
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#fbae16'
  },
  servicesHeader:{
		backgroundColor:'#f7ac57',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 0,
    height: (window.height)*0.3,
	},
	headerText:{
		color:'#fff',
		fontSize: 30,
		marginBottom: 30,
	},
	serviceListWrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
  },
  imgWrapper:{
    width:'50%',
    alignItems: 'center',
    padding: 15,
  },
  imgDisplay:{
    // backgroundColor: '#eee',
    height:100,
    width:100, 
  },
  
});
