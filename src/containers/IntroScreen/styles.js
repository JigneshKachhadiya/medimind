import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;
const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        ...fonts.fs18b,
        paddingBottom: 20
    },
    desText: {
        textAlign: 'center',
        ...font.fs14R
    },
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
    buttonStyle: {
        backgroundColor: '#212121',
        flex: 1,
        borderRadius: 5,
        marginHorizontal: 80,
        height: 40
    },
    dotStyl: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: color.e4e4
    },
    activeDotStyle: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: color.blackTheme
    },
    loaderCon: {
        flex: 1,
        position: 'absolute',
        height: height,
        width: deviceWidth,
        zIndex: 9999
    },
})
export default styles;