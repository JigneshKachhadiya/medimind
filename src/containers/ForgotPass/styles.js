import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotViewH: {
    height: 115
  },
  forgotViewAbsH: {
    height: 100
  },
})
export default styles;