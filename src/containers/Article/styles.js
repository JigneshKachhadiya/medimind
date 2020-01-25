import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'absolute',
        width: deviceWidth,
        height: 300,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    backGroungIMG: {
        width: deviceWidth,
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 20,
    },
    headerTitle: {
        color: color.white,
        ...font.fs18b,
        letterSpacing: 0.5,
        marginLeft: 25
    },
    headerSearchIcon: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 15,
        justifyContent: 'center'
    },
    detaileView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    musicTitle: {
        ...font.fs18SB,
        letterSpacing: 1,
        color: color.white,
        marginTop: 10
    },
    musicSubTitle: {
        ...fonts.fs14L,
        letterSpacing: 0.5,
        color: color.white,
        marginTop: 8,
        marginBottom: 3,
        textAlign: 'center'
    },
    musicSubTitle1: {
        fontSize: 14, letterSpacing: 1, color: color.white
    },
    description:
    {
        ...fonts.fs12R,
        color:color.textInput75,
        lineHeight:20
    },
    listContainer: {
        flex: 1,
        backgroundColor: color.white,
        marginHorizontal: 20,
        elevation: 10,
        padding: 8,
        borderRadius: 10,
        marginTop: 15
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
    playControllerView: {
        alignItems: 'flex-end',
        top: -20,
        right: 20
    }

})
export default styles;