import {View, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground} from "react-native"
import React from "react"
import { useState } from "react"
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux"
import authActions from "../redux/actions/authActions"
import { showMessage } from "react-native-flash-message"

const SignUp = (props) => {

    const [newUser, setNewUser] = useState ({
        firstName: "",
        lastName: "",
        src: "",
        country: "",
        email: "",
        password: "",
    })

    const countries = ["Egypt", "Canada", "Australia", "Ireland", "Argentina", "Colombia", "Peru","United States", "Chile", "China", "Japan", "Pakistan", "Colombia", "Uruguay", "Cuba"]

    const inputHandler = (e, field, value) => {
        setNewUser({
            ...newUser,
            [field]: e || value
        })
    }
    
    const submitForm = async () => {
        let saveUser = Object.values(newUser).some((infoUser) => infoUser === "")
        if(!saveUser){
            try{
                let response = await props.signUp(newUser)
                if(response.data.success){
                    showMessage({
                        message: "Welcome!",
                        type: "success",
                        position: "top",
                        statusBarHeight: "80", 
                        backgroundColor: "pink"
                    })
                }else if(!response.data.success){
                    if(response.data.errors){
                        {response.data.errors.map((error) =>{
                            return(
                                showMessage({
                                    message: error.message,
                                    type: "danger",
                                    color: "white",
                                    position: "top",
                                    statusBarHeight: "80", 
                                    backgroundColor: "darkred", 
                                })
                            )
                    })}     
                    } else {
                        throw new Error(response.data.response)
                    }
                }else{
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
                <Text style={styles.title}>Create your account</Text>
                <TextInput 
                style={styles.input}
                placeholder="First Name"
                onChangeText={(e) => inputHandler(e, "firstName")}
                />
                <TextInput 
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(e) => inputHandler(e, "lastName")}
                />
                <TextInput 
                style={styles.input}
                placeholder="Picture"
                onChangeText={(e) => inputHandler(e, "src")}
                />
                <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        inputHandler(selectedItem, "country")
                    }}
                    defaultButtonText={"Select country"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome name="chevron-down" color={"black"} size={15} />
                      )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
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
                <Button onPress={submitForm} title="Sign Up" color="black" borderRadius="5" />
                <Text style={styles.text}>Already have an account?</Text>
                <Button title="Log In" color="black" />
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const mapDispatchToProps = {
    registerUser: authActions.registerUser

}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({

    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 25,
    },

    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        margin: 13,
        width: "85%",
        borderRadius: 5
    },

    select: {
        width: 350,
    },

    text: {
        marginVertical: 10,
        fontSize: 17
    },

    skyImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 810,
    },

    dropdown1BtnStyle: {
        width: "85%",
        height: 50,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
    },

    dropdown1BtnTxtStyle: {
        color: "#777", 
        textAlign: "left",
    },

    dropdown1DropdownStyle: { 
        backgroundColor: "#EFEFEF" 
    },

    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },

    dropdown1RowTxtStyle: { 
        color: "#444", 
        textAlign: "left",
        paddingLeft: 3,
    }
})