import * as React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import db from '../config'
import { ListItem, Header } from 'react-native-elements'
import ReceiverDetails from '../components/ReceiverDetails'
import MyHeader from '../components/Header'
import firebase from 'firebase'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            all_Items: [],
        }
        this.requestRef = null;
    }
    fetchData = async () => {

        this.requestRef = db.collection('Requested_Items')
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

    componentDidMount = async () => {
        this.fetchData();
        console.log(this.state.all_Items)
    }

    renderItem = ({ item, i }) => {
        <ListItem bottomDivider key={i}>
            <ListItem.Content>
                <ListItem.Title>{item.Item_Name}</ListItem.Title>
                <ListItem.Subtitle>{item.Item_Description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        // return (
        //     <ListItem
        //         key={i}
        //         title={item.Item_Name}
        //         subtitle={item.Item_Description}
        //         titleStyle={{ color: 'black', fontWeight: 'bold' }}
        //         rightElement={
        //             <TouchableOpacity style={styles.button}>
        //                 <Text style={{ color: 'red' }}>View</Text>
        //             </TouchableOpacity>
        //         }
        //         bottomDivider
        //     />
        // )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                
                <MyHeader title="Available Items" navigation={this.props.navigation}/>
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
                                                <Text style={{ fontWeight: 'bold' }}>{item.Item_Name}</Text>
                                                <Text>{item.Item_Description}</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    style={{ marginLeft: 100 }}
                                                    onPress={()=>{
                                                        console.log(this.state.all_Items)
                                                         this.props.navigation.navigate('ReceiverDetails', { "Details": item })
                                                        // ToastAndroid.show('Exchanged',ToastAndroid.SHORT)
                                                       
                                                    }
                                                       
                                                    }>
                                                    <Text
                                                        style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>Exchange</Text></TouchableOpacity>
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

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})