import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid,StyleSheet } from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header} from 'react-native-elements'
import MyHeader from '../components/Header'

export default class Settings extends React.Component {
    constructor(){
        super();
        this.state={
            Fname: '',
            Lname: '',
            address: '',
            MobileNo: '',
            email:'',
            docId:'',
        }
    }

   
    getDetails=()=>{
        var user= firebase.auth().currentUser;
        var email=user.email
        db.collection('users').where('Email','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    email:data.Email,
                    Fname:data.FirstName,
                    Lname:data.LastName,
                    address:data.Address,
                    MobileNo:data.MobileNo,
                    docId:doc.id,
                })
                console.warn(data)
            })
        })
    }

    componentDidMount=()=>{
        this.getDetails()
    }

    updateDetails=()=>{
         db.collection('users').doc(this.state.docId).update({
            'FirstName': this.state.Fname,
            'LastName': this.state.Lname,
            'Address': this.state.address,
            'MobileNo': this.state.MobileNo,
         })
        ToastAndroid.show("Profile Updated Successfully",ToastAndroid.SHORT)
    }

    render() {
        return (
            <View style={{flex:1,alignContent:'center',alignItems:'center',marginTop:10}}>
              <MyHeader navigation={this.props.navigation} title="Settings" />
               <TextInput
               placeholder="First Name"
               style={[styles.loginBox,{marginTop:50}]}
               onChangeText={(text)=>{
                   this.setState({
                       Fname:text
                   })
               }}
               value={this.state.Fname}
               />
                <TextInput
               placeholder="Last Name"
               style={styles.loginBox}
               onChangeText={(text)=>{
                   this.setState({
                       Lname:text
                   })
               }}
               value={this.state.Lname}
               />

                <TextInput
               placeholder="Mobile Number"
               style={styles.loginBox}
               keyboardType='numeric'
               onChangeText={(text)=>{
                   this.setState({
                       MobileNo:text
                   })
               }}
               value={this.state.MobileNo}
               />
                <TextInput
               placeholder="Address"
               style={styles.loginBox}
               multiline numberOfLines={10}
               onChangeText={(text)=>{
                   this.setState({
                       address:text
                   })
               }}
               value={this.state.address}
               />
               <TouchableOpacity 
               style={{ marginTop: 10, borderWidth:2,borderRadius: 20, borderColor:'red',backgroundColor: 'orange', width: 100, height: 30, alignItems: 'center' }}
               onPress={()=>{
                   this.updateDetails()
               }}>
                   <Text style={{color:'white',fontSize:20}}>Save</Text>
               </TouchableOpacity>
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
