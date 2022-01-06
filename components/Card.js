import {
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

const Card = ({ city }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.navigation.navigate("City", { selectedCity: city })}
    >
      <ImageBackground
        resizeMethod={"auto"}
        style={styles.slide}
        loadingIndicatorSource={"../assets/placeholder.png"}
        source={{ uri: `../assets/carousel/paris.jpg` }}
      >
        <Text style={styles.title}>{city.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  item: { justifyContent: "center" },
  slide: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#rgba(0,0,0,0.4)",
    width: "100%",
    textAlign: "center",
    paddingVertical: 1,
  },
});
