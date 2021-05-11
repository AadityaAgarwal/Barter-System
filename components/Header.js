import * as React from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

const MyHeader = props => {
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.openDrawer()}/>}
      rightComponent={<Icon name='bell' type='font-awesome' color='#696969'/>}
      centerComponent={{ text: props.title, style: { color: 'white', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "cyan"
    />
  );
};

export default MyHeader;