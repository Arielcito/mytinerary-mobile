import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { ScrollView, TextInput } from "react-native";
import background from "../assets/background-cities.jpg";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import { useEffect } from "react";
import Card from "../components/Card";

const Cities = (props) => {
  const { loading, filterCities, cities, auxiliar, fetchCities } = props;

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <ScrollView style={styles.main}>
      <ImageBackground source={background} style={styles.background}>
        <TextInput
          style={styles.input}
          placeholder="Choose your destination"
          onChange={(e) => {
            filterCities(cities, e.nativeEvent.text);
          }}
        />
      </ImageBackground>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        auxiliar.length === 0 ? (
          <View style={styles.main}>
            <Text >We couldn't find a match for your search. Try another city!</Text>
       </View>
        ) : (
          auxiliar.map((city, index) => (
            <Card city={city} key={index}  navigation={props.navigation} route={props.route} />
          ))
        )
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar,
    loading: state.citiesReducer.loading,
  };
};

const mapDispatchToProps = {
  filterCities: citiesActions.filterCities,
  fetchCities: citiesActions.fetchCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  background: {
    height: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  input: {
    backgroundColor: "rgba(256,256,256,.8)",
    borderRadius: 100,
    width: "60%",
    height: 30,
  },
});
