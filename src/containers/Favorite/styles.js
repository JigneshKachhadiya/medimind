import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    fdTabContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#E4E4E4',
        marginTop: 20,
        marginBottom: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: color.white

    },
    favoriteView: {
        flex: 1,
        borderRightWidth: 1,
        borderRadius: 5,
        borderRightColor: color.ddd,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    donloadView: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        ...font.fs14SB,
        marginLeft: 10,
    },
    descriptionText: {
        textAlign: 'center',
        ...font.fs12R
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white
    }

})
export default styles;