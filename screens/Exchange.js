import * as React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { Header } from 'react-native-elements'
import MyHeader from '../components/Header'

export default class Exchange extends React.Component {
    constructor() {
        super();
        this.state = {
            Item_Name: '',
            Item_Desc: '',
            userId: firebase.auth().currentUser.email,
            requestId:'',
            userDocId:'',
            isBookRequestActive:'',
            requestedItemName:'',
            itemStatus:'',
            docId:'',
            currencyCode:'',
            itemValue:'',
        }
    }

    addItem = (name, desc) => {
        var UserID = this.state.userId
        var randomRequestId = Math.random().toString(36).substring(7)

        db.collection('Requested_Items').add({
            "Item_Name": name,
            "Item_Description": desc,
            'User_Id': UserID,
            'Request_ID': randomRequestId,
            "item_value"  : this.state.itemValue,
        })

        db.collection('users').where('Email','==',userID).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            db.collection('users').doc(doc.id).update({
              isBookRequestActive:true,
            })
          })
        })

        this.setState({
            Item_Desc: '',
            Item_Name: '',
            itemValue:'',
            
        })
        return Alert.alert(
            'Item Ready For Exchange',
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('Home')
                    }
                }
            ]
        )
    }

    
  getItemRequest=()=>{
    var bookRequest=db.collection('Requested_Items').where('User_Id','==',this.state.userId).get()
    .then(
      snapshot=>{
        snapshot.forEach(doc=>{
          if(doc.data().item_status!=="received"){
            this.setState({
              'requestId':doc.data().Request_ID,
              'requestedItemName':doc.data().Item_Name,
              'itemStatus':doc.data().Item_Status,
              'docId':doc.id,
              itemValue : doc.data().item_value,
            })
          }
        })
      }
    )
  }

  getItemRequestActive=()=>{
    db.collection('users').where('Email','==',this.state.userId).onSnapshot(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          IsBookRequestActive:doc.data().IsBookRequestActive,
          userDocId:doc.id,
          currencyCode:doc.data().Currency_Code
        })
      })
    })
}

receivedItems=(itemName)=>{
    var userId=this.state.userId

    db.collection('Received_Items').add({
      'userId':userId,
      'book_Name':itemName,
      'itemStatus':"received",
      'requestId':this.state.requestId
    })
  }
  updateBookRequestStatus=()=>{
    db.collection('Requested_Items').doc(this.state.docId).update({
      'itemStatus':"received"
    })

    db.collection('users').where('Email','==',this.state.userId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        db.collection('users').doc(doc.id).update({
          'isBookRequestActive':false
        })
      })
    })
  }
  
  sendNotification=()=>{
    db.collection('users').where('Email','==',this.state.userId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        var docData=doc.data()
        var name=docData.FirstName+" "+docData.LastName
        db.collection('AllNotifications').where('RequestId','==',this.state.requestId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            var bookName=doc.data().book_name
            var donorId=doc.data().donor_id
            
            db.collection('AllNotifications').add({
              'message':name+" received the item "+bookName,
              'targeted_user_id':donorId,
              'notification_status':"unread",
              'book_name':bookName,
            })
          })
        })
      })
    })
  }

  getData=()=>{
    fetch("http://data.fixer.io/api/latest?access_key=ee7b8515cdc81ed0bc9351a5aac7d5ad&format=1")
    .then(response=>{
      return response.json();
    }).then(responseData =>{
      var currencyCode = this.state.currencyCode
      var currency = responseData.rates.INR
      var value =  69 / currency
      console.log(value);
    })
  }

  componentDidMount(){
      this.getItemRequestActive()
      this.getItemRequest()
  }
    render() {
        if(this.state.isBookRequestActive===true){
            return(
              <View>
                <Text>You have already requested a book.</Text>
                <Text>Book Name: {this.state.requestedBookName}</Text>
                <Text>Request Status: {this.state.bookStatus}</Text>
      
                <TouchableOpacity onPress={()=>{
                  this.sendNotification()
                  this.updateBookRequestStatus()
                  this.receivedBooks(this.state.requestedBookName)
                }}>
                  <Text>I have received the book</Text>
                </TouchableOpacity>
              </View>
            )
          }

          else{
        return (
            <View><View>
               <MyHeader title="Add Item" navigation={this.props.navigation} />
                <TextInput
                    placeholder="Item Name"
                    onChangeText={text => {
                        this.setState({
                            Item_Name: text
                        })
                    }}
                    value={this.state.Item_Name}
                    style={[styles.loginBox, { marginTop: 200, height: 40, }]}
                />
                <View>
                    <TextInput
                        placeholder="Item Description"
                        multiline numberOfLines={20}
                        onChangeText={text => {
                            this.setState({
                                Item_Desc: text
                            })
                        }}
                        value={this.state.Item_Desc}
                        style={[styles.loginBox, { height: 90, }]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Item Valie"
                        maxLength={8}
                        onChangeText={text => {
                            this.setState({
                                itemValue: text
                            })
                        }}
                        value={this.state.itemValue}
                        style={[styles.loginBox, { height: 90, }]}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.addItem(this.state.Item_Name, this.state.Item_Desc)
                        }}
                        style={{ backgroundColor: '#FC5622', width: 250, alignSelf: 'center', borderRadius: 10, height: 40 }}>
                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 7, fontWeight: 'bold', fontSize: 20 }}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </View></View>
        )
    }
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,

        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderRadius: 30,
        alignSelf: 'center',

    },
})