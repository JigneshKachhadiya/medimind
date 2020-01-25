import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import DefualtScreen from './DefualtScreen';
import IntroScreen from './containers/IntroScreen';
import Login from './containers/Login';
import ForgotPass from './containers/ForgotPass';
import Home from './containers/Home';
import SubCategoryList from './containers/SubCategoryList';
import Meditation from './containers/Meditation';
import Music from './containers/Music';
import PlayMusic from './containers/PlayMusic';
import MusicList from './containers/MusicList';
import Article from './containers/Article';
import Favorite from './containers/Favorite';
import Activity from './containers/Activity';
import AllSong from './containers/AllSong';
import Profile from './containers/Profile';
import EditProfile from './containers/EditProfile';
import SearchItem from './containers/SearchItem';
import StartTimer from './containers/StartTimer';
import Timer from './containers/StartTimer/Timer';
import Test from './containers/Test';
import HomeTabs from './HomeTabs';

const StackNavigatorOptions = {
  initialRouteName: "DefualtScreen",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
};

const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
  SubCategoryList: { screen: SubCategoryList },
}, {
  initialRouteName: "Home",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  // if (navigation.state.index === 0) {
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}


const MeditationNavigator = createStackNavigator({
  Meditation: { screen: Meditation },
}, {
  initialRouteName: "Meditation",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

MeditationNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const MusicNavigator = createStackNavigator({
  Music: { screen: Music },
  AllSong: { screen: AllSong },

}, {
  initialRouteName: "Music",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

MusicNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0 || navigation.state.index === 1) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const FavoriteNavigator = createStackNavigator({
  Favorite: { screen: Favorite },
}, {
  initialRouteName: "Favorite",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

FavoriteNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const ProfileNavigator = createStackNavigator({
  Profile: { screen: Profile },
}, {
  initialRouteName: "Profile",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const HomeTab = createBottomTabNavigator(
  {
    HomeScreen: { screen: HomeNavigator },
    Meditation: { screen: MeditationNavigator },
    Music: { screen: MusicNavigator },
    Favorite: { screen: FavoriteNavigator },
    Profile: { screen: ProfileNavigator },
  },
  {
    animationEnabled: true,
    tabBarComponent: HomeTabs,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    lazy: true
  });

const AppNavigator = createStackNavigator(
  {
    DefualtScreen: {
      screen: DefualtScreen,
    },
    IntroScreen: {
      screen: IntroScreen,
    },
    Home: {
      screen: HomeTab
    },
    MusicList: {
      screen: MusicList
    },
    PlayMusic: {
      screen: PlayMusic
    },
    AllSong: {
      screen: AllSong
    },
    Activity: {
      screen: Activity
    },
    StartTimer: {
      screen: StartTimer
    },
    Timer: {
      screen: Timer
    },
    SearchItem: {
      screen: SearchItem
    },
    Article: {
      screen: Article
    },
    Login: {
      screen: Login
    },
    EditProfile: {
      screen: EditProfile
    },
    ForgotPass: {
      screen: ForgotPass
    },
    Test: {
      screen: Test
    },
  }, StackNavigatorOptions);

export default createAppContainer(AppNavigator);



