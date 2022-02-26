import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      userId: '',
      status: 'Loading'
    };
  }

  componentDidMount() {
    this.fetchHistory()
  }

  fetchHistory = async () => {
    var userId = await AsyncStorage.getItem('userId');
    const URL = `https://epharma.kentradigital.com/users/history?userId=`;
    const data = await fetch(URL + userId);
    const item = await data.json();
    this.setState({ item: item });
    if (item.length == 0) {
      this.setState({ status: "No Items Found" })
    } else {
      this.setState({ status: "Done Fetching" })
    }
  }

  render() {
    return (
      <View>
        { this.state.status == "Loading" &&
          <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} animating={true} />
        }

        { this.state.status == "Done Fetching" &&
          <View>
            <Text style={{ padding: 10 }}>You have placed {this.state.item.length} orders</Text>
            <FlatList
              data={this.state.item}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => {
                return item._id;
              }}
              renderItem={(post) => {
                const item = post.item;
                return (
                  <View style={styles.item_container}>
                    <View>
                      <Text style={{ fontWeight: "700" }}>{item.productid.productName}</Text>
                      <Text>Total Amount: £ {item.productid.price}</Text>
                      <Text style={{ width: screenWidth - 100 }}>Delivery Address: {item.address}</Text>
                    </View>
                    <Image resizeMode="contain" source={{ uri: item.productid.productImage }}
                      style={styles.image}
                    />
                  </View>
                )
              }}
            />
          </View>
        }

        { this.state.status == "No Items Found" &&
          <Text style={styles.empty_message}>You Have Not Placed Any Orders Yet... :/</Text>
        }

      </View>
    );
  }
}
const styles = StyleSheet.create({

  item_container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "black",
    padding: 10,
    marginBottom: 2
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5
  },
  empty_message: {
    marginTop: 100,
    alignSelf: 'center'
  }
})

export default History;
