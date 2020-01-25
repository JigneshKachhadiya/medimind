import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 50,
        width: deviceWidth,
        justifyContent: 'center',
        paddingLeft: 10
    },
    tabView: {
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
    },
    loginText: {
        fontSize: 16,
        color: color.black,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    textInputContainer: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 0.5
    },
    emailInput: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 0.5,
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
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        height: 50,
        width: '90%',
        backgroundColor: color.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    signUpBtnText: {
        fontSize: 16,
        color: color.white,
        fontWeight: 'bold',
        letterSpacing: 1
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
        height: 50,
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleBlankView: {
        height: 50,
        width: 50,
        backgroundColor: '#4e89f8',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }
})
export default styles;