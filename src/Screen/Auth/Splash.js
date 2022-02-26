import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage } from 'react-native';
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getStatus();
  }

  async getStatus() {
    var status = await AsyncStorage.getItem('isLoggedIn');
    //the status flag is used to determine if the user credentials are already saved in the local storage or not
    if ((status == "yes_email") || (status == "yes_google")) {
      //user credentials are available, allow the user into the Home Page
      this.props.navigation.navigate('Home');
    } else {
      //take the user to AuthLanding page to login or register
      this.props.navigation.navigate('AuthLanding');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={require('./../../Asset/Logo.png')}
          style={styles.logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 342,
    height: 111
  }
})

export default Splash;
