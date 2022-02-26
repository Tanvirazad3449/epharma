import React, { Component } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, Dimensions, AsyncStorage, Button, StatusBar, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
const screenWidth = Math.round(Dimensions.get('window').width);
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            userId: '',
            loading: false
        };
    }

    componentDidMount() {
        this.readCache();
    }

    async readCache() {
        var userId = await AsyncStorage.getItem('userId')
        this.setState({ userId: userId });
    }

    async placeOrder() {
        this.setState({ loading: true })
        fetch('https://epharma.kentradigital.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: this.props.navigation.state.params.PRODUCT_ID,
                userId: this.state.userId,
                address: this.state.address
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                if (responseJson.message == "order placed") {
                    Alert.alert(
                        "Order Placed Successfully!",
                        "You can check your orders in your Order History", [
                        {
                            text: "View Orders",
                            onPress: () => this.props.navigation.navigate('History')
                        }
                    ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        "Task Failed!",
                        "Some unknown error has occured. We are trying to fix it soon.",
                        [
                            { text: "OK", onPress: () => console.log("error") }
                        ],
                        { cancelable: false }
                    );
                }
            })
    }

    render() {
        return (
            <View>
                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <MaterialCommunityIcons name="cart" color="black" size={25} />
                        <Text style={styles.heading}>Cart</Text>
                    </View>

                    <View style={styles.container3}>
                        <Text style={styles.cart_item}>
                            {this.props.navigation.state.params.PRODUCT_NAME}
                        </Text>
                        <Text style={styles.cart_price}>
                            £ {this.props.navigation.state.params.PRODUCT_PRICE}
                        </Text>
                    </View>

                    <View style={styles.borderline} />

                    <View style={styles.container4}>
                        <Text style={styles.cart_total}>Total</Text>
                        <Text style={styles.cart_total_price}>
                            £ {this.props.navigation.state.params.PRODUCT_PRICE}
                        </Text>
                    </View>
                </View>

                <View style={styles.checkout_container}>
                    <View style={styles.container5}>
                        <FeatherIcon name="map-pin" color="black" size={20}/>
                        <Text style={styles.heading}>Delivery Address</Text>
                    </View>

                    <TextInput
                        style={styles.textinput}
                        placeholder="Please Enter Your Address"
                        placeholderTextColor="grey"
                        textAlignVertical="top"
                        multiline
                        numberOfLines={2}
                        autoCapitalize="none"
                        onChangeText={(address) => this.setState({ address })}
                        value={this.state.address}
                    />

                    <TouchableWithoutFeedback onPress={() => this.placeOrder()}>
                        <View style={styles.button}>
                            {this.state.loading ?
                                <ActivityIndicator size="small" color="#2ECC71" 
                                    animating={this.state.loading}/>
                                :
                                <Text style={styles.button_text}>Place Order</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "black"
    },
    container2: {
        alignItems: 'center',
        flexDirection: "row",
        padding: 10,
        paddingLeft: 20
    },
    container3: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    container4: { 
        alignItems: 'center', 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingBottom: 10 
    },
    heading: {
        marginLeft: 5,
        fontWeight: '700',
        marginRight: 10,
        fontSize: 20
    },
    cart_item: { 
        paddingLeft: 20, 
        fontSize: 18, 
    },
    cart_price: { 
        paddingLeft: 20, 
        color: "black", 
        fontSize: 18, 
        marginRight: 20 
    },
    borderline: { 
        height: 1, 
        width: "100%", 
        marginVertical: 10, 
        backgroundColor: "#00000020" 
    },
    cart_total: { 
        paddingLeft: 20, 
        color: "black", 
        fontSize: 18, 
        marginRight: 20, 
        fontWeight: "bold" 
    },
    cart_total_price: { 
        paddingLeft: 20, 
        color: "black", 
        fontSize: 18, 
        marginRight: 20, 
        fontWeight: "bold" 
    },
    checkout_container: { 
        backgroundColor: "white", 
        elevation: 5, 
        shadowColor: "black", 
        marginTop: 10 },
    container5: { 
        alignItems: 'center', 
        flexDirection: "row", 
        padding: 10, 
        paddingLeft: 20 
    },
    textinput: {
        color: '#2a2d36', 
        backgroundColor: 'white', 
        paddingHorizontal: 10, 
        alignSelf: "center",
        borderRadius: 5, 
        width: screenWidth - 40, 
        borderWidth: 1,
        borderColor: "black", 
        marginBottom: 10, 
        justifyContent: 'center'
    },
    button: {
        height: 50, 
        width: screenWidth - 40, 
        marginBottom: 20, 
        alignSelf: "center", 
        backgroundColor: "white",
        marginTop: 20, 
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
    }



})
export default Checkout;
