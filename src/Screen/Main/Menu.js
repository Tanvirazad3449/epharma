import React, { Component } from 'react';
import { View, Modal, Alert, Text, TextInput, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      userId: '',
      googlePhoto: 'Unavailable'
    };
  }

  async signOut() {
    await AsyncStorage.setItem('isLoggedIn', '0');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('googlePhoto');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    };
    RNRestart.Restart()
  }

  componentDidMount() {
    this.readCache();
  }

  async readCache() {
    GoogleSignin.configure({
      //debug
      //client_id: "685774710149-ebba9077dvolcaamhkavgu47tm3rr4cj.apps.googleusercontent.com",
      //release
      client_id: "685774710149-brvh1koj46l3ds94up5ukv6kkuec3ll9.apps.googleusercontent.com",
      offlineAccess: false
    })
    //isLoggedIn, is a flag to save the user from entering credentials for every app sessions
    var isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn == "yes_google") {
      this.setState({ googlePhoto: await AsyncStorage.getItem('googlePhoto') })
    }
    var user_string = await AsyncStorage.getItem('userName')
    const user = user_string.replace(/['"]+/g, '');
    this.setState({ userName: user });

    var email_string = await AsyncStorage.getItem('email')
    const email = email_string.replace(/['"]+/g, '');
    this.setState({ email: email });

    var userId = await AsyncStorage.getItem('userId')
    this.setState({ userId: userId });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.googlePhoto == "Unavailable" ?
          <FeatherIcon name="user" color="black" size={100} />
          :
          <Image style={styles.googlePhoto} source={{ uri: this.state.googlePhoto }} />
        }

        <Text style={styles.userName}>{this.state.userName}</Text>
        <Text style={{ color: "grey", }}>{this.state.email}</Text>
        
        <View style={styles.borderline} />

        <TouchableOpacity onPress={() => this.signOut()} style={styles.button}>
          <Text style={styles.button_text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 100 
  },
  googlePhoto: { 
    height: 100, 
    width: 100, 
    borderRadius: 50 
  },
  userName: { 
    fontWeight: '700', 
    fontSize: 16, 
    marginTop: 20 
  },
  borderline: { 
    height: 1, 
    width: "80%", 
    backgroundColor: "#00000030", 
    marginVertical: 20 
  },
  button: { 
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    borderRadius: 5, 
    backgroundColor: "orange", 
  },
  button_text: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  }

})

export default Menu;
