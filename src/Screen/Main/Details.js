import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
const screenWidth = Math.round(Dimensions.get('window').width);
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Image resizeMode="cover" style={styles.image}
          source={{ uri: this.props.navigation.state.params.PRODUCT_IMAGE }}/>

        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('Checkout', {
            PRODUCT_NAME: this.props.navigation.state.params.PRODUCT_NAME,
            PRODUCT_PRICE: this.props.navigation.state.params.PRODUCT_PRICE,
            PRODUCT_ID: this.props.navigation.state.params.PRODUCT_ID
          })}>
          <View style={styles.button}>
            <Text style={styles.button_text}>Add To Cart ➔</Text>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.title}>{this.props.navigation.state.params.PRODUCT_NAME}</Text>
        <Text style={styles.price}>£ {this.props.navigation.state.params.PRODUCT_PRICE}</Text>
        <Text style={styles.details}>{this.props.navigation.state.params.PRODUCT_DETAILS}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: screenWidth,
    width: screenWidth,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  button: {
    height: 50,
    width: 170,
    alignSelf: "flex-end",
    marginRight: 20,
    backgroundColor: "white",
    marginTop: -30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: "black"
  },
  button_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ECC71"
  },
  title: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10
  },
  price: {
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 18
  },
  details: {
    paddingLeft: 20,
    fontSize: 16,
    marginBottom: 30
  }
})

export default Details;
