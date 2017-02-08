import React , {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  Keyboard
} from 'react-native';

import api from '../Utils/api';

import Dashboard from './Dashboard';

import Auth0Lock from 'react-native-lock';
const lock = new Auth0Lock({clientId: "DKaNFn9pD9faHiuZ54ShwtqQqkNLEfcM", domain: "userspace.auth0.com"});

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      token: null,
      username : '',
      isLoading: false,
      error: false
    };
  }
  handleLogin(evet) {
    lock.show({}, (err, profile, token) => {
      //user has loggedIn, get user.space token
      fetch("https://gateway.user.space/native/android",{
        method:'POST',
        headers: { "Authorization" : `Bearer ${token.idToken}`, "Content-Type" : "text/plain"},
      }).then(result => result.json()).then(result => {
        this.setState({
          ...this.state,
          token: result
        })
      })
    });
  }
  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleSubmit() {
    Keyboard.dismiss()
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username)
      .then((res)=> {
        if(res.message === 'Not Found'){
          Alert.alert('Alert','Este Usuario no Existe')
          this.setState({
            error: 'Este Usuario no Existe',
            isLoading: false
          })
        }else {
          this.props.navigator.push({
            title: "Bio: " + (res.name || 'Selecciona una Opcion'),
            component: Dashboard,
            index: 1,
            passProps: {userInfo: res, navigator: this.props.navigator, token: this.state.token}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      })
  }
  render(){
    let messageError = (this.state.error!=='')?<Text style={styles.errorText}>{this.state.error}</Text>:<View></View>;
    const searchInput = <View style={styles.mainContainer}>
        <Text style={styles.firstTex}>Buscar Usuarios de Github</Text>
        <TextInput
          placeholder=' Nombre'
          style={styles.inputField}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}/>
        <TouchableHighlight
          style={styles.touchField}
          underlayColor='#ddd'
          onPress={this.handleSubmit.bind(this)} >
          <Text style={styles.secondTex}>Buscar</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          size='large'
          style={{height:100}}>
        </ActivityIndicator>
      </View>;

    const result = this.state.token ? searchInput :
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={styles.touchField}
          underlayColor='#ddd'
          onPress={this.handleLogin.bind(this)} >
            <Text style={styles.secondTex}>Login</Text>
        </TouchableHighlight>
      </View>;

    return result;
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop:65,
    justifyContent: 'center',
    backgroundColor: 'deepskyblue',
  },
  firstTex: {
    fontSize: 20,
    textAlign: 'center',
    color:'white',
  },
  inputField: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius:8,
  },
  touchField:{
    height:40,
    padding: 10,
    backgroundColor: 'white',
    marginRight:10,
    marginLeft:10,
    borderRadius:8,
  },
  errorText: {
    textAlign: 'center',
    marginTop:10,
    color:'red',
  },
  secondTex: {
    fontSize: 15,
    color: '#111',
    textAlign: 'center',
  },
});
