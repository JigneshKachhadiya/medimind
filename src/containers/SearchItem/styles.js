import { StyleSheet, Platform, Dimensions } from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  serachContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: color.fafa,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchTextInput: {
    flex: 1,
    ...font.fs14,
    paddingHorizontal: 10,
    height: 40,
    paddingVertical: 0
  },
  // ------------------- Grid styele
  mainContainer: {
    flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15
  },
  firstGrid: {
    height: deviceHeight / 5.4,
    width: deviceWidth / 3.4,
    backgroundColor: color.bdTheme
  },
  secondMainCon: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  secondGrigCon: {
    height: deviceHeight / 5.4,
    width: (deviceWidth / 1.6) - 4,
    backgroundColor: color.bdTheme
  },
  secondLeftCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  secondRightCon: {
    width: deviceWidth / 3.5,
    height: deviceWidth / 1.4,
    backgroundColor: color.bdTheme
  },
})
export default styles;