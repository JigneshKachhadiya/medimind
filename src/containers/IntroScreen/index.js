import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationActions, StackActions } from "react-navigation";
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as introActions from '../../actions/introActions';
import AppIntroSlider from 'react-native-app-intro-slider';
import image from './../../appConfig/image';
import commonStyle from '../../appConfig/commonStyle';
import styles from './styles';
import font from '../../appConfig/font';
import Loader from '../../components/Loader';

const slides = [
    {
        key: 'somethun',
        title: 'Track your activity',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt utlabore et dolore magna aliquyam erat, sed diam voluptua.At vero eos at accusam et justo duo',
        icon: image.intro1,
    },
    {
        key: 'somethun1',
        title: 'Plan to meditate',
        text:
            'Set ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaquq ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae',
        icon: image.intro2,

    },
    {
        key: 'somethun2',
        title: 'Daily insights',
        text: 'Quiere bla baca exhausta vid, kiwi, pina y fugaz jamon. Fabio me exige, sin tapujos, que anada cerveza al whisky. Jovencillo emponzonado de whisky, ique figurote exhibes! La ciguena tobaco',
        icon: image.intro3,
    },
];

class IntroScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
            isLoading: false
        }
    }

    componentWillMount() {
        this.getSlidData();
    }

    getSlidData() {
        this.setState({ isLoading: true })
        this.props.actions.getIntroSlid().then(data => {
            if (data) {
                this.setState({ isLoading: false });
            }
        }).catch(e => {
            this.setState({ isLoading: false });
            this.dropdown.alertWithType('error', '', e);
        });
    }

    _renderItem = ({ item, dimensions }) => (
        <View style={[commonStyle.flex1, { backgroundColor: color.white }]}>
            <View style={[commonStyle.aiCntr, commonStyle.ph10]}>
                <Image source={{ uri: item.imgUrl }} style={{ width: '70%', height: '70%', }} resizeMode={'contain'} />
                <View style={{ top: -40 }}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.desText}>{item.description}</Text>
                </View>
            </View>
            {/* <View style={[commonStyle.flex1, { backgroundColor: color.white }]}>
            <View style={[commonStyle.aiCntr, commonStyle.ph10]}>
                <Image source={item.icon} style={{ width: '70%', height: '70%', }} resizeMode={'contain'} />
                <View style={{ top: -40 }}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.desText}>{item.text}</Text>
                </View>
            </View> */}
        </View>

    );
    _onDone = () => {
        if (this.props.currentUserData) {
            let routeName = 'Home';
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName })],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            let routeName = 'Login';
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName })],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    render() {
        const { isLoading } = this.state;
        let introSlid = this.props.introSlidData && this.props.introSlidData.length > 0 ? this.props.introSlidData : [];
        // let introSlid = slides
        return (
            <View style={{ flex: 1 }}>
                <DropdownAlert ref={ref => this.dropdown = ref} />
                {
                    isLoading &&
                    <View style={styles.loaderCon}>
                        <Loader />
                    </View>
                }
                <AppIntroSlider
                    slides={introSlid}
                    nextLabel={'CONTINUE'}
                    buttonTextStyle={{ ...font.fs14 }}
                    doneLabel={'GET STARTED'}
                    dotStyle={styles.dotStyl}
                    activeDotStyle={styles.activeDotStyle}
                    renderItem={this._renderItem}
                    buttonStyle={styles.buttonStyle}
                    paginationStyle={{ bottom: 70 }}
                    bottomButton
                    onDone={this._onDone}
                />
                <View style={styles.bottomImageView}>
                    <View style={styles.leftImageContainer}>
                        <Image source={image.leftBottom} style={{ height: 100, width: 100 }} resizeMode={'contain'} />
                    </View>
                    <View style={styles.rightImageContainer}>
                        <Image source={image.rightBottom} style={{ height: 100, width: 100 }} resizeMode={'contain'} />
                    </View>
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentUserData: state.loginUser.currentUserData,
        introSlidData: state.introSlid.introSlidData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(introActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);

