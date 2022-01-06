import React from "react"
import { View, TextInput, TouchableWithoutFeedback, StyleSheet, Button, Text, Keyboard, ImageBackground } from "react-native"
import { useState } from "react"
import { connect } from "react-redux"
import authActions from "../redux/actions/authActions"
import { showMessage, hideMessage } from "react-native-flash-message"

const LogIn = (props) => {

    const [logUser, setLogUser] = useState ({
        email: "", 
        password: "",
    })

    const inputHandler = (e, field, value) => {
        setLogUser({
            ...logUser,
            [field]: e || value
            
        })
    }

    const submitForm = async () => {
        let info = Object.values(logUser).some((infoUser) => infoUser === "")
        if(!info){
            try {
                let response = await props.logUser(logUser)
                if(response.data.success){
                    showMessage({
                        message: "Welcome back!",
                        type: "success",
                        position: "top",
                        statusBarHeight: "80", 
                        backgroundColor: "pink"
                    }) 
                    
                }else if(!response.data.success){
                    showMessage({
                        message: response.data.response,
                        type: "danger",
                        position: "top",
                        statusBarHeight: "80", 
                        backgroundColor: "darkred"
                    }) 
                }else {
                    throw new Error(response.data.response)
                }
            }catch(e) {
                showMessage({
                    message: "Something went wrong",
                    type: "danger",
                    color: "white",
                    position: "top",
                    statusBarHeight: "80", 
                    backgroundColor: "red", 
                })
                console.log(e.message)
                }
        }else {
            showMessage({
                message: "You have to complete all the fields",
                description: "",
                type: "danger",
                position: "top",
                statusBarHeight: "80", 
                backgroundColor: "rebeccapurple"
            })
        }   
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <ImageBackground source={require('../assets/registerbackground.jpg')} style={styles.skyImage}>
            <Text style={styles.title}>Log in</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(e) => inputHandler(e, "email")}
                    />
                    <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(e) => inputHandler(e, "password")}
                    />
                    <Button title="Log In" color="black" onPress={submitForm}/>
                    <Text style={styles.text}>Don't have an account yet?</Text>
                    <Button title="Sign Up" color="black"/>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = state => {
    return {
       userData: state.authReducer.userData,
    }
 }

const mapDispatchToProps = {
    logInUser: authActions.logInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

const styles = StyleSheet.create({

    title: {
        fontFamily:"Nunito_700Bold",
        fontSize: 25,
        marginBottom: 20
    },

    input: {
        fontFamily:"Nunito_400Regular",
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        margin: 10,
        width: "85%",
        borderRadius: 5
    },

    select: {
        width: "85%",
    },

    text: {
        fontFamily:"Nunito_400Regular",
        marginVertical: 10,
        fontSize: 17,
        color: "white"
    },

    skyImage: {
        flex: 1,
        width: "100%",
        height: 910,
        alignItems: "center",
        justifyContent: "center"
    },
})