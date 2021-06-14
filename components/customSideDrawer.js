import * as React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'
import { Icon } from 'react-native-elements'
import { RFValue } from "react-native-responsive-fontsize";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import db from '../config'

export default class CustomSideDrawer extends React.Component {
 
  state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("Email", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().FirstName + " " + doc.data().LastName,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }
    render() {
        return (
            <View style={{flex:1}}>
              
              <View
           style={{
          //   flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#32867d",
           }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />

          <Text
            style={{
              fontWeight: "300",
              fontSize: RFValue(20),
              color: "#fff",
              padding: RFValue(10),
            }}
          >
            {this.state.name}
          </Text>
        </View>
              <View>
                <DrawerItems
                    {...this.props}
                />
            </View>
                <View>
                    {/* <TouchableOpacity

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
                      <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
                    </TouchableOpacity> */}

<TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
              marginTop:450
            }}
            onPress={() => {
                firebase.auth().signOut();
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
              
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
                </View>

            </View>
        )
    }
}
