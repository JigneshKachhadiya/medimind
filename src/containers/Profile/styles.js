import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  imgIconSize: {
    height: 18,
    width: 18
  },
  imageView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  smallTitleText: {
    marginVertical: 5,
    ...font.fs10R,
    color: color.textInput75
  },
  dividerView: {
    height: 8,
    width: '100%',
    backgroundColor: color.e4e4
  },
  smallDivider: {
    height: 2,
    width: '100%',
    backgroundColor: color.e4e4
  },
  userNameText: {
    ...fonts.fs16SB,
    color: color.blackTheme
  },
  emailText: {
    ...fonts.fs14R,
    color: color.blackTheme
  },
  myProfileView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center'
  },
  myPorofileText: {
    ...font.fs14SB,
    marginLeft: 15
  },
  labelText: {
    color: color.white,
    ...fonts.fs14
  },
  textStyle: {
    color: color.white,
    ...fonts.fs16b
  },
  versionView: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.e4e4
  }
})
export default styles;