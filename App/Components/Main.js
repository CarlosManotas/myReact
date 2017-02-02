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

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      username : '',
      isLoading: false,
      error: false
    };
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
            title: res.name || 'Selecciona una Opcion',
            component: Dashboard,
            passProps: {userInfo: res}
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
    return(
      <View style={styles.mainContainer}>
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
      </View>
    );
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