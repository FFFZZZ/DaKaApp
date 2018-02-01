/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation'

//导入欢迎页
import welcome from './res/pages/wolcome/wolcome'
import attend from './res/pages/home/attend'
import apply from './res/pages/home/apply'
import tongji from './res/pages/home/tongji'
import me from './res/pages/home/me'

function setup() {
  // 进行路由配置

  //建立首页路由
  const HomeNavigator = TabNavigator({
    Attend: {
      screen: attend
    },
    apply: {
      screen: apply
    },
    tongji: {
      screen: tongji
    },
    me: {
      screen: me
    }
  }, {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      animationEnabled: true,
      lazy: true,
      backBehavior: 'none',
      tabBarOptions: {
        showIcon: true,
        activeTintColor: '#6699ff',
        inactiveTintColor: '#000000',
        // tabStyle: {
        //   backgroundColor: '#ffffff'
        // },
        labelStyle: {
          margin: 0,
          fontSize: 10
        },
        iconStyle: {
          width: 30,
          height: 30,
          margin: 0
        },
        style: {
          backgroundColor: '#f8f8f8',
        },
      }
    })
  //建立主路由
  const MainNavigator = StackNavigator({
    GuideView: {
      screen: welcome //欢迎页
    },
    Main: {
      screen: HomeNavigator  //首页
    }
  }, {
      headerMode: 'float'
    })



  class Root extends Component {
    render() {
      return (
        <MainNavigator />
      )
    }
  }
  return <Root />
}

module.exports = setup;
