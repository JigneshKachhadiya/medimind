import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from './color';
import fonts from './font';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get('window').height;

export default commonStyle = {
  container: {
    flex: 1
  },
  // ------------------  Padding  -----------------
  padding10: {
    padding: 10
  },
  pv10: {
    paddingVertical: 10
  },
  ph10: {
    paddingHorizontal: 10
  },
  ph15: {
    paddingHorizontal: 15
  },
  pv20: {
    paddingVertical: 20
  },
  ph20: {
    paddingHorizontal: 20
  },
  ph25: {
    paddingHorizontal: 25
  },
  ph30: {
    paddingHorizontal: 30
  },
  // ------------------  Top  -----------------  
  pdT5: {
    paddingTop: 5
  },
  pdT10: {
    paddingTop: 10
  },
  pdT15: {
    paddingTop: 15
  },
  pdT20: {
    paddingTop: 20
  },
  pdT30: {
    paddingTop: 30
  },
  // ------------------  Left  -----------------  
  pdL5: {
    paddingLeft: 5
  },
  pdL10: {
    paddingLeft: 10
  },
  pdL15: {
    paddingLeft: 15
  },
  pdL20: {
    paddingLeft: 20
  },
  // ------------------  Right  -----------------  
  pdR5: {
    paddingRight: 5
  },
  pdR10: {
    paddingRight: 10
  },
  pdR15: {
    paddingRight: 15
  },
  pdR20: {
    paddingRight: 20
  },
  // ------------------  Bottom  -----------------  
  pdB5: {
    paddingBottom: 5
  },
  pdB10: {
    paddingBottom: 10
  },
  pdB15: {
    paddingBottom: 15
  },
  pdB20: {
    paddingBottom: 20
  },
  // -----------------------------------------------
  fdRow: {
    flexDirection: 'row'
  },
  flex1: {
    flex: 1
  },
  jcCntr: {
    justifyContent: 'center'
  },
  aiCntr: {
    alignItems: 'center'
  },
  aiTextCntr: {
    textAlign: 'center'
  },
  jcaiCntr: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  // -------------- Margin -----------------
  marginH10: {
    marginHorizontal: 10
  },
  marginH15: {
    marginHorizontal: 15
  },
  marginH20: {
    marginHorizontal: 20
  },
  marginV10: {
    marginVertical: 10
  },
  marginV15: {
    marginVertical: 15
  },
  marginV20: {
    marginVertical: 20
  },
  // ------------------  Top  -----------------  
  mrT5: {
    marginTop: 5
  },
  mrT10: {
    marginTop: 10
  },
  mrT15: {
    marginTop: 15
  },
  mrT20: {
    marginTop: 20
  },
  mrT25: {
    marginTop: 25
  },
  mrT30: {
    marginTop: 30
  },
  // ------------------  Right  -----------------    
  mrR5: {
    marginRight: 5
  },
  mrR10: {
    marginRight: 10
  },
  mrR15: {
    marginRight: 15
  },
  mrR20: {
    marginRight: 20
  },
  // ------------------  Left  -----------------  
  mrL5: {
    marginLeft: 5
  },
  mrL10: {
    marginLeft: 10
  },
  mrL15: {
    marginLeft: 15
  },
  mrL20: {
    marginLeft: 20
  },
  // ------------------  Bottom  -----------------  
  mrB5: {
    marginBottom: 5
  },
  mrB10: {
    marginBottom: 10
  },
  mrB15: {
    marginBottom: 15
  },
  mrB20: {
    marginBottom: 20
  },
  mrB10: {
    marginBottom: 10
  },
  // -------------------------------------------
  loaderCon: {
    flex: 1,
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    zIndex: 9999
  },

  homeTopBtn: {
    padding: 10
  },
  inputShadowView: {
    backgroundColor: '#f6f1ec',
    paddingBottom: 30,
    borderRadius: 80,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    shadowColor: color.ccc,
    borderWidth: 7,
    borderColor: color.white
  },
  inputView: {
    backgroundColor: color.white,
    borderRadius: 3,
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 17,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowColor: color.ccc
  },
  inputViewAbs: {
    backgroundColor: color.white,
    borderRadius: 3,
    justifyContent: 'center',
    position: 'absolute',
    width: deviceWidth - 40,
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowColor: color.ccc
  },
  inputBtnView: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: color.ccc
  },
  inputBtn: {
    paddingVertical: 10,
    width: 200,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: color.themeColor,
  },

}
