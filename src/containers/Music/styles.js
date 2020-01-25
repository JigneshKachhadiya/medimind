import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    recentPlayText: {
        ...fonts.fs14b,
        color: color.blackTheme
    }
})
export default styles;