import {
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  View,
} from "react-native";
import background from "../assets/background.jpg";
import CarouselComp from "../components/CarouselComp";

const Home = (props) => {
  return (
    <>
      <View style={styles.main}>
        <ImageBackground
          source={background}
          style={styles.heroImage}
          resizeMode="cover"
        >
          <Text style={styles.heroTitle}>MyTinerary</Text>
          <Text style={styles.heroSlogan}>
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </Text>
          <Button
            onPress={() => props.navigaton.navigate('Cities')}
            title="Learn More"
            color="#e56717"
            accessibilityLabel="Learn more about the cities"
            style={styles.heroButton}
          />
        </ImageBackground>
         <CarouselComp/>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1e2326",
  },
  heroImage: {
    width: "100%",
    height: 500,
    flex: 1,
    justifyContent: "center",
    marginBottom:100
  },
  heroTitle: {
    color: "#e56717",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:50,
    marginBottom:50
  },
  heroSlogan: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginBottom:50
  },
  heroButton:{
      width:"50%",
      
  }
});
