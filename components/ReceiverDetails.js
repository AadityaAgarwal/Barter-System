import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements';
import db from '../config'
import firebase from 'firebase'

export default class ReceiverDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            requestId: this.props.navigation.getParam('Details')["Request_ID"],
            mobileNo: '',
            Address: '',
            ReceiverName: '',
            Item_Name: this.props.navigation.getParam('Details')["Item_Name"],
            Item_Description: this.props.navigation.getParam('Details')["Item_Description"],
            Receiver_Id: this.props.navigation.getParam('Details')["User_Id"],
            ReceiverRequestDocId: '',
            donorName: ''
        }
    }

    getReceiverDetails = () => {
        db.collection('users').where('Email', "==", this.state.Receiver_Id).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        mobileNo: doc.data().MobileNo,
                        Address: doc.data().Address,
                        ReceiverName: doc.data().FirstName,
                    })
                })
            }
        )
        db.collection('Requested_Items').where('Request_ID', '==', this.state.requestId).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        ReceiverRequestDocId: doc.id,
                    })
                })
            }
        )
        console.log(this.state.ReceiverRequestDocId)
    }


    getDonorDetails = (userId) => {
        db.collection('users').where("Email", "==", userId).get()
            .then(
                snapshot => {
                    snapshot.forEach(doc => {
                        this.setState({
                            donorName: doc.data().FirstName + " " + doc.data().LastName,
                        })
                    })
                }
            )
    }

    addNotifications = () => {
        var message = this.state.donorName + " has shown interest in donating";
        db.collection('AllNotifications').add({
            'ItemName': this.state.Item_Name,
            'RequestId': this.state.requestId,
            'RequestedBy': this.state.ReceiverName,
            'DonorId': this.state.userId,
            'RequestStatus': "Donor Interested",
            'NotificationStatus': "unread",
            'Message': message,
        })
    }

    updateBooks = () => {
        db.collection('AllBarters').add({
            'ItemName': this.state.Item_Name,
            'RequestId': this.state.requestId,
            'RequestedBy': this.state.ReceiverName,
            'DonorId': this.state.userId,
            'RequestStatus': "Donor Interested",
        })

    }
    componentDidMount = () => {
        this.getDonorDetails(this.state.userId);
        this.getReceiverDetails();
    }
    render() {
        return (
            <View>
                <View>
                    <Card>
                        <Card.Title>Item Information</Card.Title>
                        <Card><Text>
                            Name: {this.state.Item_Name}
                        </Text>
                        </Card>


                        <Card >
                            <Text>
                                Description: {this.state.Item_Description}
                            </Text>
                        </Card></Card>

                    <Card>
                        <Card.Title>Receiver Information</Card.Title>
                        <Card>
                            <Text>Name: {this.state.ReceiverName}</Text>
                        </Card>
                        <Card>
                            <Text>Address: {this.state.Address}</Text>
                        </Card>
                        <Card>
                            <Text>Mobile Number: {this.state.mobileNo}</Text>
                        </Card>
                    </Card>

                </View>

                <View>
                    {(this.state.Receiver_Id !== this.state.userId) ?

                        <TouchableOpacity
                            style={{ backgroundColor: 'red' }}
                            onPress={() => {
                                this.updateBooks()
                                this.addNotifications()
                                this.props.navigation.navigate('MyBarters')
                            }}
                        >
                            <Text style={{ marginTop: 30 }}>Donate Book</Text>
                        </TouchableOpacity>
                        :
                        null}

                </View>
            </View>
    

        )
    }
}