import * as React from 'react'
import {View,Text,Alert} from 'react-native'
import {DrawerItems,createDrawerNavigator} from 'react-navigation-drawer'
import{ TabNavigator} from '../TabNavigator'
import CustomSideDrawer from './customSideDrawer'
import Settings from '../screens/Settings'
import firebase from 'firebase'
import { render } from 'react-dom'

export const DrawerNavigator=createDrawerNavigator({
    Home:{
        screen:TabNavigator,
        // screen: Settings
    },
   Settings:{
       screen:Settings
   },
  
   
},
{
    contentComponent:CustomSideDrawer
},
{
     initialRouteName:'Home'
}
)