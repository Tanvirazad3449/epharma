import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
const screenWidth = Math.round(Dimensions.get('window').width);
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      covidData: [],
      products: [],
      googlePhoto: 'Unavailable'
    };
  }

  componentDidMount() {
    this.getStatus();
    this.fetchCovidData();
    this.fetchProducts();
  }

  async fetchCovidData() {
    const link = "https://api.apify.com/v2/key-value-stores/KWLojgM5r1JmMW4b4/records/LATEST";
    const data = await fetch(link);
    const dataJSON = await data.json();
    this.setState({ covidData: dataJSON });
  }

  async fetchProducts() {
    const data = await fetch(`https://epharma.kentradigital.com/products`);
    const item = await data.json();
    this.setState({ products: item });
  }

  async getStatus() {
    //isLoggedIn, is a flag to save the user from entering credentials for every app sessions
    var status = await AsyncStorage.getItem('isLoggedIn');
    if (status == "yes_google") {
      this.setState({ googlePhoto: await AsyncStorage.getItem('googlePhoto') })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={{ padding: 15 }}
            onPress={() => this.props.navigation.navigate('History')}>
            <FeatherIcon name="shopping-bag" color="black" size={25} />
          </TouchableOpacity>

          <Image resizeMode="contain" style={styles.logo} 
            source={require('./../../Asset/Logo.png')} />

          <TouchableOpacity style={{ padding: 15 }}
            onPress={() => this.props.navigation.navigate('Menu')}>
            {this.state.googlePhoto == "Unavailable" ?
              <FeatherIcon name="user" color="black" size={25} />
              :
              <Image style={styles.googlePhoto} source={{ uri: this.state.googlePhoto }} />
            }
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.covid_container}>
            <View style={styles.covid_container2}>
              <Text style={styles.covid_heading}>Covid-19 Daily Update</Text>
              <View style={styles.covid_location}>
                <FeatherIcon name="map-pin" color="black" size={18} />
                <Text style={styles.covid_country}>{this.state.covidData.country}</Text>
              </View>
            </View>

            <View style={styles.covid_container3}>
              <View style={{ paddingVertical: 5, }}>
                <Text style={styles.covid_text}>
                  Daily Tested Positive: {this.state.covidData.dailyConfirmed}
                </Text>
                <Text style={styles.covid_text}>
                  Deceased Within The Last 28 Days: {this.state.covidData.dailyDeceasedWithin28Days}
                </Text>
              </View>

              <Image resizeMode="cover" source={require('./../../Asset/covid.png')}
                style={styles.covid_image}
              />
            </View>
          </View>

          <FlatList
            data={this.state.products}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => {
              return item._id;
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <TouchableWithoutFeedback onPress={() =>
                  this.props.navigation.navigate('Details', {
                    PRODUCT_NAME: item.productName,
                    PRODUCT_IMAGE: item.productImage,
                    PRODUCT_DETAILS: item.details,
                    PRODUCT_PRICE: item.price,
                    PRODUCT_ID: item._id
                  })}>
                  <View style={styles.item_container}>
                    <View style={styles.item_container2}>
                      <Image resizeMode="cover" source={{ uri: item.productImage }} style={styles.item_image}/>
                    </View>
                    <Text style={styles.item_name}>{item.productName}</Text>
                    <Text style={styles.item_price}>£ {item.price}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 150,
    height: 40
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#02ffc0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  googlePhoto: { 
    height: 30, 
    width: 30, 
    borderRadius: 15 
  },
  covid_container: { 
    width: "100%", 
    backgroundColor: "#ffb1b1", 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    shadowColor: "black", 
    elevation: 10 
  },
  covid_container2: { 
    width: "100%", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'space-between', 
  },
  covid_heading: { 
    margin: 10, 
    color: "black", 
    fontWeight: '700', 
    fontSize: 16 
  },
  covid_location: { 
    alignItems: 'center', 
    flexDirection: "row", 
  },
  covid_country: { 
    marginLeft: 5, 
    fontWeight: '700', 
    marginRight: 10, 
    fontSize: 16 
  },
  covid_container3: { 
    flexDirection: "row", 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  covid_text: { 
    marginLeft: 10, 
    color: "black" 
  },
  covid_image: { 
    height: 60, 
    width: 60, 
    marginRight: 10, 
    marginBottom: 10, 
    marginTop: 10 
  },
  item_container: { 
    width: screenWidth / 2 - 20, 
    backgroundColor: "white", 
    margin: 10, marginTop: 15, 
    borderRadius: 10, 
    shadowColor: 'black', 
    elevation: 5, 
  },
  item_container2: { 
    height: screenWidth / 2 - 20, 
    width: screenWidth / 2 - 20, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    backgroundColor: "#d2d2d2" 
  },
  item_image: { 
    height: screenWidth / 2 - 20, 
    width: screenWidth / 2 - 20, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 
  },
  item_name: { 
    paddingLeft: 10, 
    fontSize: 16, 
    fontWeight: "700" 
  },
  item_price: { 
    paddingLeft: 10, 
    paddingBottom: 5, 
    color: "grey" 
  }
})

export default Home;
