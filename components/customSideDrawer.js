import * as React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'


export default class CustomSideDrawer extends React.Component {
    render() {
        return (
            <View><View>
                <DrawerItems
                    {...this.props}
                />
            </View>
                <View>
                    <TouchableOpacity
                    
                    onPress={
                        () => {
                            firebase.auth().signOut()
                            return Alert.alert(
                                'Do You Want To Log Out?',
                                '',
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            this.props.navigation.navigate('WelcomeScreen')
                                        }
                                    },
                                    {
                                        text: 'Cancel', onPress: () => {
                                            this.props.navigation.navigate('Home')
                                        }
                                    }
                                ]
                            )
                            // this.props.navigation.navigate('WelcomeScreen')
                        }
                    }>
                        <Text style={{fontWeight:'bold',marginLeft:18}}>Logout</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}