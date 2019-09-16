import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadStargazer from './LoadStargazer'
import LoadRepos from './LoadRepos'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from '../reducers'
const store = createStore(rootReducer)

const MainNavigator = createStackNavigator({
  LoadRepos: {
    screen: LoadRepos,
    navigationOptions : ({navigation})=>({
      title: 'Load Repositories',
      headerTitleStyle:{
        color: 'gray',
        fontSize: 22,
        fontWeight: 'bold'
      }
  })},
  LoadStargazer: {
    screen: LoadStargazer,
    navigationOptions: ({navigation})=>({
      title: 'Load Stargazers',
      headerTitleStyle:{
        color: 'gray',
        fontSize: 22,
        fontWeight: 'bold'
      }
    })
  },
});

const Navigation = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    )
  }
}


