import { View,Image } from 'react-native';
import * as React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Exchange from './screens/Exchange'
import Home from './screens/Home'

export const TabNavigator=createBottomTabNavigator({

    Home:{
        screen:Home
    },
    Exchange:{
        screen:Exchange
    }
},
{
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:()=>{
            const routename=navigation.state.routeName;
            if(routename==="Exchange"){
                return(
                    <Image source={require('./assets/exchange.png')}
                    style={{
                        width:40,height:40
                    }}
                    />

                )
            }
            else if(routename==="Home"){
                return(
                    <Image source={require('./assets/home.jpg')}
                    style={{
                        width:40,height:40
                    }}
                    />

                )
            }
        }
    })
})