import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;
const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  loginText: {
    ...font.fs16SB,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 1,
    borderColor: color.bdTheme,
    borderBottomWidth: 0.5
  },
  emailInput: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: color.bdTheme,
    marginVertical: 15
  },
  genderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 50
  },
  maleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60
  },
  FemaleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  forgotText: {
    ...fonts.fs18R,
    color: color.blackTheme
  },
  genderText: {
    ...fonts.fs18R,
    // letterSpacing: 1,
    marginLeft: 10
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    height: 45,
    width: '90%',
    backgroundColor: color.blackTheme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  signUpBtnText: {
    ...fonts.fs14SB,
    letterSpacing: 0.2,
    color: color.white,
  },
  logoView: {
    justifyContent: 'center',
    paddingRight: 15
  },
  socialButton: {
    marginVertical: 15,
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  googleLogoView: {
    height: 45,
    width: 50,
    backgroundColor: '#487be3',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontSize: 30,
    color: '#fff'
  },
  googleBtnTextView: {
    flex: 1,
    backgroundColor: '#4e89f8',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  googleBlankView: {
    height: 45,
    width: 50,
    backgroundColor: '#4e89f8',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  loaderCon: {
    flex: 1,
    position: 'absolute',
    height: height,
    width: deviceWidth,
    zIndex: 9999
  },
  // ---------------------- Bottom styles  --------------------
  bottomImageView: {
    flexDirection: 'row',
    position: 'absolute',
    height: height,
    bottom: 0
  },
  leftImageContainer: {
    width: deviceWidth / 2,
    height: height,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  rightImageContainer: {
    width: deviceWidth / 2,
    height: height,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
})
export default styles;