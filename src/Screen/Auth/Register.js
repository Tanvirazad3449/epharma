import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
const screenWidth = Math.round(Dimensions.get('window').width);
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      loading: false
    };
  }

  async registerUser() {
    this.setState({ loading: true })
    fetch('https://epharma.kentradigital.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password
      })
    }).then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.message == "User created") {
          //if registration is successful, save the user information in the local storage
          //isLoggedIn, when set to yes_email, is a flag to save the user from entering credentials for every app sessions
          await AsyncStorage.setItem('isLoggedIn', 'yes_email');
          await AsyncStorage.setItem('userName', responseJson.userinfo.name);
          await AsyncStorage.setItem('email', responseJson.userinfo.email);
          await AsyncStorage.setItem('userId', responseJson.userinfo._id);
          this.setState({ loading: false })
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert(
            "Registration Failed",
            "Make sure you have filled in all the fields and your email is valid.",[
              { text: "Try Again", onPress: () => this.setState({ password: '' }) }
            ],
            { cancelable: false }
          );
          this.setState({ loading: false })
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label_text}>Name</Text>
        <TextInput style={styles.textinput}
          underlineColorAndroid="transparent"
          placeholder="Please enter your name"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(userName) => this.setState({ userName })}
          value={this.state.userName}
          autoFocus={true}
        />

        <Text style={styles.label_text}>Email</Text>
        <TextInput style={styles.textinput}
          underlineColorAndroid="transparent"
          placeholder="Please enter your email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          autoFocus={false}
        />

        <Text style={styles.label_text}>Password</Text>
        <TextInput style={styles.textinput}
          underlineColorAndroid="transparent"
          placeholder="Please enter a password"
          secureTextEntry={true}
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          autoFocus={false}
        />

        <TouchableOpacity onPress={() => this.registerUser()}>
          <View style={styles.register_button}>
            {this.state.loading ?
              <ActivityIndicator size="small" color="white" animating={this.state.loading}/>
              : 
              <Text style={styles.button_text}>Register</Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label_text: {
    color: "grey",
    marginLeft: 20,
    marginTop: 20,
    marginVertical: 5
  },
  textinput: {
    color: '#2a2d36',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '90%',
    height: 45,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: 'center'
  },
  register_button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#ffb1b1",
    width: 245,
    borderRadius: 10
  },
  button_text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  }
})
export default Register;
