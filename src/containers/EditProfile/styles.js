import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    profileImg: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    imageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45
    },
    userNameText: {
        ...fonts.fs14b,
        color: color.blackTheme
    },
    emailText: {
        fontSize: 14,
        color: color.blackTheme
    },
    textInputContainer: {
        flexDirection: 'row',
        flex: 1,
        borderColor: color.bdTheme,
        borderBottomWidth: 0.5
    },
    logoView: {
        justifyContent: 'center',
        paddingRight: 15
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
    genderText: {
        ...fonts.fs14SB,
        color: color.blackTheme,
        // letterSpacing: 1,
        marginLeft: 10
    },
    saveButton: {
        height: 45,
        width: '90%',
        backgroundColor: color.blackTheme,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    saveBtnText: {
        ...fonts.fs14SB,
        color: color.white,
    },


})
export default styles;