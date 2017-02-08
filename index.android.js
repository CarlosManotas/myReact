/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import {Main, Repos, Dashboard, Notas, Profile} from './App/Components';

const routes = [
  { title: 'Title', component: Profile },
  { title: 'Pagina', component: Repos },
  { title: 'Bio:', component: Dashboard },
  { title: 'Notas', component: Notas },
  { title: 'Repositorios', component: Repos}
]

export default class myReact extends Component {
  render() {
    return (
      <Navigator
        initialRoute={
          { title: 'Github Notetaker', index: 0 }
        }
        renderScene={(route, navigator) => {
          const routeFound = (routes.find( r => route.title.startsWith(r.title) ) || {component: Main}).component;
          return React.createElement(routeFound, {navigator, ...route.passProps});
        } }
        style={{flex: 1,backgroundColor: 'black'}}
      />
    );
  }
}



AppRegistry.registerComponent('myReact', () => myReact);
