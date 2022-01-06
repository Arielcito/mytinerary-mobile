import React from "react"
import { View, Text, StyleSheet } from "react-native"

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}> MyTinerary &copy; | Lucrecia Gillone | MindHub 2021</Text>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        alignItems: "center",
        justifyContent: "center",
        height: 25,
        width: "100%",
        backgroundColor: "black",
    },

    footerText: {
        fontFamily: "Nunito_200ExtraLight",
        color: "white"
    }
})