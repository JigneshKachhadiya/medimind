import React, { Component } from "react";
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import MainSlider from '../../components/MainSlider';
import ReceipeSlider from '../../components/Category';

import { newOrdData } from './newOrdData';


// const newOrd = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
// let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MusicList extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            topBtn: 'now',
            // newOrdSlide: newOrd.cloneWithRows(newOrdData),
            // dataSource: ds
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {
        if (props.getDashboardError) {
            this.dropdown.alertWithType('error', 'Error', props.getDashboardError.message);
        }
        if (props.breakfastList) {
            this.deviceListHasChanged(props.breakfastList);
        }
    }

    deviceListHasChanged(list) {
        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(list),
        // });
    }

    filterClick(topBtn) {
        this.setState({ topBtn });
    }

    render() {
        console.log('newOrdData', newOrdData);

        return (
            <SafeAreaView style={commonStyle.container}>
                <View>
                    <Header {...this.props} isBack={true} />
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 20 }}>
                        <View>
                            <View style={[commonStyle.pv10, { paddingHorizontal: 5 }]}>
                                <FlatList
                                    // horizontal
                                    data={newOrdData}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <ReceipeSlider style={{ marginHorizontal: 5 }} isHomeCard={true} rowData={item} />
                                        )
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={2}
                                    extraData={this.props}
                                    keyExtractor={item => item.id}
                                    onEndReachedThreshold={0.2}
                                    initialNumToRender={10}
                                    windowSize={5}
                                    scrollEventThrottle={10}
                                    refreshing={this.state.refreshing}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);


