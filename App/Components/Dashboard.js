import React , {Component} from 'react';
import Profile from './Profile';
import api from '../Utils/api';
import Repos from './Repos';
import Notas from './Notas';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

export default class Dashboard extends Component {
  backgroundMake(btn){
    var obj ={
      flexDirection:'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex:1
    }
    if(btn===0){
      obj.backgroundColor = 'deepskyblue';
    }else if (btn===1) {
      obj.backgroundColor = 'blue';
    }else {
      obj.backgroundColor = 'midnightblue';
    }
    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      title: 'Perfil',
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }
  goToRepo(){
    api.getRepos(this.props.userInfo.login)
      .then((res)=> {
        this.props.navigator.push({
          title: 'Repositorios',
          component: Repos,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  }
  goToNotes(){
    api.getNotes(this.props.userInfo.login, this.props.token)
      .then(res=>{
        res=res||[];
        this.props.navigator.push({
          title: 'Notas',
          component: Notas,
          passProps: {userInfo: this.props.userInfo,notes:res, token: this.props.token}
        });
      })

  }
  render(){
    return(
      <View style={styles.dashboardContainer}>
        <Image
          style={{height:350}}
          source={{uri:this.props.userInfo.avatar_url}}/>
          <TouchableHighlight
            style={this.backgroundMake(0)}
            underlayColor='#ddd'
            onPress={this.goToProfile.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Perfil
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.backgroundMake(1)}
            underlayColor='#ddd'
            onPress={this.goToRepo.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Repos
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.backgroundMake(2)}
            underlayColor='#ddd'
            onPress={this.goToNotes.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Notas
            </Text>
          </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    marginTop:65,
  },
  dashboardTouchField:{
    fontSize:24,
    alignSelf: 'center',
    color:'white',
  },
});
