import React from "react";
import { View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/MaterialIcons";

import SignIn from "./src/pages/SignIn";
import Feed from "./src/pages/Feed";
import Challenges from "./src/pages/Challenges";
import Profile from "./src/pages/Profile";
import Post from "./src/pages/Post";
import Challenge from "./src/pages/Challenge";
import CreatePost from "./src/pages/CreatePost";

const SignInStack = createStackNavigator({
  SignInPage: {
    screen: SignIn,
    navigationOptions: ({navigation}) => ({
      title: "",
      headerShown: false
    })
  }
});

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({navigation}) => ({
      title: "Feed",
    })
  },
  Post: {
    screen: Post,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam("title", "Post"),
    })
  }
});

const ChallengesStack = createStackNavigator({
  Challenges: {
    screen: Challenges,
    navigationOptions: ({navigation}) => ({
      title: "Utfordringer",
    })
  },
  Challenge: {
    screen: Challenge,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam("title", "Utfordring"),
    })
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    params: {userId: null},
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam("title", "Profil"),
    })
  },
  ProfileChallenge: {
    screen: Challenge,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam("title", "Utfordring"),
    })
  },
  CreatePost: {
    screen: CreatePost,
    navigationOptions: ({navigation}) => ({
      title: "Post fullført utfordring",
    })
  },
  ProfilePost: {
    screen: Post,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam("title", "Post"),
    })
  }
});

const AppTabs = createMaterialBottomTabNavigator(
  {
    FeedTab: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: "Feed",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'home'}/>
          </View>),
      }
    },
    ChallengesTab: {
      screen: ChallengesStack,
      navigationOptions: {
        tabBarLabel: "Challenges",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'flag'}/>
          </View>),
      }
    },
    ProfileTab: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'person'}/>
          </View>),
      }
    }
  },
  {
    initialRouteName: "ProfileTab",
    activeColor: '#779860',
    inactiveColor: '#AFC49F',
    barStyle: { backgroundColor: '#e7f0dd' }
  }
);

export default createRouter = (signedIn = false) => createAppContainer(
  createSwitchNavigator(
    {
      SignIn: SignInStack,
      App: AppTabs
    },
    {
      initialRouteName: signedIn ? "App" : "SignIn"
    }
  )
);
