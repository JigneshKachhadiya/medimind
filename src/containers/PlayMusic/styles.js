import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    headerContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // height: 70,
        paddingVertical: 20,
        width: deviceWidth,
        paddingHorizontal: 15,
    },
    headerLeftIcon: {
        height: 40,
        width: 40, tintColor: '#fff'
    },
    headerRightIcon: {
        height: 20,
        width: 20,
        tintColor: '#fff'
    },
    headerTitle: {
        ...font.fs18b,
        color: color.white
    },
    headerSubTit: {
        ...font.fs14R,
        color: color.white
    },
    itemContainer: {
        borderRadius: 25,
        height: deviceHeight / 1.8,
        width: deviceWidth / 1 - 100
    },
    itemImage: {
        height: deviceHeight / 1.8,
        width: deviceWidth / 1 - 100,
        borderRadius: 5,
        borderRadius: 8
    },
    playToolsContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingTop: 25
    },
    iconSize: {
        height: 20,
        width: 20,
        marginRight: 35
    },
    musicPlayTimeContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 30
    },
    playTimeText: {
        color: color.white,
        ...font.fs18SB,
        marginRight: 5
    },
    playControllerView: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    controllSize: {
        height: 20, width: 20
    },
    pausController: {
        marginLeft: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    }


})
export default styles;