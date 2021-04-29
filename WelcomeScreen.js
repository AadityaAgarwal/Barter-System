import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Touchable, Alert, ToastAndroid } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import LottieView from 'lottie-react-native'

export default class WelcomeScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            email: '',
            pswd: '',
        }
    }

    signUp = (email, pswd) => {
        firebase.auth().createUserWithEmailAndPassword(email, pswd)
            .then((response) => {
                return ToastAndroid.show("User Added Successfully", ToastAndroid.SHORT)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
            this.setState({
                email:'',
                pswd:''
            })
    }
    login = (email, pswd) => {
        firebase.auth().signInWithEmailAndPassword(email, pswd)
            .then((response) => {
               return ToastAndroid.show("Logged In Succesfully!",ToastAndroid.SHORT)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
            this.setState({
                email:'',
                pswd:''
            })
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor: '#FFE0B2', }} >
                <LottieView 
                source={require('../assets/barter.json')}
                style={{width:"80%",alignSelf:'center'}}
                autoPlay loop
                />
               <View>  
                   <Text style={{color:'#E0B451',fontSize:40,textAlign:'center'}}>BARTER</Text>
                   </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 50, }}>
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

                    <TouchableOpacity style={{marginTop: 10,borderRadius:20,backgroundColor:'white',width:100,height:30,alignItems:'center'}} onPress={()=>{
                        this.login(this.state.email, this.state.pswd)
                    }
                        
                    }><Text style={{color:'red',fontSize:20}}>Login</Text></TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        this.signUp(this.state.email, this.state.pswd)
                    }} 
                    style={{marginTop: 10,borderRadius:20,backgroundColor:'white',width:100,height:30,alignItems:'center'}}
                    ><Text style={{color:'red',fontSize:20}}>Sign Up</Text></TouchableOpacity>
                </View>
                <View>
               
                </View>
            
            </View>
        )
    }
}

const styles=StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})