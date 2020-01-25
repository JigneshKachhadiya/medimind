import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    dailyActText: {
        ...fonts.fs18SB,
        marginVertical: 10

    },
    toDayProgressView: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.eee,
        elevation: 5,
        backgroundColor: '#fff'
    },
    dayText: {
        ...fonts.fs14SB
    },
    activeDote: {
        height: 4,
        width: 4,
        borderRadius: 2,
        backgroundColor: color.blueColor,
        marginRight: 3
    },
    LiteTimeText: {
        ...fonts.fs14SB
    },
    // ---------- Modal styles --------------
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeModalBtnCon: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 20,
        marginTop: 15
    },
    btnNo: {
        height: 20,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnYes: {
        height: 20,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteModalBody: {
        height: 90,
        width: deviceWidth / 1.3,
        backgroundColor: color.white,
        borderRadius: 2
    },
    modalBody: {
        height: 330,
        width: deviceWidth / 1.2,
        backgroundColor: color.white,
        borderRadius: 10
    },
    setGoalText: {
        ...fonts.fs18b,
        textAlign: 'center'
    },
    closeIcon: {
        paddingTop: 10,
    },
    textInput: {
        ...font.fs14R,
        height: deviceHeight / 6,
        // paddingTop: 10,
        paddingBottom: 40,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#FAFAFA'
    },
    btnMainView: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainde: {
        borderRadius: 3,
        backgroundColor: color.blackTheme,
        height: 35,
        width: 130,
    },
    btnSaveText: {
        ...fonts.fs14SB,
        color: color.white
    },
})
export default styles;