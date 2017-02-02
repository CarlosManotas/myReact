/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';

import Main from './App/Components/Main';



export default class myReact extends Component {

  render() {
    return (
      <NavigatorIOS
      initialRoute={{
        title: 'Github Notetaker',
        component: Main
      }}
      style={{flex: 1,backgroundColor: 'black'}}
      />
    );
  }
}



AppRegistry.registerComponent('myReact', () => myReact);
