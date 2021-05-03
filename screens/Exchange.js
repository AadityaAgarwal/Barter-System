import * as React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import db from '../config'

export default class Exchange extends React.Component {
    constructor() {
        super();
        this.state = {
            Item_Name: '',
            Item_Desc: '',
        }
    }

    addItem = (name, desc) => {
        db.collection('Requested_Items').add({
            "Item_Name": name,
            "Item_Description": desc
        })
        this.setState({
            Item_Desc: '',
            Item_Name: '',
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
    render() {
        return (
            <View><View>
                <Text style={{ marginTop: 20, fontWeight: 'bold', textAlign: 'center', fontSize: 20, backgroundColor: 'cyan', width: 400, alignSelf: 'center', height: 50 }}>Add Item</Text>
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