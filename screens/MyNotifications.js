import * as React from 'react';
import {View,Text,FlatList,TouchableOpacity} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/Header';


export default class MyNotifications extends React.Component{
    constructor() {
        super();
        this.state = {
            all_Items: [],
            donorId:firebase.auth().currentUser.email,
        }
        this.requestRef = null;
    }
    fetchData = async () => {

        this.requestRef = db.collection('AllNotifications')
            .onSnapshot((snapshot) => {
                var all_Items = []
                snapshot.forEach(doc => {
                    all_Items.push(doc.data())
                })
                this.setState({
                    all_Items: all_Items
                });
            })

    }

    componentDidMount=()=>{
        this.fetchData()
    }
    render(){
        return(
            <View style={{flex:1}}>
               <MyHeader title="My Barters" navigation={this.props.navigation}/>

               {this.state.all_Items.length === 0 ? (
                    <View>
                        <Text>List Of Barters</Text>
                    </View>
                )
                    :
                    (
                        <FlatList
                            data={this.state.all_Items}
                            renderItem={
                                //  this.renderItem

                                ({ item }) => (
                                    <View style={{ borderBottomWidth: 2 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.ItemName}</Text>
                                                <Text>{item.RequestedBy}</Text>
                                                <Text>{item.RequestStatus}</Text>
                                                </View>
                                            <View>
                                                <TouchableOpacity
                                                    style={{ marginLeft: 100 }}
                                                    onPress={()=>{
                                                        // ToastAndroid.show('Exchanged',ToastAndroid.SHORT)
                                                       
                                                    }
                                                       
                                                    }>
                                                    <Text
                                                        style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>Send Item</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                            keyExtractor={(item, index) => {
                                index.toString();
                            }}
                        />
                    )}

            </View>
        )
    }
}