import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    recentPlayText: {
        ...fonts.fs16b,
        color: color.blackTheme
    },
    listContainer: {
        flex: 1,
        backgroundColor: color.white,
        marginHorizontal: 15,
        elevation: 10,
        padding: 15,
        borderRadius: 10,
        marginTop: 22
    },
    listImage: {
        height: 40,
        width: 40,
        borderRadius: 10
    },
    listText: {
        flex: 1,
        paddingLeft: 15,
        // justifyContent: 'center'
    },
    listTitle: {
        ...fonts.fs14b,
        letterSpacing: 0.6
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    imgIconSize: {
        height: 25, width: 25
    }
})
export default styles;