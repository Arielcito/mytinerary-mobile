import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../screens/Home.js";
import Cities from "../screens/Cities.js";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import SignIn from "../screens/SignIn.js";
import SignUp from "../screens/SignUp.js";
import City from "../screens/City.js";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const Navigator = (props) => {
  const logOut = () => {
    props.logOut();
  };

  const header = ({ navigation }) => (
    <DrawerContentScrollView>
      <View style={styles.header}>
        <View style={styles.userImage}>
          {!props.user ? (
            <>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Signin")}
              >
                <Text style={{color:"blue"}} >Sign In</Text>
              </TouchableWithoutFeedback>
              <Text>//</Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={{color:"blue"}}> Sign Up</Text>
              </TouchableWithoutFeedback>
            </>
          ) : (
            <>
              <TouchableWithoutFeedback>
              <Avatar.Image size={24} source={require('../assets/dolar.png')} />
              </TouchableWithoutFeedback>
              <View>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.body}>
        <TouchableHighlight>
          <DrawerItem
            style={styles.drawerItemStyle}
            label="Home"
            icon={() => <FontAwesome name="home" size={24} color="black" />}
            onPress={() => navigation.navigate("Home")}
          />
        </TouchableHighlight>
        <TouchableHighlight>
          <DrawerItem
            style={styles.drawerItemStyle}
            label="Cities"
            icon={() => (
              <MaterialIcons name="explore" size={24} color="black" />
            )}
            onPress={() => navigation.navigate("Cities")}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        {props.user ? (
          <TouchableHighlight style={styles.drawerItemStyleLogOut}>
            <DrawerItem
              style={styles.drawerItemStyle}
              label="Log Out"
              icon={() => (
                <MaterialIcons name="logout" size={24} color="black" />
              )}
              onPress={logOut}
            />
          </TouchableHighlight>
        ) : null}
      </View>
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={header}
      initialRouteName="Home"
      drawerType="front"
      edgeWidth={15}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cities" component={Cities} />
      {!props.user ? (
        <>
          <Drawer.Screen name="Signin" component={SignIn} />
          <Drawer.Screen name="Signup" component={SignUp} />
        </>
      ) : null}
      <Drawer.Screen name="City" component={City} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

const styles = StyleSheet.create({
    drawerStyle:{
        width:'65%',
        height:100,
        justifyContent:'space-between'
    },
    drawerItemStyle:{
        marginLeft:10,
    },
    drawerItemStyleLogOut:{
        marginTop:"10%"
    },
    header:{
        width:"100%",
        height:50,
    },
    userImage:{
        width:'100%',
        marginLeft:10,
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
    },
    body:{
        width:'100%',
        height:"50%"
    },
    footer:{    
        height:20,
        width:'100%',
        
    }
})
