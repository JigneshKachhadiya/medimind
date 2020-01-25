import React, { Component } from "react";
import {
	Dimensions,
	View,
	Text,
	TouchableOpacity,
	RefreshControl,
	Image,
	ScrollView,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	Alert,
	PermissionsAndroid
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../actions/articleActions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import * as Animatable from 'react-native-animatable';
import _ from 'underscore';
import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import FavoriteSoundList from '../../components/FavoriteSoundList';
import Loader from '../../components/Loader';
import styles from "./styles";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Favorite extends Component {
	static defaultProps = {
		isLoading: false,
	}
	constructor(props) {
		super(props);
		this.state = {
			favoriyeData: [],
			downloadArticleList: [],
			activeTab: 'MyFavorites',
			isLoading: false

		}
	}
	componentWillMount() {
		this.getFavoriteList();
	}

	componentWillReceiveProps() {
		this.getFavoriteList();
	}

	getFavoriteList() {
		this.setState({
			isLoading: false,
		})
		let likeArticle = this.props.currentUserData && this.props.currentUserData[0] && this.props.currentUserData[0].likeArticles;
		let allArticle = this.props.articleData;
		let myFavoriteData = [];
		if (likeArticle && likeArticle.length > 0) {
			likeArticle.map((item, index) => {
				_.filter(allArticle, (el) => {
					if (el.id == item.articleId) {
						myFavoriteData.push(el)
					}
				})
			})

			let fimalData = myFavoriteData.reverse();
			this.setState({
				favoriyeData: fimalData,
				isLoading: false
			})
		}
	}

	getDownloadArticle = async () => {
		this.setState({ activeTab: 'MyDownloads', isLoading: true })
		this.props.articleActions.getArticleDownloas().then(data => {
			if (data) {
				if (data && data.length > 0) {
					const { downloadArticleList } = this.state;
					let downloadArticleData = data
					let allArticle = this.props.articleData;
					let findArticleArray = downloadArticleList
					downloadArticleData.map((item, index) => {
						let article_url_length = item.length;
						let article_id = item.slice(14, article_url_length - 4);
						_.filter(allArticle, (data) => {
							if (data.id == article_id) {
								findArticleArray.push(data)
							}
						});
					})
					this.setState({
						downloadArticleList: _.uniq(findArticleArray),
						isLoading: false
					})
				} else {
					this.setState({
						isLoading: false
					})
				}
			}
		}).catch(e => {
			this.setState({ isLoading: false });
			this.dropdown.alertWithType('error', '', e);
		});
	}

	render() {
		const { favoriyeData, downloadArticleList, activeTab, isLoading } = this.state;
		let layoutListdata = [];
		if (activeTab == 'MyFavorites') {
			layoutListdata = favoriyeData
		} else {
			layoutListdata = downloadArticleList
		}
		return (
			<SafeAreaView style={commonStyle.container}>
				<View>
					<Header {...this.props} isTitle={true} title={'Sound'} isSearchIcon={true} />
				</View>
				<View style={[commonStyle.flex1, { paddingHorizontal: 15 }]}>
					<View style={styles.fdTabContainer}>
						<TouchableOpacity
							onPress={() => { this.getFavoriteList(), this.setState({ activeTab: 'MyFavorites' }) }}
							style={[styles.favoriteView, { backgroundColor: activeTab == 'MyFavorites' ? color.blackTheme : color.white }]}>
							<Entypo name={'heart'} size={25} style={{ color: activeTab == 'MyFavorites' ? color.white : color.blackTheme, marginTop: 3 }} />
							<Text style={[styles.tabText, { color: activeTab == 'MyFavorites' ? color.white : color.blackTheme }]}>My Favorites</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.getDownloadArticle()}
							style={[styles.donloadView, { backgroundColor: activeTab == 'MyDownloads' ? color.blackTheme : color.white }]}>
							<Ionicons name={'md-cloud-download'} size={25} style={{ color: activeTab == 'MyDownloads' ? color.white : color.blackTheme }} />
							<Text style={[styles.tabText, { color: activeTab == 'MyDownloads' ? color.white : color.blackTheme }]}>My Downloads</Text>
						</TouchableOpacity>
					</View>
					<View style={[commonStyle.pv10, commonStyle.ph10]}>
						<Text style={styles.descriptionText}>
							Start your timer session with vibrate, with background music. Timer ends with vibration
 						</Text>
					</View>
					{
						isLoading &&
						<View style={styles.loaderStyle}>
							<ActivityIndicator size="large" color={color.e4e4} />
						</View>
					}
					<View style={[commonStyle.pv10, { marginBottom: deviceHeight / 6 }]}>
						<FlatList
							data={layoutListdata}
							keyExtractor={this._keyExtractor}
							renderItem={({ item, index }) => {
								return (
									<FavoriteSoundList rowData={item} navigation={this.props.navigation} isFavorite={true} />
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
			</SafeAreaView >
		)
	}
}


function mapStateToProps(state) {
	return {
		articleData: state.article.articleData,
		downloadArticle: state.article.downloadArticle,
		currentUserData: state.loginUser.currentUserData,
		subCategoryData: state.homeData.subCategoryData,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		articleActions: bindActionCreators(articleActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);


