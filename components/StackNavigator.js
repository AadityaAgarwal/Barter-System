import * as React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import Home from '../screens/Home'
import ReceiverDetails from '../components/ReceiverDetails'

export const StackNavigator=createStackNavigator({
    BarterList:{
        screen:Home
    },
    ReceiverDetails:{
        screen:ReceiverDetails
    }
},
{
    initialRouteName:'BarterList'
}
)