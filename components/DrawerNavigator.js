import * as React from 'react'
import {View,Text,Alert} from 'react-native'
import {DrawerItems,createDrawerNavigator} from 'react-navigation-drawer'
import{ TabNavigator} from '../TabNavigator'
import CustomSideDrawer from './customSideDrawer'
import Settings from '../screens/Settings'
import firebase from 'firebase'
import { render } from 'react-dom'
import MyBarters from '../screens/MyBarters'
import MyNotifications from '../screens/MyNotifications'

export const DrawerNavigator=createDrawerNavigator({
    Home:{
        screen:TabNavigator,
        // screen: Settings
    },
   Settings:{
       screen:Settings
   },
  MyBarters:{
      screen:MyBarters
  },
  MyNotifications:{
      screen:MyNotifications
  }
   
},
{
    contentComponent:CustomSideDrawer
},
{
     initialRouteName:'Home'
}
)