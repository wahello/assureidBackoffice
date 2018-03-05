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
  card:{
    backgroundColor:'#fff',
    padding:0,
    width:window.width-30,
    // borderRadius:5,
    marginBottom: 10,
    alignSelf: 'center',
    // borderColor: '#000',
    borderTopColor:'#bbb',
    borderBottomColor:'#bbb',
    borderRightColor:'#bbb',
  	borderLeftWidth: 3,
    borderLeftColor:'#f7ac57',
  },
  cardHeader:{
  	flex:1,
  	flexDirection:'row',
  	backgroundColor:'#fff',
  	paddingVertical:6,
  	borderBottomWidth:1,
  	borderBottomColor:'#bbb'
  },
  productInfo:{
  	flex:0.5,
  	alignItems:'center',
  	justifyContent:'center',
  	paddingVertical:8,
  	borderRightWidth:1,
  	borderRightColor:'#bbb'
  },
  modalContent: {
		backgroundColor: 'white',
		width:window.width - 40,
		paddingVertical:40,
    paddingHorizontal:10,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	halfDropdown:{
    width: (window.width - 80) / 2,
  },
  buttonDelete:{
    width: (window.width - 80) / 2,
    height: 50,
    backgroundColor: '#0000ff'
  },
  buttonClose:{
    width: (window.width - 80) / 2,
    height: 50,
    backgroundColor: '#f7ac57'
  },
});