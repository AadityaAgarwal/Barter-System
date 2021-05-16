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
import {Icon} from 'react-native-elements'
import db from '../config'

export const DrawerNavigator=createDrawerNavigator({
    Home:{
        screen:TabNavigator,
        navigationOptions:{
            drawerIcon : <Icon name="home" type ="fontawesome5" />
          }
    },
   Settings:{
       screen:Settings,
       navigationOptions:{
        drawerIcon : <Icon name="settings"   color='#696969' size={25} />
      }
   },
  MyBarters:{
      screen:MyBarters,
      navigationOptions:{
        drawerIcon : <Icon name="exchange"  type='font-awesome' color='#696969' size={25} />
      }
  },
  MyNotifications:{
      screen:MyNotifications,
      navigationOptions:{
        drawerIcon : <Icon name='bell' type='font-awesome' color='#696969' size={25}/>
      }
  }
   
},
{
    contentComponent:CustomSideDrawer
},
{
     initialRouteName:'Home'
}
)