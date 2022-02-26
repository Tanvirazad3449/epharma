import React, { Component } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FeatherIcon from 'react-native-vector-icons/Feather'
const screenWidth = Math.round(Dimensions.get('window').width);

class AuthLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      //debug
      //client_id: "685774710149-ebba9077dvolcaamhkavgu47tm3rr4cj.apps.googleusercontent.com",
      //release
      client_id: "685774710149-brvh1koj46l3ds94up5ukv6kkuec3ll9.apps.googleusercontent.com",
      offlineAccess: false
    })
  }

  //this function uses the Google User Information to register the user
  async registerUser(name, email, password, photo) {

    fetch('https://epharma.kentradigital.com/users/signup/googlesignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }).then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.userinfo) {
          //if registration is successful, save the user info in the local storage
          await AsyncStorage.setItem('userName', name);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('userId', responseJson.userinfo._id);
          if (photo == null) {
            await AsyncStorage.setItem('isLoggedIn', 'yes_email');
          } else {
            await AsyncStorage.setItem('isLoggedIn', 'yes_google');
            await AsyncStorage.setItem('googlePhoto', photo)
          }
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert(
            "Registration Failed",
            "Some Unknown Error Occured.",
            [
              { text: "Try Again", onPress: () => console.log("failed") }
            ],
            { cancelable: false }
          );
          this.setState({ loading: false })
        }
      })
  }

  //this function fetches Google User Information
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.registerUser(
        userInfo.user.name,
        userInfo.user.email,
        userInfo.user.id,
        userInfo.user.photo
      );
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
          this.setState({
            error,
          });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={require('./../../Asset/Logo.png')} style={styles.logo} />
        <Text style={styles.logo_text}>Your One Stop Solution To Fight Coronavirus</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <View style={styles.register_button}>
            <Text style={styles.button_text}>
              Register With Email</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} 
          style={styles.login_button}>
          <Text style={styles.button_text}>
            Log In</Text>
        </TouchableOpacity>

        <GoogleSigninButton onPress={this.signIn}
          style={styles.google_button} 
          size={GoogleSigninButton.Size.Wide} 
          color={GoogleSigninButton.Color.Light} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  logo: {
    marginTop: 150,
    width: 237.5,
    height: 77
  },
  logo_text: {
    fontWeight: "700",
    marginBottom: 250
  },
  register_button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#ffb1b1",
    width: 243,
  },
  button_text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  login_button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 243,
    backgroundColor: '#02ffc0'
  },
  google_button: {
    width: 250,
    height: 50,
    borderRadius: 0,
    marginBottom: 20,
    elevation: 0
  }
})

export default AuthLanding;
