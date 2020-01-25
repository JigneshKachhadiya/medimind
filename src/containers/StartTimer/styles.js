import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    bottomIconView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: color.bdTheme,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circulView: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: color.f9f9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailyActText: {
        ...fonts.fs18SB,
        textAlign:'center',
        marginVertical: 10

    },
    activeDote: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: color.blueColor,
        marginRight: 3
    },

    // ----------------- Timer Screen styles  --------------------

    timerCounterMain: {
        paddingVertical: 100,
        height: 90,
        marginVertical: 30
    },
    timerIconSize: {
        height: 40, width: 40
    },
    outerCircle: {
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    outerImage: {
        height: 14,
        width: 100
    },
    counterTextContainer: {
        position: 'absolute',
        flexDirection: 'row',
        height: 90,
        alignItems: 'center'
    },
    buttomStyle: {
        height: 45,
        width: 150,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default styles;