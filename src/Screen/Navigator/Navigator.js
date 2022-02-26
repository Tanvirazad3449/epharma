import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './../Main/Home';
import Menu from './../Main/Menu';
import History from './../Main/History';
import Details from './../Main/Details';
import Checkout from './../Main/Checkout';

import Login from './../Auth/Login';
import Register from './../Auth/Register';
import Splash from './../Auth/Splash';
import AuthLanding from './../Auth/AuthLanding';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      headerMode: "none",
      navigationOptions: {
        header: null
      }
    },
    Menu: {
      screen: Menu,
    },
    Checkout: {
      screen: Checkout,
    },
    History: {
      screen: History,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Splash: {
      screen: Splash,
      headerMode: "none",
      navigationOptions: {
        header: null
      }
    },
    AuthLanding: {
      screen: AuthLanding,
      headerMode: "none",
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: 'Splash'
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AppStack: AppStack,
    AuthStack: AuthStack
  },
  {
    initialRouteName: 'AuthStack'
  }
));

export default class StackNavigator extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

