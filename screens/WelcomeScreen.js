import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import LottieView from 'lottie-react-native'

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pswd: '',
            Fname: '',
            Lname: '',
            address: '',
            MobileNo: '',
            isModalVisible: false,
            confirmPswd: ''
        }
    }

    signUp = (email, pswd, confirmPswd) => {
        if (pswd !== confirmPswd) {
            return Alert.alert("Password Does Not Match!")
        }
        else {


            firebase.auth().createUserWithEmailAndPassword(email, pswd)
                .then((response) => {
                    return ToastAndroid.show("User Added Successfully", ToastAndroid.SHORT)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }
    }
    login = (email, pswd) => {
        firebase.auth().signInWithEmailAndPassword(email, pswd)
            .then((response) => {
                return ToastAndroid.show("Logged In Succesfully!", ToastAndroid.SHORT)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
    }
    showModal = () => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>

                <View style={{ backgroundColor: 'white', flex: 1, borderRadius: 20, alignItems: 'center', marginLeft: 30, marginRight: 30, marginBottom: 80, marginTop: 80 }}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView>
                            <Text style={{textAlign:'center',color:'red',fontSize:30,fontWeight:'bold'}}>Registration</Text>
                            <TextInput
                                placeholder="First Name"
                                maxLength={10}
                                style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ Fname: text })
                                }}
                                value={this.state.Fname}
                            />

                            <TextInput
                                placeholder="Last Name"
                                maxLength={10}
                                style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ Lname: text })
                                }}
                                value={this.state.Lname}
                            />

                            <TextInput
                                placeholder="Contact Number"
                                maxLength={10}
                                keyboardType="numeric"
                                style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ MobileNo: text })
                                }}
                                value={this.state.MobileNo}
                            />
                            <TextInput
                                placeholder="Address"
                                multiline={true}
                                style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ address: text })
                                }}
                                value={this.state.address}
                            />
                            <TextInput
                                placeholder="Email"
                                style={styles.loginBox}
                                keyboardType="email-address"
                                onChangeText={text => {
                                    this.setState({ email: text })
                                }}
                                value={this.state.email}
                            />

                            <TextInput
                                placeholder="Password"
                                style={styles.loginBox}
                                secureTextEntry={true}
                                onChangeText={text => {
                                    this.setState({ pswd: text })
                                }}
                                value={this.state.pswd}
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                style={styles.loginBox}
                                secureTextEntry={true}
                                onChangeText={text => {
                                    this.setState({ confirmPswd: text })
                                }}
                                value={this.state.confirmPswd}
                            />
                            <View style={{  flex: 1, justifyContent: 'space-between', marginLeft: 100, marginRight: 100 }}>
                                <TouchableOpacity onPress={() => {

                                    this.signUp(this.state.email, this.state.pswd, this.state.confirmPswd)
                                }}><Text style={{ color: 'red', fontSize: 20 }}>Register</Text></TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}><Text style={{ color: 'red' }}> Cancel</Text></TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>

                    </ScrollView>

                </View>
            </Modal>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFE0B2' }} >
                <View>
                    {this.showModal()}
                </View>
                <LottieView
                    source={require('../assets/barter.json')}
                    style={{ width: "80%", alignSelf: 'center' }}
                    autoPlay loop
                />
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, }}>

                    <TextInput
                        placeholder="Email"
                        style={styles.login}
                        keyboardType="email-address"
                        onChangeText={text => {
                            this.setState({ email: text })
                        }}
                        value={this.state.email}
                    />

                    <TextInput
                        placeholder="Password"
                        style={styles.login}
                        secureTextEntry={true}
                        onChangeText={text => {
                            this.setState({ pswd: text })
                        }}
                        value={this.state.pswd}
                    />

                    <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 100, height: 30, alignItems: 'center' }} onPress={() => {
                        this.login(this.state.email, this.state.pswd)
                    }

                    }><Text style={{ color: 'red', fontSize: 20 }}>Login</Text></TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 100, height: 30, alignItems: 'center' }}
                        onPress={() => {
                            this.setState({
                                isModalVisible: true
                            })

                        }}><Text style={{ color: 'red', fontSize: 20 }}>Sign Up</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width: '75%',
        height: 40,
        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderRadius: 20,
        alignSelf:'center'
    },
    login: {
        width: '75%',
        height: 40,
        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})