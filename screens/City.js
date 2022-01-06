import React from "react"
import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { useEffect, useState } from "react"
import Itinerary from "../components/Itinerary"
import citiesActions from '../redux/actions/citiesActions'

const City = (props) => {
    const [loading, setLoading] = useState(true)

    let arrayItineraries = this.props.itineraries.filter(
        (itinerary) => itinerary.city[0]._id === id
      );

    useEffect(()=> {
        props.fetchItineraries()
        props.fetchCities()
    },[])

    if(loading){
        return(
            <ActivityIndicator size="large" color="#0000ff" />
        )
    }

    return (
        <ScrollView>  
            <Image source={{uri:'../assets/carousel/paris.jpg'}} style={styles.heroCity} />
            <View style={styles.cityContainer}>
                <View style={styles.cityName}>
                    <Text style={styles.title}>{props.route.params.selectedCity.city.toUpperCase()}</Text>
                </View>
            </View>
            {props.arrayItineraries.length === 0
            ? <View style={{marginTop: 90}}>
                <Text style={{color: '#333', fontSize: 30, textAlign: 'center', padding: 30, fontWeight: 'bold'}}> Sorry! There are no itineraries for this city yet. Check out later!</Text>
            </View> 
            : <View style={{marginTop: '10%', marginBottom: '15%'}}>
                {props.itineraries.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} navigation={props.navigation}/>)}
            </View> 
            }
            <Footer/>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        itineraries: state.itinerariesReducer.itineraries,
    }
}

const mapDispatchToProps = {
    fetchItineraries: itinerariesActions.fetchItineraries,
    fetchCities: citiesActions.fetchCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(City)

const styles = StyleSheet.create({
    heroCity: {
        width: "100%",
        height: 200,
    },

    title: {
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        paddingVertical: 5,
        fontSize: 22,
        textAlign: "center",
        width: 150

    },

    cityName: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 15,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 175,
    },

    cityContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    preloaderContainer:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})